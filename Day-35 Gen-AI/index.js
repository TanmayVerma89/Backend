import 'dotenv/config'
import readline from 'readline/promises';
import { ChatMistralAI } from '@langchain/mistralai';
import { createAgent, HumanMessage} from 'langchain';
import { emailTool, internetSearchTool } from './tools.service.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const model = new ChatMistralAI({
    model: 'mistral-small-latest',
})

const agent = createAgent({
    model,
    tools: [emailTool, internetSearchTool],
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

const messages = [];

while (true) {
    const input = await rl.question("You: ")

    messages.push(new HumanMessage(input))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages[response.messages.length - 1]);

    console.log(`AI: ${response.messages[response.messages.length - 1].text}`)
    // console.log(response)
}

rl.close()