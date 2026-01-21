
const https = require('https');
const fs = require('fs');

const API_KEY = "AIzaSyBEh6WwtkInqsBfIkCyp_LPaN0MMfuEEJ4";

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                const models = json.models.map(m => ({
                    name: m.name,
                    methods: m.supportedGenerationMethods
                }));
                fs.writeFileSync('available_models.json', JSON.stringify(models, null, 2));
                console.log("Written to available_models.json");
            } else {
                console.log("No models found: ", json);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
