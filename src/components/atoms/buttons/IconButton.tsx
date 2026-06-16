import rs from '../../../utilities/responsiveSize';
import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../../../theme';

import { Ripple, IconByVariant } from '../../atoms';
import { iconButtonStyles } from './styles/button.styles';
import type { IconButtonProps } from './types/type';

const IconButton = React.memo(
  ({
    bgColor,
    borderRadius = rs(500),
    disabled,
    icon,
    onPress,
    style,
    size = 'medium',
    iconColor,
    iconSize,
    showDot = false,
    dotColor,
    dotSize = rs(8),
    testID,
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
  }: IconButtonProps) => {
    const { colors } = useTheme();
    return (
      <Ripple
        borderRadius={borderRadius}
        disabled={disabled || false}
        onPress={onPress || (() => {})}
        testID={testID ?? 'icon-button'}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={
          accessibilityLabel ?? (typeof icon === 'string' ? icon : 'Icon button')
        }
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      >
        <View
          style={[
            iconButtonStyles.container,
            iconButtonStyles[size],
            {
              backgroundColor: bgColor ?? colors.transparent,
              borderRadius,
            },
            style,
          ]}
        >
          {typeof icon === 'string' ? (
            <IconByVariant
              path={icon}
              {...(iconColor && { color: iconColor })}
              {...(iconSize !== undefined && {
                height: iconSize,
                width: iconSize,
              })}
            />
          ) : (
            icon
          )}
          {showDot ? (
            <View
              testID="icon-button-dot"
              style={[
                iconButtonStyles.dot,
                {
                  backgroundColor: dotColor ?? colors.error,
                  height: dotSize,
                  width: dotSize,
                },
              ]}
            />
          ) : null}
        </View>
      </Ripple>
    );
  }
);

export default IconButton;
