import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'


const state = {
    maimaitiinfo: {},
    userDetail: {},
    assetDetail: {},
    chartData: {},
    chartSettings: {},
    chartColors: [],
    chartHeight: '400px',
    chartNull: true,
    userPlanDetail: {},
    userPlanDetaildata: [],
    channel: null,
    usertransferList: [],
    usertransferListdata: {},
    investmentList: [],
    investmentListdata: {},
    investmentSchedule: {},
    userSetting: {},
    userCouponRecordInfodata: {},
    userCouponRecordInfo: []
}

const mutations = {
    checkChannelInfo(state, payload) {
        state.maimaitiinfo = payload.res.data;
    },
    userDetail(state, payload) {
        state.userDetail = payload.res.data;
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
    assetDetail(state, payload) {
        state.assetDetail = payload.res.data;
        //资产明细数据 设置
        var rowsArr = [], colorArr = [], chartData, chartSettings;
        if (payload.res.data.reportList.length <= 0) {
            state.chartColors = ['#E5E5E5'];
            chartData = {
                columns: ['key', 'total'],
                rows: [
                    {'key': '', 'total': 100},
                    {'key': '', 'total': 0}
                ]
            }
            chartSettings = {
                offsetY: 200,
                legendLimit: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            formatter: '{d}%'
                        },
                        labelLine: {
                            show: false
                        },
                        color: "#E5E5E5"
                    }
                }
            }
            state.chartHeight = '350px';
            state.chartNull = false;
        } else {
            for (let i = 0; i < payload.res.data.reportList.length; i++) {
                if (payload.res.data.reportList[i].total != 0) {
                    colorArr.push(payload.res.data.reportList[i].color);
                    rowsArr.push({
                        key: payload.res.data.reportList[i].key,
                        total: payload.res.data.reportList[i].total
                    });
                }
            }
            chartData = {
                columns: ['key', 'total'],
                rows: rowsArr
            }
            chartSettings = {
                dimension: 'key',
                metrics: 'total',
                offsetY: 200,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{d}%'
                        },
                        labelLine: {
                            show: true
                        }
                    }
                }
            }
            state.chartHeight = '400px'
            state.chartNull = true;
        }

        state.chartData = chartData;
        state.chartSettings = chartSettings;
        state.chartColors = colorArr;
    },
    userPlanDetail(state, payload) {
        state.userPlanDetail = payload.res.data;
        //搜索条件变化先清空数据
        if (payload.condition) {
            state.userPlanDetaildata = [];
            state.userPlanDetaildata = state.userPlanDetaildata.concat(payload.res.data.userPlan.list);
        } else {
            state.userPlanDetaildata = state.userPlanDetaildata.concat(payload.res.data.userPlan.list);
        }
    },
    usertransferList(state, payload) {
        state.usertransferListdata = payload.res.data;
        //搜索条件变化先清空数据
        if (payload.condition) {
            state.usertransferList = [];
            state.usertransferList = state.usertransferList.concat(payload.res.data.list);
        } else {
            state.usertransferList = state.usertransferList.concat(payload.res.data.list);
        }
    },
    investmentList(state, payload) {
        state.investmentListdata = payload.res.data;
        //搜索条件变化先清空数据
        if (payload.condition) {
            state.investmentList = [];
            state.investmentList = state.investmentList.concat(payload.res.data.list);
        } else {
            state.investmentList = state.investmentList.concat(payload.res.data.list);
        }
    },
    investmentSchedule(state, payload) {
        state.investmentSchedule = payload.res.data;
    },
    userSetting(state, payload) {
        state.userSetting = payload.res.data;
    },
    userCouponRecordInfo(state, payload) {
        state.userCouponRecordInfodata = payload.res.data;
        //搜索条件变化先清空数据
        if (payload.condition) {
            state.userCouponRecordInfo = [];
            state.userCouponRecordInfo = state.userCouponRecordInfo.concat(payload.res.data.list);
        } else {
            state.userCouponRecordInfo = state.userCouponRecordInfo.concat(payload.res.data.list);
        }
    }
}

