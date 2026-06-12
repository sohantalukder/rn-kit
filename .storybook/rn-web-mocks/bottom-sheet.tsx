import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

export type BottomSheetBackdropProps = ViewProps & {
  appearsOnIndex?: number;
  disappearsOnIndex?: number;
  opacity?: number;
};

export const BottomSheetBackdrop = ({ style, opacity = 0.3, ...props }: BottomSheetBackdropProps) => (
  <View
    {...props}
    style={[
      {
        backgroundColor: `rgba(15, 23, 42, ${opacity})`,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      style,
    ]}
  />
);

export const BottomSheetView = ({ style, ...props }: ViewProps) => (
  <View style={[{ padding: 16 }, style]} {...props} />
);

export const BottomSheetModalProvider = ({ children }: React.PropsWithChildren) => <>{children}</>;
export const BottomSheetScrollView = View;

const BottomSheet = forwardRef<
  { close: () => void; snapToIndex: (_index: number) => void },
  ViewProps & { index?: number; children?: React.ReactNode }
>(({ children, index = 0, style, ...props }, ref) => {
  useImperativeHandle(ref, () => ({
    close: () => {},
    snapToIndex: () => {},
  }));

  if (index < 0) {
    return null;
  }

  return (
    <View
      {...props}
      style={[
        {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          boxShadow: '0 -8px 24px rgba(15, 23, 42, 0.18)',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
});

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
