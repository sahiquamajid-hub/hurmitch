export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { audioBase64, mimeType } = req.body
    const apiKey = process.env.GEMINI_API_KEY
    const model = 'gemini-3.8-flash'

    const prompt = `Yeh ek Pakistani karhai (hand embroidery) artisan ki awazi paigham hai, jisme woh apne kaam ke baare mein bata rahi hai. Is audio ko sun kar neeche di gayi cheezein nikaalain aur SIRF ek valid JSON object return karain, kuch aur likhein na:

{
  "itemName": "cheez ka naam (English mein, e.g. 'Mirror-Work Shawl')",
  "description": "ek chota sa tafseeli jumla is cheez ke baare mein",
  "timeTaken": "kitna waqt laga (jo bataya gaya ho)",
  "price": "sirf number, Rs ya PKR na likhein"
}

Agar koi cheez samajh nahi aati ya bataayi nahi gayi, us field ko null rakhain.`

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: mimeType || 'audio/webm', data: audioBase64 } }
                ]
            }]
        })
    })

    const data = await geminiRes.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) {
        return res.status(500).json({ error: 'No response from Gemini', raw: data })
    }

    try {
        const cleaned = rawText.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(cleaned)
        res.status(200).json({ listing: parsed })
    } catch (err) {
        res.status(500).json({ error: 'Failed to parse Gemini response as JSON', rawText })
    }
}