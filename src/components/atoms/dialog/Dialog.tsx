import React, { memo, useMemo, useCallback } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import type { ButtonVariant } from '../buttons/types/type';
import Text from '../text/Text';
import { useTheme } from '../../../theme';
import IconByVariant from '../icon-by-variant/IconByVariant';
import withOpacity from '../../../utilities/withOpacity';
import rs from '../../../utilities/responsiveSize';
import Button from '../buttons/Button';

export interface DialogButton {
  label: string;
  type?: ButtonVariant;
  onPress: () => void;
  isLoading?: boolean;
}

export interface DialogIconConfig {
  size?: number;
  color?: string;
}

export interface DialogProps {
  title?: string;
  description?: string;
  icon?: string;
  visible?: boolean;
  onDismiss?: () => void;
  dismissible?: boolean;
  iconConfig?: DialogIconConfig;
  buttons?: DialogButton[];
}

interface DialogIconProps {
  icon: string;
  iconConfig?: DialogIconConfig;
}

const DialogIcon: React.FC<DialogIconProps> = memo(({ icon, iconConfig }) => (
  <IconByVariant
    path={icon}
    {...(iconConfig?.size !== undefined && {
      width: iconConfig.size,
      height: iconConfig.size,
    })}
    {...(iconConfig?.color && { color: iconConfig.color })}
  />
));

DialogIcon.displayName = 'DialogIcon';

interface DialogContentProps {
  title?: string;
  description?: string;
  icon?: string;
  iconConfig?: DialogIconConfig;
}

const DialogContent: React.FC<DialogContentProps> = memo(
  ({ title, description, icon, iconConfig }) => {
    const { gutters } = useTheme();

    return (
      <View style={gutters.gap_12}>
        {icon && (
          <DialogIcon
            icon={icon}
            {...(iconConfig && { iconConfig })}
          />
        )}
        {title && (
          <Text
            weight="semibold"
            variant="heading3"
            accessibilityRole="header"
          >
            {title}
          </Text>
        )}
        {description && <Text color="secondary">{description}</Text>}
      </View>
    );
  }
);

DialogContent.displayName = 'DialogContent';

interface DialogButtonsProps {
  buttons?: DialogButton[];
}

const DialogButtons: React.FC<DialogButtonsProps> = memo(({ buttons }) => {
  const { layout } = useTheme();
  const isSingleButton = buttons?.length === 1;

  const buttonContainerStyle = useMemo(() => {
    if (!buttons?.length) return [];

    const styles: ViewStyle[] = [layout.row, { width: '100%' }];

    if (isSingleButton) {
      styles.push({ justifyContent: 'center' });
    } else {
      styles.push({
        gap: 12,
        justifyContent: 'flex-end',
      });
    }

    return styles;
  }, [buttons, isSingleButton, layout]);

  const buttonItemStyle = useMemo<ViewStyle>(
    () =>
      isSingleButton
        ? { width: '100%' }
        : { flexBasis: 0, flexGrow: 1, flexShrink: 1, minWidth: 0 },
    [isSingleButton]
  );

  if (!buttons?.length) return null;

  return (
    <View style={buttonContainerStyle}>
      {buttons.map((button, index) => (
        <View
          key={`dialog-btn-${index}`}
          style={buttonItemStyle}
        >
          <Button
            onPress={button.onPress}
            text={button.label}
            variant={button.type || 'primary'}
            isLoading={button.isLoading || false}
            wrapStyle={{ height: rs(44) }}
          />
        </View>
      ))}
    </View>
  );
});

// Constants for better performance
const BACKDROP_OPACITY = 0.5;
const MIN_DIALOG_WIDTH = 280;
const DIALOG_MARGIN = 40;
const isWeb = Platform.OS === 'web';

// Main Dialog Component
const Dialog: React.FC<DialogProps> = memo(
  ({
    title,
    icon,
    description,
    buttons = [],
    visible = false,
    onDismiss,
    dismissible = true,
    iconConfig,
  }) => {
    const { gutters, layout, colors, borders } = useTheme();

    const styles = useMemo(() => {
      const backdropStyle = [
        layout?.flex_1,
        layout?.itemsCenter,
        layout.justifyCenter,
        {
          backgroundColor: withOpacity(colors?.gray5, BACKDROP_OPACITY),
        },
        isWeb && webStyles.backdrop,
      ];

      const dialogStyle = [
        {
          backgroundColor: colors.background,
          maxWidth: rs('wf') - DIALOG_MARGIN,
          minWidth: rs(MIN_DIALOG_WIDTH),
          width: '100%' as const,
        },
        isWeb && webStyles.dialog,
        borders.rounded_8,
        gutters.padding_20,
        gutters.gap_12,
      ];

      return { backdropStyle, dialogStyle };
    }, [layout, colors, borders, gutters]);

    const handleBackdropPress = useCallback((e: GestureResponderEvent) => {
      e.stopPropagation();
      if (dismissible && onDismiss) {
        onDismiss();
      }
    }, [dismissible, onDismiss]);

    const stopPropagation = useCallback((e: GestureResponderEvent) => {
      e.stopPropagation();
    }, []);

    // Early return for better performance
    if (!visible) return null;

    const dialogContent = (
        <Pressable
          style={styles.backdropStyle}
          onPress={handleBackdropPress}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
        >
          <Pressable
            style={styles.dialogStyle}
            onPress={stopPropagation}
            accessible
            accessibilityLabel={title || 'Dialog'}
          >
            <DialogContent
              {...(title && { title })}
              {...(description && { description })}
              {...(icon && { icon })}
              {...(iconConfig && { iconConfig })}
            />
            <DialogButtons buttons={buttons} />
          </Pressable>
        </Pressable>
    );

    if (isWeb) {
      return <View style={webStyles.modal}>{dialogContent}</View>;
    }

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={dismissible ? onDismiss : undefined}
        statusBarTranslucent
      >
        {dialogContent}
      </Modal>
    );
  }
);

const webStyles = StyleSheet.create({
  backdrop: {
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 9998,
  } as unknown as ViewStyle,
  dialog: {
    maxWidth: 'calc(100vw - 40px)',
    zIndex: 9999,
  } as unknown as ViewStyle,
  modal: {
    bottom: 0,
    left: 0,
    pointerEvents: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 9997,
  } as unknown as ViewStyle,
});

export default Dialog;
