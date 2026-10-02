const { GoogleGenAI } = require("@google/genai");

async function askHeritageAI(question) {
    try {
        console.log("AI question:", question);
        console.log("API key loaded:", !!process.env.GEMINI_API_KEY);

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing from .env");
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        // Try up to 3 times if Gemini temporarily returns 503
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                console.log(`AI attempt ${attempt}`);

                const response = await ai.models.generateContent({
                    model: "gemini-3.8-flash",
                    contents: `You are an AI Heritage Tourism Assistant.

Answer questions about Indian heritage places in simple and useful language.

User question:
${question}`
                });

                console.log("AI response received");

                return response.text;

            } catch (error) {
                console.error(`AI attempt ${attempt} failed:`, error.message);

                // Retry only for temporary server/capacity errors
                if (
                    error.message.includes("503") ||
                    error.message.includes("UNAVAILABLE")
                ) {
                    if (attempt < 3) {
                        console.log("Temporary Gemini problem. Retrying...");
                        await new Promise(resolve =>
                            setTimeout(resolve, attempt * 3000)
                        );
                    } else {
                        throw error;
                    }
                } else {
                    throw error;
                }
            }
        }

    } catch (error) {
        console.error("GEMINI ERROR:", error);

        throw new Error(
            error.message || "Gemini API request failed"
        );
    }
}

module.exports = {
    askHeritageAI
};