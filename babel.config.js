module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@config': './src/config',
          '@utils': './src/utils',
          '@assets': './assets',
          '@constants': './constants',
          '@store': './src/store/',
          '@env': ['node_modules/react-native-dotenv'],
        },
      },
    ],
  ],
};
