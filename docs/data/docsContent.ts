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

export const rootSetupCode = `import {
  ThemeProvider,
  UiPortalProvider,
} from '@sohantalukder/rn-kit';

import { AccountScreen } from './src/screens/AccountScreen';

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <AccountScreen />
      </UiPortalProvider>
    </ThemeProvider>
  );
}`;

export const firstScreenUsageCode = `import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Text,
  TextInput,
  ThemeProvider,
  UiPortalProvider,
  toast,
  useTheme,
} from '@sohantalukder/rn-kit';

function AccountScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { gutters, layout } = useTheme();

  const emailError =
    email.length > 0 && !email.includes('@')
      ? 'Enter a valid email address.'
      : undefined;

  const handleSubmit = () => {
    if (!email || emailError) {
      toast.show({ type: 'error', title: 'Add a valid email first' });
      return;
    }

    setIsSubmitting(true);
    toast.show({ type: 'success', title: 'Profile saved' });
    setTimeout(() => setIsSubmitting(false), 800);
  };

  return (
    <View style={[layout.flex_1, layout.justifyCenter, gutters.padding_24]}>
      <Card variant="outlined" style={gutters.gap_16}>
        <Text variant="heading3" weight="semibold">
          Account setup
        </Text>
        <Text color="secondary">
          Use controlled fields and let rn-kit handle theme-aware states.
        </Text>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          errorMessage={emailError}
          onChangeText={(value) => setEmail(value)}
        />
        <Button
          text="Save profile"
          accessibilityLabel="Save profile"
          disabled={!email || Boolean(emailError)}
          isLoading={isSubmitting}
          onPress={handleSubmit}
        />
      </Card>
    </View>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <AccountScreen />
      </UiPortalProvider>
    </ThemeProvider>
  );
}`;

export const overlayManagersUsageCode = `import { View } from 'react-native';
import {
  Button,
  Text,
  bottomSheet,
  contextMenu,
  dialog,
  toast,
  useTheme,
} from '@sohantalukder/rn-kit';

function FilterSheet({
  selectedStatus,
  onApply,
}: {
  selectedStatus: string;
  onApply: () => void;
}) {
  const { gutters } = useTheme();

  return (
    <View style={[gutters.gap_12, gutters.padding_16]}>
      <Text variant="heading3" weight="semibold">
        Filters
      </Text>
      <Text color="secondary">Current status: {selectedStatus}</Text>
      <Button
        text="Apply filters"
        onPress={() => {
          onApply();
          bottomSheet.close();
        }}
      />
    </View>
  );
}

export function ToolbarActions() {
  const { gutters } = useTheme();

  const saveProfile = () => {
    toast.show({ type: 'success', title: 'Profile saved' });
  };

  const deleteItem = () => {
    dialog.confirm('Delete item?', 'This action cannot be undone.', () => {
      toast.show({ type: 'success', title: 'Item deleted' });
    });
  };

  const openFilters = () => {
    bottomSheet.show({
      component: FilterSheet,
      componentProps: {
        selectedStatus: 'active',
        onApply: () => toast.show({ type: 'success', title: 'Filters applied' }),
      },
      options: {
        snapPoints: ['35%', '70%'],
        initialSnapIndex: 1,
      },
    });
  };

  const openMenu = () => {
    contextMenu.show({
      position: { x: 24, y: 120 },
      title: 'Row actions',
      items: [
        { id: 'save', label: 'Save', icon: 'check', onPress: saveProfile },
        {
          id: 'delete',
          label: 'Delete',
          destructive: true,
          onPress: deleteItem,
        },
      ],
    });
  };

  return (
    <View style={gutters.gap_12}>
      <Button text="Save" onPress={saveProfile} />
      <Button text="Filters" variant="outline" onPress={openFilters} />
      <Button text="More actions" variant="secondary" onPress={openMenu} />
    </View>
  );
}`;

