import { cosineDistance, and, gt, sql, desc } from "drizzle-orm";
import { generateEmbeddings } from "./1-generate-embeddings";
import { factsTable } from "./db/schema/facts-schema";
import { db } from "./db";

export async function retrieveData(input: string, 
    options: {limit?: number, minSimilarity?: number, name?: string | null } = {}) {
        const {limit =10, minSimilarity = 0.3 , name = null} = options

        const embeddings = await generateEmbeddings([input]);

        const similarity = sql<number>`1 - (${cosineDistance (factsTable.embedding, embeddings[0])})`

        const documents = await db
            .select({
                name: factsTable.name,
                content: factsTable.content,
                similarity
            })
            .from(factsTable)
            .where(name ? and (gt(similarity,minSimilarity), sql`LOWER(${factsTable.name}) = LOWER(${name})`) : gt(similarity, minSimilarity))
            .orderBy(desc(similarity))
            .limit(limit);

        return documents;
}

// async function main(){
//      const docs = await retrieveData(" Are there any Owls in our db ? ");
//      console.log(docs)
//      process.exit(0);
// }

// main();

