module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: process.env.VUE_APP_API_URL
  }
}