export const themeUsageCode = `import { View } from 'react-native';
import { Text, useTheme } from '@sohantalukder/rn-kit';

export function AccountSummary() {
  const { backgrounds, borders, fonts, gutters, layout, typographies } =
    useTheme();

  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        gutters.gap_12,
        gutters.padding_16,
        backgrounds.background,
        borders.rounded_16,
        borders.w_1,
        borders.gray8,
      ]}
    >
      <Text style={[typographies.heading3, fonts.primary]}>
        Account
      </Text>
      <Text color="secondary">Ready to review</Text>
    </View>
  );
}`;

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
  react-native-gesture-handler \\
  react-native-reanimated \\
  react-native-safe-area-context \\
  react-native-svg`,
        },
      },
      {
        id: 'minimal-app',
        title: 'Root Setup',
        body: [
          'Wrap your app once with ThemeProvider. Add UiPortalProvider inside it when you need overlay managers such as toast, dialog, bottom sheet, or context menu.',
        ],
        code: {
          language: 'tsx',
          value: rootSetupCode,
        },
      },
      {
        id: 'first-screen',
        title: 'Build a First Screen',
        body: [
          'This example includes imports, provider placement, local state, validation, a submit handler, and a toast so the pattern can be copied into a new screen.',
        ],
        code: {
          language: 'tsx',
          value: firstScreenUsageCode,
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
          'Install the core peers in the consuming React Native application. Image and bottom sheet components are implemented internally and do not require FastImage or Gorhom Bottom Sheet.',
        ],
        code: {
          language: 'sh',
          value: `npm install \\
  react-native-gesture-handler \\
  react-native-reanimated \\
  react-native-safe-area-context \\
  react-native-svg`,
        },
        list: [
          'Image, Avatar, and PhotoCarousel use the internal Image component backed by React Native Image.',
          'The global bottom sheet manager uses the internal React Native bottom sheet host mounted by UiPortalProvider.',
          'React Native Image does not include FastImage-style native cache controls.',
          'React Navigation is not required; apps that use it can pass navigationTheme from useTheme to their navigator.',
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
        id: 'root-setup',
        title: 'Root Setup',
        body: [
          'ThemeProvider supplies colors, typography, spacing, borders, and layout helpers. UiPortalProvider mounts the app-level overlay hosts for toast, dialog, bottom sheet, and context menu APIs.',
          'Mount UiPortalProvider once near the application root, inside ThemeProvider, before calling global overlay managers from feature screens.',
        ],
        code: {
          language: 'tsx',
          value: rootSetupCode,
        },
      },
      {
        id: 'first-screen',
        title: 'First Screen',
        body: [
          'Use package components like normal React Native components. Keep form state in the screen, pass controlled values to inputs, and call overlay managers from explicit handlers.',
        ],
        code: {
          language: 'tsx',
          value: firstScreenUsageCode,
        },
      },
      {
        id: 'overlay-managers',
        title: 'Overlay Managers',
        body: [
          'After UiPortalProvider is mounted, feature code can call the exported managers directly. This example defines every handler and bottom sheet component it references.',
        ],
        code: {
          language: 'tsx',
          value: overlayManagersUsageCode,
        },
      },
      {
        id: 'theme-usage',
        title: 'Theme Usage',
        body: [
          'Use useTheme inside components rendered below ThemeProvider. Generated token groups can be composed in React Native style arrays.',
        ],
        code: {
          language: 'tsx',
          value: themeUsageCode,
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
      'Wrap your app once, read theme values with useTheme, and customize colors without guessing which object to use.',
    sections: [
      {
        id: 'theme-basics',
        title: 'Theme Basics',
        body: [
          'A theme is the shared style system for your app. It keeps colors, spacing, typography, borders, and layout helpers in one place so every screen can use the same values.',
          'The flow is simple: wrap the app with ThemeProvider, call useTheme inside a screen, then use the object that matches what you are styling.',
        ],
        list: [
          'colors: plain color values. Use colors.primary when a prop needs a color string.',
          'backgrounds: ready-made backgroundColor styles. Use backgrounds.primary on a View.',
          'gutters: spacing helpers. Use gutters.padding_16, gutters.margin_12, or gutters.gap_8.',
          'layout: flexbox helpers. Use layout.row, layout.itemsCenter, layout.justifyCenter, or layout.flex_1.',
          'fonts: text color and font helpers. Use fonts.primary or fonts.size_16 in Text styles.',
          'borders: border color, radius, and width helpers. Use borders.gray8, borders.rounded_16, or borders.w_1.',
          'typographies: text presets. Use typographies.heading3, typographies.body1, or typographies.body2.',
          'navigationTheme: pass this to React Navigation when navigation should follow the active theme.',
        ],
      },
      {
        id: 'root-setup',
        title: 'Root Setup',
        body: [
          'Wrap the app with ThemeProvider before rendering package components. Add UiPortalProvider inside it when the app uses toast, dialog, bottom sheet, or context menu managers.',
        ],
        code: {
          language: 'tsx',
          value: `import {
  ThemeProvider,
  UiPortalProvider,
} from '@sohantalukder/rn-kit';

