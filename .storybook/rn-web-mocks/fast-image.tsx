import React from 'react';
import { Image } from 'react-native';
import type { ImageProps, ImageStyle, StyleProp } from 'react-native';

type FastImageProps = Omit<ImageProps, 'style'> & {
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
};

function FastImage({ resizeMode = 'cover', ...props }: FastImageProps) {
  return <Image resizeMode={resizeMode} {...props} />;
}

FastImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
};

FastImage.priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};

FastImage.cacheControl = {
  immutable: 'immutable',
  web: 'web',
  cacheOnly: 'cacheOnly',
};

export type ResizeMode = FastImageProps['resizeMode'];
export type { ImageStyle };
export default FastImage;
