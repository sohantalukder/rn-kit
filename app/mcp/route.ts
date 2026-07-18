import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';

import { createRnKitMcpServer } from '../../mcp/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handleMcpRequest(request: Request) {
  const server = createRnKitMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  try {
    await server.connect(transport);
    return await transport.handleRequest(request);
  } catch (error) {
    console.error('Error handling rn-kit website MCP request:', error);

    return Response.json(
      {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      },
      { status: 500 }
    );
  } finally {
    await transport.close();
    await server.close();
  }
}

export const POST = handleMcpRequest;
export const GET = handleMcpRequest;
export const DELETE = handleMcpRequest;
