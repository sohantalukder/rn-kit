import { useTheme } from '../../theme';
import type { IconProps } from '../../types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DownArrowIcon: React.FC<IconProps> = ({
  fill,
  height = 20,
  width = 20,
}) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill={fill ?? colors.text}
        fillRule="evenodd"
        d="M4.47 7.22a.75.75 0 0 1 1.06 0L10 11.69l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default DownArrowIcon;
