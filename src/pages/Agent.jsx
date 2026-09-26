import { useState } from 'react'

export default function Agent() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const playGreeting = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: 'Assalamualaikum behen. Apne kaam ki tasveer bhejein aur ek awaaz paigham record karein.' })
            })

            const data = await res.json()

            if (!res.ok || !data.audio) {
                console.error('TTS error response:', data)
                setError(JSON.stringify(data, null, 2))
                setLoading(false)
                return
            }

            const audio = new Audio(`data:audio/wav;base64,${data.audio}`)
            audio.play()
        } catch (err) {
            console.error('Fetch failed:', err)
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sand gap-6 px-6 text-center">
            <h1 className="font-heading text-3xl text-maroon">Hurmitch Agent — Test</h1>
            <button onClick={playGreeting} disabled={loading} className="bg-terracotta text-white px-8 py-4 rounded-lg font-semibold text-lg">
                {loading ? 'Loading...' : 'Play Greeting'}
            </button>
            {error && (
                <pre className="text-left text-xs bg-red-100 text-red-800 p-4 rounded-lg max-w-xl overflow-auto">
                    {error}
                </pre>
            )}
        </div>
    )
}