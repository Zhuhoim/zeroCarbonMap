const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://10.26.34.84:8080',
    // proxy: {
    //   '/bck': {
    //     target: 'http://10.26.34.84:8081',
    //     pathRewrite: {'^/bck': ''}
    //   }
    // }
  },
})
