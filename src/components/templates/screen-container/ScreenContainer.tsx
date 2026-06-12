import type { PropsWithChildren } from 'react';
import React from 'react';
import type { ColorValue, StyleProp, ViewStyle, ViewProps } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '../../../theme';
import { StatusBar } from '../../atoms';
import { StatusBarStyle } from '../../atoms/status-bar/StatusBar';
import { Variant } from '../../../theme/_config';

/**
 * Common properties for screen container components
 */
export type BaseScreenProps = PropsWithChildren<{
  /** Custom style for the container */
  readonly containerStyle?: StyleProp<ViewStyle>;
  /** Status bar style (light/dark) */
  readonly barStyle?: StatusBarStyle;
  /** Background color override */
  readonly bgColor?: ColorValue;
  /** Whether to show the header */
  readonly showHeader?: boolean;
  /** Whether component should apply background image */
  readonly barBackgroundColor?: ColorValue;
}> &
  Omit<ViewProps, 'mode'>;

/**
 * A unified screen container component that provides consistent layout, safe areas,
 * status bar handling across the application.
 *
 * @example
 * // Basic usage
 * <ScreenContainer>
 *   <YourScreenContent />
 * </ScreenContainer>
 *
 * @example
 * // With custom settings
 * <ScreenContainer
 *   barStyle={StatusBarStyle.LIGHT}
 *   bgColor="#f0f0f0"
 *   showHeader={false}
 * >
 *   <YourScreenContent />
 * </ScreenContainer>
 */
const ScreenContainer: React.FC<BaseScreenProps> = ({
  children,
  containerStyle,
  barStyle,
  bgColor,
  showHeader = true,
  style,
  barBackgroundColor,
  ...props
}) => {
  const { layout, navigationTheme, variant } = useTheme();

  // Determine status bar style based on theme variant if not provided
  const resolvedBarStyle =
    barStyle ??
    (variant === Variant.DARK ? StatusBarStyle.LIGHT : StatusBarStyle.DARK);

  // Use background color from theme if not explicitly provided
  const backgroundColor = bgColor ?? navigationTheme.colors.background;

  return (
    <View
      {...props}
      style={[layout.flex_1, style]}
    >
      <StatusBar
        bgColor={barBackgroundColor ?? navigationTheme.colors.background}
        showHeader={showHeader}
        barStyle={resolvedBarStyle}
      />
      <View style={[layout.flex_1, { backgroundColor }, containerStyle]}>
        {children}
      </View>
    </View>
  );
};

export default ScreenContainer;
