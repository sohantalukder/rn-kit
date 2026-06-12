import { useTheme } from '../../theme';
import type { IconProps } from '../../types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CancelIcon: React.FC<IconProps> = ({ fill, height = 20, width = 20 }) => {
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
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L10 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L11.06 10l3.47 3.47a.75.75 0 1 1-1.06 1.06L10 11.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L8.94 10 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default CancelIcon;
