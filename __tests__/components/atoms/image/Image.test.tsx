import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import Image from '../../../../src/components/atoms/image/Image';

jest.mock('../../../../src/components/atoms/skeleton/Skeleton', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: Record<string, unknown>) =>
    React.createElement(View, { ...props, testID: 'skeleton' });
});

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('Image', () => {
  it('renders a local source', async () => {
    const screen = await renderWithTheme(
      <Image
        source={1}
        width={48}
        height={48}
      />
    );

    expect(screen.getByTestId('image-preview').props.source).toBe(1);
    await screen.unmount();
  });

  it('renders a remote uri source', async () => {
    const source = { uri: 'https://example.com/photo.png' };
    const screen = await renderWithTheme(
      <Image
        source={source}
        width={48}
        height={48}
      />
    );

    expect(screen.getByTestId('image-preview').props.source).toMatchObject(
      source
    );
    await screen.unmount();
  });

  it('shows fallback image after an error', async () => {
    const fallbackSource = { uri: 'https://example.com/fallback.png' };
    const screen = await renderWithTheme(
      <Image
        source={{ uri: 'https://example.com/missing.png' }}
        fallbackSource={fallbackSource}
        width={48}
        height={48}
      />
    );

    await act(async () => {
      fireEvent(screen.getByTestId('image-preview'), 'error');
    });

    await waitFor(() => {
      expect(screen.getByTestId('image-preview').props.source).toMatchObject(
        fallbackSource
      );
    });
    await screen.unmount();
  });

  it('calls image lifecycle callbacks', async () => {
    const onLoadStart = jest.fn();
    const onLoad = jest.fn();
    const onLoadEnd = jest.fn();
    const onError = jest.fn();
    const screen = await renderWithTheme(
      <Image
        source={{ uri: 'https://example.com/photo.png' }}
        width={48}
        height={48}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onLoadEnd={onLoadEnd}
        onError={onError}
      />
    );

    const image = screen.getByTestId('image-preview');
    await act(async () => {
      fireEvent(image, 'loadStart');
      fireEvent(image, 'load');
      fireEvent(image, 'loadEnd');
      fireEvent(image, 'error');
    });

    expect(onLoadStart).toHaveBeenCalledTimes(1);
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(onLoadEnd).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(1);
    await screen.unmount();
  });

  it('shows placeholder UI when source is invalid', async () => {
    const screen = await renderWithTheme(
      <Image
        source={{ uri: '' }}
        width={48}
        height={48}
      />
    );

    await waitFor(() => {
      expect(screen.queryByTestId('image-preview')).toBeNull();
      expect(screen.getByTestId('image-preview-container')).toBeTruthy();
    });
    await screen.unmount();
  });

  it('shows a loader while loading', async () => {
    const screen = await renderWithTheme(
      <Image
        source={{ uri: 'https://example.com/photo.png' }}
        width={48}
        height={48}
      />
    );

    const image = await screen.findByTestId('image-preview');
    await act(async () => {
      fireEvent(image, 'loadStart');
    });

    await waitFor(() => {
      expect(screen.getByTestId('image-preview-loader')).toBeTruthy();
    });

    await act(async () => {
      fireEvent(image, 'loadEnd');
    });
    await screen.unmount();
  });
});
