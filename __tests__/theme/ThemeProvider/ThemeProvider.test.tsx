import React from 'react';
import { render } from '@testing-library/react-native';
import ThemeProvider from '../../../src/theme/ThemeProvider/ThemeProvider';
import useTheme from '../../../src/theme/hooks/useTheme';
import { Text } from '../../../src/components/atoms';

const ThemeProbe = () => {
  const { variant } = useTheme();
  return <Text testID="theme-variant">{variant}</Text>;
};

describe('ThemeProvider', () => {
  it('provides a default theme context', async () => {
    const screen = await render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-variant').props.children).toBe('default');
  });

  it('uses the stored theme when provided', async () => {
    const screen = await render(
      <ThemeProvider
        storageAdapter={{
          getTheme: () => 'dark',
          setTheme: jest.fn(),
        }}
      >
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-variant').props.children).toBe('dark');
  });
});
