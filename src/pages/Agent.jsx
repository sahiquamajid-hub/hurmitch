import { useState, useRef } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { uploadToCloudinary } from '../utils/cloudinary'

export default function Agent() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isRecording, setIsRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState(null)
    const [audioBlob, setAudioBlob] = useState(null)

    const [photoPreview, setPhotoPreview] = useState(null)
    const [photoFile, setPhotoFile] = useState(null)

    const [submitting, setSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [draftListing, setDraftListing] = useState(null)

    const mediaRecorderRef = useRef(null)
    const chunksRef = useRef([])
    const fileInputRef = useRef(null)

    const playGreeting = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: 'Assalamualaikum. Apne kaam ki tasveer bhejein. Phir ek awazi paigham record karein jisme batayein ke yeh cheez kya hai, banane mein kitna waqt laga, aur iski qeemat kya hai.' })
            })
            const data = await res.json()
            if (!res.ok || !data.audio) {
                setError(JSON.stringify(data, null, 2))
                setLoading(false)
                return
            }
            const audio = new Audio(`data:audio/wav;base64,${data.audio}`)
            audio.play()
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const recorder = new MediaRecorder(stream)
            chunksRef.current = []

            recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
                setAudioBlob(blob)
                setAudioUrl(URL.createObjectURL(blob))
                stream.getTracks().forEach(track => track.stop())
            }

            recorder.start()
            mediaRecorderRef.current = recorder
            setIsRecording(true)
        } catch (err) {
            setError('Microphone access failed: ' + err.message)
        }
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPhotoFile(file)
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result.split(',')[1])
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    const readyToSubmit = audioBlob && photoFile

    const handleSubmit = async () => {
        setSubmitting(true)
        setError(null)
        try {
            const audioBase64 = await blobToBase64(audioBlob)

            const parseRes = await fetch('/api/parse-listing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audioBase64, mimeType: 'audio/webm' })
            })
            const parseData = await parseRes.json()

            if (!parseRes.ok || !parseData.listing) {
                setError(JSON.stringify(parseData, null, 2))
                setSubmitting(false)
                return
            }

            setDraftListing(parseData.listing)
        } catch (err) {
            setError(err.message)
        }
        setSubmitting(false)
    }

    const confirmAndSave = async () => {
        setSubmitting(true)
        setError(null)
        try {
            const photoUrl = await uploadToCloudinary(photoFile)

            await addDoc(collection(db, 'pendingListings'), {
                ...draftListing,
                photoUrl,
                status: 'pending_review',
                createdAt: serverTimestamp()
            })

            setSubmitSuccess(true)
        } catch (err) {
            setError(err.message)
        }
        setSubmitting(false)
    }

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-sand flex items-center justify-center px-6">
                <div className="bg-green-100 text-green-800 px-6 py-4 rounded-lg font-semibold text-center">
                    Shukriya! Aapka kaam humein mil gaya. ✓
                </div>
            </div>
        )
    }

    if (draftListing) {
        return (
            <div className="min-h-screen bg-sand flex flex-col items-center px-6 py-12 gap-6">
                <h1 className="font-heading text-2xl text-maroon text-center">Yeh Sahi Hai?</h1>
                <div className="w-full max-w-sm bg-white/60 rounded-xl p-6 border border-maroon/10 space-y-2">
                    <p><span className="font-semibold text-maroon">Cheez:</span> {draftListing.itemName || '—'}</p>
                    <p><span className="font-semibold text-maroon">Tafseel:</span> {draftListing.description || '—'}</p>
                    <p><span className="font-semibold text-maroon">Waqt:</span> {draftListing.timeTaken || '—'}</p>
                    <p><span className="font-semibold text-maroon">Qeemat:</span> Rs {draftListing.price || '—'}</p>
                </div>
                {photoPreview && <img src={photoPreview} alt="preview" className="w-32 h-32 object-cover rounded-lg" />}
                <div className="flex gap-4">
                    <button onClick={confirmAndSave} disabled={submitting} className="bg-terracotta text-white px-6 py-3 rounded-lg font-semibold">
                        {submitting ? 'Bhej rahe hain...' : 'Haan, Theek Hai'}
                    </button>
                    <button onClick={() => setDraftListing(null)} className="border border-maroon text-maroon px-6 py-3 rounded-lg font-semibold">
                        Dobara Karain
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-sand flex flex-col items-center px-6 py-12 gap-8">
            <h1 className="font-heading text-3xl text-maroon text-center">Hurmitch Agent</h1>

            <button onClick={playGreeting} disabled={loading} className="bg-terracotta text-white px-6 py-3 rounded-lg font-semibold">
                {loading ? 'Loading...' : '🔊 Sunain — What To Do'}
            </button>

            {error && (
                <pre className="text-left text-xs bg-red-100 text-red-800 p-4 rounded-lg max-w-xl overflow-auto">
                    {error}
                </pre>
            )}

            <div className="w-full max-w-sm flex flex-col items-center gap-3 p-6 bg-white/50 rounded-xl border border-maroon/10">
                <p className="font-semibold text-maroon">Awazi Paigham</p>
                {!isRecording ? (
                    <button onClick={startRecording} className="w-20 h-20 rounded-full bg-terracotta text-white text-3xl flex items-center justify-center">
                        🎙️
                    </button>
                ) : (
                    <button onClick={stopRecording} className="w-20 h-20 rounded-full bg-red-600 text-white text-3xl flex items-center justify-center animate-pulse">
                        ⏹️
                    </button>
                )}
                <p className="text-sm text-charcoal/60">{isRecording ? 'Recording...' : audioUrl ? 'Recorded ✓' : 'Tap to record'}</p>
                {audioUrl && <audio controls src={audioUrl} className="w-full mt-2" />}
            </div>

            <div className="w-full max-w-sm flex flex-col items-center gap-3 p-6 bg-white/50 rounded-xl border border-maroon/10">
                <p className="font-semibold text-maroon">Tasveer</p>
                <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} className="hidden" />
                <button onClick={() => fileInputRef.current.click()} className="w-20 h-20 rounded-full bg-terracotta text-white text-3xl flex items-center justify-center">
                    📷
                </button>
                <p className="text-sm text-charcoal/60">{photoPreview ? 'Photo added ✓' : 'Tap to take a photo'}</p>
                {photoPreview && <img src={photoPreview} alt="preview" className="w-32 h-32 object-cover rounded-lg mt-2" />}
            </div>

            {readyToSubmit && (
                <button onClick={handleSubmit} disabled={submitting} className="bg-maroon text-white px-8 py-4 rounded-lg font-semibold text-lg">
                    {submitting ? 'Samajh rahe hain...' : 'Bhejain'}
                </button>
            )}
        </div>
    )
}