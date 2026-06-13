import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import BottomSheet from '../../../../src/components/atoms/bottom-sheet/BottomSheet';
import AppBottomSheet from '../../../../src/components/atoms/bottom-sheet/AppBottomSheet';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

const getViewByTestId = (
  screen: Awaited<ReturnType<typeof renderWithTheme>>,
  testID: string
) => {
  const node = screen.container.queryAll(
    (item) => item.props.testID === testID
  )[0];

  if (!node) {
    throw new Error(`Unable to find rendered view with testID: ${testID}`);
  }

  return node;
};

describe('BottomSheet', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('opens when visible and renders children', async () => {
    const screen = await renderWithTheme(
      <BottomSheet
        visible
        onRequestClose={jest.fn()}
      >
        <Text>Sheet content</Text>
      </BottomSheet>
    );

    expect(screen.getByTestId('bottom-sheet')).toBeTruthy();
    expect(screen.getByText('Sheet content')).toBeTruthy();
  });

  it('opens after changing visible from false to true', async () => {
    const screen = await renderWithTheme(
      <BottomSheet
        visible={false}
        onRequestClose={jest.fn()}
      >
        <Text>Sheet content</Text>
      </BottomSheet>
    );

    expect(screen.queryByTestId('bottom-sheet')).toBeNull();

    await screen.rerender(
      <ThemeProvider>
        <BottomSheet
          visible
          onRequestClose={jest.fn()}
        >
          <Text>Sheet content</Text>
        </BottomSheet>
      </ThemeProvider>
    );

    expect(screen.getByTestId('bottom-sheet')).toBeTruthy();
    expect(screen.getByText('Sheet content')).toBeTruthy();
  });

  it('closes on backdrop press', async () => {
    const onRequestClose = jest.fn();
    const screen = await renderWithTheme(
      <BottomSheet
        visible
        onRequestClose={onRequestClose}
      >
        <Text>Sheet content</Text>
      </BottomSheet>
    );

    fireEvent.press(getViewByTestId(screen, 'bottom-sheet-backdrop'));

    await waitFor(() => {
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });

  it('respects disabled backdrop close', async () => {
    const onRequestClose = jest.fn();
    const screen = await renderWithTheme(
      <BottomSheet
        visible
        enableOverlayTapToClose={false}
        onRequestClose={onRequestClose}
      >
        <Text>Sheet content</Text>
      </BottomSheet>
    );

    fireEvent.press(getViewByTestId(screen, 'bottom-sheet-backdrop'));

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('renders title and footer on the internal sheet', async () => {
    const screen = await renderWithTheme(
      <AppBottomSheet
        visible
        title="Filters"
        footer={<Text>Apply</Text>}
        onClose={jest.fn()}
      >
        <Text>Sheet content</Text>
      </AppBottomSheet>
    );

    expect(screen.getByText('Filters')).toBeTruthy();
    expect(screen.getByText('Apply')).toBeTruthy();
    expect(screen.getByText('Sheet content')).toBeTruthy();
  });

  it('respects disabled swipe close', async () => {
    const onClose = jest.fn();
    const screen = await renderWithTheme(
      <AppBottomSheet
        visible
        enableSwipeToClose={false}
        onClose={onClose}
      >
        <Text>Sheet content</Text>
      </AppBottomSheet>
    );

    const sheet = screen.getByTestId('app-bottom-sheet');
    expect(sheet.props.onMoveShouldSetResponder?.({}, { dx: 0, dy: 120 })).toBe(
      false
    );
    expect(onClose).not.toHaveBeenCalled();
  });
});
