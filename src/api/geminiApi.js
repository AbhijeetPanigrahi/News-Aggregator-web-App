const SERVER_URL = '/api/generate';

export const generateContent = async (prompt) => {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || errorData.error || 'Server error');
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error calling Proxy Server:", error);
        throw new Error(error.message || "Failed to connect to the AI server.");
    }
};
