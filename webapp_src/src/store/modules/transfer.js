import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'


const state = {
    transferdetail: {},
    applicationTransferInfo: {}
}

const mutations = {
    transferdetail(state, payload) {
        state.transferdetail = payload.res.data;
    },
    applicationTransferInfo(state, payload) {
        state.applicationTransferInfo = payload.res.data;
    }
}

const actions = {
    transferdetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            transfer_id: payload.transfer_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.transferdetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'transferdetail',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/spa'
                }, 1500)
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    applicationTransferInfo({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            investment_id: payload.investment_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.applicationTransferInfo(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'applicationTransferInfo',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/'
                }, 1500)
            }
        }).catch(function (err) {
            Indicator.close();
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
