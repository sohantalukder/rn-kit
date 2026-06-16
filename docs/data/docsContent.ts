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
          'React Navigation is not required; apps that use it can pass theme.navigationTheme to their navigator.',
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
      'Use theme tokens consistently across screens and preview default, dark, or system variants.',
    sections: [
      {
        id: 'provider',
        title: 'Theme Provider',
        body: [
          'ThemeProvider exposes default, dark, and system modes through the library theme context. Components consume tokens for colors, typography, gutters, borders, backgrounds, and layout helpers.',
          'Use the optional storageAdapter to persist a user preference. When no preference exists, ThemeProvider stores system and follows the operating system color scheme.',
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
        id: 'switch-theme',
        title: 'Switch Theme',
        body: [
          'useTheme returns the active variant and a changeTheme function. Pass default, dark, or system to change the stored preference.',
        ],
        code: {
          language: 'tsx',
          value: `import { Button, useTheme } from '@sohantalukder/rn-kit';

export function ThemeActions() {
  const { changeTheme } = useTheme();

  return (
    <>
      <Button text="Default" onPress={() => changeTheme('default')} />
      <Button text="Dark" onPress={() => changeTheme('dark')} />
      <Button text="System" onPress={() => changeTheme('system')} />
    </>
  );
}`,
        },
      },
      {
        id: 'theme-object',
        title: 'Theme Object',
        body: [
          'useTheme exposes raw color values plus generated React Native style objects. Use raw colors when a prop expects a ColorValue, and use generated style groups when composing StyleSheet-style arrays.',
        ],
        list: [
          'colors: raw color values from the active theme.',
          'backgrounds: backgroundColor styles keyed by color token.',
          'fonts: text color, responsive font size, alignment, transform, and weight helpers.',
          'gutters: gap, margin, and padding helpers generated from configured spacing values.',
          'borders: border color, radius, and width helpers.',
          'typographies: heading1, heading2, heading3, body1, body2, and body3 text styles.',
          'layout: flex, alignment, sizing, and position helpers.',
          'navigationTheme: React Navigation theme colors for the active variant.',
          'variant, logo, and changeTheme: active mode, optional logo asset, and theme switching API.',
        ],
      },
      {
        id: 'token-examples',
        title: 'Token Examples',
        body: [
          'Generated token keys mirror the values in src/theme/_config.ts. For example, a gutter value of 16 creates gap_16, margin_16, padding_16, and directional variants.',
        ],
        code: {
          language: 'tsx',
          value: `import { View } from 'react-native';
import { IconByVariant, Text, useTheme } from '@sohantalukder/rn-kit';

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
    </View>
  );
}`,
        },
      },
      {
        id: 'custom-colors',
        title: 'Custom User Colors',
        body: [
          'Pass a theme object to ThemeProvider when an app needs custom colors without editing the package source. This follows the same shape as common provider APIs: define the colors you want, then pass theme={theme}.',
          'A colors override is applied to raw colors plus generated backgrounds, fonts, and borders. For example, overriding primary makes colors.primary, backgrounds.primary, fonts.primary, and borders.primary use the same value.',
        ],
        code: {
          language: 'tsx',
          value: `import { ThemeProvider } from '@sohantalukder/rn-kit';
import App from './src/App';

const theme = {
  colors: {
    primary: 'tomato',
    secondary: 'yellow',
    brand: '#2563EB',
  },
  variants: {
    dark: {
      colors: {
        primary: '#FF8A65',
        secondary: '#FDE047',
        brand: '#60A5FA',
      },
    },
  },
};

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
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
          'Import useTheme in any component rendered inside ThemeProvider and use the generated token keys. Use colors.brand when a prop expects a color value, and use backgrounds.brand, fonts.brand, or borders.brand in style arrays.',
        ],
        code: {
          language: 'tsx',
          value: `import { View } from 'react-native';
import { Text, useTheme } from '@sohantalukder/rn-kit';

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
      <Text style={fonts.brand}>Brand color text</Text>
      <IconByVariant path="check" color={colors.brand} />
    </View>
  );
}`,
        },
      },
      {
        id: 'source-theme-config',
        title: 'Package Default Colors',
        body: [
          'If you are changing the default library theme itself, edit src/theme/_config.ts instead. Add matching tokens to colorsLight and colorsDark, then keep those maps wired through colors, backgrounds, fonts.colors, and borders.colors.',
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
        id: 'guidelines',
        title: 'Guidelines',
        list: [
          'Prefer theme tokens over one-off colors in app screens.',
          'Keep screen-level overrides small so components remain consistent.',
          'Use the docs theme toggle or Storybook toolbar to preview default and dark variants.',
          'Use React Navigation with theme.navigationTheme when app navigation should match the active variant.',
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
