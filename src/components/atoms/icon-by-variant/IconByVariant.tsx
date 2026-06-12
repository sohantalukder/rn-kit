import type { SvgProps } from 'react-native-svg';

import { useTheme } from '../../../theme';
import { iconRegistry } from '../../../assets/icons';
import type { IconProps } from '../../../types/iconProps';

type Properties = {
  /**
   * The path to the icon like 'leftArrow', 'rightArrow', 'upArrow', 'downArrow'
   */
  readonly path: string;
} & IconProps &
  SvgProps;

function IconByVariant({ height, path, width, color, ...props }: Properties) {
  const { colors } = useTheme();

  const iconProperties = { ...props, height, width, fill: color ?? colors.text };
  const Icon = iconRegistry[path as keyof typeof iconRegistry];

  if (!Icon) {
    if (__DEV__) {
      console.warn(`Icon "${path}" was not found in the ui library registry.`);
    }
    return null;
  }

  return <Icon {...iconProperties} />;
}

export default IconByVariant;
