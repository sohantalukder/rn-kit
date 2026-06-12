export type DocSection = {
  id: string;
  title: string;
  body?: string[];
  code?: {
    language: string;
    value: string;
  };
  list?: string[];
};

export type DocHeroPanel = {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
  command?: string;
};

export type DocPage = {
  title: string;
  slug: string;
  description: string;
  badge?: string;
  heroPanel?: DocHeroPanel;
  sections: DocSection[];
};

export const docPages: DocPage[] = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    description:
      'Set up the package, mount the required providers, and ship your first screen with typed React Native UI primitives.',
    badge: 'Start here',
    heroPanel: {
      title: 'Setup path',
      items: [
        { label: 'Install', value: 'Package + native peers' },
        { label: 'Mount', value: 'ThemeProvider + portals' },
        { label: 'Build', value: 'Use exported components' },
      ],
      command: 'npm install @sohantalukder/rn-kit',
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        body: [
          '@sohantalukder/rn-kit packages common React Native UI patterns into a reusable component library with typed props, theme primitives, local icons, and app-level overlay providers.',
          'Start by installing the package, mounting the providers once near the application root, then importing components from the package entry point. Component pages document props, variants, preview states, and practical usage notes.',
        ],
        list: [
          'Use ThemeProvider for color, typography, spacing, border, and layout tokens.',
          'Use UiPortalProvider when the app renders toast, dialog, bottom sheet, or context menu flows.',
          'Use component pages as the copy-ready source for imports, examples, props, variants, and best practices.',
        ],
      },
      {
        id: 'install',
        title: 'Install the Package',
        body: [
          'Install the library in the consuming React Native application. Add native peer dependencies when the app uses navigation, gestures, SVG icons, overlays, or image-heavy components.',
        ],
        code: {
          language: 'sh',
          value: `npm install @sohantalukder/rn-kit

npm install \\
  @react-navigation/native \\
  @react-navigation/stack \\
  react-native-gesture-handler \\
  react-native-reanimated \\
  react-native-safe-area-context \\
  react-native-svg`,
        },
      },
      {
        id: 'minimal-app',
        title: 'Minimal App',
        body: [
          'Wrap your app once with ThemeProvider. Add UiPortalProvider inside it when you need overlay managers such as toast, dialog, bottom sheet, or context menu.',
        ],
        code: {
          language: 'tsx',
          value: `import {
  ThemeProvider,
  UiPortalProvider,
  Button,
  Text,
} from '@sohantalukder/rn-kit';

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <Text variant="heading3" weight="semibold">
          Welcome
        </Text>
        <Button text="Continue" onPress={() => {}} />
      </UiPortalProvider>
    </ThemeProvider>
  );
}`,
        },
      },
      {
        id: 'first-screen',
        title: 'Build a First Screen',
        body: [
          'Import only the components needed for the screen. Keep screen styles focused on layout, and let the package components carry interaction states and theme-aware visuals.',
        ],
        code: {
          language: 'tsx',
          value: `import { Button, Card, Text } from '@sohantalukder/rn-kit';

export function WelcomeScreen() {
  return (
    <Card style={{ gap: 16, padding: 20 }}>
      <Text variant="heading3" weight="semibold">
        Welcome back
      </Text>
      <Text color="secondary">
        Continue from the same design primitives across every screen.
      </Text>
      <Button text="Continue" onPress={() => {}} />
    </Card>
  );
}`,
        },
      },
      {
        id: 'workflow',
        title: 'Recommended Workflow',
        list: [
          'Install the package and peer dependencies in the app that consumes the UI kit.',
          'Mount ThemeProvider once near the app root before rendering package components.',
          'Mount UiPortalProvider when the app uses toast, dialog, bottom sheet, or context menu managers.',
          'Build screens from package exports first, then add local layout styles around them.',
          'Browse component pages for imports, examples, props, variants, and custom docs previews.',
          'Run typecheck and preview the docs after adding or changing component usage.',
        ],
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        body: [
          'After the first screen renders, use the Installation and Theming pages to tighten native setup and token usage. Component pages are the best place to confirm exact prop names and available variants.',
        ],
        list: [
          'Open Installation when native peers or app setup need a closer pass.',
          'Open Theming before introducing custom colors, spacing, or typography choices.',
          'Use the sidebar component list when you need exact imports, previews, props, and best practices.',
        ],
      },
    ],
  },
  {
    title: 'Installation',
    slug: 'installation',
    description:
      'Install the package and native peer dependencies required by the component system.',
    sections: [
      {
        id: 'package',
        title: 'Package',
        code: {
          language: 'sh',
          value: 'npm install @sohantalukder/rn-kit',
        },
      },
      {
        id: 'peers',
        title: 'Peer Dependencies',
        body: [
          'Install the core peers in the consuming React Native application. Feature-specific peers can be installed only when those components are used.',
        ],
        code: {
          language: 'sh',
          value: `npm install \\
  @react-navigation/native \\
  @react-navigation/stack \\
  react-native-gesture-handler \\
  react-native-reanimated \\
  react-native-safe-area-context \\
  react-native-svg`,
        },
        list: [
          '@d11/react-native-fast-image is used by Image, Avatar, and PhotoCarousel.',
          '@gorhom/bottom-sheet is used by the global bottom sheet portal manager.',
          'Follow each native dependency setup guide in the consuming app.',
        ],
      },
    ],
  },
  {
    title: 'Usage',
    slug: 'usage',
    description:
      'Import components, mount providers, and use overlay managers from the public package surface.',
    sections: [
      {
        id: 'imports',
        title: 'Common Imports',
        code: {
          language: 'tsx',
          value: `import { Button, TextInput, Card } from '@sohantalukder/rn-kit';
import { ThemeProvider, useTheme } from '@sohantalukder/rn-kit';
import { toast, dialog, bottomSheet } from '@sohantalukder/rn-kit';`,
        },
      },
      {
        id: 'providers',
        title: 'Providers',
        body: [
          'ThemeProvider supplies colors, typography, spacing, borders, and layout helpers. UiPortalProvider mounts app-level overlay hosts for toast, dialog, bottom sheet, and context menu APIs.',
        ],
        code: {
          language: 'tsx',
          value: `<ThemeProvider>
  <UiPortalProvider>{children}</UiPortalProvider>
</ThemeProvider>`,
        },
      },
      {
        id: 'component-pages',
        title: 'Component Pages',
        body: [
          'Use the component pages while authoring components so examples, props, variants, and usage notes stay close to the implementation.',
        ],
        code: {
          language: 'sh',
          value: 'npm run docs:dev',
        },
      },
    ],
  },
  {
    title: 'Theming',
    slug: 'theming',
    description:
      'Use theme tokens consistently across screens and preview light or dark variants.',
    sections: [
      {
        id: 'provider',
        title: 'Theme Provider',
        body: [
          'ThemeProvider exposes default, dark, and storage-backed modes through the library theme context. Components consume tokens for colors, typography, gutters, borders, and layout helpers.',
        ],
        code: {
          language: 'tsx',
          value: `<ThemeProvider
  storageAdapter={{
    getTheme: () => localStore.getTheme(),
    setTheme: value => localStore.setTheme(value),
  }}
>
  {children}
</ThemeProvider>`,
        },
      },
      {
        id: 'guidelines',
        title: 'Guidelines',
        list: [
          'Keep screen-level overrides small so components remain consistent.',
          'Use the docs theme toggle to preview light and dark variants.',
          'Prefer theme tokens over one-off colors in app screens.',
        ],
      },
    ],
  },
  {
    title: 'Guides',
    slug: 'guides',
    description:
      'Operational guidance for documenting, previewing, and shipping new UI components.',
    sections: [
      {
        id: 'component-lifecycle',
        title: 'Component Lifecycle',
        list: [
          'Design the public API and states before publishing the export.',
          'Add focused docs examples for default, variants, edge states, and accessibility-sensitive states.',
          'Add or update the component registry entry so the docs navigation and component page are generated.',
          'Run typecheck, tests, and docs build before release.',
        ],
      },
      {
        id: 'preview-quality',
        title: 'Preview Quality',
        body: [
          'Stories should show realistic spacing, labels, state transitions, and usage notes. Keep examples small enough to scan, but complete enough that a consumer can copy the pattern into an app.',
        ],
      },
    ],
  },
  {
    title: 'Customization',
    slug: 'customization',
    description:
      'Customize the docs brand, package metadata, theme tokens, and component examples without changing exports.',
    sections: [
      {
        id: 'branding',
        title: 'Docs Branding',
        body: [
          'The docs UI reads package name, version, summary, and component metadata from the docs data layer. Update that metadata to rebrand the site for future packages.',
        ],
      },
      {
        id: 'components',
        title: 'Component Metadata',
        list: [
          'Use docs/data/componentRegistry.ts for component names, slugs, summaries, imports, props, variants, and best-practice notes.',
          'Use component pages for custom previews and usage examples.',
          'Keep package exports in src untouched unless the component itself is changing.',
        ],
      },
    ],
  },
  {
    title: 'Migration Guide',
    slug: 'migration-guide',
    description:
      'Plan version upgrades and communicate breaking changes clearly for app teams.',
    sections: [
      {
        id: 'from-local-components',
        title: 'From Local Components',
        list: [
          'Replace copied component imports with imports from @sohantalukder/rn-kit.',
          'Mount ThemeProvider and UiPortalProvider at the app root before migrating overlay APIs.',
          'Migrate one screen family at a time and verify native peer setup on Android and iOS.',
        ],
      },
      {
        id: 'breaking-changes',
        title: 'Breaking Changes',
        body: [
          'Document renamed props, removed components, peer dependency changes, and migration snippets in this page before publishing a major release.',
        ],
      },
    ],
  },
  {
    title: 'Changelog',
    slug: 'changelog',
    description:
      'Track releases, notable changes, and migration notes for package consumers.',
    sections: [
      {
        id: 'v011',
        title: '0.1.1',
        list: [
          'Added CI enforcement for package version bumps before merging to main.',
          'Added automatic GitHub release note generation after production deploy and npm publish.',
        ],
      },
      {
        id: 'v010',
        title: '0.1.0',
        list: [
          'Initial standalone React Native UI library package.',
          'Added theme provider, UI components, overlay providers, utilities, icons, and TypeScript declarations.',
          'Added Bob build output for CommonJS, ES modules, and declaration files.',
        ],
      },
    ],
  },
  {
    title: 'Contributing',
    slug: 'contributing',
    description:
      'Contribute components, stories, docs metadata, and release-ready changes with confidence.',
    sections: [
      {
        id: 'checklist',
        title: 'Contribution Checklist',
        list: [
          'Add or update the component export in src/components before documenting it.',
          'Add or update the custom component page preview when the public behavior changes.',
          'Add the component metadata to docs/data/componentRegistry.ts.',
          'Run typecheck, tests, and docs build before opening a PR.',
        ],
      },
      {
        id: 'quality-gates',
        title: 'Quality Gates',
        code: {
          language: 'sh',
          value: `npm run typecheck
npm test -- --runInBand
npm run docs:build`,
        },
      },
    ],
  },
  {
    title: 'FAQ',
    slug: 'faq',
    description:
      'Answers to common setup, preview, theming, and publishing questions.',
    sections: [
      {
        id: 'native-peers',
        title: 'Do I need every peer dependency?',
        body: [
          'Install core peers for the package foundation. Optional peers are only required when you use the related image or bottom-sheet features.',
        ],
      },
      {
        id: 'custom-docs',
        title: 'Why custom docs?',
        body: [
          'The Next.js docs keep concepts, API structure, examples, and previews in one branded experience that is easier to share with app teams.',
        ],
      },
      {
        id: 'exports',
        title: 'Does the docs site change package exports?',
        body: [
          'No. The docs app imports from the package surface and uses docs-only metadata. Public exports remain owned by src and the Bob build configuration.',
        ],
      },
    ],
  },
];

export const findDocPage = (slug: string) =>
  docPages.find((page) => page.slug === slug);
