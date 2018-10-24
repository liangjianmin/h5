import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'


const state = {
    appindex: {},
    tokencheck: null,
    uiddata: '',
    productPlan: ''
}

const mutations = {
    appindex(state, payload) {
        state.appindex = payload.res.data;
    },
    tokenCheck(state, payload) {
        if (payload.res.data) {
            state.tokencheck = true;
        } else {
            state.tokencheck = false;
        }
    },
    getUserInfoByUid(state, payload) {
        if (payload.res.data != '') {
            state.uiddata = payload.res.data;
        } else {
            state.uiddata = '';
        }
    },
    getRecentProductPlan(state, payload) {
        state.productPlan = payload.res.data;
    }
}

const actions = {
    appindex({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params);
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.appindex(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data);
            if (data.code == 0) {
                commit({
                    type: 'appindex',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    getUserInfoByUid({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        var paramsdata = {
            uid: payload.uid,
        }
        let params = Util.getParams('wechat', '', paramsdata);
        params = Util.encryption(Codekey, params, 'code');
        Services.getUserInfoByUid(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            commit({
                type: 'getUserInfoByUid',
                res: data
            });
        }).catch(function (err) {

        })
    },
    getRecentProductPlan({commit}, payload) {
        let token = Util.getCookie('token');
        let Codekey = Util.getRrandomStr();
        var paramsdata = {
            product_id: 1,
        }
        let params = Util.getParams('wechat', token, paramsdata);
        params = Util.encryption(Codekey, params, 'code');
        Services.getRecentProductPlan(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            commit({
                type: 'getRecentProductPlan',
                res: data
            });
        }).catch(function (err) {

        })
    },
    tokenCheck({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        params = Util.encryption(Codekey, params, 'code');
        Services.tokenCheck(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data);
            commit({
                type: 'tokenCheck',
                res: data
            });
        }).catch(function (err) {

        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    getters,
    actions
}
