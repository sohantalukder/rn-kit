import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme';
import type { Colors } from '../../../theme/types/colors';
import rs from '../../../utilities/responsiveSize';
import withOpacity from '../../../utilities/withOpacity';
import Text from '../text/Text';

export type SnapPoint = number | string;

export type AppBottomSheetRef = {
  close: () => void;
  snapToIndex: (index: number) => void;
};

export type AppBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  onDismiss?: () => void;
  onOpen?: () => void;
  onSnapPointChange?: (index: number) => void;
  children: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  handle?: React.ReactNode;
  height?: number | `${number}%`;
  snapPoints?: SnapPoint[];
  initialSnapIndex?: number;
  minHeight?: number;
  maxHeight?: number;
  enableSwipeToClose?: boolean;
  closeOnBackdropPress?: boolean;
  showBackdrop?: boolean;
  showHandle?: boolean;
  closeThreshold?: number;
  scrollable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  webPresentation?: 'modal' | 'contained';
  onContentLayout?: (height: number) => void;
  accessibilityLabel?: string;
  testID?: string;
};

const ANIMATION_DURATION = 250;
const DEFAULT_CLOSE_THRESHOLD = 100;
const DEFAULT_MAX_HEIGHT_RATIO = 0.9;

const getWindowHeight = () => Dimensions.get('window').height;
const isWeb = Platform.OS === 'web';

const resolvePoint = (
  point: SnapPoint,
  windowHeight: number,
  minHeight?: number,
  maxHeight?: number
) => {
  let value = typeof point === 'number' ? point : 0;

  if (typeof point === 'string') {
    if (point.endsWith('%')) {
      value = (windowHeight * Number.parseFloat(point)) / 100;
    } else if (point.endsWith('px')) {
      value = Number.parseFloat(point);
    }
  }

  const nextMinHeight = minHeight ?? 0;
  const nextMaxHeight = maxHeight ?? windowHeight * DEFAULT_MAX_HEIGHT_RATIO;

  return Math.max(nextMinHeight, Math.min(value, nextMaxHeight));
};

