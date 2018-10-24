import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import home from './modules/home'
import regular from './modules/regular'
import standard from './modules/standard'
import transfer from './modules/transfer'
import payback from './modules/payback'
import report from './modules/report'
import user from './modules/user'
import activity from './modules/activity'
import bank from './modules/bank'
import channel from './modules/channel'
import bespeak from './modules/bespeak'
import novice from './modules/novice'
import balance from './modules/balance'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        mutations,
        home,
        regular,
        standard,
        transfer,
        payback,
        report,
        user,
        activity,
        bank,
        channel,
        bespeak,
        novice,
        balance
    },
    actions
})
