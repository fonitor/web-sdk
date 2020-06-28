import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Monitor from './utils/index'
/* eslint-disable */
let monitor = new Monitor()

Vue.config.productionTip = false

// js 报错监控测试
// setTimeout(() => {
//   console.log(ss)
// }, 3000)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
