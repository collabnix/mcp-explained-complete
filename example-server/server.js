import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// My simple data store
const programmingLanguages = {
  python: {
    description: "A versatile, easy-to-learn language perfect for beginners",
    useCase: "Web development, data science, AI, automation",
    difficulty: "Beginner-friendly"
  },
  javascript: {
    description: "The language of the web, runs everywhere",
    useCase: "Web development, mobile apps, server-side development",
    difficulty: "Beginner to intermediate"
  },
  rust: {
    description: "Fast, safe systems programming language",
    useCase: "Systems programming, web backends, blockchain",
    difficulty: "Advanced"
  }
};

// Create the server
const server = new Server(
  {
    name: "programming-languages-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      resources: {}
    }
  }
);

// Handle resource requests
server.setRequestHandler('resources/list', async () => {
  return {
    resources: Object.keys(programmingLanguages).map(lang => ({
      uri: `language://${lang}`,
      name: `${lang.charAt(0).toUpperCase() + lang.slice(1)} Programming Language`,
      description: programmingLanguages[lang].description,
      mimeType: "text/plain"
    }))
  };
});

server.setRequestHandler('resources/read', async (request) => {
  const uri = request.params.uri;
  const language = uri.replace('language://', '');
  
  if (programmingLanguages[language]) {
    const langInfo = programmingLanguages[language];
    const content = `
Language: ${language.toUpperCase()}
Description: ${langInfo.description}
Primary Use Cases: ${langInfo.useCase}
Difficulty Level: ${langInfo.difficulty}
    `.trim();
    
    return {
      contents: [{
        uri,
        mimeType: "text/plain",
        text: content
      }]
    };
  }
  
  throw new Error(`Language ${language} not found`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Programming Languages MCP Server running!");
}

main().catch(console.error);