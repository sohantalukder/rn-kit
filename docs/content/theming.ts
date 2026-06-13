export const theming = {
  title: 'Theming',
  body:
    'ThemeProvider exposes default, dark, and system modes through the library theme context. Components consume theme tokens for colors, backgrounds, typography, gutters, borders, and layout helpers.',
  code: `<ThemeProvider
  storageAdapter={{
    getTheme: () => localStore.getTheme(),
    setTheme: value => localStore.setTheme(value),
  }}
>
  {children}
</ThemeProvider>`,
  notes: [
    'Use the storage adapter to persist default, dark, or system user preference.',
    'Use useTheme to read colors, backgrounds, fonts, gutters, borders, typographies, layout, navigationTheme, variant, logo, and changeTheme.',
    'Pass custom brand or user colors with ThemeProvider theme={{ colors: { primary: "tomato" } }}; useTheme then exposes colors.token, backgrounds.token, fonts.token, and borders.token.',
    'Use the docs theme toggle to preview default and dark variants.',
    'Keep screen-specific overrides small so components remain consistent.',
  ],
};
