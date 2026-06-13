import type { Backgrounds } from './backgrounds';
import type { Borders } from './borders';
import type { Variant } from './config';
import type { Fonts } from './fonts';
import type { Gutters } from './gutters';
import type layout from '../layout';
import type { Colors } from '../types/colors';
import type { NavigationTheme } from '../navigation';
import type { Typographies } from './typographies';

export type ComponentTheme = Omit<Theme, 'components' | 'navigationTheme'>;

export type Theme = {
  backgrounds: Backgrounds;
  borders: Borders;
  colors: Colors;
  fonts: Fonts;
  gutters: Gutters;
  layout: typeof layout;
  navigationTheme: NavigationTheme;
  typographies: Typographies;
  variant: Variant;
  logo?: number;
};
