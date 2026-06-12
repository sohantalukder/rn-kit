import { useTheme } from '../../theme';
import type { IconProps } from '../../types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NoInternetIcon: React.FC<IconProps> = ({
  fill,
  height = 80,
  width = 80,
}) => {
  const { colors } = useTheme();
  const iconColor = fill ?? colors.text;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill={iconColor}
        d="M40 58a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
      />
      <Path
        fill={iconColor}
        fillOpacity={0.75}
        d="M22.36 43.77a25 25 0 0 1 28.95-3.95l-4.62 4.62a18.78 18.78 0 0 0-19.9 3.77 3 3 0 0 1-4.43-4.44ZM12.64 32.57a40 40 0 0 1 52.03-4.68l-4.37 4.37a34 34 0 0 0-43.22 4.74 3 3 0 1 1-4.44-4.43ZM34.24 52.09a10.4 10.4 0 0 1 7.77-1.84l-6.05 6.05a3 3 0 0 1-1.72-4.21Z"
      />
      <Path
        fill={colors.error}
        d="M63.88 17.88a3 3 0 0 1 4.24 4.24l-46 46a3 3 0 1 1-4.24-4.24l46-46Z"
      />
    </Svg>
  );
};

export default NoInternetIcon;
