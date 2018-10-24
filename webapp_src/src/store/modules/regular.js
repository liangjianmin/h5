import {services as Services} from '../../api/index'
import Util from '../../util/index'
import AreaCard from '../../util/idCardArea'
import {Indicator, Toast, MessageBox} from 'mint-ui'

const state = {
    regularindex: {},
    histroyplan: [],
    regulardetail: {},
    selectBestCoupon: '',
    planUser: '',
    planUserData: [],
    lastHour: [],
    cardAreadata: [],
    lastHourData: {},
    channel: null,
    loanList: [],
    loanListdata: {},
    transferList: [],
    transferListdata: {},
    transferListHistory: {},
    loanListHistory: {},
    investmentDetail: {},
    quickBuyDetail: {},
    defaultQuick: {},
    batchLoanList: [],
    batchLoanListtData: {},
    batchTransferList: [],
    batchTransferListData: {},
    statusBtn: false
}

const mutations = {
    regularindex(state, payload) {
        state.regularindex = payload.res.data;
        state.histroyplan = state.histroyplan.concat(payload.res.data.history_plan.data);
    },
    regulardetail(state, payload) {
        state.regulardetail = payload.res.data;
        /**
         * 区分来源是返利网的 tags=6
         */
        if (payload.res.data.user.usr_tags.length <= 0) {
            state.channel = false;
        } else {
            if (Util.contains(payload.res.data.user.usr_tags, 6)) {
                state.channel = true;
            } else {
                state.channel = false;
            }
        }
    },
    selectBestCoupon(state, payload) {
        state.selectBestCoupon = payload.res.data;
    },
    planUser(state, payload) {
        state.planUser = payload.res.data;
        state.planUserData = state.planUserData.concat(payload.res.data.list);
    },
    lastHour(state, payload) {
        if (payload.res.data != null) {
            state.lastHourData = payload.res.data;
            state.lastHour = state.lastHour.concat(payload.res.data.list);
            for (var i = 0; i < payload.res.data.list.length; i++) {
                state.cardAreadata.push(AreaCard.getAreaByIdCard(payload.res.data.list[i].idnum6));
            }
        } else {
            state.lastHour = [];
        }
    },
    loanList(state, payload) {
        // 如果搜索条件变化 需清空散标数据
        state.loanListdata = payload.res.data;
        if (payload.condition) {
            state.loanList = [];
            state.loanList = state.loanList.concat(payload.res.data.list);
        } else {
            state.loanList = state.loanList.concat(payload.res.data.list);
        }
    },
    loanListHistory(state, payload) {
        state.loanListHistory = payload.res.data;
    },
    transferList(state, payload) {
        // 如果搜索条件变化 需清空transferList数组
        state.transferListdata = payload.res.data;
        if (payload.condition) {
            state.transferList = [];
            state.transferList = state.transferList.concat(payload.res.data.list);
        } else {
            state.transferList = state.transferList.concat(payload.res.data.list);
        }
    },
    transferListHistory(state, payload) {
        state.transferListHistory = payload.res.data;
    },
    investmentDetail(state, payload) {
        state.investmentDetail = payload.res.data;
    },
    quickBuyDetail(state, payload) {
        state.quickBuyDetail = payload.res.data;
        // type: 1散标 2转让 3全部
        if (payload.types === 1) {
            state.defaultQuick = Util.filterRate(payload.res.data.loan_collect_info, 0, 37);
        } else if (payload.types === 2) {
            state.defaultQuick = Util.filterRate(payload.res.data.transfer_collect_info, 0, 37);
        } else if (payload.types === 3) {
            state.defaultQuick = Util.filterCollection(payload.res.data.loan_collect_info, payload.res.data.transfer_collect_info, 0, 37);
        }
    },
    batchLoanList(state, payload) {
        // 如果搜索条件变化 需清空散标数据
        state.batchLoanListtData = payload.res.data;
        if (payload.condition) {
            state.batchLoanList = [];
            state.batchLoanList = state.batchLoanList.concat(payload.res.data.list);
        } else {
            state.batchLoanList = state.batchLoanList.concat(payload.res.data.list);
        }
    },
    batchTransferList(state, payload) {
        // 如果搜索条件变化 需清空转让数据
        state.batchTransferListData = payload.res.data;
        if (payload.condition) {
            state.batchTransferList = [];
            state.batchTransferList = state.batchTransferList.concat(payload.res.data.list);
        } else {
            state.batchTransferList = state.batchTransferList.concat(payload.res.data.list);
        }
    }
}

