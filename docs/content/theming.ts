export const theming = {
  title: 'Theming',
  body:
    'ThemeProvider exposes default, dark, and system-aware variants through the library theme context. Components consume theme tokens for colors, typography, gutters, borders, and layout helpers.',
  code: `<ThemeProvider
  storageAdapter={{
    getTheme: () => localStore.getTheme(),
    setTheme: value => localStore.setTheme(value),
  }}
>
  {children}
</ThemeProvider>`,
  notes: [
    'Use the storage adapter to persist user theme preference.',
    'Use the docs theme toggle to preview light and dark variants.',
    'Keep screen-specific overrides small so components remain consistent.',
  ],
};
