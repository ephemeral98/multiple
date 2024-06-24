const UnoCSS = require('@unocss/webpack').default;
const presetUno = require('@unocss/preset-uno').default;

const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  reactStrictMode: false,
  webpack: (config, context) => {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }));

    if (context.buildId !== 'development') {
      config.cache = false;
    }

    // Add file-loader configuration for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: `/_next/static/videos/`,
          outputPath: `${context.isServer ? '../' : ''}static/videos/`,
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
