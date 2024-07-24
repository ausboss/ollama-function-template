import { makeDecision } from "./makeDecision.js";

async function runTests() {
  // Boolean decision test with default config
  const booleanResult = await makeDecision({
    type: "boolean",
    prompt: "Is the sky blue? Respond with true or false.",
  });
  console.log("Boolean decision result:", booleanResult);

  // Enum decision test with custom config
  const enumResult = await makeDecision({
    type: "enum",
    prompt: "What is the best fruit for making pie?",
    options: ["apple", "cherry", "blueberry", "peach"],
    ollamaConfig: {
      model: "llama3",
      temperature: 0.5,
      options: {
        num_ctx: 2048,
        top_k: 40,
        top_p: 0.9,
      },
    },
  });
  console.log("Enum decision result:", enumResult);
}

runTests();
