import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import Checkbox from '../../../../src/components/atoms/check-box/Checkbox';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('Checkbox', () => {
  it('exposes checked and disabled accessibility state', async () => {
    const screen = await renderWithTheme(
      <Checkbox
        checked
        disabled
        testID="terms"
      />
    );

    const checkbox = screen.getByTestId('terms');
    expect(checkbox.props.accessibilityRole).toBe('checkbox');
    expect(checkbox.props.accessibilityState).toMatchObject({
      checked: true,
      disabled: true,
    });
  });

  it('toggles and calls onPress', async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(
      <Checkbox
        onPress={onPress}
        testID="terms"
      />
    );

    fireEvent.press(screen.getByTestId('terms'));

    expect(onPress).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByTestId('terms').props.accessibilityState.checked).toBe(
        true
      );
    });
  });
});
