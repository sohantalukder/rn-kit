export const installation = {
  title: 'Installation',
  commands: [
    'npm install @sohantalukder/rn-kit',
    'npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg',
  ],
  notes: [
    'Image, Avatar, PhotoCarousel, BottomSheet, and the global bottom sheet manager are implemented internally.',
    'Image uses React Native Image, so FastImage-style native cache controls are not included.',
    'Follow native setup guides for the listed peer packages in the consuming app.',
  ],
};
