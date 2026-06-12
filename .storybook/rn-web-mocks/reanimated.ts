import { FlatList, Image, ScrollView, Text, View } from 'react-native';

type SharedValue<T> = {
  value: T;
};

const Animated = {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  createAnimatedComponent: <T,>(component: T) => component,
};

export const Easing = {
  bezier: () => (value: number) => value,
  bounce: (value: number) => value,
  cubic: (value: number) => value,
  inOut: (fn: (value: number) => number) => fn,
  linear: (value: number) => value,
};

export const Extrapolate = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

export const Extrapolation = Extrapolate;

export function useSharedValue<T>(value: T): SharedValue<T> {
  return { value };
}

export function useAnimatedStyle<T extends object>(factory: () => T): T {
  return factory();
}

export function useDerivedValue<T>(factory: () => T): SharedValue<T> {
  return { value: factory() };
}

export function useAnimatedReaction() {
  return undefined;
}

export function useAnimatedScrollHandler(handlers: unknown) {
  return handlers;
}

export function useAnimatedRef<T>() {
  return { current: null as T | null };
}

export function withTiming<T>(
  value: T,
  _config?: unknown,
  callback?: (finished?: boolean) => void
): T {
  callback?.(true);
  return value;
}

export function withDelay<T>(_delay: number, value: T): T {
  return value;
}

export function withSpring<T>(value: T): T {
  return value;
}

export function withRepeat<T>(value: T): T {
  return value;
}

export function withSequence<T>(...values: T[]): T {
  return values[values.length - 1];
}

export function cancelAnimation() {
  return undefined;
}

export function runOnJS<T extends (...args: never[]) => unknown>(fn: T): T {
  return fn;
}

export function interpolate(
  value: number,
  input: number[],
  output: number[]
) {
  if (input.length < 2 || output.length < 2) {
    return output[0] ?? value;
  }
  const [inMin, inMax] = input;
  const [outMin, outMax] = output;
  const ratio = (value - inMin) / (inMax - inMin || 1);
  return outMin + ratio * (outMax - outMin);
}

export function interpolateColor(
  value: number,
  input: number[],
  output: string[]
) {
  return value >= (input[1] ?? 1) ? output[1] : output[0];
}

export function clamp(value: number, lowerBound: number, upperBound: number) {
  return Math.min(Math.max(value, lowerBound), upperBound);
}

export function measure() {
  return {
    height: 0,
    pageX: 0,
    pageY: 0,
    width: 0,
    x: 0,
    y: 0,
  };
}

export default Animated;