const actions = {
    sendPhoneyzm({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            phone_num: payload.phone_num,
            type: "update_mobile"
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.sendPhoneyzm(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code');
            var data = JSON.parse(str);
            console.log(data)
            if (data.code != 0) {
                let instance = Toast({
                    message: '发送失败',
                    duration: 2000
                });
            }

        }).catch(function (err) {
        })
    },
    checkPhoneYzm({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            phone_num: payload.phone_num,
            verify_code: payload.verify_code,
            from: payload.from
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.checkPhoneYzm(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code');
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {

            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    reBindMobile({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            phone_num: payload.phone_num,
            yzm: payload.yzm
        }
        let params = Util.getParams('wechat', token, paramsdata);
        params = Util.encryption(Codekey, params, 'code');

        Services.reBindMobile(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            if (data.code == 0) {
                let instance = Toast({
                    message: data.data,
                    duration: 2000
                });
                setTimeout(() => {
                    Util.delCookie('mobile');
                    Util.delCookie('token');
                    window.location.href = '/user/login';
                }, 2000)
            } else {
                let instance = Toast({
                    message: data.msg,
                    duration: 2000
                });
            }
        }).catch(function (err) {
        })
    },
    checkChannelInfo({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        var paramsdata = {
            key: payload.key,
        }
        let params = Util.getParams('wechat', '', paramsdata);
        params = Util.encryption(Codekey, params, 'code');
        Services.checkChannelInfo(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            if (data.code == 0 && data.data != '') {
                commit({
                    type: 'checkChannelInfo',
                    res: data
                });
            } else {
                Toast({
                    message: '网络出现问题，请重试',
                    duration: 1500
                });
            }
        }).catch(function (err) {
        })
    },
    bindAccount({commit}, payload) {
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let Codekey = Util.getRrandomStr();
        var paramsdata = {
            key: payload.key,
            code: payload.code
        }
        let params = Util.getParams('wechat', '', paramsdata);
        params = Util.encryption(Codekey, params, 'code');
        Services.bindAccount(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            Indicator.close();
            if (data.code != 0) {
                let instance = Toast({
                    message: data.msg,
                    duration: 1500
                });
            } else {
                if (payload.code == '') {
                    window.location.href = '/#/associate/success?flag=2';
                } else {
                    window.location.href = '/#/associate/success?flag=1';
                }
            }
        }).catch(function (err) {
        })
    },
    userDetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.userDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'userDetail',
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
                    window.location.href = '/user/login'
                }, 1500)
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    investmentSchedule({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            investment_id: payload.investment_id,
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.investmentSchedule(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'investmentSchedule',
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
                    window.location.href = '/user/login'
                }, 1500)
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    assetDetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.assetDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'assetDetail',
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
                message: data.msg,
                duration: 1500
            });
            setTimeout(() => {
                window.location.href = '/user/login'
            }, 1500)
        })
    },
    userPlanDetail({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            page: payload.page,
            type: payload.status,
            period: payload.period,
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
        Services.userPlanDetail(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'userPlanDetail',
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
        })
    },
    investmentList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_from: payload.filter_from,
            filter_period: payload.filter_period,
            filter_status: payload.filter_status,
            page: payload.page,
            page_size: payload.page_size
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
        Services.investmentList(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'investmentList',
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
        })
    },
    exitPlan({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            user_plan_id: payload.user_plan_id,
            sequel_status: payload.sequel_status,
            safe_password: payload.safe_password
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '正在处理...',
            spinnerType: 'triple-bounce'
        });
        Services.exitPlan(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            Indicator.close();
            if (data.code == 0) {
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/#/user/investmentdetails';
                }, 1500);
            } else {
                Toast({
                    message: data.msg,
                    duration: 1500
                });
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    usertransferList({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            filter_status: payload.filter_status,
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
        Services.usertransferlist(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'usertransferList',
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
    sendyzm({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        var paramsdata = {
            key: payload.key
        }
        let params = Util.getParams('wechat', '', paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.sendyzm(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code');
            var data = JSON.parse(str);
            console.log(data)
            if (data.code != 0) {
                let instance = Toast({
                    message: '发送失败',
                    duration: 2000
                });
            }

        }).catch(function (err) {
        })
    },
    userSetting({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.userSetting(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'userSetting',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                window.location.href = '/';
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    userCouponRecordInfo({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            payment_status: 0,
            coupon_ids: payload.coupon_ids,
            order: "ASC",
            page_size: payload.page_size,
            page: payload.page,
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
        Services.userCouponRecordInfo(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'userCouponRecordInfo',
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
