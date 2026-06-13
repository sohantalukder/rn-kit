import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  AccessibilityProps,
  DimensionValue,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Image as RNImage,
  StyleSheet,
  View,
} from 'react-native';
import PlaceholderImage from '../../../assets/icons/Placeholder.icon';
import Skeleton from '../skeleton/Skeleton';

type ImageSource = ImageSourcePropType | { uri?: string; require?: number };

type Properties = AccessibilityProps & {
  source: ImageSource;
  borderRadius?: number;
  resizeMode?: ImageResizeMode;
  priority?: 'low' | 'normal' | 'high';
  cache?: 'immutable' | 'web' | 'cacheOnly';
  height?: DimensionValue;
  width?: DimensionValue;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ImageStyle>;
  fallbackSource?: ImageSourcePropType;
  placeholder?: React.ReactNode;
  showLoader?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  testID?: string;
};

const isUsableSource = (
  source?: ImageSourcePropType
): source is ImageSourcePropType => {
  if (!source) return false;
  if (typeof source === 'number') return true;
  if (Array.isArray(source)) return source.length > 0;
  return typeof source.uri === 'string' && source.uri.length > 0;
};

const normalizeSource = (source?: ImageSource): ImageSourcePropType | undefined => {
  if (!source) return undefined;
  if (typeof source === 'number' || Array.isArray(source)) return source;

  if ('require' in source && typeof source.require === 'number') {
    return source.require;
  }

  if (typeof source.uri !== 'string' || source.uri.length === 0) {
    return undefined;
  }

  try {
    if (source.uri.startsWith('{') || source.uri.startsWith('[')) {
      return JSON.parse(source.uri) as ImageSourcePropType;
    }
  } catch (error: unknown) {
    if (__DEV__) {
      console.error(error);
    }
  }

  return { ...source, uri: source.uri };
};

const ImagePreview: React.FC<Properties> = ({
  source,
  resizeMode = 'cover',
  borderRadius = 0,
  cache: _cache = 'immutable',
  priority: _priority = 'normal',
  height,
  width,
  wrapperStyle,
  style,
  fallbackSource,
  placeholder,
  showLoader = true,
  onLoad,
  onError,
  onLoadStart,
  onLoadEnd,
  testID = 'image-preview',
  ...accessibilityProps
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [didFailPrimary, setDidFailPrimary] = useState(false);

  const imageStyle = useMemo(
    () => [{ height, width, borderRadius }, style],
    [borderRadius, height, style, width]
  );

  const primarySource = useMemo(() => normalizeSource(source), [source]);

  useEffect(() => {
    setDidFailPrimary(false);
  }, [primarySource]);

  const displaySource = useMemo(() => {
    if (didFailPrimary && isUsableSource(fallbackSource)) {
      return fallbackSource;
    }

    return isUsableSource(primarySource) ? primarySource : undefined;
  }, [didFailPrimary, fallbackSource, primarySource]);

  const shouldRenderImage = isUsableSource(displaySource);
  const shouldShowLoader = showLoader && isLoading && shouldRenderImage;

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoad = useCallback(
    (_event: NativeSyntheticEvent<ImageLoadEventData>) => {
      setIsLoading(false);
      onLoad?.();
    },
    [onLoad]
  );

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleError = useCallback(
    (_event: NativeSyntheticEvent<ImageErrorEventData>) => {
      setIsLoading(false);

      if (!didFailPrimary) {
        setDidFailPrimary(true);
      }

      onError?.();
    },
    [didFailPrimary, onError]
  );

  const fallbackContent = useMemo(() => {
    if (placeholder) return placeholder;

    return (
      <PlaceholderImage
        style={[styles.placeholder, imageStyle]}
      />
    );
  }, [imageStyle, placeholder]);

  return (
    <View
      style={[styles.container, wrapperStyle, { height, width }]}
      testID={`${testID}-container`}
    >
      {shouldRenderImage ? (
        <RNImage
          {...accessibilityProps}
          source={displaySource}
          style={[styles.image, imageStyle]}
          resizeMode={resizeMode}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          onLoadEnd={handleLoadEnd}
          testID={testID}
        />
      ) : (
        fallbackContent
      )}

      {shouldShowLoader && (
        <View
          style={[styles.loader, styles.pointerEventsNone]}
          testID={`${testID}-loader`}
        >
          <Skeleton
            height="100%"
            width="100%"
            borderRadius={borderRadius}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  loader: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  placeholder: {
    height: '100%',
    width: '100%',
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
});

export default memo(ImagePreview);