const AppBottomSheet = forwardRef<AppBottomSheetRef, AppBottomSheetProps>(
  (
    {
      visible,
      onClose,
      onDismiss,
      onOpen,
      onSnapPointChange,
      children,
      title,
      header,
      footer,
      handle,
      height,
      snapPoints,
      initialSnapIndex = 0,
      minHeight,
      maxHeight,
      enableSwipeToClose = true,
      closeOnBackdropPress = true,
      showBackdrop = true,
      showHandle = true,
      closeThreshold = DEFAULT_CLOSE_THRESHOLD,
      scrollable = true,
      containerStyle,
      contentContainerStyle,
      backdropStyle,
      handleStyle,
      webPresentation = 'modal',
      onContentLayout,
      accessibilityLabel = 'Bottom sheet',
      testID = 'app-bottom-sheet',
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = useMemo(() => stylesheet({ colors }), [colors]);
    const [isMounted, setIsMounted] = useState(visible);
    const [windowHeight, setWindowHeight] = useState(getWindowHeight);
    const activeIndexRef = useRef(Math.max(initialSnapIndex, 0));
    const requestedCloseRef = useRef(false);
    const translateY = useRef(new Animated.Value(windowHeight)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const isContainedWeb = isWeb && webPresentation === 'contained';

    const resolvedSnapPoints = useMemo(() => {
      const sourcePoints =
        snapPoints && snapPoints.length > 0
          ? snapPoints
          : [height ?? maxHeight ?? `${DEFAULT_MAX_HEIGHT_RATIO * 100}%`];

      return sourcePoints.map((point) =>
        resolvePoint(point, windowHeight, minHeight, maxHeight)
      );
    }, [height, maxHeight, minHeight, snapPoints, windowHeight]);

    const getHeightForIndex = useCallback(
      (index: number) => {
        if (resolvedSnapPoints.length === 0) {
          return resolvePoint(height ?? '50%', windowHeight, minHeight, maxHeight);
        }

        const boundedIndex = Math.min(
          Math.max(index, 0),
          resolvedSnapPoints.length - 1
        );

        return resolvedSnapPoints[boundedIndex];
      },
      [height, maxHeight, minHeight, resolvedSnapPoints, windowHeight]
    );

    const [sheetHeight, setSheetHeight] = useState(() =>
      getHeightForIndex(initialSnapIndex)
    );

    const openSheet = useCallback(
      (index = activeIndexRef.current, notifyOpen = true) => {
        const boundedIndex = Math.min(
          Math.max(index, 0),
          Math.max(resolvedSnapPoints.length - 1, 0)
        );
        const nextHeight = getHeightForIndex(boundedIndex);

        activeIndexRef.current = boundedIndex;
        setSheetHeight(nextHeight);
        onSnapPointChange?.(boundedIndex);

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: !isWeb,
          }),
          Animated.timing(backdropOpacity, {
            toValue: showBackdrop ? 1 : 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: !isWeb,
          }),
        ]).start(({ finished }) => {
          if (finished && notifyOpen) {
            onOpen?.();
          }
        });
      },
      [
        backdropOpacity,
        getHeightForIndex,
        onOpen,
        onSnapPointChange,
        resolvedSnapPoints.length,
        showBackdrop,
        translateY,
      ]
    );

    const animateClosed = useCallback(
      (notifyClose: boolean) => {
        if (requestedCloseRef.current && notifyClose) return;
        requestedCloseRef.current = notifyClose;

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: sheetHeight + insets.bottom + rs(24),
            duration: ANIMATION_DURATION,
            useNativeDriver: !isWeb,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: !isWeb,
          }),
        ]).start(({ finished }) => {
          if (!finished) return;
          setIsMounted(false);
          onDismiss?.();
          if (notifyClose) {
            onClose();
          } else {
            requestedCloseRef.current = false;
          }
        });
      },
      [backdropOpacity, insets.bottom, onClose, onDismiss, sheetHeight, translateY]
    );

    const requestClose = useCallback(() => {
      animateClosed(true);
    }, [animateClosed]);

    const handleBackdropPress = useCallback(
      (event: GestureResponderEvent) => {
        event.stopPropagation();
        requestClose();
      },
      [requestClose]
    );

    useImperativeHandle(
      ref,
      () => ({
        close: () => animateClosed(false),
        snapToIndex: (index: number) => {
          openSheet(index, false);
        },
      }),
      [animateClosed, openSheet]
    );

    useEffect(() => {
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setWindowHeight(window.height);
      });

      return () => subscription.remove();
    }, []);

    useEffect(() => {
      if (visible) {
        if (requestedCloseRef.current) return;
        requestedCloseRef.current = false;
        setIsMounted(true);
        activeIndexRef.current = Math.min(
          Math.max(initialSnapIndex, 0),
          Math.max(resolvedSnapPoints.length - 1, 0)
        );
        translateY.setValue(getHeightForIndex(activeIndexRef.current));
        requestAnimationFrame(() => openSheet(activeIndexRef.current, true));
        return;
      }

      if (isMounted) {
        requestedCloseRef.current = false;
        animateClosed(false);
      }
    }, [
      animateClosed,
      getHeightForIndex,
      initialSnapIndex,
      isMounted,
      openSheet,
      resolvedSnapPoints.length,
      translateY,
      visible,
    ]);

    useEffect(() => {
      setSheetHeight(getHeightForIndex(activeIndexRef.current));
    }, [getHeightForIndex]);

    useEffect(() => {
      return () => {
        translateY.stopAnimation();
        backdropOpacity.stopAnimation();
      };
    }, [backdropOpacity, translateY]);

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponder: (
            _event: GestureResponderEvent,
            gestureState: PanResponderGestureState
          ) =>
            enableSwipeToClose &&
            Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
            gestureState.dy > 4,
          onPanResponderMove: (
            _event: GestureResponderEvent,
            gestureState: PanResponderGestureState
          ) => {
            if (!enableSwipeToClose) return;
            translateY.setValue(Math.max(0, gestureState.dy));
          },
          onPanResponderRelease: (
            _event: GestureResponderEvent,
            gestureState: PanResponderGestureState
          ) => {
            if (!enableSwipeToClose) return;

            if (
              gestureState.dy > closeThreshold ||
              (gestureState.vy > 0.75 && gestureState.dy > 20)
            ) {
              requestClose();
              return;
            }

            Animated.timing(translateY, {
              toValue: 0,
              duration: ANIMATION_DURATION,
              useNativeDriver: !isWeb,
            }).start();
          },
        }),
      [closeThreshold, enableSwipeToClose, requestClose, translateY]
    );

    const handleContentSizeChange = useCallback(
      (_width: number, nextHeight: number) => {
        onContentLayout?.(nextHeight);
      },
      [onContentLayout]
    );

    const handleContentLayout = useCallback(
      (event: { nativeEvent: { layout: { height: number } } }) => {
        onContentLayout?.(event.nativeEvent.layout.height);
      },
      [onContentLayout]
    );

    const content = (
      <>
        {header}
        {!header && title ? (
          <View style={styles.header}>
            <Text
              variant="heading3"
              weight="semibold"
            >
              {title}
            </Text>
          </View>
        ) : null}
        {scrollable ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={handleContentSizeChange}
            contentContainerStyle={[
              styles.contentContainer,
              contentContainerStyle,
              { paddingBottom: footer ? rs(12) : insets.bottom + rs(16) },
            ]}
            testID={`${testID}-scroll`}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            onLayout={handleContentLayout}
            style={[
              styles.contentContainer,
              contentContainerStyle,
              { paddingBottom: footer ? rs(12) : insets.bottom + rs(16) },
            ]}
          >
            {children}
          </View>
        )}
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </>
    );

    const sheetContent = (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[
            styles.modal,
            isWeb && styles.webModal,
            isContainedWeb && styles.webContainedModal,
          ]}
          testID={`${testID}-modal`}
        >
          {showBackdrop ? (
            <Animated.View
              style={[
                styles.backdrop,
                isWeb && styles.webBackdrop,
                isContainedWeb && styles.webContainedBackdrop,
                backdropStyle,
                {
                  opacity: backdropOpacity,
                },
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close bottom sheet"
                disabled={!closeOnBackdropPress}
                onPress={handleBackdropPress}
                style={StyleSheet.absoluteFill}
                testID={`${testID}-backdrop`}
              />
            </Animated.View>
          ) : null}

          <Animated.View
            {...panResponder.panHandlers}
            accessibilityLabel={accessibilityLabel}
            accessibilityViewIsModal
            accessible
            importantForAccessibility="yes"
            style={[
              styles.sheet,
              isWeb && styles.webSheet,
              isContainedWeb && styles.webContainedSheet,
              {
                maxHeight: sheetHeight + insets.bottom,
                minHeight,
                transform: [{ translateY }],
              },
              containerStyle,
            ]}
            testID={testID}
          >
            {handle}
            {!handle && showHandle ? (
              <View style={styles.handleContainer}>
                <View style={[styles.handle, handleStyle]} />
              </View>
            ) : null}
            {content}
          </Animated.View>
        </KeyboardAvoidingView>
    );

    if (!isMounted) return null;

    if (isWeb) {
      return sheetContent;
    }

    return (
      <Modal
        transparent
        visible={isMounted}
        animationType="none"
        statusBarTranslucent
        onRequestClose={requestClose}
      >
        {sheetContent}
      </Modal>
    );
  }
);

