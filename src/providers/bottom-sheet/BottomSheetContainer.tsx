import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppBottomSheet from '../../components/atoms/bottom-sheet/AppBottomSheet';
import type { AppBottomSheetRef } from '../../components/atoms/bottom-sheet/AppBottomSheet';
import { useTheme } from '../../theme';
import withOpacity from '../../utilities/withOpacity';
import { bottomSheet, DEFAULT_OPTIONS } from './manager';
import { BottomSheetState, DEFAULT_SNAP_POINTS } from './types';

const BottomSheetContainer: React.FC = () => {
  const sheetRef = useRef<AppBottomSheetRef>(null);
  const mounted = useRef(false);
  const { colors } = useTheme();
  const [state, setState] = useState<BottomSheetState>({
    isOpen: false,
    snapIndex: -1,
    component: null,
    props: {},
    options: DEFAULT_OPTIONS,
  });

  useEffect(() => {
    mounted.current = true;
    bottomSheet.mount();
    bottomSheet.setRef(sheetRef);

    const unsubscribe = bottomSheet.subscribe((newState: BottomSheetState) => {
      if (mounted.current) {
        setState(newState);
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
      bottomSheet.destroy();
    };
  }, []);

  const handleClose = useCallback(() => {
    bottomSheet.close();
  }, []);

  const handleContentLayout = useCallback(
    (height: number) => {
      if (state.options.enableDynamicSizing) {
        bottomSheet.setContentHeight(height);
      }
    },
    [state.options.enableDynamicSizing]
  );

  const snapPoints = useMemo(
    () =>
      state.options.snapPoints && state.options.snapPoints.length > 0
        ? [...state.options.snapPoints]
        : [...DEFAULT_SNAP_POINTS],
    [state.options.snapPoints]
  );

  const handleComponent = useMemo(() => {
    if (!state.options.handleComponent) return undefined;
    const HandleComponent = state.options.handleComponent;
    return <HandleComponent />;
  }, [state.options.handleComponent]);

  const Component = state.component;

  return (
    <AppBottomSheet
      ref={sheetRef}
      visible={state.isOpen}
      onClose={handleClose}
      onOpen={state.options.onOpen}
      onSnapPointChange={state.options.onSnapPointChange}
      snapPoints={snapPoints}
      initialSnapIndex={state.snapIndex > -1 ? state.snapIndex : 0}
      enableSwipeToClose={state.options.enablePanDownToClose ?? false}
      closeOnBackdropPress={state.options.backdrop ?? true}
      showBackdrop={state.options.backdrop ?? true}
      minHeight={state.options.minHeight}
      maxHeight={state.options.maxHeight}
      handle={handleComponent}
      handleStyle={state.options.handleStyle}
      backdropStyle={[
        {
          backgroundColor: withOpacity(
            colors.text,
            state.options.backdropOpacity ?? DEFAULT_OPTIONS.backdropOpacity
          ),
        },
        bottomSheetContainerStyle.backdrop,
        state.options.backdropStyle,
      ]}
      containerStyle={[
        bottomSheetContainerStyle.container,
        state.options.containerStyle,
      ]}
      onContentLayout={handleContentLayout}
      testID="bottom-sheet"
    >
      <View testID="bottom-sheet-content">
        {Component && <Component {...state.props} />}
      </View>
    </AppBottomSheet>
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
  },
  container: {
    zIndex: 1000,
  },
});
