import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import OTPInput from '../../../../src/components/atoms/text-input/OtpInput';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('OTPInput', () => {
  it('calls callback with the latest value after the final digit', async () => {
    const callback = jest.fn();
    const screen = await renderWithTheme(
      <OTPInput
        length={4}
        callback={callback}
      />
    );

    await fireEvent.changeText(await screen.findByTestId('otp-input-0'), '1');
    await fireEvent.changeText(await screen.findByTestId('otp-input-1'), '2');
    await fireEvent.changeText(await screen.findByTestId('otp-input-2'), '3');
    await fireEvent.changeText(await screen.findByTestId('otp-input-3'), '4');

    expect(callback).toHaveBeenCalledWith('1234');
  });

  it('handles pasted values without waiting on stale state', async () => {
    const callback = jest.fn();
    const screen = await renderWithTheme(
      <OTPInput
        length={4}
        callback={callback}
      />
    );

    await fireEvent.changeText(
      await screen.findByTestId('otp-input-0'),
      '9876'
    );

    expect(callback).toHaveBeenCalledWith('9876');
  });
});
