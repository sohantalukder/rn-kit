# @sohantalukder/rn-kit

A standalone React Native UI kit with reusable components, theme utilities, overlay providers, local SVG icons, and TypeScript types.

The package is designed for React Native apps that want a small design-system layer without copying component code between projects.

## Features

- Theme provider with default, dark, and system mode support
- Atoms, molecules, organisms, and screen templates
- Toast, dialog, bottom sheet, and context menu providers
- Local SVG icon registry through `react-native-svg`
- CommonJS, ES module, and TypeScript declaration builds
- Jest unit tests for core runtime behavior

## Install

```sh
npm install @sohantalukder/rn-kit
```

Install the core peer dependencies in the consuming React Native app:

```sh
npm install \
  @react-navigation/native \
  @react-navigation/stack \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-svg
```

Feature-specific peers are only needed when you use the related components:

| Package | Needed for |
| --- | --- |
| `@d11/react-native-fast-image` | `Image`, `Avatar`, `PhotoCarousel` |
| `@gorhom/bottom-sheet` | `UiPortalProvider` bottom-sheet manager |

Follow the native setup instructions for Reanimated, Gesture Handler, SVG, Safe Area Context, Bottom Sheet, and Fast Image in the consuming app.

## Usage

Wrap the app once with `ThemeProvider`. Add `UiPortalProvider` when using toast, dialog, bottom sheet, or context menu APIs.

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
        <Button
          text="Continue"
          accessibilityLabel="Continue"
          onPress={() => toast.show({ type: 'success', title: 'Ready' })}
        />
        <Text variant="body1">Hello</Text>
      </UiPortalProvider>
    </ThemeProvider>
  );
}
```

Persist theme mode with an app-owned storage adapter:

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

## Common Imports

```tsx
import { Button, TextInput, Card } from '@sohantalukder/rn-kit';
import { ThemeProvider, useTheme } from '@sohantalukder/rn-kit';
import { toast, dialog, bottomSheet } from '@sohantalukder/rn-kit';
```

## Component Notes

- Inputs support predictable controlled `value` and uncontrolled `defaultValue` usage.
- Buttons, checkbox, radio, switch, dialogs, and bottom sheets expose accessibility roles and states.
- `Iconify` has been removed. Use the local SVG icon registry with `IconByVariant` or pass custom icon nodes to components.
- `FlashList`, `ErrorBoundary`, `DefaultError`, and `SafeScreen` are not included. Use app-level list and error-boundary implementations when needed.
- Global overlay managers are mounted by `UiPortalProvider`; mount it once near the app root.
- The package does not include app navigation setup. Configure React Navigation in the consuming app.

## Quality Gates

Run these before publishing:

```sh
npm ci
npm run typecheck
npm test -- --runInBand
npm run build
npm audit --omit=dev
npm --cache /private/tmp/rn-kit-npm-cache pack --dry-run
```

## Public API

```ts
export * from './assets';
export * from './components';
export * from './providers';
export * from './theme';
export * from './types';
export * from './utilities';
```

## Publishing Checklist

- Confirm `npm run typecheck`, `npm test`, and `npm run build` pass.
- Confirm `npm audit --omit=dev` has no high or critical production advisories.
- Inspect `npm pack --dry-run` output for unwanted files.
- Install the packed tarball in a fresh React Native app.
- Verify at least one Android and one iOS build when native peers are used.
- Update `CHANGELOG.md`, bump the package version, then publish with `npm publish --access public`.
