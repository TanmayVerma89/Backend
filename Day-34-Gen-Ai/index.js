import 'dotenv/config'
import readline from 'readline/promises';
import { ChatMistralAI } from '@langchain/mistralai';
import { createAgent, HumanMessage, tool } from 'langchain';
import { sendEmail } from './mail.service.js';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: 'Use this tool to send an email',
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            subject: z.string().describe("The subject of the email"),
            html: z.string().describe("The HTML content of the email")
        })
    }
)


const model = new ChatMistralAI({
    model: 'mistral-small-latest',
})

const agent = createAgent({
    model,
    tools: [emailTool]
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
}

rl.close()