import React, { memo, useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import AppBottomSheet from './AppBottomSheet';
import rs from '../../../utilities/responsiveSize';

/**
 * Properties for the BottomSheet component.
 */
type Properties = PropsWithChildren<{
  /**
   * Whether the bottom sheet is visible.
   */
  readonly visible: boolean;
  /**
   * Callback function to handle the request to close the bottom sheet.
   */
  readonly onRequestClose: () => void;
  /**
   * Callback function triggered when the bottom sheet is fully closed.
   */
  readonly onClose?: () => void;
  /**
   * The content to display inside the bottom sheet.
   */
  readonly children: React.ReactNode;
  /**
   * The maximum height of the bottom sheet.
   */
  readonly maxHeight?: number;
  /**
   * Whether to enable swipe-to-close gesture.
   * @default true
   */
  readonly enableSwipeToClose?: boolean;
  /**
   * Whether to enable tap on overlay to close the bottom sheet.
   * @default true
   */
  readonly enableOverlayTapToClose?: boolean;
  /**
   * The minimum height of the bottom sheet.
   * @default 50
   */
  readonly minHeight?: number;
  /**
   * Threshold in pixels to determine when the sheet should close after dragging.
   * @default 100
   */
  readonly closeThreshold?: number;
  /**
   * Whether to handle the hardware back button (Android only).
   * @default true
   */
  readonly handleBackButton?: boolean;
  /**
   * Accessibility label for the bottom sheet.
   */
  readonly accessibilityLabel?: string;
  /**
   * The style of the bottom sheet.
   */
  readonly style?: StyleProp<ViewStyle>;
  /**
   * Controls whether the web sheet overlays the page or stays inside its parent.
   * Native platforms always use modal presentation.
   * @default 'modal'
   */
  readonly webPresentation?: 'modal' | 'contained';
}>;

/**
 * A customizable bottom sheet component with gesture support.
 */
const BottomSheet: React.FC<Properties> = memo(
  ({
    visible,
    onRequestClose,
    onClose,
    children,
    maxHeight,
    enableSwipeToClose = true,
    enableOverlayTapToClose = true,
    minHeight = rs('hf') / 4,
    closeThreshold = 100,
    handleBackButton: _handleBackButton = true,
    accessibilityLabel = 'Bottom sheet',
    style,
    webPresentation = 'modal',
  }) => {
    const handleRequestClose = useCallback(() => {
      onRequestClose();
      onClose?.();
    }, [onClose, onRequestClose]);

    const handleDismiss = useCallback(() => {
      if (!visible) {
        onClose?.();
      }
    }, [onClose, visible]);

    return (
      <AppBottomSheet
        visible={visible}
        onClose={handleRequestClose}
        onDismiss={handleDismiss}
        maxHeight={maxHeight}
        minHeight={minHeight}
        height={maxHeight}
        enableSwipeToClose={enableSwipeToClose}
        closeOnBackdropPress={enableOverlayTapToClose}
        closeThreshold={closeThreshold}
        accessibilityLabel={accessibilityLabel}
        containerStyle={style}
        webPresentation={webPresentation}
        testID="bottom-sheet"
      >
        {children}
      </AppBottomSheet>
    );
  }
);

export default BottomSheet;
