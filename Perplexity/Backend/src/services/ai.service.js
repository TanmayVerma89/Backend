import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


console.log(process.env.GEMINI_API_KEY);


const model = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi(req,res)  {
    
    const response = await model.invoke("hey, Tanmay this side")
    console.log(response.content)
}
