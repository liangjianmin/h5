import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'

const state = {
    standardPowderDetail: {},
    schedule: {},
    getInvestmentList: {},
    getInvestmentListData: []
}

const mutations = {
    standardPowderDetail(state, payload) {
        state.standardPowderDetail = payload.res.data;
    },
    schedule(state, payload) {
        state.schedule = payload.res.data;
    },
    getInvestmentList(state, payload) {
        state.getInvestmentList = payload.res.data;
        state.getInvestmentListData = state.getInvestmentListData.concat(payload.res.data.data);
    }
}

const actions = {
    standardPowderDetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            loan_id: payload.loan_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.standardPowderDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'standardPowderDetail',
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
    },
    schedule({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            loan_id: payload.loan_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.schedule(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'schedule',
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
    },
    getInvestmentList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            loan_id: payload.loan_id,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.getInvestmentList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'getInvestmentList',
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
