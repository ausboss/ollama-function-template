import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { OllamaFunctions } from "langchain/experimental/chat_models/ollama_functions";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

const defaultOllamaConfig = {
  model: "llama3.1",
  temperature: 0.2,
  options: {},
};

async function makeDecision({ type, prompt, options = [], ollamaConfig = {} }) {
  const schemaDefinition =
    type === "boolean"
      ? { decision: z.boolean().describe("The decision made by the bot") }
      : {
          decision: z.enum(options).describe("The selection chosen by the bot"),
        };

  const schema = z.object(schemaDefinition);

  const templateString =
    type === "boolean"
      ? prompt
      : `${prompt}\n\nChoose from the following options: ${options.join(
          ", "
        )}.`;

  const functionName =
    type === "boolean" ? "boolean_decision" : "enum_decision";
  const functionDescription =
    type === "boolean"
      ? "Makes a boolean decision based on the given prompt."
      : "Selects an item from the given list based on the prompt.";

  const mergedConfig = { ...defaultOllamaConfig, ...ollamaConfig };
  const model = new OllamaFunctions(mergedConfig).bind({
    functions: [
      {
        name: functionName,
        description: functionDescription,
        parameters: {
          type: "object",
          properties: zodToJsonSchema(schema).properties,
        },
      },
    ],
    function_call: {
      name: functionName,
    },
  });

  const chain = PromptTemplate.fromTemplate(templateString)
    .pipe(model)
    .pipe(new JsonOutputFunctionsParser(schema));

  const response = await chain.invoke({ input: "" });
  return response.decision;
}

export { makeDecision };
