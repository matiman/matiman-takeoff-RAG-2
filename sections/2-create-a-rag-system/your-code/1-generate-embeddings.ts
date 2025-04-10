import { openai } from "./0-api-clients";

export async function generateEmbeddings(texts: string[]) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        dimensions: 256,
        input: texts,
    });

    return response.data.map((embedding) => embedding.embedding);
}

// async function main() {
//     const embeddings = await generateEmbeddings([
//         "Hello, world!","This is Matty",
//         ]);
//         console.log(embeddings);
//         process.exit(0);
// }

// main().catch(console.error);