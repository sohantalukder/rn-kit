# @sohantalukder/rn-kit

A React Native UI kit with theme-aware components, local SVG icons, overlay helpers, and TypeScript types.

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

## Common Imports

```tsx
import { Button, TextInput, Card } from '@sohantalukder/rn-kit';
import { ThemeProvider, useTheme } from '@sohantalukder/rn-kit';
import { toast, dialog, bottomSheet } from '@sohantalukder/rn-kit';
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
- Utilities: `Text`, `Badge`, `IconByVariant`

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
export * from './utilities';
```

## License

MIT
