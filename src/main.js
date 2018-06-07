// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入整个MintUI 样式需要单独引入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//引入axios来发送请求 
import axios from 'axios'
Vue.prototype.$axios = axios;

// import { Datetime } from 'vux'
// Vue.component('datetime' , Datetime)

import '../static/css/global.css'
Vue.use(MintUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