const actions = {
    regularindex({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            page: payload.page,
            page_size: payload.pageSize
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.regularindex(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'regularindex',
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
    regulardetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            plan_id: payload.plan_id,
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.regulardetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'regulardetail',
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
    loanList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
            filter_period: payload.filter_period,
            filter_unmatch_amount: payload.filter_unmatch_amount,
            page: payload.page,
            page_size: payload.page_size,
            condition: payload.condition
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.loanList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'loanList',
                    res: data,
                    condition: payload.condition
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    loanListHistory({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
            filter_period: payload.filter_period,
            filter_unmatch_amount: payload.filter_unmatch_amount,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');

        Services.loanList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'loanListHistory',
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    transferList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
            filter_period: payload.filter_period,
            filter_money: payload.filter_money,
            page: payload.page,
            page_size: payload.page_size,
            condition: payload.condition
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.transferList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'transferList',
                    res: data,
                    condition: payload.condition
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    transferListHistory({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
            filter_period: payload.filter_period,
            filter_money: payload.filter_money,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');

        Services.transferList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'transferListHistory',
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    selectBestCoupon({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            plan_id: payload.plan_id,
            invest_money: payload.invest_money
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');

        Services.selectBestCoupon(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'selectBestCoupon',
                    res: data
                });
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    planUser({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            plan_id: payload.plan_id,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        params = Util.encryption(Codekey, params, 'code');

        Services.planUser(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            if (data.code == 0) {
                commit({
                    type: 'planUser',
                    res: data
                });
            }
        }).catch(function (err) {

        })
    },
    lastHour({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            plan_id: payload.plan_id,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.lastHour(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'lastHour',
                    res: data
                });
            }
        }).catch(function (err) {
        })
    },
    investmentDetail({commit}, payload) {
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
        Services.investmentDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'investmentDetail',
                    res: data
                });
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
            Toast({
                message: '网络不通',
                duration: 1500
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 1500)
        })
    },
    quickBuyDetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.quickBuyDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'quickBuyDetail',
                    res: data,
                    types: payload.types
                });
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
            Toast({
                message: '网络不通',
                duration: 1500
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 1500)
        })
    },
    batch({commit}, payload) {
        state.statusBtn = true;
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            invest_money: payload.invest_money,
            interest_rate: payload.interest_rate,
            period: payload.period,
            type: payload.types,
            safe_pwd: payload.safe_pwd
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: ' 正在处理...',
            spinnerType: 'triple-bounce'
        });
        Services.batch(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data);
            if (data.code == 0) {
                setTimeout(() => {
                    state.statusBtn = false;
                    Indicator.close();
                    var batch_id = data.data.batch_id;
                    window.location.href = '/#/batch/matchstatus?batch_id=' + batch_id;
                }, 1000);
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
                message: '网络不通',
                duration: 1500
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 1500)
        })
    },
    batchResult({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            batch_id: payload.batch_id
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.batchResult(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data);
            if (data.code == 0) {
                Indicator.close();
                // 1匹配中 2 匹配完成 3 匹配失败
                if (data.data.status == 1) {

                } else if (data.data.status == 2) {
                    Toast({
                        message: '匹配成功',
                        duration: 2000
                    });
                    setTimeout(() => {
                        window.location.href = '/#/batch/investSuccess?principal=' +
                            data.data.principal + '&period=' +
                            data.data.period + '&repay_money=' +
                            data.data.repay_money + '&transfer_interest=' +
                            data.data.transfer_interest + '&real_pay=' +
                            data.data.real_pay + '&transfer_count=' +
                            data.data.transfer_count;
                        window.location.reload();
                    }, 2000);
                } else if (data.data.status === 3) {
                    Toast({
                        message: '投资失败，暂无可匹配的债权',
                        duration: 2500
                    });
                    setTimeout(() => {
                        window.location.href = '/#/batch/detail?type=3';
                        window.location.reload();
                    }, 2500)
                }
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
                message: '网络不通',
                duration: 1500
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 1500)
        })
    },
    batchLoanList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
            filter_period: payload.filter_period,
            filter_unmatch_amount: payload.filter_unmatch_amount,
            page: payload.page,
            page_size: payload.page_size,
            condition: payload.condition
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.loanList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'batchLoanList',
                    res: data,
                    condition: payload.condition
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
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    batchTransferList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
            filter_period: payload.filter_period,
            filter_money: payload.filter_money,
            page: payload.page,
            page_size: payload.page_size,
            condition: payload.condition
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.transferList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'batchTransferList',
                    res: data,
                    condition: payload.condition
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
