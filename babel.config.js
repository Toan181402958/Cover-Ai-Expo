module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
              '@components': './src/components',
              '@modules': './src/modules',
              '@assets': './assets',
              '@utils': './src/utils',
              '@constants': './src/constants',
              '@src': './src',
            },
          },
        ],
      ],
    };
  };
  