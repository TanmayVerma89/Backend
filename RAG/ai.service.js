import 'dotenv/config'
import { MistralAIEmbeddings } from '@langchain/mistralai'

const model = new MistralAIEmbeddings({
    model: 'mistral-embed',
    apiKey: process.env.MISTRAL_API_KEY
})

export async function createEmbeddings({chunks}) {
    const texts = chunks.map(chunk => chunk.pageContent)
    return await model.embedDocuments(texts)
}

