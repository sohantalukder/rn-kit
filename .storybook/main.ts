import type { StorybookConfig } from '@storybook/nextjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import webpack from 'webpack';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirname, '..');

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(ts|tsx)',
    '../packages/**/stories/**/*.@(mdx|stories.tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
      '@sohantalukder/rn-kit': path.resolve(projectRoot, 'src'),
      '@d11/react-native-fast-image': path.resolve(
        projectRoot,
        '.storybook/rn-web-mocks/fast-image.tsx'
      ),
      '@gorhom/bottom-sheet': path.resolve(
        projectRoot,
        '.storybook/rn-web-mocks/bottom-sheet.tsx'
      ),
      'react-native-reanimated': path.resolve(
        projectRoot,
        '.storybook/rn-web-mocks/reanimated.ts'
      ),
      'react-native-gesture-handler': path.resolve(
        projectRoot,
        '.storybook/rn-web-mocks/gesture-handler.tsx'
      ),
      'react-native-safe-area-context': path.resolve(
        projectRoot,
        '.storybook/rn-web-mocks/safe-area-context.tsx'
      ),
      'react-native-svg': path.resolve(
        projectRoot,
        '.storybook/rn-web-mocks/react-native-svg.tsx'
      ),
    };

    config.plugins = [
      ...(config.plugins ?? []),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true),
      }),
    ];

    return config;
  },
};

export default config;
