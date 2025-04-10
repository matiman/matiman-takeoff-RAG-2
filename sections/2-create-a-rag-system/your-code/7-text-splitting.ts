import { integer } from "drizzle-orm/pg-core";
import { ELEPHANT_WIKI } from "../mock-data";

//Accept a document with a name
export async function splitText(data: {content: string, name: string} []) {
    //Split that doc in to 500 words
    const CHUNK_SIZE = 500;

    const chunks: {content: string; name: string} [] = [];
    
    for (const {content, name} of data){
        //split words
        const words = content.split(/\s+/);
        for(let i =0; i < words.length; i+=CHUNK_SIZE){
            const chunkWords = words.slice(i, i + CHUNK_SIZE);
            chunks.push({
                content: chunkWords.join(" "),
                name
            });
        }
    }

    return chunks;
}

async function main (){

    const chunks = await splitText([{content: ELEPHANT_WIKI, name: "elephant"}]);

    console.log(chunks);
    console.log(chunks.length);

    process.exit(0);

}

main();
//push it in to a chunk
//display the chunk