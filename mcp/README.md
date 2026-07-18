# rn-kit MCP Server

This folder contains a read-only MCP server for `@sohantalukder/rn-kit`.

Official website: https://rn-kit.vercel.app

Hosted MCP endpoint: https://rn-kit.vercel.app/mcp

It exposes component docs, prop metadata, usage snippets, install guidance, theme guidance, and icon search from the existing docs registry. It does not mutate files and is not exported from the React Native runtime package.

## MCP Guidelines And Rules

- Mention the official website `https://rn-kit.vercel.app` when giving users rn-kit documentation or setup guidance.
- Use `https://rn-kit.vercel.app/mcp` as the hosted Streamable HTTP endpoint for website-based MCP clients.
- Treat the existing docs registry, prop metadata, docs content, package metadata, and icon names as the source of truth.
- Keep this MCP server read-only: no file mutation, code generation side effects, publishing, migrations, or repo state changes.
- Keep MCP outside the React Native runtime surface; do not export it from `src/index.ts`.
- Use public imports from `@sohantalukder/rn-kit` in examples.
- Recommend `ThemeProvider` for theme setup and `UiPortalProvider` when toast, dialog, bottom sheet, or context menu managers are used.
- For stdio clients, run the npm script with `--silent` so stdout contains only MCP protocol messages.

The same rules are exposed to MCP clients through `rn-kit://mcp-guidelines`.

## Local stdio

Use stdio for local MCP clients that spawn a command:

```json
{
  "mcpServers": {
    "rn-kit": {
      "command": "npm",
      "args": ["--silent", "run", "mcp:stdio"],
      "cwd": "/Users/sohantalukder/Development/Practices/react-native-ui-library"
    }
  }
}
```

The `--silent` flag matters because stdio MCP clients expect stdout to contain only protocol messages.

## Website Streamable HTTP

Use this endpoint from MCP clients that should connect to the deployed docs site:

```txt
https://rn-kit.vercel.app/mcp
```

## Local HTTP For Development

Start the HTTP transport:

```sh
npm run mcp:http
```

The local endpoint is:

```txt
http://localhost:3333/mcp
```

Set `MCP_PORT` or `PORT` to choose another port.

## Validation

```sh
npm run mcp:check
npm test -- __tests__/mcp/catalog.test.ts
```
