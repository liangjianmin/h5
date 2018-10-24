/*
 * 存管
 */
layui.define(['$http', 'apis', 'path'], function(exports) {
    var $http = layui.$http;
    var apis = layui.apis;
    var path = layui.path;

    exports('bank', {
        /*
         * 开通银行存管
         * options { object }
         * redirectUrl { string } 开通后的返回地址
         * userRole { string } 开户类型 --INVESTOR 投资人 BORROWERS借款人
         * realName { string } 姓名
         * idCardNo { string } 身份证号
         * bankcardNo { string } 卡号
         * mobile { string } 手机号
         * callback { function }
         */
        openBank: function(options) {

            $http.ajax({
                url: apis.personalRegister,
                data: {
                    redirectUrl: options.redirectUrl,
                    userRole: options.userRole,
                    realName: options.realName,
                    idCardNo: options.idCardNo,
                    bankcardNo: options.bankcardNo,
                    mobile: options.mobile
                },
                success: function(data) {
                    if (data.code === 0) {
                        window.location.href = data.data;
//                      if (options.callback && typeof options.callback === 'function') {
//                          options.callback(data.data);
//                      }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 验证存管
         * options: { object } 参数
         * isSrbankUser: { boolean } 是否开通存管
         * isSrbankUserBindcard: { boolean } 是否绑卡
         * bankcardStatus: { string } 绑卡状态 bind：绑定 unbind:解绑 unbinding: 解绑中
         * needResetPwdFirst: { boolean } 是否需要重置密码
         * isSrbankUserSignAutoBid: { boolean } 是否购买签约
         * isSrbankUserSignCreditTransfer { boolean } 是否自动债转签约
         * isSrbankUserSignTransfer { boolean } 是否债转手续费签约
         * srbankUserCallback: { function } 未开通存管回调
         * bindCardCallback: { function } 未绑卡回调
         * resetPWDCallback: { function } 重置密码回调
         * signAutoBidCallback: { function } 签约回调
         * signCreditTransferCallback: { function } 自动债转签约回调
         * signTransferCallback： { function } 手续费签约回调
         * whetherEvaluationCallback： { function } 风险测评回调
         * validataSuccessCallback： { function } 验证通过后回调
         *
         * validat： { object } 是否验证
         * signAutoBid: 自动投标签约
         * signCreditTransfer: 自动债转签约
         * signTransfer：转让手续费签约
         * whetherEvaluation： 风险测评
         */
        validateBank: function(options) {
            var isBankUser = options.isSrbankUser; // 是否已开通存管
            var isSRbankBindCard = options.isSrbankUserBindcard; // 是否绑卡
            var isDLBindCardStatus = options.bankcardStatus; // 绑卡状态
            var isNeedRestPWD = options.needResetPwdFirst; // 是否需要重置密码
            var isSRbankUserSignAutoBid = options.isSrbankUserSignAutoBid; // 是否购买签约
            var isSRbankUserSignCreditTransfer = options.isSrbankUserSignCreditTransfer; // 是否自动债转签约
            var isSRbackUserSignTransfer = options.isSrbankUserSignTransfer; // 是否债转手续费签约
            var isWhetherEvaluation = options.isWhetherEvaluation; // 风险测评

            if (!isBankUser) { // 判断是否开通存管
                if (options.srbankUserCallback && typeof options.srbankUserCallback === 'function') {
                    options.srbankUserCallback(); // 未开通回调
                    return false;
                }
            } else if (!isSRbankBindCard || isDLBindCardStatus === 'UNBIND') {
            	if (options.bindCardCallback && typeof options.bindCardCallback === 'function') {
                    options.bindCardCallback(); // 未绑卡回调
                    return false;
                }
            } else if (isNeedRestPWD) { // 是否需要重置密码

                if (options.resetPWDCallback && typeof options.resetPWDCallback === 'function') {
                    options.resetPWDCallback(); // 重置密码回调
                    return false;
                }

                return false;
            } else if (!isSRbankUserSignAutoBid && options.validata.signAutoBid) { // 自动投标签约

                if (options.signAutoBidCallback && typeof options.signAutoBidCallback === 'function') {
                    options.signAutoBidCallback(); // 签约回调
                }

                return false;

            } else if (!isSRbankUserSignCreditTransfer && options.validata.signCreditTransfer) { // 自动债转签约

                if (options.signCreditTransferCallback && typeof options.signCreditTransferCallback === 'function') {
                    options.signCreditTransferCallback(); // 自动债转签约回调
                }

                return false;

            } else if (!isSRbackUserSignTransfer && options.validata.signTransfer) { // 申请转让签约

                if (options.signTransferCallback && typeof options.signTransferCallback === 'function') {
                    options.signTransferCallback(); // 手续费签约回调
                }

                return false;

            } else if (!isWhetherEvaluation && options.validata.whetherEvaluation) {

                // 是否风险测评
                if (options.whetherEvaluationCallback && typeof options.whetherEvaluationCallback === 'function') {
                    options.whetherEvaluationCallback();
                }
                return false;
            } else {

                // 存管验证通过后的回调
                if (options.validataSuccessCallback && typeof options.validataSuccessCallback === 'function') {
                    options.validataSuccessCallback();
                }
            }
        },
        /*
         * 获取银行列表
         * options: { object } 参数
         * bankcode: 银行编码 '': 全部  'BOSH': 单个
         * callback: 回调
         */
        getBankList: function(options) {
            $http.ajax({
                url: apis.bankInfo,
                data: {
                    bankcode: options.bankcode
                },
                success: function(data) {
                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                        	options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 充值页面
         * callback: { function } 成功回调
         */
        tradeInPage: function(callback) {
            $http.ajax({
                url: apis.rechargePage,
                success: function(data) {

                    if (data.code === 0) {
                        callback(data.data);
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 充值
         * options: { object }
         * amount： { string/number } 金额
         * rechargeWay: { string } 充值方式
         * bankcode: { string } 银行编码
         * redirectUrl： { string } 回调地址
         * callback: { function } 成功回调函数
         */
        tradeIn: function(options) {
            $http.ajax({
                url: apis.recharge,
                data: {
                    amount: options.amount,
                    rechargeWay: options.rechargeWay,
                    bankcode: options.bankcode,
                    redirectUrl: options.redirectUrl
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                        	options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 充值结果查询
         * options: { object }
         * requestNo： { string/number } 订单号
         * callback: { function } 成功回调函数
         */
        checkChargeSuccess: function(options) {
            $http.ajax({
                url: apis.checkChargeSuccess,
                data: {
                    requestNo: options.requestNo
                },
                success: function(data) {

                    if (options.callback && typeof options.callback === 'function') {
                        options.callback(data);
                    }

                }
            });
        },
        /*
         * 提现页面
         * callback: { function } 成功回调
         */
        tradeOutPage: function(callback) {
            $http.ajax({
                url: apis.withdrawPage,
                success: function(data) {

                    if (data.code === 0) {
                        callback(data.data);
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 提现
         * options: { object }
         * amount： { string/number } 金额
         * redirectUrl： { string } 回调地址
         * callback: { function } 成功回调函数
         */
        tradeOut: function(options) {
            $http.ajax({
                url: apis.withdraw,
                data: {
                    amount: options.amount,
                    redirectUrl: options.redirectUrl
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 获取存管信息
         * callback { function } 成功回调
         */
        getBankInformation: function(options) {
            $http.ajax({
                url: apis.queryInformation,
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 签约
         * options { object }
         * signType { string } 签约类型
         * redirectUrl { string } 回调地址
         * callback { function } 回调函数
         */
        sign: function(options) {
            $http.ajax({
                url: apis.srbankSignPage,
                data: {
                    sign_type: options.signType,
                    redirectUrl: options.redirectUrl
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 充值交易密码
         * options { object }
         * authCode { string/number } 验证码
         * redirectUrl { string } 回调地址
         * needCheck { boolean } 是否验证验证码
         * callback { function } 回调函数
         */
        resetPass: function(options) {
            $http.ajax({
                url: apis.resetPassword,
                data: {
                    authCode: options.authCode,
                    redirectUrl: options.redirectUrl,
                    needCheck: options.needCheck
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 取消解绑银行卡
         * options { object }
         * callback { function } 回调函数
         */
        undoUnbindBankcard: function(options) {
            $http.ajax({
                url: apis.undoUnbindBankcard,
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 取消解绑银行卡
         * options { object }
         * callback { function } 回调函数
         */
        unbindBankcardPage: function(options) {
            $http.ajax({
                url: apis.unbindBankcardPage,
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 获取验证码
         * options { object }
         * callback { function } 回调函数
         */
        sendPhoneYzm: function(options) {
            $http.ajax({
                url: apis.sendPhoneYzm,
                data: {
                    phone_num: options.phoneNum,
                    type: options.type,
                    check_mobile: options.checkMobile
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 验证解绑银行时的验证码和卡号
         * options { object }
         * callback { function } 回调函数
         * verifyCode { number/string } 验证码
         * bankcardno { number/string } 卡号
         * mobile { number/string } 手机号
         */
        unbindBankcardCheck: function(options) {
            $http.ajax({
                url: apis.unbindBankcardCheck,
                data: {
                    verify_code: options.verifyCode,
                    bankcardno: options.bankcardno,
                    mobile: options.mobile
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 上传身份证
         * options { object }
         * callback { function } 回调函数
         * imgbase64 { string } 图片base64
         * type { string } 图片类型
         */
        unbindBankcardApply: function(options) {
            $http.ajax({
                url: apis.unbindBankcardApply,
                type: 'post',
                data: {
                    imgbase64: options.imgbase64,
                    type: options.type,
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        },
        /*
         * 修改预留手机号
         * options { object }
         * mobile { string } 手机号
         * authCode { string } 验证码
         * callback { function } 回调函数
         */
        modifyReservedMobile: function(options) {
            $http.ajax({
                url: apis.modifyReservedMobile,
                data: {
                    mobile: options.mobile,
                    authCode: options.authCode,
                },
                success: function(data) {

                    if (data.code === 0) {
                        if (options.callback && typeof options.callback === 'function') {
                            options.callback(data.data);
                        }
                    } else {
                        $http.errorMsg(data);
                    }
                }
            });
        }
    });
});
