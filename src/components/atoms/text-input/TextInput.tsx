import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

import { useTheme } from '../../../theme';

import type { CustomInputProps } from './types/type';
import { inputStyles } from './styles/input.styles';
import { InputLabel } from './InputLabel';
import AnimatedLabel from './AnimatedLabel';

// Common validation schemas
const commonSchemas = {
  email: z.string().email('Invalid email address'),
  number: z.string().regex(/^\d+$/, 'Must be a number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  required: z.string().min(1, 'This field is required'),
};

const TextInput: React.FC<CustomInputProps> = ({
  defaultValue = '',
  label,
  labelStyle,
  leftIcon,
  name,
  onChangeText,
  placeholder = '',
  rightHandler,
  rightIcon,
  style = {},
  validationRules = undefined,
  wrapperStyle,
  errorMessage,
  required = false,
  value,
  disabled = false,
  animatedLabel = true,
  ...props
}) => {
  const { colors, layout, gutters, typographies, variant } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    value?.toString() ?? defaultValue?.toString() ?? ''
  );
  const [error, setError] = useState<string>('');
  const inputReference = useRef<RNTextInput>(null);
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value?.toString() ?? '' : currentValue;

  // Memoize styles to prevent recreating on each render
  const styles = useMemo(
    () =>
      inputStyles({
        colors,
        variant,
      }),
    [colors, variant]
  );

  // Get validation schema based on the validation rules
  const getValidationSchema = useCallback(
    (validationRuleKey: string): null | z.ZodType => {
      if (validationRuleKey in commonSchemas) {
        return commonSchemas[validationRuleKey as keyof typeof commonSchemas];
      }
      return null;
    },
    []
  );

  // Validate the input against the selected schema
  const validateInput = useCallback(
    (text: string) => {
      if (!validationRules) {
        return true;
      }

      try {
        // Handle different types of validation rules
        if (typeof validationRules === 'string') {
          const schema = getValidationSchema(validationRules);
          if (schema) {
            schema.parse(text);
            setError('');
            return true;
          }
        } else if (
          typeof validationRules === 'object' &&
          validationRules instanceof z.ZodType
        ) {
          // Direct Zod schema provided
          validationRules.parse(text);
          setError('');
          return true;
        }
        return true;
      } catch (error_) {
        if (error_ instanceof z.ZodError) {
          setError(error_.errors[0]?.message ?? 'Invalid input');
        } else {
          setError('Invalid input');
        }
        return false;
      }
    },
    [validationRules, getValidationSchema]
  );

  // Handle text change with validation
  const handleOnChange = useCallback(
    (text: string) => {
      if (!isControlled) {
        setCurrentValue(text);
      }
      const isValid = validateInput(text);

      if (onChangeText) {
        const fieldName = name?.trim() ? name : undefined;
        onChangeText(text, fieldName, isValid);
      }
    },
    [isControlled, name, onChangeText, validateInput]
  );

  // Handle focus event
  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
    setError('');
  }, []);

  // Handle blur event with validation
  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
    validateInput(inputValue);
  }, [inputValue, validateInput]);

  // Handle right icon press
  const handleRightPress = useCallback(() => {
    if (rightHandler) {
      rightHandler();
    }
  }, [rightHandler]);

  // Compute container style dynamically
  const containerStyle = useMemo(
    () => [
      styles.container,
      style,
      isFocused && styles.activeContainer,
      error && styles.errorContainer,
    ],
    [
      styles.container,
      styles.activeContainer,
      styles.errorContainer,
      style,
      isFocused,
      error,
    ]
  );

  // Compute label style
  const computedLabelStyle = useMemo(
    () => [gutters.paddingBottom_6, labelStyle],
    [gutters.paddingBottom_6, labelStyle]
  );
  const plainLabelStyle = useMemo(
    () => [typographies.body1, gutters.paddingBottom_6, labelStyle],
    [typographies.body1, gutters.paddingBottom_6, labelStyle]
  );
  // Compute error text style
  const errorTextStyle = useMemo(
    () => [typographies.body2, { color: colors.error, marginTop: 4 }],
    [typographies.body2, colors.error]
  );

  /**
   * Set the current value to the default value
   */
  useEffect(() => {
    if (!isControlled) {
      setCurrentValue(defaultValue?.toString() || '');
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (isControlled) {
      setCurrentValue(value?.toString() ?? '');
    }
  }, [isControlled, value]);

  /**
   * Set the error message to the error message
   */
  useEffect(() => {
    setError(errorMessage ?? '');
  }, [errorMessage]);

  return (
    <View style={[layout.fullWidth, layout.flexShrink_1, wrapperStyle]}>
      {animatedLabel ? (
        <AnimatedLabel
          labelStyle={computedLabelStyle}
          label={required && label ? `${label} *` : (label ?? '')}
          value={inputValue}
          isFocused={isFocused}
        />
      ) : label ? (
        <Text style={plainLabelStyle}>{required ? `${label} *` : label}</Text>
      ) : null}
      <View style={containerStyle}>
        {leftIcon ? <View>{leftIcon}</View> : null}
        <RNTextInput
          {...props}
          testID="text-input"
          numberOfLines={1}
          onBlur={handleOnBlur}
          onChangeText={handleOnChange}
          onFocus={handleOnFocus}
          placeholder={animatedLabel && label ? '' : placeholder}
          placeholderTextColor={colors.gray4}
          ref={inputReference}
          selectionColor={colors.primary}
          style={styles.input}
          value={inputValue}
          editable={props.editable ?? !disabled}
          accessibilityState={{ ...props.accessibilityState, disabled }}
        />
        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityLabel="Input action"
            accessibilityState={{ disabled }}
            hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
            onPress={handleRightPress}
            disabled={disabled}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      <InputLabel
        text={error}
        labelStyle={errorTextStyle}
      />
    </View>
  );
};

export default memo(TextInput);
