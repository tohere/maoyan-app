// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'

import FastClick from 'fastclick'

import { showLoading, hideLoading } from './components/Loading'

FastClick.attach(document.body) // 解决移动端点击300ms延时问题

Vue.config.productionTip = false

Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading

Vue.use(Mint)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
