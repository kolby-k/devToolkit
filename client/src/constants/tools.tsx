export interface Tool {
  name: string;
  description: string;
  path: string;
  icon: string;
}

const TOOLS: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Pretty-print and validate JSON input",
    path: "/json-formatter",
    icon: "json-formatter",
  },
  {
    name: "Character Counter",
    description: "Count characters, words, and lines in text",
    path: "/character-count",
    icon: "character-count",
  },
  {
    name: "Text Comparator",
    description:
      "Highlight differences between two pieces of text side by side",
    path: "/text-comparator",
    icon: "text-compare",
  },
  {
    name: "JSON Generator",
    description: "Generate mock JSON data from templates or schemas",
    path: "/json-generator",
    icon: "json-generator",
  },
  {
    name: "JSON Snippets",
    description: "Store and manage reusable JSON snippets",
    path: "/json-snippets",
    icon: "json-snippets",
  },
  {
    name: "JWT Decoder",
    description: "Decode and inspect a JSON Web Token",
    path: "/jwt-decode",
    icon: "jwt-decode",
  },
  {
    name: "JWS Decoder",
    description: "Decode and inspect a JSON Web Signature",
    path: "/jws-decode",
    icon: "jws-decode",
  },
];

export default TOOLS;
