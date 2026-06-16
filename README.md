<p align="center">
  <img src="./assets/readme/rn-kit-hero.png" alt="@sohantalukder/rn-kit - theme-aware React Native UI primitives" width="100%" />
</p>

<p align="center">
  <strong>Simple, theme-aware React Native components for app screens.</strong>
  <br />
  <a href="https://rn-kit.vercel.app">Docs</a>
  ·
  <a href="https://rn-kit.vercel.app/docs/theming">Theming</a>
  ·
  <a href="https://www.npmjs.com/package/@sohantalukder/rn-kit">npm</a>
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

## What Is This?

`@sohantalukder/rn-kit` is a small React Native UI kit with typed components, local SVG icons, theme tokens, and app-level overlay helpers.

Use it when you want reusable buttons, inputs, cards, modals, sheets, toasts, empty states, and theme helpers without copying the same UI code between apps.

## Install

```sh
npm install @sohantalukder/rn-kit
```

Install the required native peer packages in your app:

```sh
npm install \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-svg
```

Follow the setup guide for those peer packages in your React Native app, especially Reanimated and Gesture Handler.

## Quick Start

Wrap the app once with `ThemeProvider`. Add `UiPortalProvider` when you use toast, dialog, bottom sheet, or context menu APIs.

```tsx
import {
  Button,
  Text,
  ThemeProvider,
  UiPortalProvider,
} from '@sohantalukder/rn-kit';

function HomeScreen() {
  return (
    <>
      <Text variant="heading3" weight="semibold">
        Welcome
      </Text>
      <Button text="Continue" onPress={() => {}} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <HomeScreen />
      </UiPortalProvider>
    </ThemeProvider>
  );
}
```

## Theming

The short version:

- `ThemeProvider` gives every component access to the active theme.
- `useTheme()` gives your screen `colors`, `backgrounds`, `fonts`, `gutters`, `borders`, `typographies`, `layout`, `navigationTheme`, `variant`, and `changeTheme`.
- Use `colors` for raw color values, `backgrounds` for View backgrounds, `gutters` for spacing, and `layout` for flexbox helpers.
- Pass `theme` to `ThemeProvider` when your app needs brand colors.
- Use the full theming guide for persistence, custom tokens, dark mode overrides, and package-default changes.

```tsx
const appTheme = {
  colors: {
    primary: '#2563EB',
    brand: '#7C3AED',
  },
  variants: {
    dark: {
      colors: {
        primary: '#60A5FA',
        brand: '#C4B5FD',
      },
    },
  },
};

<ThemeProvider theme={appTheme}>
  <App />
</ThemeProvider>;
```

Full guide: https://rn-kit.vercel.app/docs/theming

## Components

- Actions: `Button`, `IconButton`, `Ripple`, `ClickableText`
- Inputs: `TextInput`, `MultilineInput`, `PasswordInput`, `OTPInput`, `Checkbox`, `Radio`, `Switch`, `Slider`, `SelectList`, `MultiSelect`
- Feedback: `Loader`, `Skeleton`, `Toast`, `EmptyContent`, `NoInternet`
- Overlays: `Dialog`, `BottomSheet`, `SlideModal`
- Media: `Image`, `Avatar`, `PhotoCarousel`
- Layout: `Card`, `Divider`, `ScreenContainer`, `StatusBar`
- Primitives: `Text`, `Badge`, `IconByVariant`

## UI Providers

Mount `UiPortalProvider` once when you use global overlay APIs:

```tsx
import {
  ThemeProvider,
  UiPortalProvider,
  bottomSheet,
  contextMenu,
  dialog,
  toast,
} from '@sohantalukder/rn-kit';

<ThemeProvider>
  <UiPortalProvider>
    <App />
  </UiPortalProvider>
</ThemeProvider>;

const position = { x: 24, y: 120 };
const items = [{ id: 'delete', label: 'Delete', onPress: onDelete }];

toast.show({ type: 'success', title: 'Saved' });
dialog.confirm('Delete item?', 'This action cannot be undone.', onDelete);
bottomSheet.show({ component: FilterSheet });
contextMenu.show({ position, items });
```

## Common Imports

```tsx
import { Button, TextInput, Card } from '@sohantalukder/rn-kit';
import { ThemeProvider, useTheme } from '@sohantalukder/rn-kit';
import { toast, dialog, bottomSheet, contextMenu } from '@sohantalukder/rn-kit';
```

## Icons

Render a registered local SVG icon with `IconByVariant`:

```tsx
import { IconByVariant, iconNames } from '@sohantalukder/rn-kit';

<IconByVariant path="search" height={24} width={24} />;
```

Use `iconNames` when you need the list of registered icon keys.

## Package Notes

- `Image`, `Avatar`, and `PhotoCarousel` use the internal Image component backed by React Native `Image`.
- `BottomSheet` and the global bottom-sheet manager use the internal React Native sheet host mounted by `UiPortalProvider`.
- React Navigation is not required. Apps that use it can pass `navigationTheme` from `useTheme()` to the navigation container.
- Inputs support controlled `value` and uncontrolled `defaultValue` usage where applicable.
- Interactive components expose accessibility roles and states where supported.

## Documentation

Full package docs: https://rn-kit.vercel.app

## License

MIT
