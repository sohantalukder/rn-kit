import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { createRnKitMcpServer } from './server';

const port = Number(process.env.PORT ?? process.env.MCP_PORT ?? 3333);
const endpoint = '/mcp';
const app = createMcpExpressApp();

type McpRequest = IncomingMessage & {
  body?: unknown;
};

type McpResponse = ServerResponse & {
  headersSent?: boolean;
  status(code: number): McpResponse;
  json(body: unknown): McpResponse;
  send(body: unknown): McpResponse;
  set(field: string, value: string): McpResponse;
};

app.post(endpoint, async (req: McpRequest, res: McpResponse) => {
  const server = createRnKitMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling rn-kit MCP request:', error);

    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  } finally {
    await transport.close();
    await server.close();
  }
});

app.get(endpoint, (_req: McpRequest, res: McpResponse) => {
  res.status(405).set('Allow', 'POST').send('Method Not Allowed');
});

app.delete(endpoint, (_req: McpRequest, res: McpResponse) => {
  res.status(405).set('Allow', 'POST').send('Method Not Allowed');
});

app.listen(port, (error?: Error) => {
  if (error) {
    console.error('Failed to start rn-kit MCP HTTP server:', error);
    process.exit(1);
  }

  console.log(`rn-kit MCP Streamable HTTP server listening at http://localhost:${port}${endpoint}`);
});
