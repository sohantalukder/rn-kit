import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { createRnKitMcpServer } from './server';

async function main() {
  const server = createRnKitMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((error) => {
  console.error('Failed to start rn-kit MCP stdio server:', error);
  process.exit(1);
});
