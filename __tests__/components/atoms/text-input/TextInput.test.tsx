import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import TextInput from '../../../../src/components/atoms/text-input/TextInput';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('TextInput', () => {
  it('renders controlled value and reports changed text without desyncing', async () => {
    const onChangeText = jest.fn();
    const screen = await renderWithTheme(
      <TextInput
        label="Email"
        value="a@example.com"
        onChangeText={onChangeText}
      />
    );

    const input = screen.getByTestId('text-input');
    expect(input.props.value).toBe('a@example.com');

    fireEvent.changeText(input, 'b@example.com');

    expect(onChangeText).toHaveBeenCalledWith(
      'b@example.com',
      undefined,
      true
    );
    expect(screen.getByTestId('text-input').props.value).toBe('a@example.com');
  });

  it('marks disabled input accessibility state and editable flag', async () => {
    const screen = await renderWithTheme(
      <TextInput
        label="Name"
        value="Sohan"
        disabled
      />
    );

    const input = screen.getByTestId('text-input');
    expect(input.props.editable).toBe(false);
    expect(input.props.accessibilityState.disabled).toBe(true);
  });
});
