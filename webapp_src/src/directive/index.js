import Vue from 'vue'
import BackTopDirective from './backTop'

export default {
    install (Vue) {
        Vue.directive('backTop', BackTopDirective);
    }
}
