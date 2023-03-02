const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081
  }
  // chainWebpack: config => {
  //   // 画像ファイル用のローダーを設定する
  //   config.module.rule('images')
  //     .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  //     .use('url-loader')
  //       .loader('url-loader')
  //       .options({
  //         limit: 8192,
  //         esModule: false
  //       });
  // }
})
