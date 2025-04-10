import {extractName} from "./6-filter-metadata"
import {getOptimizedQuery} from "./4-optimize-query"
import { retrieveData } from "./3-retrieve-data";
import { reRankDocument } from "./5-rerank-document";

async function processQuery(query: string){

    //optimize query
    const optimizedQuery = await getOptimizedQuery(query);
    console.log(`opt query ${optimizedQuery}`);

    //filter name 
    const name = await extractName(optimizedQuery);
    console.log(`name: ${name}`);

    //retrive doc
    const docs = await retrieveData(optimizedQuery,{
        //name
    });
    console.log(docs);

    //re rank
    const reRankedDoc = await reRankDocument(optimizedQuery,docs, 3);
    console.log(reRankedDoc);

}

// async function main(){

//     const query = "Which Sea Otters do has great tools ? ";
    
//     await processQuery(query);

//     process.exit(0);
// }
// main();