export const theming = {
  title: 'Theming',
  body:
    'ThemeProvider gives every component the same theme. Use colors for raw color strings, backgrounds for View backgrounds, gutters for spacing, layout for flexbox helpers, and fonts, borders, and typographies for common text and border styles.',
  code: `const appTheme = {
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
</ThemeProvider>`,
  notes: [
    'Mount ThemeProvider once near the app root.',
    'Call useTheme inside screens to read colors, backgrounds, gutters, layout, fonts, borders, typographies, navigationTheme, and changeTheme.',
    'Pass theme to ThemeProvider for app brand colors; use variants.dark for dark-mode overrides.',
    'A colors token creates colors.token, backgrounds.token, fonts.token, and borders.token.',
    'Edit src/theme/_config.ts only when changing the package defaults.',
  ],
};
