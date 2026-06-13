import React, { useLayoutEffect, useMemo } from 'react';
import { useRef } from 'react';
import type {
  AccessibilityProps,
  StyleProp,
  ViewStyle,
  ColorValue,
} from 'react-native';
import { Animated, Easing, Platform } from 'react-native';

import { useTheme } from '../../../theme';
import { IconByVariant } from '../../atoms';

const ANIMATION_CONFIG = {
  toValue: 1,
  duration: 1000,
  easing: Easing.linear,
  useNativeDriver: Platform.OS !== 'web',
};

/**
 * Properties for the Loader component.
 */
type Properties = AccessibilityProps & {
  /**
   * The style of the loader.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The color of the loader.
   */
  color?: ColorValue;
};

const Loader: React.FC<Properties> = ({
  style,
  color,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  ...props
}) => {
  const spinAnim = useRef(new Animated.Value(0));
  const { layout, colors } = useTheme();
  const interpolateRotation = useMemo(
    () =>
      spinAnim.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    []
  );

  const animatedStyle = useMemo(
    () => ({
      transform: [{ rotate: interpolateRotation }],
    }),
    [interpolateRotation]
  );

  useLayoutEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinAnim.current, ANIMATION_CONFIG)
    );
    animation.start();

    return () => {
      animation.stop();
      spinAnim.current.stopAnimation();
    };
  }, []);

  return (
    <Animated.View
      {...props}
      testID="loader"
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Loading'}
      accessibilityRole={accessibilityRole ?? 'progressbar'}
      accessibilityState={{ ...accessibilityState, busy: true }}
      style={[layout.alignSelf, animatedStyle, style]}
    >
      <IconByVariant
        path="loader"
        color={color ?? colors.text}
      />
    </Animated.View>
  );
};

export default Loader;
