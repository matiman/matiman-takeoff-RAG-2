import { openai } from "./0-api-clients";
import { retrieveData } from "./3-retrieve-data";

// Extracts an entity name from a natural language query using OpenAI function calling
export async function extractName(query: string) {
  // Call OpenAI API with function definition to extract entity name
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: query }],
    tools: [
      {
        type: "function",
        function: {
          name: "filter_by_name",
          description: "Extract the name of an animal or entity from the query. It must be the full name of the animal and plural.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the animal or entity"
              }
            },
            required: ["name"]
          }
        }
      }
    ],
    tool_choice: "auto"
  });

  // Parse and return the extracted name from the function call response
  const toolCall = response.choices[0].message.tool_calls?.[0];
  return toolCall ? JSON.parse(toolCall.function.arguments).name : null;
}

//UNCOMMENT TO TEST, THEN COMMENT AGAIN
// async function main() {
//   const query = "Tell me about elephants";
//   const name = await extractName(query);
//   console.log(name);
//   const documents = await retrieveData(query, { name });
//   console.log(documents);

//   process.exit(0);
// }

// main();
