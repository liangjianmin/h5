import Vue from 'vue';
import axios from 'axios';

import router from './router';
import store from './store';

import App from './App.vue';

import Util from './util'

import 'mint-ui/lib/style.css';

// 路由过滤
import './router_filter';

// 设置请求头
Vue.prototype.$http = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) {
  config.headers.common['X-Dola-Time'] = Util.getSeconds();
  config.headers.common['X-Dola-ClientID'] = Util.getGuid();
  return config;
}, function (error) {
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
