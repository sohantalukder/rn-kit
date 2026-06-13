import type {
  FulfilledThemeConfiguration,
  Variant,
  VariantWithSystem,
  UnionConfiguration,
} from '../types/config';
import type { ComponentTheme, Theme } from '../types/theme';
import type { PropsWithChildren } from 'react';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useColorScheme } from 'react-native';

import {
  generateBackgrounds,
  staticBackgroundStyles,
} from '../backgrounds';
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
  staticBorderStyles,
} from '../borders';
import {
  generateFontColors,
  generateFontSizes,
  staticFontStyles,
} from '../fonts';
import { generateGutters, staticGutterStyles } from '../gutters';
import layout from '../layout';
import generateConfig from '../ThemeProvider/generateConfig';
import { typographies } from '../typographies';
import type { Colors } from '../types/colors';
import type { FontColors } from '../types/fonts';
import type { BorderColors } from '../types/borders';
import type { Gutters } from '../types/gutters';
import type { Backgrounds } from '../types/backgrounds';
import {
  darkNavigationTheme,
  defaultNavigationTheme,
} from '../navigation';

type Context = {
  changeTheme: (variant: VariantWithSystem) => void;
} & Theme;

export const ThemeContext = createContext<Context | undefined>(undefined);

export type ThemeStorageAdapter = {
  getTheme: () => VariantWithSystem | undefined | null;
  setTheme: (variant: VariantWithSystem) => void;
};

type ThemeProviderThemeOverrides = {
  backgrounds?: Record<string, string>;
  borders?: {
    colors?: Record<string, string>;
  };
  colors?: Record<string, string>;
  fonts?: {
    colors?: Record<string, string>;
  };
  navigationColors?: Partial<FulfilledThemeConfiguration['navigationColors']>;
};

export type ThemeProviderTheme = ThemeProviderThemeOverrides & {
  variants?: Partial<Record<Variant, ThemeProviderThemeOverrides>>;
};

type Properties = PropsWithChildren<{
  logo?: number;
  storageAdapter?: ThemeStorageAdapter;
  theme?: ThemeProviderTheme;
}>;

// Cache for generated theme objects to avoid regeneration
const themeCache = new Map<string, ComponentTheme>();
const configCache = new Map<Variant, FulfilledThemeConfiguration>();

const mergeThemeOverrides = (
  baseConfig: FulfilledThemeConfiguration,
  overrides?: ThemeProviderThemeOverrides
): FulfilledThemeConfiguration => {
  if (!overrides) {
    return baseConfig;
  }

  const colorOverrides = overrides.colors ?? {};

  return {
    backgrounds: {
      ...baseConfig.backgrounds,
      ...colorOverrides,
      ...(overrides.backgrounds ?? {}),
    },
    borders: {
      colors: {
        ...baseConfig.borders.colors,
        ...colorOverrides,
        ...(overrides.borders?.colors ?? {}),
      },
      radius: baseConfig.borders.radius,
      widths: baseConfig.borders.widths,
    },
    colors: {
      ...baseConfig.colors,
      ...colorOverrides,
    },
    fonts: {
      colors: {
        ...baseConfig.fonts.colors,
        ...colorOverrides,
        ...(overrides.fonts?.colors ?? {}),
      },
      sizes: baseConfig.fonts.sizes,
    },
    gutters: baseConfig.gutters,
    navigationColors: {
      ...baseConfig.navigationColors,
      ...(overrides.navigationColors ?? {}),
    },
  };
};

const applyThemeOverrides = (
  baseConfig: FulfilledThemeConfiguration,
  theme: ThemeProviderTheme | undefined,
  variant: Variant
): FulfilledThemeConfiguration => {
  const baseTheme = mergeThemeOverrides(baseConfig, theme);
  return mergeThemeOverrides(baseTheme, theme?.variants?.[variant]);
};