AppBottomSheet.displayName = 'AppBottomSheet';

const stylesheet = ({ colors }: { colors: Colors }) =>
  StyleSheet.create({
    backdrop: {
      backgroundColor: withOpacity(colors.gray5, 0.5),
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    contentContainer: {
      paddingHorizontal: rs(16),
    },
    footer: {
      paddingHorizontal: rs(16),
      paddingTop: rs(8),
    },
    handle: {
      backgroundColor: withOpacity(colors.gray6, 0.9),
      borderRadius: rs(3),
      height: rs(5),
      width: rs(40),
    },
    handleContainer: {
      alignItems: 'center',
      paddingVertical: rs(10),
    },
    header: {
      paddingBottom: rs(12),
      paddingHorizontal: rs(16),
    },
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: colors.background,
      borderTopLeftRadius: rs(20),
      borderTopRightRadius: rs(20),
      bottom: 0,
      elevation: 10,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      shadowColor: colors.gray5,
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    webBackdrop: {
      position: 'fixed',
      zIndex: 9998,
    } as unknown as ViewStyle,
    webContainedBackdrop: {
      position: 'absolute',
      zIndex: 18,
    } as unknown as ViewStyle,
    webContainedModal: {
      position: 'absolute',
      zIndex: 16,
    } as unknown as ViewStyle,
    webContainedSheet: {
      position: 'absolute',
      zIndex: 19,
    } as unknown as ViewStyle,
    webModal: {
      bottom: 0,
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 9997,
    } as unknown as ViewStyle,
    webSheet: {
      position: 'fixed',
      zIndex: 9999,
    } as unknown as ViewStyle,
  });

export default memo(AppBottomSheet);
