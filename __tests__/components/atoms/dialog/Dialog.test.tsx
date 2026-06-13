import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import Dialog from '../../../../src/components/atoms/dialog/Dialog';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('Dialog', () => {
  it('does not render when hidden', async () => {
    const screen = await renderWithTheme(
      <Dialog
        visible={false}
        title="Delete item?"
      />
    );

    expect(screen.queryByText('Delete item?')).toBeNull();
  });

  it('renders content and buttons when visible', async () => {
    const screen = await renderWithTheme(
      <Dialog
        visible
        title="Delete item?"
        description="This action cannot be undone."
        buttons={[{ label: 'Cancel', onPress: jest.fn() }]}
      />
    );

    expect(screen.getByText('Delete item?')).toBeTruthy();
    expect(screen.getByText('This action cannot be undone.')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('calls onDismiss from the backdrop when dismissible', async () => {
    const onDismiss = jest.fn();
    const screen = await renderWithTheme(
      <Dialog
        visible
        title="Delete item?"
        onDismiss={onDismiss}
      />
    );

    fireEvent.press(screen.getByLabelText('Close dialog'));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss from the backdrop when not dismissible', async () => {
    const onDismiss = jest.fn();
    const screen = await renderWithTheme(
      <Dialog
        visible
        dismissible={false}
        title="Delete item?"
        onDismiss={onDismiss}
      />
    );

    fireEvent.press(screen.getByLabelText('Close dialog'));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls button handlers', async () => {
    const onCancel = jest.fn();
    const screen = await renderWithTheme(
      <Dialog
        visible
        title="Delete item?"
        buttons={[{ label: 'Cancel', onPress: onCancel }]}
      />
    );

    fireEvent.press(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