import { AccountScreen } from './src/screens/AccountScreen';

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <AccountScreen />
      </UiPortalProvider>
    </ThemeProvider>
  );
}`,
        },
      },
      {
        id: 'read-theme',
        title: 'Use Theme Values',
        body: [
          'Call useTheme inside any component rendered below ThemeProvider. Compose the returned helpers in normal React Native style arrays.',
          'This example uses layout for flex direction, gutters for spacing, backgrounds for the card background, borders for the outline, typographies for the heading size, and fonts for the heading color.',
        ],
        code: {
          language: 'tsx',
          value: `import { View } from 'react-native';
import { Text, useTheme } from '@sohantalukder/rn-kit';

export function ProfileSummary() {
  const { backgrounds, borders, fonts, gutters, layout, typographies } =
    useTheme();

  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        gutters.gap_12,
        gutters.padding_16,
        backgrounds.background,
        borders.rounded_16,
        borders.w_1,
        borders.gray8,
      ]}
    >
      <Text style={[typographies.heading3, fonts.primary]}>
        Account
      </Text>
      <Text color="secondary">Ready to review</Text>
    </View>
  );
}`,
        },
      },
      {
        id: 'theme-object',
        title: 'Theme Objects',
        body: [
          'These are the objects returned by useTheme. Choose the object by what the React Native prop expects.',
        ],
        list: [
          'Need a raw color? Use colors.primary.',
          'Need a background style? Use backgrounds.primary.',
          'Need spacing? Use gutters.padding_16, gutters.margin_16, or gutters.gap_16.',
          'Need flexbox layout? Use layout.row, layout.flex_1, layout.itemsCenter, or layout.justifyCenter.',
          'Need text styling? Use fonts.primary with typographies.heading3.',
          'Need border styling? Use borders.gray8, borders.w_1, and borders.rounded_16.',
          'Need React Navigation styling? Use navigationTheme.',
          'Need to switch mode? Use changeTheme with default, dark, or system.',
        ],
      },
      {
        id: 'theme-modes',
        title: 'Theme Modes',
        body: [
          'rn-kit supports default, dark, and system. default is the light theme. dark forces the dark theme. system follows the device color scheme.',
          'Use changeTheme when a user selects a theme from settings.',
        ],
        code: {
          language: 'tsx',
          value: `import { Button, useTheme } from '@sohantalukder/rn-kit';

export function ThemeActions() {
  const { changeTheme } = useTheme();

  return (
    <>
      <Button text="Use light" onPress={() => changeTheme('default')} />
      <Button text="Use dark" onPress={() => changeTheme('dark')} />
      <Button text="Follow system" onPress={() => changeTheme('system')} />
    </>
  );
}`,
        },
      },
      {
        id: 'persist-theme',
        title: 'Save User Choice',
        body: [
          'ThemeProvider does not force one storage library. Give it a small storageAdapter that reads and writes default, dark, or system in your own app storage.',
          'When no saved value exists, ThemeProvider stores system and follows the operating system color scheme.',
        ],
        code: {
          language: 'tsx',
          value: `<ThemeProvider
  storageAdapter={{
    getTheme: () => localStore.getTheme(),
    setTheme: value => localStore.setTheme(value),
  }}
>
  <App />
</ThemeProvider>`,
        },
      },
      {
        id: 'custom-colors',
        title: 'Customize App Colors',
        body: [
          'Most apps only need to pass brand colors to ThemeProvider. Start with colors. Any token added to colors is also generated as backgrounds.token, fonts.token, and borders.token, so the same token can be used across views, text, and borders.',
          'Add dark overrides inside variants.dark when the dark value should be different. You do not need to repeat every color in dark mode, only the values that should change.',
        ],
        code: {
          language: 'tsx',
          value: `import { ThemeProvider } from '@sohantalukder/rn-kit';
import App from './src/App';

const appTheme = {
  colors: {
    primary: '#2563EB',
    brand: '#2563EB',
    accent: '#7C3AED',
  },
  variants: {
    dark: {
      colors: {
        primary: '#60A5FA',
        brand: '#60A5FA',
        accent: '#C4B5FD',
      },
    },
  },
};

