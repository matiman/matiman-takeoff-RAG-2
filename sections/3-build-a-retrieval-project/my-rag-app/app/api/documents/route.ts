import { db } from "@/db";
import { generateEmbeddings } from "@/lib/rag/generate/generate-embeddings";
import { splitText } from "@/lib/rag/processing/split-text";
import { documentsTable } from "@/db/schema/documents-schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const documents = await db.select().from(documentsTable);
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const chunks = await splitText(text);
    const embeddings = await generateEmbeddings(chunks);

    await db.insert(documentsTable).values(
      chunks.map((chunk, i) => ({
        content: chunk,
        embedding: embeddings[i]
      }))
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 });
  }
} 