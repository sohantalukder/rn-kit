import type { NextConfig } from 'next';
import path from 'node:path';
import webpack from 'webpack';

const projectRoot = process.cwd();
const rnWebMocks = path.resolve(projectRoot, '.storybook/rn-web-mocks');

const nextConfig: NextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.next.json',
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    '@sohantalukder/rn-kit',
  ],
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      '@sohantalukder/rn-kit': './src',
      'react-native-gesture-handler': path.resolve(rnWebMocks, 'gesture-handler.tsx'),
      'react-native-reanimated': path.resolve(rnWebMocks, 'reanimated.ts'),
      'react-native-safe-area-context': path.resolve(rnWebMocks, 'safe-area-context.tsx'),
      'react-native-svg': path.resolve(rnWebMocks, 'react-native-svg.tsx'),
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
      '@sohantalukder/rn-kit': './src',
      'react-native-gesture-handler': path.resolve(rnWebMocks, 'gesture-handler.tsx'),
      'react-native-reanimated': path.resolve(rnWebMocks, 'reanimated.ts'),
      'react-native-safe-area-context': path.resolve(rnWebMocks, 'safe-area-context.tsx'),
      'react-native-svg': path.resolve(rnWebMocks, 'react-native-svg.tsx'),
    };

    config.plugins = [
      ...(config.plugins ?? []),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      }),
    ];

    return config;
  },
};

export default nextConfig;
