import "dotenv/config";
export const config = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
};
