import 'dotenv/config'
import { tool } from "langchain";
import { sendEmail } from './mail.service.js';
import * as z from 'zod'
import { webSearch } from './internet.service.js';

export const emailTool = tool(
    sendEmail,
    {
        name: 'emailtool',
        description: "Use this tool for sending emails",
        schema: z.object({
            to: z.string().describe('The reciepent\'s email address'),
            subject: z.string().describe('The subject of the email'),
            html: z.string().describe('The HTML content of the email'),
            text: z.string().describe('The text content of the email')
        })
    }
);

export const webSearchTool = tool(
    webSearch,
    {
        name: "websearchtool",
        description:
            "Search the internet for current, recent, or otherwise externally verifiable information. Use this when answering questions that require up-to-date information.",
        schema: z.object({
            query: z
                .string()
                .describe(
                    "A focused web search query containing the key topic, entity, and relevant time context. Write it as search keywords, not as a question to the user and not as instructions. Example: 'latest React 19 features 2026 official documentation'."
                )
        })
    }
);