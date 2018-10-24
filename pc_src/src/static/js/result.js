/*
 * 结果页
 */

layui.define(['utils', 'path', 'bank'], function(exports) {
    var utils = layui.utils;
    var path = layui.path;
    var bank = layui.bank;

    exports('result', {
        init: function() {

            if (utils.isPage('/result/user_register_success.html')) { // 注册成功
                this.registerResultPage();
            }

            if (utils.isPage('/result/forget_pass_success.html')) { // 找回密码成功
                this.forgetPassResultPage();
            }

            if (utils.isPage('/result/investor_trade_in_success.html')) { // 投资人--充值结果
                this.investorTradeInResultPage();
            }

            if (utils.isPage('/result/user_trade_in_success.html')) { // 借款人--充值结果
                this.debtorTradeInResultPage();
            }

            if (utils.isPage('/result/user_trade_out_success.html')) { // 提现申请成功
                this.tradeOutResultPage();
            }

            if (utils.isPage('/result/open_bank_success.html')) { // 存管开户成功
                this.openBankResultPage();
            }

        },
        registerResultPage: function() {
            var userType = utils.getQueryString('user_type');

            if (userType === 'BORROWERS') {
                var openType = 'BORROWERS';
                $("#userCenterUrl").attr('href', path.debtorUserCenterUrl);
            } else {
                var openType = 'INVESTOR';
                $("#userCenterUrl").attr('href', path.investUserCenterUrl);
            }

            function openBank(userType) {
                var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;

                bank.openBank({
                    redirectUrl: redirectUrl,
                    userRole: userType
                });
            }

            $("#openBankBtn").on('click', function(e) {
                e.preventDefault();

                openBank(openType);
            });

            // 倒计时
            utils.cuntDown('#cuntDownTime', 10, function(time) {
                if (time <= 0 ) {
                    openBank(openType);
                    return;
                }
                layui.$("#cuntDownTime").text(time);
            });
        },
        forgetPassResultPage: function() {
            var userType = utils.getQueryString('user_type');

            if (userType === 'debtor') {
                $("#loginUrl").attr('href', path.debtorLoginUrl);
            } else {
                $("#loginUrl").attr('href', path.investLoginUrl);
            }
        },
        investorTradeInResultPage: function() {
            // 投资人--充值结果
            var requestNo = urlParams(window.location.href).requestNo;

            bank.checkChargeSuccess({
                requestNo: requestNo,
                callback: function(data) {
                    console.log(data)
                    if (data.code === 0) {
                        showDOM("#resultTradeInSuccess");
                    } else {
                        showDOM("#resultTradeInError");
                    }
                }
            });

            function showDOM(select) {
                $(select).show().siblings().hide();
            }

            function urlParams(url) {
                var paramsStr = url.split("?")[1];
                var paramsArr = paramsStr.split("&");
                var obj = {};

                for (var i = 0; i < paramsArr.length; i++) {
                    var params = paramsArr[i].split("=");
                    obj[params[0]] = params[1];
                }

                return obj;
            }

        },
        debtorTradeInResultPage: function() {
            var requestNo = urlParams(window.location.href).requestNo;

            bank.checkChargeSuccess({
                requestNo: requestNo,
                callback: function(data) {
                    if (data.code === 0) {
                        showDOM("#resultTradeInSuccess");
                    } else {
                        showDOM("#resultTradeInError");
                    }
                }
            });

            function showDOM(select) {
                $(select).show().siblings().hide();
            }

            function urlParams(url) {
                var paramsStr = url.split("?")[1];
                var paramsArr = paramsStr.split("&");
                var obj = {};

                for (var i = 0; i < paramsArr.length; i++) {
                    var params = paramsArr[i].split("=");
                    obj[params[0]] = params[1];
                }

                return obj;
            }
        },
        tradeOutResultPage: function() {
            var userType = utils.getQueryString('user_type');

            if (userType === 'investor') {
                $("#backUrl").attr('href', path.investUserCenterUrl);
            } else {
                $("#backUrl").attr('href', path.debtorUserCenterUrl);
            }
        },
        openBankResultPage: function() {
            var userType = $.cookie('user_type');
            if (userType === 'INVESTOR') {
            	$("#goHome").attr('href', path.investUserCenterUrl);
            } else {
                $("#goHome").attr('href', path.debtorUserCenterUrl);
            }
        }
    });
});