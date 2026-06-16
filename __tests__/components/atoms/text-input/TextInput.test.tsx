import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Animated } from 'react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import TextInput from '../../../../src/components/atoms/text-input/TextInput';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('TextInput', () => {
  beforeEach(() => {
    jest.spyOn(Animated, 'timing').mockImplementation((value, config) => ({
      reset: jest.fn(),
      start: (callback?: Animated.EndCallback) => {
        (value as Animated.Value).setValue(config.toValue as number);
        callback?.({ finished: true });
      },
      stop: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('keeps the floating label behavior by default', async () => {
    const screen = await renderWithTheme(
      <TextInput
        label="Email"
        placeholder="Enter email"
      />
    );

    expect(screen.getByTestId('text-input').props.placeholder).toBe('');
  });

  it('shows a regular label and placeholder when animatedLabel is false', async () => {
    const screen = await renderWithTheme(
      <TextInput
        label="Email"
        placeholder="Enter email"
        animatedLabel={false}
      />
    );

    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByTestId('text-input').props.placeholder).toBe(
      'Enter email'
    );
  });
});
