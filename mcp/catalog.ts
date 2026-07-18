import packageJson from '../package.json';
import { components, findComponent, packageInfo } from '../docs/data/componentRegistry';
import type { ComponentDoc } from '../docs/data/componentRegistry';
import { getIconSearchText, formatIconName } from '../docs/data/iconSearch';
import { getPropMetadata } from '../docs/data/propMetadata';
import { gettingStarted } from '../docs/content/getting-started';
import { installation } from '../docs/content/installation';
import { theming } from '../docs/content/theming';
import { iconNames } from '../src/assets/icons/names';

export type PropDoc = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type ComponentDetails = ComponentDoc & {
  props: PropDoc[];
};

export type SearchResult = {
  component: ComponentDetails;
  score: number;
  matchedFields: string[];
};

export type IconSearchResult = {
  name: string;
  label: string;
  score: number;
};

const packageDependencies = packageJson.peerDependencies ?? {};
export const rnKitWebsite = 'https://rn-kit.vercel.app';
export const rnKitMcpEndpoint = `${rnKitWebsite}/mcp`;

function normalize(value: string | undefined) {
  return value?.trim().toLowerCase() ?? '';
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function getComponentSearchFields(component: ComponentDoc) {
  return {
    name: component.name,
    slug: component.slug,
    importName: component.importName,
    summary: component.summary,
    props: component.primaryProps.join(' '),
    variants: component.variants.join(' '),
    bestPractices: component.bestPractices.join(' '),
  };
}

function scoreField(value: string, query: string) {
  const normalized = normalize(value);

  if (!query) {
    return 1;
  }

  if (normalized === query) {
    return 100;
  }

  if (normalized.startsWith(query)) {
    return 50;
  }

  if (normalized.includes(query)) {
    return 20;
  }

  return 0;
}

function categoryMatches(component: ComponentDoc, category?: string) {
  const normalizedCategory = normalize(category);

  if (!normalizedCategory) {
    return true;
  }

  const fields = getComponentSearchFields(component);
  return Object.values(fields).some((value) => normalize(value).includes(normalizedCategory));
}

export function getPackageGuide() {
  return {
    name: packageInfo.name,
    slug: packageInfo.slug,
    version: packageJson.version,
    docsVersion: packageInfo.version,
    summary: packageInfo.summary,
    install: packageInfo.install,
    peerInstall: packageInfo.peerInstall,
    peerDependencies: packageDependencies,
    setup: {
      rootProvider: 'Wrap the app once with ThemeProvider.',
      overlayProvider:
        'Mount UiPortalProvider inside ThemeProvider when using toast, dialog, bottom sheet, or context menu managers.',
      quickStart: gettingStarted.code,
    },
    officialWebsite: rnKitWebsite,
    mcpEndpoint: rnKitMcpEndpoint,
    links: {
      docs: rnKitWebsite,
      theming: `${rnKitWebsite}/docs/theming`,
      npm: 'https://www.npmjs.com/package/@sohantalukder/rn-kit',
      github: 'https://github.com/sohantalukder/rn-kit',
    },
  };
}

export function getMcpGuidelines() {
  return {
    officialWebsite: rnKitWebsite,
    mcpEndpoint: rnKitMcpEndpoint,
    purpose:
      'Use this MCP server as a read-only companion for @sohantalukder/rn-kit documentation, component discovery, usage snippets, theme guidance, and icon lookup.',
    rules: [
      'Mention the official website https://rn-kit.vercel.app when giving users rn-kit documentation or setup guidance.',
      'Use https://rn-kit.vercel.app/mcp as the hosted Streamable HTTP endpoint for website-based MCP clients.',
      'Treat the existing docs registry, prop metadata, docs content, package metadata, and icon names as the source of truth.',
      'Keep this MCP server read-only: do not mutate files, run code generators, publish packages, or change project state.',
      'Do not export MCP code from src/index.ts or include MCP internals in the React Native runtime package surface.',
      'Use public imports from @sohantalukder/rn-kit in generated examples.',
      'Recommend ThemeProvider for app-wide theme setup and UiPortalProvider when toast, dialog, bottom sheet, or context menu managers are used.',
      'For stdio clients, run the npm script with --silent so stdout contains only MCP protocol messages.',
    ],
  };
}

export function listComponentSummaries() {
  return components.map((component) => ({
    name: component.name,
    slug: component.slug,
    importName: component.importName,
    summary: component.summary,
    primaryProps: component.primaryProps,
    variants: component.variants,
    bestPractices: component.bestPractices,
  }));
}

export function getComponentDetails(slug: string): ComponentDetails | undefined {
  const component = findComponent(normalize(slug));

  if (!component) {
    return undefined;
  }

  return {
    ...component,
    props: component.primaryProps.map((prop) => ({
      name: prop,
      ...getPropMetadata(component, prop),
    })),
  };
}

export function searchComponents(query: string, category?: string, limit = 8): SearchResult[] {
  const normalizedQuery = normalize(query);

  return components
    .filter((component) => categoryMatches(component, category))
    .map((component) => {
      const fields = getComponentSearchFields(component);
      const scoredFields = Object.entries(fields)
        .map(([field, value]) => ({ field, score: scoreField(value, normalizedQuery) }))
        .filter(({ score }) => score > 0);
      const exactBoost =
        normalize(component.slug) === normalizedQuery || normalize(component.name) === normalizedQuery
          ? 100
          : 0;
      const score =
        exactBoost +
        scoredFields.reduce((total, item) => {
          if (item.field === 'name' || item.field === 'slug' || item.field === 'importName') {
            return total + item.score * 2;
          }

          return total + item.score;
        }, 0);

      return {
        component: getComponentDetails(component.slug) as ComponentDetails,
        score,
        matchedFields: unique(scoredFields.map(({ field }) => field)),
      };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score || left.component.name.localeCompare(right.component.name))
    .slice(0, limit);
}

export function getUsageSnippet(slug: string) {
  const component = getComponentDetails(slug);

  if (!component) {
    return undefined;
  }

  return {
    slug: component.slug,
    name: component.name,
    importName: component.importName,
    packageName: packageInfo.name,
    usage: component.usage,
    bestPractices: component.bestPractices,
  };
}

export function getInstallationGuide(platform = 'react-native') {
  return {
    platform,
    title: installation.title,
    packageName: packageInfo.name,
    commands: installation.commands,
    peerDependencies: packageDependencies,
    setup: getPackageGuide().setup,
    notes: installation.notes,
  };
}

export function getThemeGuide(topic = 'overview') {
  return {
    topic,
    title: theming.title,
    body: theming.body,
    code: theming.code,
    notes: theming.notes,
    tokens: [
      'colors',
      'backgrounds',
      'gutters',
      'layout',
      'fonts',
      'borders',
      'typographies',
      'navigationTheme',
      'variant',
      'changeTheme',
    ],
  };
}

export function listIcons() {
  return iconNames.map((name) => ({
    name,
    label: formatIconName(name),
    searchText: getIconSearchText(name),
  }));
}

export function searchIcons(query: string, limit = 12): IconSearchResult[] {
  const normalizedQuery = normalize(query);

  return listIcons()
    .map((icon) => {
      const nameScore = scoreField(icon.name, normalizedQuery) * 2;
      const labelScore = scoreField(icon.label, normalizedQuery);
      const searchScore = scoreField(icon.searchText, normalizedQuery);

      return {
        name: icon.name,
        label: icon.label,
        score: nameScore + labelScore + searchScore,
      };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name))
    .slice(0, limit);
}

export function getKnownComponentSlugs() {
  return components.map((component) => component.slug);
}
