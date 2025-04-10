import { config } from "dotenv";
import { OpenAI } from "openai";
import { CohereClient } from "cohere-ai";

config({ path: ".env.local" });

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

