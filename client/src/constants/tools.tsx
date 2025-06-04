interface Tool {
  name: string;
  description: string;
  path: string;
  icon: string;
}

const TOOLS: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format JSON",
    path: "/json-formatter",
    icon: "code",
  },
  {
    name: "Character Count",
    description: "Count the number of characters in a string",
    path: "/character-count",
    icon: "letter",
  },
];

export default TOOLS;
