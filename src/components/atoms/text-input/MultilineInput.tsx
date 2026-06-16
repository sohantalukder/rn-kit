import rs from '../../../utilities/responsiveSize';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '../../../theme';

import type { MultilineInputProps } from './types/type';
import { inputStyles } from './styles/input.styles';
import AnimatedLabel from './AnimatedLabel';

const MultilineInput: React.FC<MultilineInputProps> = ({
  animatedLabel = false,
  containerStyle,
  defaultValue,
  height = rs(150),
  inputStyle = {},
  label = '',
  labelStyle = {},
  name = '',
  numberOfLines = 5,
  onChangeText,
  onChangeValue,
  placeholder,
  textAlignVertical = 'top',
  value,
  ...props
}) => {
  const { colors, gutters, typographies, variant } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    value?.toString() ?? defaultValue?.toString() ?? ''
  );
  const inputReference = useRef<TextInput>(null);
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value?.toString() ?? '' : currentValue;

  // Memoize styles to prevent unnecessary recalculations
  const styles = useMemo(
    () =>
      inputStyles({
        colors,
        variant,
      }),
    [colors, variant]
  );

  // Handle text changes
  const handleChangeText = useCallback(
    (text: string) => {
      if (!isControlled) {
        setCurrentValue(text);
      }

      if (onChangeValue) {
        onChangeValue(text, name);
      }

      if (onChangeText) {
        onChangeText(text, name);
      }
    },
    [isControlled, onChangeValue, onChangeText, name]
  );

  // Handle focus event
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Handle blur event
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Get container style based on focus state
  const containerStyles = useMemo(
    () => [
      styles.multiLineContainer,
      isFocused && styles.activeContainer,
      containerStyle,
    ],
    [
      styles.multiLineContainer,
      styles.activeContainer,
      containerStyle,
      isFocused,
    ]
  );

  // Get label style
  const labelStyles = useMemo(
    () => [typographies.body1, gutters.paddingBottom_6, labelStyle],
    [typographies.body1, gutters.paddingBottom_6, labelStyle]
  );
  const animatedLabelStyles = useMemo(
    () => [gutters.paddingBottom_6, labelStyle],
    [gutters.paddingBottom_6, labelStyle]
  );

  // Get input style
  const textInputStyles = useMemo(
    () => [styles.input, { height }, inputStyle],
    [styles.input, height, inputStyle]
  );

  useEffect(() => {
    if (!isControlled) {
      setCurrentValue(defaultValue?.toString() ?? '');
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (isControlled) {
      setCurrentValue(value?.toString() ?? '');
    }
  }, [isControlled, value]);

  return (
    <View style={styles.multiLineWrapper}>
      {animatedLabel ? (
        <AnimatedLabel
          label={label ? String(label) : ''}
          labelStyle={animatedLabelStyles}
          value={inputValue}
          isFocused={isFocused}
        />
      ) : label ? (
        <Text style={labelStyles}>{label}</Text>
      ) : null}
      <View
        style={containerStyles}
        testID="multiline-input-container"
      >
        <TextInput
          {...props}
          testID="multiline-input"
          multiline
          numberOfLines={numberOfLines}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholder={animatedLabel && label ? '' : placeholder}
          placeholderTextColor={colors.gray4}
          ref={inputReference}
          selectionColor={colors.primary}
          style={textInputStyles}
          textAlignVertical={textAlignVertical}
          value={inputValue}
        />
      </View>
    </View>
  );
};

export default React.memo(MultilineInput);
