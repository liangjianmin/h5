import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast, MessageBox} from 'mint-ui'


const state = {
    bespeak: {},
    bespeakDetail: {},
    standardBespeak: {},
    userBatchAutoList: [],
    userBatchAutoListData: {},
    reservationId: '',
    statusBtn: false
}

const mutations = {
    bespeak(state, payload) {
        state.bespeak = payload.res.data;
    },
    bespeakDetail(state, payload) {
        state.bespeakDetail = payload.res.data;
        if (payload.res.data.list.length > 1) {
            state.reservationId = -1;
        } else {
            state.reservationId = payload.res.data.list[0].id;
        }
    },
    userBatchAutoList(state, payload) {
        state.userBatchAutoListData = payload.res.data;
        if (payload.condition) {
            state.userBatchAutoList = [];
            state.userBatchAutoList = state.userBatchAutoList.concat(payload.res.data.list);
        } else {
            state.userBatchAutoList = state.userBatchAutoList.concat(payload.res.data.list);
        }
    }
}

const actions = {
    bespeak({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params);
        params = Util.encryption(Codekey, params, 'code');
        Services.bespeak(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'bespeak',
                    res: data
                });
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
    bespeakDetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            batch_no: payload.batch_no
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        params = Util.encryption(Codekey, params, 'code');
        Services.bespeakDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'bespeakDetail',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1000
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1100);
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    standardBespeak({commit}, payload) {
        state.statusBtn = true;
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            invest_money: payload.invest_money,
            reservation_id: payload.reservation_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        Indicator.open({
            text: '正在处理...',
            spinnerType: 'triple-bounce'
        });
        params = Util.encryption(Codekey, params, 'code');
        Services.standardBespeak(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = '/#/bespeak/success?invest_money=' +
                        data.data.invest_money + '&periods=' +
                        data.data.periods + '&invest_rate=' +
                        data.data.invest_rate;
                    window.location.reload();
                    state.statusBtn = false;
                }, 1100);
            } else if (data.code == 910068) {
                Indicator.close();
                var str_1 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，个人出借金额上限' + data.data.amountset + '万，剩余可投金额' + data.data.remain_money + '元，若需调整出借上限金额，请重新评测';
                var str_2 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，个人出借金额上限' + data.data.amountset + '万，剩余可投金额' + data.data.remain_money + '元，若有疑问，请联系客服400-9300-986';
                var str_3 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，不满足当前项目投资人条件若需调整类型，请重新评测';
                if (payload.invest_money * 1 + data.data.all_principal * 1 > data.data.amountset * 1) {
                    if (data.data.risk_appraisal_type == '激进型') {
                        MessageBox({
                            title: '提示',
                            message: str_2,
                            showConfirmButton: false,
                            showCancelButton: true,
                            cancelButtonClass: 'bank-btn-cancel',
                            cancelButtonText: '关闭'
                        }).then(action => {
                            if (action === 'cancel') {
                                state.statusBtn = false;
                            }
                        });
                    } else {
                        MessageBox({
                            title: '提示',
                            message: str_1,
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonClass: 'bank-btn-confirm',
                            cancelButtonClass: 'bank-btn-cancel',
                            confirmButtonText: '重新评测',
                            cancelButtonText: '关闭'
                        }).then(action => {
                            if (action == 'confirm') {
                                window.location.href = '/app/v1220/ucenter/risk_evaluation'
                            } else if (action === 'cancel') {
                                state.statusBtn = false;
                            }
                        });
                    }
                } else if (data.data.risk_appraisal_type == '激进型') {
                    MessageBox({
                        title: '提示',
                        message: str_2,
                        showConfirmButton: false,
                        showCancelButton: true,
                        cancelButtonClass: 'bank-btn-cancel',
                        cancelButtonText: '关闭'
                    }).then(action => {
                        if (action === 'cancel') {
                            state.statusBtn = false;
                        }
                    });
                } else {
                    MessageBox({
                        title: '提示',
                        message: str_3,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '重新评测',
                        cancelButtonText: '关闭'
                    }).then(action => {
                        if (action == 'confirm') {
                            window.location.href = '/app/v1220/ucenter/risk_evaluation'
                        } else if (action === 'cancel') {
                            state.statusBtn = false;
                        }
                    });
                }
            } else {
                state.statusBtn = false;
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    userBatchAutoCancel({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            batch_auto_id: payload.batch_auto_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        Indicator.open({
            text: '正在取消...',
            spinnerType: 'triple-bounce'
        });
        params = Util.encryption(Codekey, params, 'code');
        Services.userBatchAutoCancel(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                Toast({
                    message: '取消预约成功',
                    duration: 1000
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1100);
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
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    userBatchAutoList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            type: payload.types,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        params = Util.encryption(Codekey, params, 'code');
        Services.userBatchAutoList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'userBatchAutoList',
                    res: data,
                    condition: payload.condition
                });
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
                message: '网络出现问题，请重试',
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
