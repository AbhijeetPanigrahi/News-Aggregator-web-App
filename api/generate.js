
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Vercel Serverless Function Handler
// Maps to /api/generate
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        if (!API_KEY) {
            console.error("API Key missing on server");
            return res.status(500).json({ error: "Server misconfiguration: API Key missing" });
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text });

    } catch (error) {
        console.error("Server Error calling Gemini:", error);
        res.status(500).json({
            error: "Failed to generate content",
            details: error.message
        });
    }
};
