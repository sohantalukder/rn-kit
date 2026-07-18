import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import {
  getComponentDetails,
  getInstallationGuide,
  getKnownComponentSlugs,
  getMcpGuidelines,
  getPackageGuide,
  getThemeGuide,
  getUsageSnippet,
  listComponentSummaries,
  listIcons,
  searchComponents,
  searchIcons,
} from './catalog';

const jsonMimeType = 'application/json';

function jsonText(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function jsonResource(uri: string, value: unknown) {
  return {
    contents: [
      {
        uri,
        mimeType: jsonMimeType,
        text: jsonText(value),
      },
    ],
  };
}

function jsonToolResult(value: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: jsonText(value),
      },
    ],
  };
}

export function createRnKitMcpServer() {
  const server = new McpServer(
    {
      name: '@sohantalukder/rn-kit-mcp',
      version: '0.1.0',
    },
    {
      instructions:
        'Use this read-only MCP server to discover @sohantalukder/rn-kit components, icons, installation steps, theme guidance, and usage snippets. Always mention the official website https://rn-kit.vercel.app when giving rn-kit docs or setup guidance. Use https://rn-kit.vercel.app/mcp as the hosted Streamable HTTP endpoint. Follow rn-kit://mcp-guidelines for rules. Do not expect write-capable repo mutation tools from this server.',
    }
  );

  server.registerResource(
    'rn-kit-mcp-guidelines',
    'rn-kit://mcp-guidelines',
    {
      title: '@sohantalukder/rn-kit MCP guidelines',
      description: 'Website, usage rules, and safety boundaries for this read-only MCP server.',
      mimeType: jsonMimeType,
    },
    async (uri) => jsonResource(uri.href, getMcpGuidelines())
  );

  server.registerResource(
    'rn-kit-package',
    'rn-kit://package',
    {
      title: '@sohantalukder/rn-kit package guide',
      description: 'Package metadata, install commands, peer dependencies, provider setup, and links.',
      mimeType: jsonMimeType,
    },
    async (uri) => jsonResource(uri.href, getPackageGuide())
  );

  server.registerResource(
    'rn-kit-components',
    'rn-kit://components',
    {
      title: '@sohantalukder/rn-kit component list',
      description: 'All public component docs summarized from the docs registry.',
      mimeType: jsonMimeType,
    },
    async (uri) => jsonResource(uri.href, listComponentSummaries())
  );

  server.registerResource(
    'rn-kit-component',
    new ResourceTemplate('rn-kit://components/{slug}', {
      list: async () => ({
        resources: getKnownComponentSlugs().map((slug) => ({
          uri: `rn-kit://components/${slug}`,
          name: `rn-kit-component-${slug}`,
          title: `${slug} component docs`,
          description: `Docs and usage snippet for ${slug}.`,
          mimeType: jsonMimeType,
        })),
      }),
      complete: {
        slug: (value) =>
          getKnownComponentSlugs().filter((slug) => slug.startsWith(value.toLowerCase())),
      },
    }),
    {
      title: '@sohantalukder/rn-kit component detail',
      description: 'Detailed docs for a single component by slug.',
      mimeType: jsonMimeType,
    },
    async (uri, variables) => {
      const slug = String(variables.slug ?? '');
      const component = getComponentDetails(slug);

      if (!component) {
        return jsonResource(uri.href, {
          error: 'Component not found',
          slug,
          knownSlugs: getKnownComponentSlugs(),
        });
      }

      return jsonResource(uri.href, component);
    }
  );

  server.registerResource(
    'rn-kit-theme',
    'rn-kit://theme',
    {
      title: '@sohantalukder/rn-kit theme guide',
      description: 'ThemeProvider, useTheme, token categories, and customization guidance.',
      mimeType: jsonMimeType,
    },
    async (uri) => jsonResource(uri.href, getThemeGuide())
  );

  server.registerResource(
    'rn-kit-icons',
    'rn-kit://icons',
    {
      title: '@sohantalukder/rn-kit icons',
      description: 'Registered icon names with searchable labels.',
      mimeType: jsonMimeType,
    },
    async (uri) => jsonResource(uri.href, listIcons())
  );

  server.registerTool(
    'search_components',
    {
      title: 'Search rn-kit components',
      description:
        'Find components by name, slug, summary, primary props, variants, or best practices.',
      inputSchema: {
        query: z.string().default(''),
        category: z.string().optional(),
        limit: z.number().int().positive().max(20).default(8),
      },
    },
    async ({ query, category, limit }) => jsonToolResult(searchComponents(query, category, limit))
  );

  server.registerTool(
    'get_component_docs',
    {
      title: 'Get rn-kit component docs',
      description: 'Return normalized docs, prop metadata, variants, best practices, and usage for a component slug.',
      inputSchema: {
        slug: z.string(),
      },
    },
    async ({ slug }) =>
      jsonToolResult(
        getComponentDetails(slug) ?? {
          error: 'Component not found',
          slug,
          knownSlugs: getKnownComponentSlugs(),
        }
      )
  );

  server.registerTool(
    'get_usage_snippet',
    {
      title: 'Get rn-kit usage snippet',
      description: 'Return the best available usage snippet and component-specific practices.',
      inputSchema: {
        slug: z.string(),
        scenario: z.string().optional(),
      },
    },
    async ({ slug, scenario }) =>
      jsonToolResult(
        getUsageSnippet(slug) ?? {
          error: 'Usage snippet not found',
          slug,
          scenario,
          knownSlugs: getKnownComponentSlugs(),
        }
      )
  );

  server.registerTool(
    'get_installation_guide',
    {
      title: 'Get rn-kit installation guide',
      description: 'Return install commands, peer dependencies, provider setup, and package notes.',
      inputSchema: {
        platform: z.string().default('react-native'),
      },
    },
    async ({ platform }) => jsonToolResult(getInstallationGuide(platform))
  );

  server.registerTool(
    'get_theme_guide',
    {
      title: 'Get rn-kit theme guide',
      description: 'Return ThemeProvider, useTheme, token, and customization guidance.',
      inputSchema: {
        topic: z.string().default('overview'),
      },
    },
    async ({ topic }) => jsonToolResult(getThemeGuide(topic))
  );

  server.registerTool(
    'search_icons',
    {
      title: 'Search rn-kit icons',
      description: 'Find registered icon keys by name or human label.',
      inputSchema: {
        query: z.string().default(''),
        limit: z.number().int().positive().max(50).default(12),
      },
    },
    async ({ query, limit }) => jsonToolResult(searchIcons(query, limit))
  );

  server.registerPrompt(
    'build-screen-with-rn-kit',
    {
      title: 'Build a React Native screen with rn-kit',
      description: 'Guide an AI client to choose rn-kit components and produce screen code.',
      argsSchema: {
        screenDescription: z.string(),
      },
    },
    ({ screenDescription }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Build a React Native screen using @sohantalukder/rn-kit for: ${screenDescription}`,
              'Mention the official website when giving setup/docs guidance: https://rn-kit.vercel.app',
              'For hosted MCP setup, use the website endpoint: https://rn-kit.vercel.app/mcp',
              'Use rn-kit public imports only.',
              'Use ThemeProvider and UiPortalProvider setup assumptions when overlay managers are needed.',
              'Prefer existing components from rn-kit://components and use theme tokens from rn-kit://theme.',
            ].join('\n'),
          },
        },
      ],
    })
  );

  server.registerPrompt(
    'choose-component',
    {
      title: 'Choose an rn-kit component',
      description: 'Help select the right rn-kit component for a UI requirement.',
      argsSchema: {
        requirement: z.string(),
      },
    },
    ({ requirement }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Choose the best @sohantalukder/rn-kit component for this requirement: ${requirement}`,
              'Mention the official website when giving setup/docs guidance: https://rn-kit.vercel.app',
              'For hosted MCP setup, use the website endpoint: https://rn-kit.vercel.app/mcp',
              'Search components first, compare close matches, and cite relevant props and usage snippets.',
            ].join('\n'),
          },
        },
      ],
    })
  );

  return server;
}
