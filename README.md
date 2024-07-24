# Flexible LLM Decision Maker

This project provides a flexible function `makeDecision` that uses Ollama to make boolean decisions or choose from a list of options based on a given prompt. It's designed to be easily integrated into other projects and customizable for various use cases.

## Prerequisites

1. Install Ollama from https://ollama.com/download
2. Pull a language model. For example, to use llama3:
   ```
   ollama run llama3
   ```

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/flexible-llm-decision-maker.git
   ```
2. Install dependencies:
   ```
   cd flexible-llm-decision-maker
   npm install
   ```

## Usage

The main function `makeDecision` is exported from `makeDecision.js`. You can import and use it in your projects as follows:

```javascript
import { makeDecision } from "./makeDecision.js";

// For a boolean decision
makeDecision({
  type: "boolean",
  prompt: "Is the sky blue? Respond with true or false.",
})
  .then((result) => console.log("Is the sky blue?", result))
  .catch((error) => console.error(error));

// For an enum decision
makeDecision({
  type: "enum",
  prompt: "What is the best fruit for making pie?",
  options: ["apple", "cherry", "blueberry", "peach"],
})
  .then((result) => console.log("Best pie fruit:", result))
  .catch((error) => console.error(error));
```

### Function Parameters

The `makeDecision` function accepts an object with the following properties:

- `type` (required): Either 'boolean' or 'enum'.
- `prompt` (required): The question or instruction for the LLM.
- `options` (required for 'enum' type): An array of possible choices.
- `ollamaConfig` (optional): Configuration options for OllamaFunctions.

### Customizing Ollama Configuration

You can customize the Ollama configuration by passing an `ollamaConfig` object:

```javascript
makeDecision({
  type: "enum",
  prompt: "What is the best fruit for making pie?",
  options: ["apple", "cherry", "blueberry", "peach"],
  ollamaConfig: {
    model: "llama2",
    temperature: 0.5,
    options: {
      num_ctx: 2048,
      top_k: 40,
      top_p: 0.9,
    },
  },
});
```

## Running Tests

To run the test examples, execute:

```
node index.js
```

This will run both a boolean decision test and an enum decision test with custom configuration.

## License

This project is open-source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## Acknowledgements

This project uses the following libraries:

- LangChain
- Zod
- Ollama

Special thanks to the creators and maintainers of these projects.
