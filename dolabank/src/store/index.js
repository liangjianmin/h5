import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions.js';
import mutations from './mutations.js';
import home from './modules/home';
import home2 from './modules/home2';

export default new Vuex.Store({
    modules: {
        home,
        home2
    },
    actions,
    mutations
});
