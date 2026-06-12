import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';
import { IconByVariant, Text } from '../../atoms';
import { ClickableText } from '../../molecules';
import rs from '../../../utilities/responsiveSize';
import { useTheme } from '../../../theme';
import layout from '../../../theme/layout';
import { staticFontStyles } from '../../../theme/fonts';

/**
 * Props for the NoInternet component.
 * Used to customize text, styles, icons, and retry behavior
 * when no internet connection is detected.
 */
interface NoInternetProps {
  /** Called when the retry button is pressed */
  onRetry?: () => void;
  /** Main text (translation key) */
  text?: string;
  /** Description text (translation key) */
  description?: string;
  /** Style for the main text */
  textStyle?: StyleProp<TextStyle>;
  /** Style for the description text */
  descriptionStyle?: StyleProp<TextStyle>;
  /** Icon name of the no internet connection */
  icon?: string;
  /** Icon size of the no internet connection */
  iconSize?: number;
  /** Whether to show animations */
  animated?: boolean;
  /** Style for the container */
  containerStyle?: StyleProp<ViewStyle>;
}

const NoInternet: React.FC<NoInternetProps> = ({
  onRetry = () => {},
  text = 'No internet connection',
  description = 'Please check your connection and try again.',
  textStyle,
  descriptionStyle,
  icon = 'noInternet',
  iconSize = rs(100),
  animated = true,
  containerStyle,
}) => {
  const { gutters, colors } = useTheme();

  // Animation values
  const fadeAnim = useSharedValue(animated ? 0 : 1);
  const scaleAnim = useSharedValue(animated ? 0.8 : 1);
  const pulseAnim = useSharedValue(1);
  const slideAnim = useSharedValue(animated ? 50 : 0);

  useEffect(() => {
    if (animated) {
      // Initial entrance animation
      fadeAnim.value = withTiming(1, { duration: 800 });
      scaleAnim.value = withTiming(1, { duration: 600 });
      slideAnim.value = withTiming(0, { duration: 700 });

      // Continuous pulse animation for icon
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        false
      );
    } else {
      // Set static values when animation is disabled
      fadeAnim.value = 1;
      scaleAnim.value = 1;
      slideAnim.value = 0;
      pulseAnim.value = 1;
    }

    return () => {
      // Cleanup animations
      cancelAnimation(fadeAnim);
      cancelAnimation(scaleAnim);
      cancelAnimation(pulseAnim);
      cancelAnimation(slideAnim);
    };
  }, [animated, fadeAnim, scaleAnim, pulseAnim, slideAnim]);

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }, { translateY: slideAnim.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(fadeAnim.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(slideAnim.value, [50, 0], [20, 0]),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        layout.itemsCenter,
        layout.justifyCenter,
        layout.flex_1,
        gutters.paddingHorizontal_20,
        containerAnimatedStyle,
        containerStyle,
      ]}
    >
      {/* Animated Icon */}
      <Animated.View style={iconAnimatedStyle}>
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: rs(60),
            padding: rs(20),
            shadowColor: colors.text,
            shadowOffset: {
              width: rs(0),
              height: rs(2),
            },
            shadowOpacity: rs(0.1),
            shadowRadius: rs(4),
            elevation: rs(3),
          }}
        >
          <IconByVariant
            path={icon}
            height={iconSize}
            width={iconSize}
          />
        </View>
      </Animated.View>

      {/* Animated Title */}
      <Animated.View style={textAnimatedStyle}>
        <Text
          weight="semibold"
          variant="heading3"
          style={[
            gutters.marginTop_20,
            staticFontStyles.alignCenter,
            textStyle,
          ]}
        >
          {text}
        </Text>
      </Animated.View>

      {/* Animated Description */}
      <Animated.View style={textAnimatedStyle}>
        <Text
          variant="body2"
          style={[
            gutters.marginTop_12,
            staticFontStyles.alignCenter,
            gutters.paddingHorizontal_10,
            {
              lineHeight: rs(22),
              opacity: rs(0.7),
            },
            descriptionStyle,
          ]}
        >
          {description}
        </Text>
      </Animated.View>

      {/* Animated Retry Button */}
      <Animated.View style={textAnimatedStyle}>
        <ClickableText
          onPress={onRetry}
          style={[
            gutters.marginTop_20,
            gutters.paddingVertical_12,
            gutters.paddingHorizontal_24,
            {
              backgroundColor: colors.primary,
              borderRadius: rs(8),
              minWidth: rs(120),
            },
          ]}
          variant="body1"
          textColor="white"
        >
          Try again
        </ClickableText>
      </Animated.View>
    </Animated.View>
  );
};

export default NoInternet;
