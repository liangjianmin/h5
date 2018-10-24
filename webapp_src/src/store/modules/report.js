import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'


const state = {
    reportdata: {},
    loanarea: [],
    operationReportsNew: {},
    getOperationReportsT1:{}
}

const mutations = {
    report(state, payload) {
        state.reportdata = payload.res.data;
    },
    loanarea(state, payload) {
        state.loanarea = payload.res.data.right;
    },
    operationReportsNew(state, payload) {
        state.operationReportsNew = payload.res.data;
    },
    getOperationReportsT1(state, payload) {
        state.getOperationReportsT1 = payload.res.data;
    }
}

const actions = {
    report({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.getOperationReports(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'report',
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
    loanarea({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        params = Util.encryption(Codekey, params, 'code');
        Services.getLoanArea(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            if (data.code == 0) {
                commit({
                    type: 'loanarea',
                    res: data
                });
            }
        }).catch(function (err) {
        })
    },
    getOperationReportsNew({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        var paramsdata = {
            date: payload.date,
        }
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.getOperationReportsNew(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'operationReportsNew',
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    getOperationReportsT1({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.getOperationReportsT1(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'getOperationReportsT1',
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
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
