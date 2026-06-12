import React, { useCallback, useEffect, useRef, useState } from 'react';
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  BackHandler,
  NativeEventSubscription,
  LayoutChangeEvent,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { bottomSheet, DEFAULT_OPTIONS } from './manager';
import { BottomSheetState, DEFAULT_SNAP_POINTS } from './types';
import { useTheme } from '../../theme';

const BottomSheetContainer: React.FC = () => {
  const sheetRef = useRef<RNBottomSheet>(null);
  const refFrame = useRef<number | null>(null);
  const mounted = useRef(false);
  const { colors } = useTheme();
  const [state, setState] = useState<BottomSheetState>({
    isOpen: false,
    snapIndex: -1,
    component: null,
    props: {},
    options: DEFAULT_OPTIONS,
  });
  const backHandlerSubscription = useRef<NativeEventSubscription | null>(null);

  const addBackHandler = useCallback(() => {
    backHandlerSubscription.current?.remove();
    backHandlerSubscription.current = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
      if (bottomSheet.isOpen()) {
        bottomSheet.close();
        return true;
      }
      return false;
      }
    );
  }, []);

  useEffect(() => {
    mounted.current = true;
    bottomSheet.mount();
    addBackHandler();
    // Set ref using requestAnimationFrame for better timing
    const setRef = () => {
      if (!mounted.current) return;
      if (sheetRef.current) {
        bottomSheet.setRef(sheetRef);
      } else {
        // Retry on next frame if ref not ready
        refFrame.current = requestAnimationFrame(setRef);
      }
    };

    setRef();

    const unsubscribe = bottomSheet.subscribe((newState: BottomSheetState) => {
      setState(newState);
    });

    return () => {
      mounted.current = false;
      if (refFrame.current !== null) {
        cancelAnimationFrame(refFrame.current);
        refFrame.current = null;
      }
      unsubscribe();
      backHandlerSubscription.current?.remove();
      backHandlerSubscription.current = null;
      bottomSheet.destroy();
    };
  }, [addBackHandler]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <TouchableWithoutFeedback
        onPress={() => {
          bottomSheet.close();
        }}
        accessible={true}
        accessibilityLabel="Close bottom sheet"
        accessibilityRole="button"
      >
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={state.options.backdropOpacity ?? 0.3}
          style={[
            {
              backgroundColor: colors.text + '33',
            },
            bottomSheetContainerStyle.backdrop,
            state.options.backdropStyle,
          ]}
        />
      </TouchableWithoutFeedback>
    ),
    [state.options.backdropOpacity, state.options.backdropStyle, colors.text]
  );

  const handleContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (state.options.enableDynamicSizing) {
        const { height } = event.nativeEvent.layout;
        bottomSheet.setContentHeight(height);
      }
    },
    [state.options.enableDynamicSizing]
  );

  const snapPoints = React.useMemo(() => {
    return state.options.snapPoints && state.options.snapPoints.length > 0
      ? [...state.options.snapPoints]
      : [...DEFAULT_SNAP_POINTS];
  }, [state.options.snapPoints]);

  const handleSnapPointChange = useCallback((index: number) => {
    bottomSheet.onSnapPointChange(index);
  }, []);

  // Always render the bottom sheet, but conditionally show content
  const Component = state.component;

  return (
    <RNBottomSheet
      ref={sheetRef}
      index={state.isOpen ? state.snapIndex : -1}
      snapPoints={snapPoints}
      onChange={handleSnapPointChange}
      enablePanDownToClose={state.options.enablePanDownToClose ?? false}
      handleIndicatorStyle={{ backgroundColor: colors.text }}
      {...(state.options.backdrop && { backdropComponent: renderBackdrop })}
      backgroundStyle={{ backgroundColor: colors.background }}
      containerStyle={[
        bottomSheetContainerStyle.container,
        state.options.containerStyle,
      ]}
      handleStyle={state.options.handleStyle}
      animateOnMount={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      accessible={true}
      enableDynamicSizing={false}
      accessibilityLabel="Bottom sheet"
    >
      <BottomSheetView
        // style={layout.flex_1}
        onLayout={handleContentLayout}
        testID="bottom-sheet-content"
      >
        {Component && <Component {...state.props} />}
      </BottomSheetView>
    </RNBottomSheet>
  );
};

export default BottomSheetContainer;

const bottomSheetContainerStyle = StyleSheet.create({
  backdrop: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 9,
  },
  container: {
    zIndex: 1000,
  },
});
