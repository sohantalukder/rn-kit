require('react-native-gesture-handler/jestSetup');

jest.mock('@react-navigation/native', () => ({
  DarkTheme: {
    dark: true,
    colors: {
      primary: '#000000',
      background: '#000000',
      card: '#000000',
      text: '#ffffff',
      border: '#000000',
      notification: '#000000',
    },
  },
  DefaultTheme: {
    dark: false,
    colors: {
      primary: '#000000',
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#ffffff',
      notification: '#000000',
    },
  },
}));

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  const chain = {
    enabled: jest.fn(() => chain),
    maxDuration: jest.fn(() => chain),
    minDistance: jest.fn(() => chain),
    onBegin: jest.fn(() => chain),
    onChange: jest.fn(() => chain),
    onEnd: jest.fn(() => chain),
    onFinalize: jest.fn(() => chain),
    onStart: jest.fn(() => chain),
    onTouchesCancelled: jest.fn(() => chain),
    onTouchesDown: jest.fn(() => chain),
    onTouchesUp: jest.fn(() => chain),
    onUpdate: jest.fn(() => chain),
  };

  return {
    Gesture: {
      Pan: jest.fn(() => chain),
      Tap: jest.fn(() => chain),
    },
    GestureDetector: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    GestureHandlerRootView: ({ children, ...props }) =>
      React.createElement(View, props, children),
  };
});

jest.mock('react-native-reanimated', () => {
  const { Animated } = require('react-native');
  const immediate = (value, _config, callback) => {
    callback?.(true);
    return value;
  };

  return {
    __esModule: true,
    default: {
      View: Animated.View,
      FlatList: Animated.FlatList,
      ScrollView: Animated.ScrollView,
      createAnimatedComponent: Animated.createAnimatedComponent,
    },
    Easing: {
      bezier: jest.fn(() => jest.fn()),
      cubic: jest.fn(),
      inOut: jest.fn((value) => value),
      linear: jest.fn(),
      out: jest.fn((value) => value),
    },
    Extrapolation: {
      CLAMP: 'clamp',
    },
    cancelAnimation: jest.fn(),
    clamp: (value, lowerBound, upperBound) =>
      Math.min(Math.max(value, lowerBound), upperBound),
    interpolate: jest.fn(() => 0),
    interpolateColor: jest.fn((_value, _inputRange, outputRange) => outputRange[0]),
    measure: jest.fn(() => ({ height: 80, width: 80 })),
    runOnJS: (fn) => fn,
    useAnimatedRef: () => ({ current: null }),
    useAnimatedScrollHandler: (handler) => handler,
    useAnimatedStyle: (factory) => factory(),
    useSharedValue: (value) => ({ value }),
    withDelay: (_delay, value) => value,
    withSequence: (...values) => values[values.length - 1],
    withSpring: immediate,
    withTiming: immediate,
  };
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children, ...props }) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, props, children);
  },
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  const { Image } = require('react-native');
  const FastImage = (props) => React.createElement(Image, props);
  FastImage.priority = { low: 'low', normal: 'normal', high: 'high' };
  FastImage.cacheControl = {
    immutable: 'immutable',
    web: 'web',
    cacheOnly: 'cacheOnly',
  };
  FastImage.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  };
  return FastImage;
});

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');
  const BottomSheet = React.forwardRef(({ children, ...props }, ref) => {
    React.useImperativeHandle(ref, () => ({
      close: jest.fn(),
      snapToIndex: jest.fn(),
    }));
    return React.createElement(View, props, children);
  });
  const BottomSheetBackdrop = (props) => React.createElement(View, props);
  const BottomSheetView = ({ children, ...props }) =>
    React.createElement(View, props, children);
  return {
    __esModule: true,
    default: BottomSheet,
    BottomSheetBackdrop,
    BottomSheetView,
  };
});
