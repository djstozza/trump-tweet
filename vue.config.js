module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: process.env.VUE_APP_API_URL
  },
  pwa: {
    themeColor: '#17a2b8',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "Trump Tweet #MGTA";
          return args;
      })
  }
}
