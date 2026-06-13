<p align="center">
  <img src="./assets/readme/rn-kit-hero.png" alt="@sohantalukder/rn-kit - theme-aware React Native UI primitives" width="100%" />
</p>

<p align="center">
  <strong>Theme-aware React Native UI primitives for production app screens.</strong>
  <br />
  <a href="https://www.npmjs.com/package/@sohantalukder/rn-kit">npm package</a>
  ·
  <a href="https://github.com/sohantalukder/rn-kit">GitHub</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sohantalukder/rn-kit"><img alt="npm version" src="https://img.shields.io/npm/v/@sohantalukder/rn-kit.svg" /></a>
  <a href="https://github.com/sohantalukder/rn-kit/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/sohantalukder/rn-kit/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@sohantalukder/rn-kit"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@sohantalukder/rn-kit.svg" /></a>
  <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/npm/l/@sohantalukder/rn-kit.svg" /></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/types-TypeScript-3178C6.svg" />
  <img alt="React Native" src="https://img.shields.io/badge/react--native-%3E%3D0.74-61DAFB.svg" />
</p>

---

**@sohantalukder/rn-kit** is a React Native UI kit with theme-aware components, local SVG icons, overlay helpers, and TypeScript types.

Use it when you want a small design-system layer for app screens without copying button, input, modal, empty-state, and theme code between projects.

## Features

- Theme provider with default, dark, and system mode support
- 32 documented React Native components
- Buttons, inputs, selection controls, loaders, cards, modals, sheets, toasts, and screen wrappers
- Local SVG icon registry powered by `react-native-svg`
- Overlay helpers for toast, dialog, bottom sheet, and context menu flows
- CommonJS, ES module, and TypeScript declaration builds

## Install

```sh
npm install @sohantalukder/rn-kit
```

Install the required peer dependencies in your React Native app:

```sh
npm install \
  @react-navigation/native \
  @react-navigation/stack \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-svg
```

Some components need extra optional peers:

| Package | Used by |
| --- | --- |
| `@d11/react-native-fast-image` | `Image`, `Avatar`, `PhotoCarousel` |
| `@gorhom/bottom-sheet` | Bottom-sheet overlay manager |

Follow the native setup instructions for the peer packages you install, especially Reanimated, Gesture Handler, SVG, Safe Area Context, Bottom Sheet, and Fast Image.

## Quick Start

Wrap your app with `ThemeProvider`. Add `UiPortalProvider` if you use toast, dialog, bottom sheet, or context menu APIs.

```tsx
import {
  ThemeProvider,
  UiPortalProvider,
  Button,
  Text,
  toast,
} from '@sohantalukder/rn-kit';

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <Text variant="heading2">Welcome back</Text>
        <Button
          text="Continue"
          accessibilityLabel="Continue"
          onPress={() => toast.show({ type: 'success', title: 'Ready' })}
        />
      </UiPortalProvider>
    </ThemeProvider>
  );
}
```

## Theme Persistence

You can keep the selected theme in your own storage layer:

```tsx
<ThemeProvider
  storageAdapter={{
    getTheme: () => localStore.getTheme(),
    setTheme: value => localStore.setTheme(value),
  }}
>
  {children}
</ThemeProvider>
```

Use `useTheme()` to read the active theme and switch between `default`, `dark`, and `system` modes:

```tsx
import { useTheme } from '@sohantalukder/rn-kit';

const {
  colors,
  backgrounds,
  borders,
  fonts,
  gutters,
  layout,
  navigationTheme,
  typographies,
  variant,
  changeTheme,
} = useTheme();

changeTheme('system');
```

Theme style groups include generated helpers for common screen composition:

```tsx
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
  <Text style={[typographies.heading3, fonts.primary]}>Account</Text>
</View>
```

Custom brand or user colors can be passed directly to `ThemeProvider`, similar to provider APIs like React Native Paper.

```tsx
import { ThemeProvider } from '@sohantalukder/rn-kit';
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
}
```

Color overrides cascade into raw colors and generated token groups:

```tsx
const { backgrounds, borders, colors, fonts } = useTheme();

colors.brand; // '#2563EB' or '#60A5FA' in dark mode
backgrounds.brand; // { backgroundColor: ... }
fonts.brand; // { color: ... }
borders.brand; // { borderColor: ... }
```

If you are changing the package defaults instead of a consuming app theme, edit `src/theme/_config.ts`.

## UI Providers

Mount `UiPortalProvider` once near the root when you use global overlay APIs:

```tsx
<ThemeProvider>
  <UiPortalProvider>{children}</UiPortalProvider>
</ThemeProvider>
```

Then call the exported managers from feature code:

```tsx
toast.show({ type: 'success', title: 'Saved' });
dialog.alert('Saved', 'Your profile was updated.');
dialog.confirm('Delete item?', 'This action cannot be undone.', deleteItem);

bottomSheet.show({
  component: FilterSheet,
  options: { snapPoints: ['35%', '70%'] },
});

contextMenu.show({
  position: { x: 24, y: 120 },
  items: [{ id: 'edit', label: 'Edit', onPress: openEditor }],
});
```

Install and configure `@gorhom/bottom-sheet` before using the global bottom sheet manager.

## Common Imports

```tsx
import { Button, TextInput, Card } from '@sohantalukder/rn-kit';
import { ThemeProvider, useTheme } from '@sohantalukder/rn-kit';
import { toast, dialog, bottomSheet, contextMenu } from '@sohantalukder/rn-kit';
```

## Icons

Render a registered local SVG icon with `IconByVariant`:

```tsx
import { IconByVariant } from '@sohantalukder/rn-kit';

<IconByVariant path="search" height={24} width={24} />;
```

Available icon keys are exported as `iconNames`:

```tsx
import { iconNames } from '@sohantalukder/rn-kit';
```

## Components

The package includes components across these groups:

- Actions: `Button`, `IconButton`, `Ripple`, `ClickableText`
- Inputs: `TextInput`, `MultilineInput`, `PasswordInput`, `OTPInput`, `Checkbox`, `Radio`, `Switch`, `Slider`, `SelectList`, `MultiSelect`
- Feedback: `Loader`, `Skeleton`, `Toast`, `EmptyContent`, `NoInternet`
- Overlays: `Dialog`, `BottomSheet`, `SlideModal`
- Media: `Image`, `Avatar`, `PhotoCarousel`
- Layout: `Card`, `Divider`, `ScreenContainer`, `StatusBar`
- Supporting primitives: `Text`, `Badge`, `IconByVariant`

## Notes

- Inputs support controlled `value` and uncontrolled `defaultValue` usage where applicable.
- Interactive components expose accessibility roles and states where supported.
- Use `IconByVariant` for bundled icons, or pass custom icon nodes to components that accept icons.
- Mount `UiPortalProvider` once near the app root when using global overlay APIs.
- The package does not configure navigation for you. Set up React Navigation in your app.

## Public API

```ts
export * from './assets';
export * from './components';
export * from './providers';
export * from './theme';
export * from './types';
```

## License

MIT
