module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@config': './src/config',
          // '@hooks': './hooks',
          '@utils': './src/utils',
          '@assets': './assets',
          '@constants': './constants',
        },
      },
    ],
  ],
};
