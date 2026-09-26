export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { text, voiceName } = req.body
    const apiKey = process.env.GEMINI_API_KEY
    const model = 'gemini-3.8-flash-tts'

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
            generationConfig: {
                responseModalities: ['AUDIO'],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' } } }
            }
        })
    })

    const data = await geminiRes.json()
    const base64Pcm = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data

    if (!base64Pcm) {
        return res.status(500).json({ error: 'No audio returned', raw: data })
    }

    let pcmBuffer = Buffer.from(base64Pcm, 'base64')

    // Trim ~150ms off the very end to remove the trailing artifact/glitch
    // 24000 Hz * 16-bit (2 bytes) * mono = 48000 bytes per second
    const trimBytes = Math.floor(0.15 * 48000)
    if (pcmBuffer.length > trimBytes) {
        pcmBuffer = pcmBuffer.subarray(0, pcmBuffer.length - trimBytes)
    }

    // Ensure even byte length (16-bit samples must align to 2-byte boundaries)
    if (pcmBuffer.length % 2 !== 0) {
        pcmBuffer = pcmBuffer.subarray(0, pcmBuffer.length - 1)
    }

    const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16)
    res.status(200).json({ audio: wavBuffer.toString('base64') })
}

function pcmToWav(pcmData, sampleRate, numChannels, bitsPerSample) {
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8)
    const blockAlign = numChannels * (bitsPerSample / 8)
    const header = Buffer.alloc(44)
    header.write('RIFF', 0)
    header.writeUInt32LE(36 + pcmData.length, 4)
    header.write('WAVE', 8)
    header.write('fmt ', 12)
    header.writeUInt32LE(16, 16)
    header.writeUInt16LE(1, 20)
    header.writeUInt16LE(numChannels, 22)
    header.writeUInt32LE(sampleRate, 24)
    header.writeUInt32LE(byteRate, 28)
    header.writeUInt16LE(blockAlign, 32)
    header.writeUInt16LE(bitsPerSample, 34)
    header.write('data', 36)
    header.writeUInt32LE(pcmData.length, 40)
    return Buffer.concat([header, pcmData])
}