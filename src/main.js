// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import Axios from 'axios';
import Vuex from 'vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
// import * as socketApi from '@/utils/socket.js'
// Vue.prototype.socketApi = socketApi


Vue.prototype.$axios = Axios;
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

//"ws://localhost:8099/wbSocket"
Vue.use(Vuex);
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