export default function Main() {
  return (
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  );
}`,
        },
      },
      {
        id: 'use-custom-colors',
        title: 'Use Custom Colors',
        body: [
          'Use the same token from the object that matches the prop. In this example, colors.brand is a color string for an icon, backgrounds.brand is a View style, fonts.white is a Text style, and borders.brand is a border style.',
        ],
        code: {
          language: 'tsx',
          value: `import { View } from 'react-native';
import { IconByVariant, Text, useTheme } from '@sohantalukder/rn-kit';

export function BrandBanner() {
  const { backgrounds, borders, colors, fonts, gutters } = useTheme();

  return (
    <View
      style={[
        backgrounds.brand,
        borders.brand,
        borders.w_1,
        borders.rounded_16,
        gutters.padding_16,
      ]}
    >
      <Text style={fonts.white}>Brand announcement</Text>
      <IconByVariant path="check" color={colors.brand} />
    </View>
  );
}`,
        },
      },
      {
        id: 'advanced-overrides',
        title: 'Advanced Color Overrides',
        body: [
          'Use colors when one token should create raw, background, font, and border helpers. Use backgrounds, fonts.colors, or borders.colors when a token should only exist in one style group.',
          'Use navigationColors when React Navigation should match your app theme. Pass the returned navigationTheme from useTheme to your NavigationContainer.',
        ],
        code: {
          language: 'tsx',
          value: `const appTheme = {
  colors: {
    brand: '#2563EB',
  },
  backgrounds: {
    brandSurface: '#EFF6FF',
  },
  fonts: {
    colors: {
      mutedText: '#64748B',
    },
  },
  borders: {
    colors: {
      brandOutline: '#93C5FD',
    },
  },
  navigationColors: {
    primary: '#2563EB',
  },
  variants: {
    dark: {
      colors: {
        brand: '#60A5FA',
      },
      backgrounds: {
        brandSurface: '#172554',
      },
      fonts: {
        colors: {
          mutedText: '#CBD5E1',
        },
      },
      borders: {
        colors: {
          brandOutline: '#2563EB',
        },
      },
      navigationColors: {
        primary: '#60A5FA',
      },
    },
  },
};`,
        },
      },
      {
        id: 'source-theme-config',
        title: 'Change Package Defaults',
        body: [
          'If you are maintaining this package and want to change its built-in defaults, edit src/theme/_config.ts. This is different from app-level customization with ThemeProvider theme.',
          'Add the token to colorsLight and colorsDark, then keep the maps connected through colors, backgrounds, fonts.colors, and borders.colors. Edit the sizes array when you need new gutter or font-size helper keys.',
        ],
        code: {
          language: 'ts',
          value: `const colorsLight = {
  // existing tokens...
  brand: '#2563EB',
} as const;

