import 'scss/main'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Bus from 'config/bus'
import SUI from 'sui-design'
// import 'config/iviewConfig'
// import 'config/elementConfig'

Vue.use(Bus)
Vue.use(SUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
