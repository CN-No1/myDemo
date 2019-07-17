const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@$', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'))
        .set('public', resolve('public'))
        .set('less', resolve('src/less'))
        .set('utils', resolve('src/utils'))
        .set('plugins', resolve('src/plugins'))
        .set('api', resolve('src/common/api'))
  },
  devServer: {
    port: 8123,
    proxy: {
      '/api': {
        target: 'http://192.168.11.127:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
