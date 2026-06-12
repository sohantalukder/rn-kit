import React from 'react';

const insets = { bottom: 0, left: 0, right: 0, top: 0 };
const frame = { height: 844, width: 390, x: 0, y: 0 };

export const SafeAreaProvider = ({ children }: React.PropsWithChildren) => <>{children}</>;
export const SafeAreaView = ({ children }: React.PropsWithChildren) => <>{children}</>;
export const SafeAreaInsetsContext = React.createContext(insets);
export const SafeAreaFrameContext = React.createContext(frame);

export function useSafeAreaInsets() {
  return insets;
}

export function useSafeAreaFrame() {
  return frame;
}

export const initialWindowMetrics = {
  frame,
  insets,
};
