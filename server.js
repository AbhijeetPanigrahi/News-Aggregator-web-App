
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
// Note: We use the Flash model as determined in previous debugging
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// Route: Generate Content
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        if (!API_KEY) {
            console.error("API Key missing on server");
            return res.status(500).json({ error: "Server misconfiguration: API Key missing" });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });

    } catch (error) {
        console.error("Server Error calling Gemini:", error);
        res.status(500).json({
            error: "Failed to generate content",
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
