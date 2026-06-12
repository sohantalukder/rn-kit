import type { Decorator, Preview } from '@storybook/nextjs';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from '@sohantalukder/rn-kit';

const withRnKitTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'dark' : 'default';

  return (
    <ThemeProvider
      key={theme}
      storageAdapter={{
        getTheme: () => theme,
        setTheme: () => {},
      }}
    >
      <View
        style={{
          minHeight: 280,
          backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
          padding: 24,
        }}
      >
        <Story />
      </View>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withRnKitTheme],
  globalTypes: {
    theme: {
      description: 'Global theme for rn-kit components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'default', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        type: 'dynamic',
      },
    },
    layout: 'centered',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { height: '844px', width: '390px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { height: '1024px', width: '768px' },
          type: 'tablet',
        },
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
