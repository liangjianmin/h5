layui.define(['popup'], function(exports) {
    var popup = layui.popup;

    //日期转字符串 返回日期格式20080808
    function dateToString(date) {
        if (date instanceof Date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            var day = date.getDate();
            day = day < 10 ? '0' + day : day;
            return '' + year + month + day;
        }
        return '';
    };

    exports('validate', {
        // 验证身份证
        isIdCard: function(cardid) {
            //身份证正则表达式(18位)
            var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
            var stard = "10X98765432"; //最后一位身份证的号码
            var first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //1-17系数
            var sum = 0;
            if (!isIdCard2.test(cardid)) {
                return false;
            }

            var year = cardid.substr(6, 4);
            var month = cardid.substr(10, 2);
            var day = cardid.substr(12, 2);
            var birthday = cardid.substr(6, 8);
            if (birthday != dateToString(new Date(year + '/' + month + '/' + day))) { //校验日期是否合法
                return false;
            }

            for (var i = 0; i < cardid.length - 1; i++) {
                sum += cardid[i] * first[i];
            }
            var result = sum % 11;
            var last = stard[result]; //计算出来的最后一位身份证号码
            if (cardid[cardid.length - 1].toUpperCase() == last) {
                return true;
            } else {
                return false;
            }
        },
        // 验证用户姓名
        isChinaName: function(userName) {
            var pattern = /^([\u4e00-\u9fa5]){2,7}$/;
            return pattern.test(userName);
        },
        // 验证年龄是否满18岁
        is_isIdCard_18: function(UUserCard) {
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
            if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                age++;
            }
            if(age<18){
                return false;
            }else{
                return true;
            }
        },
        // 验证手机号，1开头，11位数字
        isTel: function(tel) {
            var pattern = /^1\d{10}$/;
            return pattern.test(tel);
        },
        // 验证银行卡
        isBankCard: function(bankCard) {
            var pattern = /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/;
            return pattern.test(bankCard);
        },
        validateUserInfo: function(userInfo, options) {
            var srbankInfo = userInfo.srbank;
            var isSrbankUser = srbankInfo.is_srbank_user; // 是否开通存管
            var bindCardStatus = userInfo.bankcard_status; // 绑卡状态
            var isBindCard = srbankInfo.is_srbank_user_bindcard; // 是否绑卡
            var isNeedResetPass = srbankInfo.need_reset_pwd_first; // 是否需要重置密码
            var isWhetherEvaluation = userInfo.whether_evaluation; // 是否进行风险测评
//isSrbankUser = true;isBindCard=true;bindCardStatus='BIND';

            var opt = {
                userRole: 'INVESTOR',
                validate: {
                    signAutoBid: false,
                    signCreditTransfer: false,
                    signTransfer: false,
                    whetherEvaluation: false
                }
            };

            options = $.extend(opt, options);

            console.log(options);

            if (!isSrbankUser) { // 开户

                if (options.openSrbankCallback && typeof options.openSrbankCallback === 'function') {
                	options.openSrbankCallback();
                } else {
                    popup.openTips02Layer(userRole);
                }
            } else if (!isBindCard || bindCardStatus === 'UNBIND') { // 绑卡
                var behavior = options.behavior || '投资';
            	if (options.bindCardCallback && typeof options.bindCardCallback === 'function') {
                    options.bindCardCallback();
                } else {
                    popup.bankBindCardLayer(behavior);
                }
            } else if (isNeedResetPass) { // 重置密码
                if (options.resetPWDCallback && typeof options.resetPWDCallback === 'function') {
                    options.resetPWDCallback();
                } else {
                    console.log('重置密码')
                    // 重置密码弹窗
                }
            } else {
            	var isSignAutoBid = srbankInfo.is_srbank_user_sign_auto_bid; // 自动购买签约
            	var isSignCreditTransfer = srbankInfo.is_srbank_user_sign_credit_transfer; // 自动债转签约
            	var isSignTransfer = srbankInfo.is_srbank_user_sign_transfer; // 债转手续费签约
            	var isSignBorrower = srbankInfo.is_srbank_user_sign_borrower; // 借款签约

            	if (!isSignAutoBid && options.validate.signAutoBid) {
        		    var layerTit = '开启投资授权协议签约';
                    var layerMsg = '<p class="text">您还未开启<a href="javascript:;" >《投资授权协议》</a>中的“自动投标签约”，请先进行签约再进行投资';
                    var signType = 'sign_auto_bid';
        			popup.signLayer(layerTit, layerMsg, signType);
            	} else if (!isSignCreditTransfer && options.validate.signCreditTransfer) {
            		// 自动债转签约
                    var layerTit = '开启投资授权协议签约';
                    var layerMsg = '<p class="text">您还未开启<a href="javascript:;" >《投资授权协议》</a>中的“自动购买债权签约”，请先进行签约再进行投资</p>';
                    var signType = 'sign_credit_transfer';
                    popup.signLayer(layerTit, layerMsg, signType);
            	} else if (!isSignTransfer && options.validate.signTransfer) {
                    // 自动债转手续费签约
                    var layerTit = '开启投资授权协议签约';
                    var layerMsg = '<p class="text">您还未开启<a href="javascript:;" >《投资授权协议》</a>中的“债权转让手续费签约”，请先进行签约再进行投资</p>';
                    var signType = 'sign_transfer';
                    popup.signLayer(layerTit, layerMsg, signType);
                } else if (!isWhetherEvaluation && options.validate.whetherEvaluation) {
                    console.log('风险测评');
                } else {
                    // 存管验证通过后的回调
                    if (options.validateSuccessCallback && typeof options.validateSuccessCallback === 'function') {
                        options.validateSuccessCallback();
                    }
                }
            }
        }
    });
});