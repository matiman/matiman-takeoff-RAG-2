import { cohere, openai } from "./0-api-clients";
import { retrieveData } from "./3-retrieve-data";

export async function reRankDocument(query: string, documents: {content: string; name: string}[], limit=3 ){

    const rerank = await cohere.v2.rerank({
        documents: documents.map((doc) => ({text: doc.content})),
        query,
        topN: limit,
        model: "rerank-english-v3.0"
    });

    return rerank.results.map((result) => ({
        name: documents[result.index].name,
        content: documents[result.index].content,
        relevanceScore: result.relevanceScore
    }));

}

// async function main(){

//     const retrivedDocs = await retrieveData("Where are the elephants I am looking for ?");
//     console.log(retrivedDocs);

    
//     const rerankedDoc = await reRankDocument("Where are the elephants I am looking for ?",retrivedDocs)
//     console.log(rerankedDoc);

//     process.exit(0);

// }

// main();