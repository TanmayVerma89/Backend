import "dotenv/config"

type CONFIG = {
    GEMINI_API_KEY : string,
    MISTRAL_API_KEY : string,
    COHERE_API_KEY : string,
}

export const config : CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
}
