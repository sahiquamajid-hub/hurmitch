import { useState, useRef } from 'react'

export default function Agent() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isRecording, setIsRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState(null)
    const [audioBlob, setAudioBlob] = useState(null)

    const [photoPreview, setPhotoPreview] = useState(null)
    const [photoFile, setPhotoFile] = useState(null)

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

    const readyToSubmit = audioBlob && photoFile

    const handleSubmit = () => {
        alert('Both photo and voice note are ready. Next step: send these to Gemini for analysis.')
    }

    return (
        <div className="min-h-screen bg-sand flex flex-col items-center px-6 py-12 gap-8">
            <h1 className="font-heading text-3xl text-maroon text-center">Hurmitch Agent</h1>

            <button
                onClick={playGreeting}
                disabled={loading}
                className="bg-terracotta text-white px-6 py-3 rounded-lg font-semibold"
            >
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
                    <button
                        onClick={startRecording}
                        className="w-20 h-20 rounded-full bg-terracotta text-white text-3xl flex items-center justify-center"
                    >
                        🎙️
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className="w-20 h-20 rounded-full bg-red-600 text-white text-3xl flex items-center justify-center animate-pulse"
                    >
                        ⏹️
                    </button>
                )}
                <p className="text-sm text-charcoal/60">
                    {isRecording ? 'Recording...' : audioUrl ? 'Recorded ✓' : 'Tap to record'}
                </p>
                {audioUrl && <audio controls src={audioUrl} className="w-full mt-2" />}
            </div>

            <div className="w-full max-w-sm flex flex-col items-center gap-3 p-6 bg-white/50 rounded-xl border border-maroon/10">
                <p className="font-semibold text-maroon">Tasveer</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoChange}
                    className="hidden"
                />
                <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-20 h-20 rounded-full bg-terracotta text-white text-3xl flex items-center justify-center"
                >
                    📷
                </button>
                <p className="text-sm text-charcoal/60">{photoPreview ? 'Photo added ✓' : 'Tap to take a photo'}</p>
                {photoPreview && (
                    <img src={photoPreview} alt="preview" className="w-32 h-32 object-cover rounded-lg mt-2" />
                )}
            </div>

            {readyToSubmit && (
                <button
                    onClick={handleSubmit}
                    className="bg-maroon text-white px-8 py-4 rounded-lg font-semibold text-lg"
                >
                    Bhejain
                </button>
            )}
        </div>
    )
}