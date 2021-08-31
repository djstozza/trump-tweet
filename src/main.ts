import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const connectionUrl = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_URL || '' : '/'

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(connectionUrl),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
