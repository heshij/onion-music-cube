import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('./common/images/default.jpg')
})

fastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
