import { db } from "@/db";
import { generateEmbeddings } from "../generate/generate-embeddings";
import { splitText } from "./split-text";
import { documentsTable } from "@/db/schema/documents-schema";

//
export async function processDocument(text: string){
    const chunks = await splitText(text);
    const embeddings = await generateEmbeddings(chunks);

    await db.insert(documentsTable).values(
        chunks.map((chunk, i) => ({
            content: chunk,
            embedding: embeddings[i]
        }))

    );

}