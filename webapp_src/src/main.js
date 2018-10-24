import Vue from 'vue'
import App from './App'
import axios from 'axios'
import stores from './store/store'
import router from './config'
import filters from './filters'
import Util from './util/index'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()


// css全局加载
require('mint-ui/lib/style.css');
require('./assets/css/wap/index.css');


router.afterEach((to, from, next) => {
    //title设置
    document.title = to.name;

    //全局参数判断
    let channel = to.query.channel; //渠道
    let channel_partner_key = to.query.channel_partner_key;//渠道的加密key
    let act = to.query.act; //活动的关键字

    if (channel) {
        Util.setCookie('channel', channel);
    }
    if (channel_partner_key) {
        Util.setCookie('channel_partner_key', channel_partner_key);
    }
    if (act) {
        Util.setCookie('act', act);
    }

});

//过滤器遍历
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.config.productionTip = false;

//设置请求头
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
    el: '#app',
    router,
    store: stores,
    template: '<App/>',
    components: {App}
})
