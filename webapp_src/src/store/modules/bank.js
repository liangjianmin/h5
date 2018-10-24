import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator,Toast} from 'mint-ui'


const state = {
    bankinfo: {},
    rechargePage: {},
    checkChargeSuccess: null,
    withdrawPage: {},
    bankcardPage: {},
    unbindBankcardPage: {},
    checkRegister: '',
    withdrawStatus: false,
    rechargeStatus: false
}

const mutations = {
    bankinfo(state, payload) {
        state.bankinfo = payload.res.data;
    },
    rechargePage(state, payload) {
        state.rechargePage = payload.res.data;
    },
    checkChargeSuccess(state, payload) {
        if (payload.res.code == 0) {
            state.checkChargeSuccess = true;
        } else {
            state.checkChargeSuccess = false;
        }
    },
    withdrawPage(state, payload) {
        state.withdrawPage = payload.res.data;
    },
    bankcardPage(state, payload) {
        state.bankcardPage = payload.res.data;
    },
    unbindBankcardPage(state, payload) {
        state.unbindBankcardPage = payload.res.data;
    },
    checkRegister(state, payload) {
        state.checkRegister = payload.res.code;
    },
    isWithdrawStatus(state, payload) {
        console.log(payload.withdrawStatus);
        state.withdrawStatus = payload.withdrawStatus;
    }
}

const actions = {
    rechargePage({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.rechargePage(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'rechargePage',
                    res: data
                });
            } else {
                Indicator.close();
                let instance = Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    recharge({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            amount: payload.amount,
            rechargeWay: payload.rechargeWay,
            bankcode: payload.bankcode,
            redirectUrl: payload.redirectUrl
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        state.rechargeStatus = true;
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.recharge(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                Indicator.open({
                    text: '正在跳转存管银行页面',
                    spinnerType: 'triple-bounce'
                });
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = data.data;
                    state.rechargeStatus = false;
                }, 1500);
            } else {
                state.rechargeStatus = false;
                Indicator.close();
                let instance = Toast({
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
    checkChargeSuccess({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            requestNo: payload.requestNo
        }
        Indicator.open({
            text: '拼命加载中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.checkChargeSuccess(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            Indicator.close();
            commit({
                type: 'checkChargeSuccess',
                res: data
            });
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    withdrawPage({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.withdrawPage(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'withdrawPage',
                    res: data
                });
            } else {
                Indicator.close();
                let instance = Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    withdraw({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            amount: payload.amount,
            redirectUrl: payload.redirectUrl
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        state.withdrawStatus = true;
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.withdraw(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            state.withdrawStatus = false;
            if (data.code == 0) {
                Indicator.close();
                Indicator.open({
                    text: '正在跳转存管银行页面',
                    spinnerType: 'triple-bounce'
                });
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = data.data.url;
                }, 1500);
            } else {
                Indicator.close();
                let instance = Toast({
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
    bankcardPage({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.bankcardPage(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'bankcardPage',
                    res: data
                });
            } else {
                Indicator.close();
                let instance = Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    modifyReservedMobile({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            mobile: payload.mobile,
            authCode: payload.authCode
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.modifyReservedMobile(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                let instance = Toast({
                    message: '手机号码修改成功',
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/user/setting';
                }, 1500);
            } else {
                Indicator.close();
                let instance = Toast({
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
    personalRegister({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            redirectUrl: payload.redirectUrl,
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.personalRegister(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                Indicator.open({
                    text: '正在跳转存管银行页面',
                    spinnerType: 'triple-bounce'
                });
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = data.data;
                }, 1500);
            } else {
                Indicator.close();
                if (data.code == 990003) {
                    let instance = Toast({
                        message: data.msg,
                        duration: 1000
                    });
                    setTimeout(() => {
                        Indicator.close();
                        window.location.href = '/user/login?forward_url=LyMvYmFuay9vcGVuX2FjY291bnQ=';
                    }, 1000);
                } else {
                    let instance = Toast({
                        message: data.msg,
                        duration: 1000
                    });
                }
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    srbankSignPage({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            sign_type: payload.sign_type,
            redirectUrl: payload.redirectUrl,
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.srbankSignPage(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                Indicator.open({
                    text: '正在跳转存管银行页面',
                    spinnerType: 'triple-bounce'
                });
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = data.data;
                }, 1500);
            } else {
                Indicator.close();
                if (data.code == 990003) {
                    let instance = Toast({
                        message: data.msg,
                        duration: 1000
                    });
                    setTimeout(() => {
                        Indicator.close();
                        window.location.href = '/user/login?forward_url=LyMvYmFuay9vcGVuX2FjY291bnQ=';
                    }, 1000);
                } else {
                    let instance = Toast({
                        message: data.msg,
                        duration: 1000
                    });
                }
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    bankinfo({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            bankcode: payload.bankcode,
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.bankinfo(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'bankinfo',
                    res: data
                });
            }
        }).catch(function (err) {
            Indicator.close();
        })
    },
    unbindBankcardCheck({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            verify_code: payload.verify_code,
            bankcardno: payload.bankcardno,
            mobile: payload.mobile,
        }
        Indicator.open({
            text: '正在处理...',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.unbindBankcardCheck(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                window.location.href = '/#/bank/unbundled_audit'
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
    unbindBankcardPage({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.unbindBankcardPage(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                commit({
                    type: 'unbindBankcardPage',
                    res: data
                });
            } else {
                Indicator.close();
                let instance = Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    rebindBankcardPage({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            redirectUrl: payload.redirectUrl
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.rebindBankcardPage(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                Indicator.open({
                    text: '正在跳转存管银行页面',
                    spinnerType: 'triple-bounce'
                });
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = data.data;
                }, 1500);
            } else {
                Indicator.close();
                let instance = Toast({
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
    resetPassword({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            needCheck: payload.needCheck,
            redirectUrl: payload.redirectUrl
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.resetPassword(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                Indicator.open({
                    text: '正在跳转存管银行页面',
                    spinnerType: 'triple-bounce'
                });
                setTimeout(() => {
                    Indicator.close();
                    window.location.href = data.data;
                }, 1500);
            } else {
                Indicator.close();
                let instance = Toast({
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
    undoUnbindBankcard({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.undoUnbindBankcard(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                setTimeout(() => {
                    Indicator.close();
                    window.location.reload();
                }, 1000)
            } else {
                Indicator.close();
                let instance = Toast({
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
    checkRegister({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.checkRegister(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            commit({
                type: 'checkRegister',
                res: data
            });
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
    rebindBankCard({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            bankcardNo: payload.bankcardNo,
            bankCode: payload.bankCode,
            mobile: payload.mobile
        }
        Indicator.open({
            text: '处理中',
            spinnerType: 'triple-bounce'
        });
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params)
        params = Util.encryption(Codekey, params, 'code');
        Services.rebindBankCard(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                Indicator.close();
                window.location.href = '/#/bank/open_account_success?from=rebind';
            } else {
                Indicator.close();
                if (data.code == 990003) {
                    let instance = Toast({
                        message: data.msg,
                        duration: 1000
                    });
                    setTimeout(() => {
                        Indicator.close();
                        window.location.href = '/user/login?forward_url=LyMvYmFuay9vcGVuX2FjY291bnQ=';
                    }, 1000);
                } else {
                    let instance = Toast({
                        message: data.msg,
                        duration: 1000
                    });
                }
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网络出现问题，请重试',
                duration: 1500
            });
        })
    },
}

const getters = {}

export default {
    state,
    mutations,
    getters,
    actions
}
