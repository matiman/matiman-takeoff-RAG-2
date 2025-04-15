"use server";

import { getOptimizedQuery } from "./optmize-query";
import { rankDocuments } from "./rerank-documents";
import { retrieveData } from "./retrive-documents";

export async function runRagPipeline(query: string){
    const optimizedQuery = await getOptimizedQuery(query);
    console.log(`Optimized Query: ${query}`);

    const retrivedDocs = await retrieveData(optimizedQuery, {
        limit: 25,
        minSimilarity: 0.2
    });
    console.log(`Retried Docs with .2 similarity: ${retrivedDocs}`);

    const reRankedResults = await rankDocuments(optimizedQuery,retrivedDocs,5);
    console.log(`Reranked Docs: ${reRankedResults}`);

    return reRankedResults;
}