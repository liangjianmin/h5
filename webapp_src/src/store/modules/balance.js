import {services as Services} from '../../api/index';
import Util from '../../util/index';
import {Indicator, Toast, MessageBox} from 'mint-ui';

import {jsShowMineCallBack} from '../../util/appCallback';

const getters = {}

const state = {
    balanceInfo: {},
    slots: [],
    minRate: 0,
    maxRate: 0,
    holdMoney: 0,
    minPeriod: 0,
    maxPeriod: 0,
    noBalanceStatus: false,
    openBalanceStatus: false,
    closeBalanceStatus: false
}

function getRate(period) {
    if (0 < period && period <= 6) {
        return '8.0';
    } else if (7 <= period && period <= 12) {
        return '9.0';
    } else if (13 <= period && period <= 18) {
        return '10.0';
    } else if (19 <= period && period <= 24) {
        return '10.6';
    } else if (25 <= period && period <= 36) {
        return '11.0';
    }
};

const mutations = {
    getBalanceInfo(state, payload) {

        var balanceInfos = payload.res.data;

        state.balanceInfo = balanceInfos;

        var arr = [];
        var minDate = balanceInfos.balance_sys_conf.period_min * 1;
        var maxDate = balanceInfos.balance_sys_conf.period_max * 1;

        var userMinDate = balanceInfos.balance_info.period_min * 1;
        var userMaxDate = balanceInfos.balance_info.period_max * 1;

        for (var i = minDate; i <= maxDate; i++) {
            arr.push(i + '个月');
        }

        var minIndex = arr.indexOf(userMinDate + '个月');
        var maxIndex = arr.indexOf(userMaxDate + '个月');

        var slots = [
            {
                flex: 1,
                values: arr,
                className: 'select-date',
                textAlign: 'right',
                defaultIndex: minIndex
            }, {
                divider: true,
                content: '',
                className: 'select-slot'
            }, {
                flex: 1,
                values: arr,
                className: 'select-date',
                textAlign: 'left',
                defaultIndex: maxIndex
            }
        ]

        state.slots = slots;

        var userBalanceMinPeriod = balanceInfos.balance_info.period_min * 1;
        var userBalanceMaxPeriod = balanceInfos.balance_info.period_max * 1;

        state.minRate = getRate(userBalanceMinPeriod);
        state.maxRate = getRate(userBalanceMaxPeriod);

        state.holdMoney = balanceInfos.balance_info.hold_money;

        if (userBalanceMinPeriod < minDate) {
            state.minPeriod = minDate + '个月';
        } else {
            state.minPeriod = userBalanceMinPeriod + '个月';
        }

        if (userBalanceMaxPeriod > maxDate) {
            state.maxPeriod = maxDate + '个月';
        } else {
            state.maxPeriod = userBalanceMaxPeriod + '个月';
        }


        // 复投状态判断
        if (!balanceInfos.balance_info.status) {
            state.closeBalanceStatus = true;
        } else {
            state.openBalanceStatus = true;
        }

    },
    updateMessage(state, payload) {
        state.holdMoney = payload;
    },
    updateMinPeriod(state, payload) {
        state.minPeriod = payload;
        state.minRate = getRate(parseInt(payload));
    },
    updateMaxPeriod(state, payload) {
        console.log(payload);
        state.maxPeriod = payload;
        state.maxRate = getRate(parseInt(payload));
    }
}

const actions = {
    getBalanceInfo({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params);
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        params = Util.encryption(Codekey, params, 'code');
        Services.getBalanceInfo(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'getBalanceInfo',
                    res: data
                });
                Indicator.close();
            } else if (data.code == 990003) {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/user/login?forward_url=LyMvdXNlci9iYWxhbmNl'
                }, 1500)
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
    openBalance({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            hold_money: payload.hold_money,
            period_min: payload.period_min,
            period_max: payload.period_max
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        Indicator.open({
            text: '请求中...',
            spinnerType: 'triple-bounce'
        });
        params = Util.encryption(Codekey, params, 'code');
        Services.setBalanceOpen(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                state.closeBalanceStatus = false;
                if (state.openBalanceStatus) {

//                  Toast({
//                      message: '修改设置成功',
//                      duration: 1500
//                  });
                    Toast({
                        message: '修改设置成功',
                        iconClass: 'icon icon-success',
                        duration: 1500
                    });
                } else {
//                  Toast({
//                      message: '设置成功',
//                      duration: 1500
//                  });
                    Toast({
                        message: '设置成功',
                        iconClass: 'icon icon-success',
                        duration: 1500
                    });
                }

                setTimeout(() => {
                    var platform = Util.getCookie('platform');

                    if (platform !== '') {
                        jsShowMineCallBack(platform);
                    } else {
                        window.location.href = '/#/user/detail';
                    }
                }, 1500);
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
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    closeBalance({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params);
        Indicator.open({
            text: '关闭中...',
            spinnerType: 'triple-bounce'
        });
        params = Util.encryption(Codekey, params, 'code');
        Services.setBalanceClose(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                state.openBalanceStatus = false;
                Toast({
                    message: '已为您关闭余额自动复投',
                    iconClass: 'icon icon-success',
                    duration: 1500
                });
                setTimeout(() => {
                    var platform = Util.getCookie('platform');

                    if (platform !== '') {
                        jsShowMineCallBack(platform);
                    } else {
                        window.location.href = '/#/user/detail';
                    }
                }, 1500);
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
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}
