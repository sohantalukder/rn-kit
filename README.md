# @sohantalukder/rn-kit

A standalone React Native UI library with reusable components, theme utilities, overlay providers, icons, and TypeScript types.

This package is designed to live in its own Git repository and be consumed by React Native apps, including the original boilerplate it was extracted from.

## Features

- Theme provider with light/dark/system mode support
- Atoms, molecules, organisms, and screen templates
- Toast, dialog, bottom sheet, and context menu providers
- Built-in SVG icon registry
- CommonJS, ES module, and TypeScript declaration builds
- npm publish-ready package configuration

## Install

```sh
npm install @sohantalukder/rn-kit
```

Install peer dependencies in the consuming React Native app:

```sh
npm install \
  @d11/react-native-fast-image \
  @gorhom/bottom-sheet \
  @react-navigation/native \
  @react-navigation/stack \
  @shopify/flash-list \
  react-error-boundary \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-svg \
  react-native-webview
```

Then follow the native setup instructions for those packages, especially Reanimated, Gesture Handler, SVG, Safe Area Context, Bottom Sheet, and Fast Image.

## Usage

Wrap your app with `ThemeProvider` and `UiPortalProvider`:

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
          onPress={() => toast.show({ type: 'success', title: 'Ready' })}
        />
        <Text variant="body1">Hello</Text>
      </UiPortalProvider>
    </ThemeProvider>
  );
}
```

## Persist Theme Mode

Pass a storage adapter from your app:

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

You can also pass a logo asset:

```tsx
<ThemeProvider logo={require('./assets/logo.png')}>
  {children}
</ThemeProvider>
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

Common imports:

```tsx
import { Button, TextInput, Card } from '@sohantalukder/rn-kit';
import { ThemeProvider, useTheme } from '@sohantalukder/rn-kit';
import { toast, dialog, bottomSheet } from '@sohantalukder/rn-kit';
```

## Local Development

```sh
npm install
npm run typecheck
npm run build
npm run pack:dry-run
```

Generated build output goes to `lib/`.

## Use Locally Before Publishing

From a React Native app:

```sh
npm install ../rn-kit
```

Or pack and install the tarball:

```sh
npm run pack:dry-run
npm pack
npm install ./sohantalukder-rn-kit-0.1.0.tgz
```

## Separate Git Repository

This folder can be moved into its own repository:

```sh
git init
git add .
git commit -m "Initial UI library release"
git branch -M main
git remote add origin git@github.com:sohantalukder/rn-kit.git
git push -u origin main
```

See [PUBLISHING.md](./PUBLISHING.md) for npm release steps.

## Publish

```sh
npm login
npm publish --access public
```

The `prepublishOnly` script runs typecheck and build before publishing.
