import 'dotenv/config'
import { tool } from "@langchain/core/tools";
import { TavilySearch } from "@langchain/tavily";
import { z } from "zod";
import { sendEmail } from './mail.service.js';

const searchOnline = async ({ query, maxResults = 5 }) => {
    // console.log("query : ", query)
    const search = new TavilySearch({
        tavilyApiKey: process.env.TAVILY_API_KEY,
        maxResults,
    });

    return await search.invoke({
        query,
    });
}

export const internetSearchTool = tool(
    searchOnline,
    {
        name: "internet_search",
        description: "Use this tool for getting date latest results,news or for web-searches",
        schema: z.object({
            query: z.string().describe("The search query"),
            maxResults: z.number().optional().default(5)
                .describe("Maximum number of results to return")
        }),
    }
);


export const emailTool = tool(
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
