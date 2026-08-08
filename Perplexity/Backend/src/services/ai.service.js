import dotenv from 'dotenv'
dotenv.config()
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, createAgent, HumanMessage, SystemMessage } from 'langchain'
import { emailTool } from './tools.service.js';
import { ChatMistralAI } from '@langchain/mistralai'

const mistralModel = new ChatMistralAI({
    model: 'mistral-small-latest',
    apiKey: process.env.MISTRAL_API_KEY
})

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
    apiKey: process.env.GEMINI_API_KEY
});

const agent = createAgent({
    model: geminiModel,
    tools: [emailTool],
    systemPrompt: `
You are an AI assistant.

Whenever the user asks about

- current date
- current time
- latest news
- weather
- stock price
- today's events
- anything that changes over time

ALWAYS call the internet_search tool first.

Never answer these from memory.
`
})

export async function generateResponse(messages) {

    const response = await agent.invoke({
        messages: messages.map((msg) => {
            if (msg.role === 'user') {
                return new HumanMessage(msg.content)
            } else if (msg.role === 'AI') {
                return new AIMessage(msg.content)
            }
        })
    })

    return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`
        You are an AI assistant whose only task is to generate a short, descriptive chat conversation title based on the user's first message.

        Instructions:
          - Generate a title that accurately represents the main topic or intent of the user's message.
          - The title must be between 3 and 5 words.
          - Do not use quotation marks.
          - Do not add punctuation unless absolutely necessary.
          - Keep the title concise, natural, and easy to understand.
          - Preserve important keywords from the user's message when appropriate.
          - If the message contains a question, generate a title describing the topic rather than repeating the question.
          - If the message contains multiple topics, choose the primary one.
          - Respond with only the title and nothing else.
      `),

        new HumanMessage(`generate a title for a chat conversation based on the following first message: "${message}"`)
    ])

    return response.text;
}