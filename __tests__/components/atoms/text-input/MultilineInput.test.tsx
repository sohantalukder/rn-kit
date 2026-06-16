import React from 'react';
import { render } from '@testing-library/react-native';
import { Animated, StyleSheet } from 'react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import MultilineInput from '../../../../src/components/atoms/text-input/MultilineInput';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('MultilineInput', () => {
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

  it('renders the label above the textarea instead of in a row', async () => {
    const screen = await renderWithTheme(<MultilineInput label="Notes" />);

    const containerStyle = StyleSheet.flatten(
      screen.getByTestId('multiline-input-container').props.style
    );

    expect(screen.getByText('Notes')).toBeTruthy();
    expect(containerStyle.flexDirection).not.toBe('row');
  });

  it('aligns multiline text from the top by default', async () => {
    const screen = await renderWithTheme(<MultilineInput label="Notes" />);

    expect(screen.getByTestId('multiline-input').props.textAlignVertical).toBe(
      'top'
    );
  });

  it('shows the placeholder with the regular label by default', async () => {
    const screen = await renderWithTheme(
      <MultilineInput
        label="Notes"
        placeholder="Add notes"
      />
    );

    expect(screen.getByTestId('multiline-input').props.placeholder).toBe(
      'Add notes'
    );
  });

  it('supports the same floating label mode as TextInput', async () => {
    const screen = await renderWithTheme(
      <MultilineInput
        label="Notes"
        placeholder="Add notes"
        animatedLabel
      />
    );

    expect(screen.getByText('Notes')).toBeTruthy();
    expect(screen.getByTestId('multiline-input').props.placeholder).toBe('');
  });
});
