import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ThemeProvider from '../../../../src/theme/ThemeProvider/ThemeProvider';
import SearchBar from '../../../../src/components/molecules/search-bar/SearchBar';

const renderWithTheme = (children: React.ReactElement) =>
  render(<ThemeProvider>{children}</ThemeProvider>);

describe('SearchBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('reports search text changes', async () => {
    const onSearch = jest.fn();
    const onChangeText = jest.fn();
    const screen = await renderWithTheme(
      <SearchBar
        name="query"
        onChangeText={onChangeText}
        onSearch={onSearch}
        searchIcon={<></>}
      />
    );

    fireEvent.changeText(screen.getByTestId('text-input'), 'invoice');

    expect(onSearch).toHaveBeenCalledWith('invoice');
    expect(onChangeText).toHaveBeenCalledWith('invoice', 'query', true);
  });

  it('clears the current value with the clear action', async () => {
    const onClear = jest.fn();
    const onChangeText = jest.fn();
    const onSearch = jest.fn();
    const screen = await renderWithTheme(
      <SearchBar
        name="query"
        defaultValue="invoice"
        clearIcon={<></>}
        onChangeText={onChangeText}
        onClear={onClear}
        onSearch={onSearch}
        searchIcon={<></>}
      />
    );

    fireEvent.press(screen.getByLabelText('Input action'));

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('');
    expect(onChangeText).toHaveBeenCalledWith('', 'query', true);
  });
});
