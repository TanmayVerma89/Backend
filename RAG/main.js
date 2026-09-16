import 'dotenv/config'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createEmbeddings } from './ai.service.js';
import { Pinecone } from '@pinecone-database/pinecone';

const loader = new PDFLoader('./story.pdf')

const docs = await loader.load()
const fullText = docs
    .map(doc => doc.pageContent)
    .join("\n");

const chapters = fullText.split(/(?=Chapter \d+:)/);

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 10,
    separators: ["\n\n", "\n", ". ", " ", ""]
});

const chapterDocs = chapters.map((chapter) => {
    const match = chapter.match(/^Chapter (\d+):/);

    return {
        text: chapter,
        metadata: {
            chapter: match ? Number(match[1]) : ""
        }
    };
});

const chunks = [];

for (const chapter of chapterDocs) {
    const chapterChunks = await splitter.createDocuments(
        [chapter.text],
        [chapter.metadata]
    );

    chunks.push(...chapterChunks);
}

const embeddings = await createEmbeddings({ chunks }); // created embeddings and stored in array -> embeddings

const pc = new Pinecone({
    apiKey:process.env.PINECONE_API_KEY
})

const index = pc.index('rag-implementation')

const vectors = embeddings.map((embedding, index) => ({
    id: `chunk-${index}`,
    values: embedding,
    metadata: {
        pageContent: chunks[index].pageContent,
        chapter:chunks[index].chapter
    }
}));

console.log(vectors,vectors.length)

const result = await index.upsert({
    records:vectors
});
console.log(result)