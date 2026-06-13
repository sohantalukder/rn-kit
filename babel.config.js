module.exports = function babelConfig(api) {
  const isNext = api.caller((caller) => caller?.name === 'next-babel-loader');

  return {
    plugins: ['@babel/plugin-transform-class-static-block'],
    presets: [isNext ? 'next/babel' : 'module:@react-native/babel-preset'],
  };
};
