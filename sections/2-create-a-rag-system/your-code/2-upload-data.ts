import { MOCK_DATA } from "../mock-data";
import { generateEmbeddings } from "./1-generate-embeddings";
import { db } from "./db";
import { factsTable } from "./db/schema/facts-schema";

//Call embeddings from 1-gen embedding 
export async function uploadData(docs: { content: string; name: string }[]) {
    const embeddings = await generateEmbeddings(docs.map((doc) => doc.content));

    await db.insert(factsTable).values(
    embeddings.map((embedding, index) => ({
      embedding,
      name: docs[index].name,
      content: docs[index].content
    }))
  );
}

// async function main (){
//     await uploadData(MOCK_DATA);
//     process.exit(0);
// }
// main();
//save to vector db and return the embeddings with index content and name