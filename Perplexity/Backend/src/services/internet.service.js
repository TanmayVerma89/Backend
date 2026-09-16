import 'dotenv/config'
import { tavily } from '@tavily/core'

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function webSearch({ query }) {
    const start = Date.now();

    console.log("Tavily search started");


    const results = await tvly.search(query, {
        // exactMatch: true,
        maxResults: 3,
    })
    console.log(
        "Tavily finished:",
        Date.now() - start,
        "ms"
    );
    return results.results.map(result => ({
        title: result.title,
        url: result.url,
        content: result.content,
    }));
}