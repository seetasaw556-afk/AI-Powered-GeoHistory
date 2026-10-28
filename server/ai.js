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

        // Retry temporary Gemini errors
        const maxAttempts = 5;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                console.log(`AI attempt ${attempt}/${maxAttempts}`);

                const response = await ai.models.generateContent({
                    model: "gemini-3.8-flash",
                    contents: `You are an AI Heritage Tourism Assistant.

Answer questions about Indian heritage places in simple and useful language.

User question:
${question}`
                });

                console.log("AI response received successfully");

                return response.text;

            } catch (error) {
                const errorMessage = error?.message || String(error);

                console.error(
                    `AI attempt ${attempt} failed:`,
                    errorMessage
                );

                // Temporary errors that can be retried
                const isTemporaryError =
                    errorMessage.includes("503") ||
                    errorMessage.includes("UNAVAILABLE") ||
                    errorMessage.includes("429") ||
                    errorMessage.includes("RESOURCE_EXHAUSTED") ||
                    errorMessage.includes("500") ||
                    errorMessage.includes("INTERNAL");

                if (!isTemporaryError) {
                    throw error;
                }

                // If this was the final attempt, stop retrying
                if (attempt === maxAttempts) {
                    throw new Error(
                        "Gemini AI is temporarily unavailable. Please try again after a short while."
                    );
                }

                // Exponential backoff: 2s, 4s, 8s
                const delay = 2000 * Math.pow(2, attempt - 1);

                console.log(
                    `Temporary Gemini error. Retrying in ${delay / 1000} seconds...`
                );

                await new Promise(resolve =>
                    setTimeout(resolve, delay)
                );
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