const colorsDark = {
  // existing tokens...
  brand: '#60A5FA',
} as const;`,
        },
      },
      {
        id: 'troubleshooting',
        title: 'Common Questions',
        list: [
          'My custom color is missing: make sure the component is rendered below the ThemeProvider that receives theme={appTheme}.',
          'I only need a one-off screen color: prefer adding a named token to the theme instead of hardcoding colors in many files.',
          'I need new spacing helpers: app-level theme overrides do not add gutter sizes; package maintainers should edit the sizes array in src/theme/_config.ts.',
          'My navigation colors do not change: pass navigationTheme from useTheme to your React Navigation container.',
        ],
      },
      {
        id: 'guidelines',
        title: 'Guidelines',
        list: [
          'Start with the default theme before adding custom tokens.',
          'Use clear token names like brand, accent, surfaceWarning, or mutedText.',
          'Add dark overrides only for values that need different contrast in dark mode.',
          'Prefer theme tokens over one-off colors in app screens.',
          'Use the docs theme toggle or Storybook toolbar to preview default and dark variants.',
          'Use navigationTheme from useTheme when React Navigation should match the active variant.',
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
    title: 'MCP',
    slug: 'mcp',
    description:
      'Connect AI clients to rn-kit docs, components, icons, setup guidance, and usage snippets through the read-only MCP server.',
    badge: 'AI docs',
    heroPanel: {
      title: 'MCP routes',
      items: [
        { label: 'Local', value: 'stdio for AI clients' },
        { label: 'Remote', value: 'Streamable HTTP' },
        { label: 'Rules', value: 'Read-only docs context' },
      ],
      command: 'npm --silent run mcp:stdio',
    },
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        body: [
          'The rn-kit MCP server lets AI clients read package docs, component metadata, prop guidance, usage snippets, theme guidance, and icon names from this repository.',
          'Official website: https://rn-kit.vercel.app. Hosted MCP endpoint: https://rn-kit.vercel.app/mcp.',
          'The MCP server is a developer/docs companion. It is not part of the React Native runtime package and it is not exported from src/index.ts.',
        ],
        list: [
          'Use stdio for local AI clients such as Codex, Cursor, and Claude Desktop.',
          'Use the website Streamable HTTP endpoint when a hosted endpoint is easier for a team or external client.',
          'Use rn-kit://mcp-guidelines when an MCP client needs the website, rules, and boundaries.',
        ],
      },
      {
        id: 'stdio',
        title: 'Local Stdio',
        body: [
          'Use this route when the MCP client spawns a local command from the repository. The --silent flag is important because stdio MCP clients expect stdout to contain only protocol messages.',
        ],
        code: {
          language: 'json',
          value: `{
  "mcpServers": {
    "rn-kit": {
      "command": "npm",
      "args": ["--silent", "run", "mcp:stdio"],
      "cwd": "/Users/sohantalukder/Development/Practices/react-native-ui-library"
    }
  }
}`,
        },
      },
      {
        id: 'http',
        title: 'Website Streamable HTTP',
        body: [
          'Use the website endpoint when you want MCP clients to connect to your deployed docs site instead of a local process.',
        ],
        code: {
          language: 'sh',
          value: `# Hosted endpoint
https://rn-kit.vercel.app/mcp`,
        },
      },
      {
        id: 'local-http',
        title: 'Local HTTP For Development',
        body: [
          'Use the local HTTP script only when testing the MCP server before deploying the website route.',
        ],
        code: {
          language: 'sh',
          value: `npm run mcp:http

# Local development endpoint
http://localhost:3333/mcp`,
        },
      },
      {
        id: 'resources',
        title: 'Resources',
        list: [
          'rn-kit://mcp-guidelines: website, usage rules, and safety boundaries.',
          'rn-kit://package: package metadata, install commands, peer dependencies, provider setup, and links.',
          'rn-kit://components: full component list with summaries, imports, props, variants, and best practices.',
          'rn-kit://components/{slug}: detailed docs and usage for one component.',
          'rn-kit://theme: ThemeProvider, useTheme, token categories, and customization guidance.',
          'rn-kit://icons: registered icon names and searchable labels.',
        ],
      },
      {
        id: 'tools',
        title: 'Tools',
        list: [
          'search_components(query, category?): find components by name, summary, props, variants, and best practices.',
          'get_component_docs(slug): return normalized docs and prop metadata for a component.',
          'get_usage_snippet(slug, scenario?): return the best usage snippet for a component.',
          'get_installation_guide(platform?): return install commands, peers, and provider setup.',
          'get_theme_guide(topic?): return theme and token guidance.',
          'search_icons(query): find registered icon keys by name or label.',
        ],
      },
      {
        id: 'rules',
        title: 'Guidelines And Rules',
        list: [
          'Mention https://rn-kit.vercel.app when giving rn-kit documentation or setup guidance.',
          'Use https://rn-kit.vercel.app/mcp as the hosted Streamable HTTP endpoint.',
          'Treat the docs registry, prop metadata, docs content, package metadata, and icon names as the source of truth.',
          'Keep this MCP server read-only: no file mutation, code generation side effects, publishing, migrations, or repo state changes.',
          'Keep MCP outside the React Native runtime surface; do not export it from src/index.ts.',
          'Use public imports from @sohantalukder/rn-kit in examples.',
          'Recommend ThemeProvider for theme setup and UiPortalProvider when toast, dialog, bottom sheet, or context menu managers are used.',
        ],
      },
      {
        id: 'validation',
        title: 'Validation',
        body: [
          'Run these checks after changing the MCP server, docs data, or website page.',
        ],
        code: {
          language: 'sh',
          value: `npm run mcp:check
npm test -- __tests__/mcp/catalog.test.ts
npm run docs:build`,
        },
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
          'Added theme provider, UI components, overlay providers, icons, and TypeScript declarations.',
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
          'Use the GitHub issue and pull request templates in .github when reporting or submitting changes.',
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
