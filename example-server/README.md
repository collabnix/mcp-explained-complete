# MCP Programming Languages Server

A simple MCP server that provides information about programming languages.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Run the server:**
```bash
node server.js
```

3. **Add to Claude config:**
```json
{
  "mcpServers": {
    "programming-languages": {
      "command": "node",
      "args": ["path/to/example-server/server.js"]
    }
  }
}
```

## What it does

This server provides information about three programming languages:
- Python
- JavaScript  
- Rust

Each language includes:
- Description
- Primary use cases
- Difficulty level

## How to extend

To add more languages, simply update the `programmingLanguages` object in `server.js`:

```javascript
const programmingLanguages = {
  // ... existing languages
  go: {
    description: "Fast, simple language for modern development",
    useCase: "Backend services, cloud computing, DevOps tools",
    difficulty: "Intermediate"
  }
};
```

## Built in 5 minutes! ?

This server was created as part of the "How I Built My First MCP Server in 5 Minutes" tutorial.