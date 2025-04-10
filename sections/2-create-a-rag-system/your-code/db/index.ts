import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { factsTable } from "./schema/facts-schema";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
}

const dbSchema = {
    facts: factsTable
};

function initializeDb(url: string) {
    const client = postgres(url,{prepare: false}); //false is for supbase
    return drizzle(client, {schema: dbSchema});
}

export const db = initializeDb(databaseUrl);


