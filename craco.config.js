const path = require('path')

const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@assets': resolvePath('./src/assets'),
      '@store': resolvePath('./src/store'),
      '@styles': resolvePath('./src/styles'),
      '@utils': resolvePath('./src/utils'),
      '@pages': resolvePath('./src/pages'),
    },
    configure: (webpackConfig, { env }) => {
      if (env !== 'production') {
        return webpackConfig
      }

      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        runtimeChunk: true,
        splitChunks: {
          ...webpackConfig.optimization.splitChunks,
          chunks: 'all',
        },
      }

      return webpackConfig
    },
  },
}
