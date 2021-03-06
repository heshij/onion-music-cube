import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './common/stylus/index.styl'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import api from './api' // 导入api接口
import './register' // 导入组件

Vue.prototype.$api = api // 将api挂载到vue的原型上

Vue.config.devtools = true

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
