import React from 'react';
import { render } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import IconButton from '../../../../src/components/atoms/buttons/IconButton';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('IconButton', () => {
  it('renders a notification dot when requested', async () => {
    const screen = await renderWithTheme(
      <IconButton
        icon="notification"
        showDot
        accessibilityLabel="Notifications"
      />
    );

    expect(screen.getByTestId('icon-button-dot')).toBeTruthy();
  });

  it('does not render a notification dot by default', async () => {
    const screen = await renderWithTheme(
      <IconButton
        icon="notification"
        accessibilityLabel="Notifications"
      />
    );

    expect(screen.queryByTestId('icon-button-dot')).toBeNull();
  });
});
