import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  NativeSyntheticEvent,
  StyleProp,
  TextInputKeyPressEventData,
  ViewStyle,
} from 'react-native';
import { TextInput, View } from 'react-native';

import { useTheme } from '../../../theme';

import { otpStyles } from './styles/otp.styles';

type OTPInputProps = {
  readonly callback?: (parameters: string) => void;
  readonly length?: number;
  readonly style?: StyleProp<ViewStyle>;
};

const OTPInput: React.FC<OTPInputProps> = ({ callback, length = 6, style }) => {
  const { colors, gutters, typographies } = useTheme();
  const inputReferences = useRef<(null | TextInput)[]>([]);
  const timeoutReferences = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Track focused state for styling
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);
  // Use state to track OTP values for better reactivity
  // Using new Array() instead of Array() to satisfy the unicorn/new-for-builtins rule
  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(length).fill('')
  );
  const otpValuesReference = useRef<string[]>(new Array(length).fill(''));

  const setNextOtpValues = useCallback((nextValues: string[]) => {
    otpValuesReference.current = nextValues;
    setOtpValues(nextValues);
  }, []);

  const componentStyles = useMemo(
    () => otpStyles(colors, gutters, typographies),
    [colors, gutters, typographies]
  );

  const scheduleTimeout = useCallback((handler: () => void, delay = 0) => {
    const timeout = setTimeout(() => {
      timeoutReferences.current = timeoutReferences.current.filter(
        (item) => item !== timeout
      );
      handler();
    }, delay);
    timeoutReferences.current.push(timeout);
  }, []);

  useEffect(
    () => () => {
      timeoutReferences.current.forEach(clearTimeout);
      timeoutReferences.current = [];
    },
    []
  );

  // Update a specific position in the OTP array
  const updateOtpValue = useCallback((index: number, value: string) => {
    setOtpValues((previous) => {
      const newValues = [...previous];
      newValues[index] = value;
      otpValuesReference.current = newValues;
      return newValues;
    });
  }, []);

  const handleOnFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleOnBlur = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  const handleBackspace = useCallback(
    (index: number) => {
      // If current input is empty and not the first input, move to previous
      if (otpValues[index] === '' && index > 0) {
        updateOtpValue(index - 1, '');
        inputReferences.current[index - 1]?.focus();
      } else {
        // Clear current input
        updateOtpValue(index, '');
      }
    },
    [otpValues, updateOtpValue]
  );

  const handleKeyPress = useCallback(
    (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number
    ) => {
      const { key } = event.nativeEvent;
      if (key === 'Backspace') {
        handleBackspace(index);
      }
    },
    [handleBackspace]
  );

  const handlePaste = useCallback(
    (text: string, currentIndex: number) => {
      // Clean the pasted text to only include numbers
      const cleanText = text.replace(/\D/g, '');

      // Create a new array with the pasted values
      const newValues = [...otpValuesReference.current];

      // Update OTP values with pasted digits
      for (
        let index = 0;
        index < Math.min(cleanText.length, length - currentIndex);
        index++
      ) {
        const targetIndex = currentIndex + index;
        newValues[targetIndex] = cleanText[index] ?? '';
      }

      setNextOtpValues(newValues);

      // Focus the next empty input or the last input
      const nextFocusIndex = Math.min(
        currentIndex + cleanText.length,
        length - 1
      );
      scheduleTimeout(() => {
        inputReferences.current[nextFocusIndex]?.focus();
      });

      // Check completion
      const otpValue = newValues.join('');
      if (otpValue.length === length && newValues.every(Boolean)) {
        callback?.(otpValue);
      }
    },
    [length, scheduleTimeout, callback, setNextOtpValues]
  );

  const handleTextChange = useCallback(
    (text: string, index: number) => {
      // Handle backspace through text change
      if (text === '') {
        handleBackspace(index);
        return;
      }

      // Handle paste operation
      if (text.length > 1) {
        handlePaste(text, index);
        return;
      }

      const digit = text.replace(/\D/g, '');
      if (!digit) {
        return;
      }

      // Update the OTP value
      const newValues = [...otpValuesReference.current];
      newValues[index] = digit;
      setNextOtpValues(newValues);

      // Move to next input if available
      if (digit && index < length - 1) {
        inputReferences.current[index + 1]?.focus();
      } else if (index === length - 1 && digit) {
        // Check completion for last input
        const otpValue = newValues.join('');
        if (otpValue.length === length && newValues.every(Boolean)) {
          callback?.(otpValue);
        }
        inputReferences.current[index]?.blur();
      }
    },
    [handleBackspace, handlePaste, length, callback, setNextOtpValues]
  );

  // Create and memoize the input fields
  const renderInputs = useMemo(() => {
    // Using new Array() instead of Array.from to satisfy the unicorn/new-for-builtins rule
    return new Array(length).fill(null).map((_, index) => (
      <TextInput
        autoComplete="one-time-code"
        inputMode="numeric"
        key={index}
        testID={`otp-input-${index}`}
        keyboardType="number-pad"
        maxLength={1}
        onBlur={handleOnBlur}
        onChangeText={(text) => {
          handleTextChange(text, index);
        }}
        onFocus={() => {
          handleOnFocus(index);
        }}
        onKeyPress={(e) => {
          handleKeyPress(e, index);
        }}
        placeholder="0"
        placeholderTextColor={colors.gray7}
        ref={(element) => {
          inputReferences.current[index] = element;
        }}
        selectionColor={colors.primary}
        selectTextOnFocus
        style={[
          componentStyles.input,
          focusedIndex === index && componentStyles.focus,
        ]}
        accessibilityLabel={`OTP digit ${index + 1}`}
        accessibilityState={{ selected: focusedIndex === index }}
        textAlignVertical="center"
        value={otpValues[index]}
      />
    ));
  }, [
    componentStyles.input,
    componentStyles.focus,
    focusedIndex,
    colors.gray7,
    colors.primary,
    handleOnFocus,
    handleOnBlur,
    handleKeyPress,
    handleTextChange,
    length,
    otpValues,
  ]);

  return (
    <View
      testID="otp-input"
      style={[componentStyles.container, style]}
    >
      {renderInputs}
    </View>
  );
};

export default OTPInput;
