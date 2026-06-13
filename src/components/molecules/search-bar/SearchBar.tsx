import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '../../../theme';
import { IconByVariant, TextInput } from '../../atoms';
import type { CustomInputProps } from '../../atoms/text-input/types/type';

export type SearchBarProps = Omit<
  CustomInputProps,
  'leftIcon' | 'rightHandler' | 'rightIcon' | 'secureTextEntry'
> & {
  /**
   * Called whenever the search value changes.
   */
  onSearch?: (value: string) => void;

  /**
   * Called when the user submits the search from the keyboard.
   */
  onSubmitSearch?: (value: string) => void;

  /**
   * Called after the clear button resets the search value.
   */
  onClear?: () => void;

  /**
   * Whether to show the clear action when the search has text.
   */
  clearable?: boolean;

  /**
   * Custom search icon rendered on the left.
   */
  searchIcon?: React.ReactNode;

  /**
   * Custom clear icon rendered on the right.
   */
  clearIcon?: React.ReactNode;
};

const SearchBar: React.FC<SearchBarProps> = ({
  clearable = true,
  clearIcon,
  defaultValue = '',
  disabled = false,
  keyboardType = 'default',
  maxLength,
  name,
  onChangeText,
  onClear,
  onSearch,
  onSubmitEditing,
  onSubmitSearch,
  placeholder = 'Search',
  returnKeyType = 'search',
  searchIcon,
  value,
  ...props
}) => {
  const { colors } = useTheme();
  const isControlled = value !== undefined;
  const [searchValue, setSearchValue] = useState(
    value?.toString() ?? defaultValue?.toString() ?? ''
  );

  const inputValue = isControlled ? value?.toString() ?? '' : searchValue;
  const hasValue = inputValue.length > 0;

  const leftIcon = useMemo(
    () =>
      searchIcon ?? (
        <IconByVariant
          path="search"
          color={colors.gray4}
          height={20}
          width={20}
        />
      ),
    [colors.gray4, searchIcon]
  );

  const rightIcon = useMemo(() => {
    if (!clearable || !hasValue) {
      return undefined;
    }

    return (
      clearIcon ?? (
        <IconByVariant
          path="cancel"
          color={colors.gray4}
          height={20}
          width={20}
        />
      )
    );
  }, [clearIcon, clearable, colors.gray4, hasValue]);

  const handleChangeText = useCallback(
    (text: string, fieldName?: string, isValid?: boolean) => {
      if (!isControlled) {
        setSearchValue(text);
      }

      onChangeText?.(text, fieldName, isValid);
      onSearch?.(text);
    },
    [isControlled, onChangeText, onSearch]
  );

  const handleClear = useCallback(() => {
    if (disabled) {
      return;
    }

    if (!isControlled) {
      setSearchValue('');
    }

    const fieldName = name?.trim() ? name : undefined;
    onChangeText?.('', fieldName, true);
    onSearch?.('');
    onClear?.();
  }, [disabled, isControlled, name, onChangeText, onClear, onSearch]);

  const handleSubmitEditing = useCallback(() => {
    onSubmitSearch?.(inputValue);
    onSubmitEditing?.();
  }, [inputValue, onSubmitEditing, onSubmitSearch]);

  useEffect(() => {
    if (!isControlled) {
      setSearchValue(defaultValue?.toString() ?? '');
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (isControlled) {
      setSearchValue(value?.toString() ?? '');
    }
  }, [isControlled, value]);

  return (
    <TextInput
      {...props}
      accessibilityLabel={props.accessibilityLabel ?? placeholder}
      autoCapitalize={props.autoCapitalize ?? 'none'}
      autoCorrect={props.autoCorrect ?? false}
      defaultValue={defaultValue?.toString()}
      disabled={disabled}
      keyboardType={keyboardType}
      leftIcon={leftIcon}
      maxLength={maxLength}
      name={name}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
      placeholder={placeholder}
      returnKeyType={returnKeyType}
      rightHandler={handleClear}
      rightIcon={rightIcon}
      value={inputValue}
    />
  );
};

export default memo(SearchBar);
