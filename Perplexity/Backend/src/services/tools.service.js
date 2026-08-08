import 'dotenv/config'
import { tool } from "langchain";
import { sendEmail } from './mail.service.js';
import * as z from 'zod'

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