function ThemeProvider({
  children,
  logo,
  storageAdapter,
  theme: customTheme,
}: Properties) {
  const colorScheme = useColorScheme();
  const systemTheme = colorScheme === 'dark' ? 'dark' : 'default';

  // Use ref to track initialization to prevent unnecessary effects
  const initialized = useRef(false);

  // Current theme variant
  const [variant, setVariant] = useState<Variant>(() => {
    const storedTheme = storageAdapter?.getTheme();
    if (storedTheme === 'system') {
      return systemTheme;
    }
    return (storedTheme as Variant) || (systemTheme as Variant);
  });

  // Initialize theme at default if not defined (only once)
  useEffect(() => {
    if (initialized.current) return;

    const appHasThemeDefined = storageAdapter?.getTheme();
    if (!appHasThemeDefined) {
      storageAdapter?.setTheme('system');
      setVariant(systemTheme);
    }
    initialized.current = true;
  }, [storageAdapter, systemTheme]); // Empty dependency array since we only want this to run once

  // Update theme variant when system theme changes
  useEffect(() => {
    if (storageAdapter?.getTheme() === 'system') {
      setVariant(systemTheme);
    }
  }, [systemTheme, storageAdapter]); // Changed from colorScheme to systemTheme

  const changeTheme = useCallback(
    (nextVariant: VariantWithSystem) => {
      const newVariant = nextVariant === 'system' ? systemTheme : nextVariant;
      setVariant(newVariant);
      storageAdapter?.setTheme(nextVariant);
    },
    [systemTheme, storageAdapter] // Removed storage from dependencies as it's stable
  );

  // Memoized config generation with caching
  const baseConfig = useMemo(() => {
    if (configCache.has(variant)) {
      return configCache.get(variant)!;
    }

    const config = generateConfig(variant);
    configCache.set(variant, config);
    return config;
  }, [variant]);

  const fullConfig = useMemo(
    () => applyThemeOverrides(baseConfig, customTheme, variant),
    [baseConfig, customTheme, variant]
  );

  // Generate theme styles with caching
  const themeStyles = useMemo(() => {
    const cacheKey = `${variant}-styles`;
    if (!customTheme && themeCache.has(cacheKey)) {
      return themeCache.get(cacheKey)!;
    }

    const fontColors = generateFontColors(
      fullConfig as UnionConfiguration
    ) as FontColors;
    const backgrounds = generateBackgrounds(
      fullConfig as UnionConfiguration
    ) as Backgrounds;
    const gutters = generateGutters(
      fullConfig as UnionConfiguration
    ) as Gutters;
    const borderColors = generateBorderColors(
      fullConfig as UnionConfiguration
    ) as BorderColors;

    const styles = {
      fonts: {
        ...generateFontSizes(),
        ...fontColors,
        ...staticFontStyles,
      },
      backgrounds: {
        ...backgrounds,
        ...staticBackgroundStyles,
      },
      gutters: {
        ...gutters,
        ...staticGutterStyles,
      },
      borders: {
        ...borderColors,
        ...generateBorderRadius(),
        ...generateBorderWidths(),
        ...staticBorderStyles,
      },
      typographies: typographies(fontColors),
    };

    if (!customTheme) {
      themeCache.set(cacheKey, styles as ComponentTheme);
    }
    return styles;
  }, [fullConfig, customTheme, variant]);

  // Memoized navigation theme
  const navigationTheme = useMemo(() => {
    const baseTheme =
      variant === 'dark' ? darkNavigationTheme : defaultNavigationTheme;
    return {
      ...baseTheme,
      colors: fullConfig.navigationColors,
      dark: variant === 'dark',
    };
  }, [variant, fullConfig.navigationColors]);

  // Main theme object
  const theme = useMemo(
    () =>
      ({
        ...themeStyles,
        colors: fullConfig.colors as Colors,
        layout,
        variant,
        logo,
      }) satisfies ComponentTheme,
    [themeStyles, fullConfig.colors, variant, logo]
  );

  // Context value
  const value = useMemo(
    () => ({
      ...theme,
      changeTheme,
      navigationTheme,
    }),
    [theme, changeTheme, navigationTheme]
  );

  return (
    <ThemeContext.Provider value={value as Context}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
