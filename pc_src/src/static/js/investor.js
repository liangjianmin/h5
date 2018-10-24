/*
 * 出借人
 */

layui.define(['element', 'form', 'laypage', 'util', 'user', 'path', 'utils', 'bank', 'popup', 'laydate', 'validate'], function(exports) {
    var element = layui.element;
    var form = layui.form;
    var laypage = layui.laypage;
    var util = layui.util;
    var user = layui.user;
    var path = layui.path;
    var utils = layui.utils;
    var bank = layui.bank;
    var popup = layui.popup;
    var laydate = layui.laydate;
    var validate = layui.validate;

    /*
     * 用户侧边导航栏信息
     */
    function userNavInfo(data) {
        $("#userAvatar").attr('src', data.avatar);

        var userShowName = data.showName;
        var isSrbankUser = data.srbank.is_srbank_user;
        var isBindCard = data.bankcard_status;
        var unReadNotice = data.unReadNotice; // 是否有消息未读

        // 缓存数据
        var userInfoData = {
            avatar: data.avatar,
            show_name: userShowName,
            is_srbank_user: isSrbankUser,
            is_bind_card: isBindCard,
            un_read_notice: unReadNotice
        };

        sessionStorage.setItem('userInfoData',JSON.stringify(userInfoData));

        $("#userNameInfo").text(userShowName);

        if (isSrbankUser) {
        	$("#userTelInfo").addClass('link-item01-s');
        }

        if (isBindCard !== 'UNBIND') {
        	$("#userCardInfo").addClass('link-item03-s');
        }

        if (unReadNotice) {
        	$("#msgIcon").show();
        }
    };

    /*
     * 用户侧边导航栏信息--从sessionStorage里读取
     */
    function userNavInfoSesstionStorage() {
        var userInfoData = sessionStorage.getItem('userInfoData');
        userInfoData = JSON.parse(userInfoData);

        $("#userAvatar").attr('src', userInfoData.avatar);
        $("#userNameInfo").text(userInfoData.show_name);

        if (userInfoData.is_srbank_user) {
            $("#userTelInfo").addClass('link-item01-s');
        }

        if (userInfoData.is_bind_card !== 'UNBIND') {
            $("#userCardInfo").addClass('link-item03-s');
        }

        if (userInfoData.un_read_notice) {
            $("#msgIcon").show();
        }
    }

    exports('investor', {
        init: function() {
            if (utils.isPage('/investor/user_center.html')) { // 用户中心
                this.userCenterPage();
            }

            if (utils.isPage('/investor/trade_in.html')) { // 充值
                this.tradeInPage();
            }

            if (utils.isPage('/investor/trade_out.html')) { // 提现页面
                this.tradeOutPage();
            }

            if (utils.isPage('/investor/trade_out_list.html')) { // 提现挂起
            	this.tradeOutListPage();
            }

            if (utils.isPage('/investor/capital_details.html')) { // 资金明细
                this.captialDetailPage();
            }

            if (utils.isPage('/investor/loan_record.html')) { // 出借记录
            	this.loanRecordPage();
            }

            if (utils.isPage('/investor/reservation.html')) { // 预约投标
                this.reservationPage();
            }

            if (utils.isPage('/investor/transfer.html')) { // 债权转让
                this.transferPage();
            }

            if (utils.isPage('/investor/invite_friend.html')) { // 邀请好友
                this.inviteFriendsPage();
            }

            if (utils.isPage('/investor/setting.html')) { // 设置中心
                this.settingPage();
            }

            if (utils.isPage('/investor/depository_account.html')) { // 存管
                this.depositoryAccountPage();
            }

            if (utils.isPage('/investor/bank_tel_change.html')) { // 银行预约手机号修改
                this.bankTelChangePage();
            }

            if (utils.isPage('/investor/bank_card.html')) { // 银行卡管理
                this.bankCardPage();
            }

            if (utils.isPage('/investor/unbind_card_step.html')) { // 解绑银行卡申请
                this.unbindCardStepPage();
            }

            if (utils.isPage('/investor/user_sign.html')) { // 签约
                this.userSignPage();
            }

            if (utils.isPage('/investor/tel_authentication.html')) { // 手机号认证
                this.telAuthenticationPage();
            }

            if (utils.isPage('/investor/tel_change.html')) { // 修改登录手机号
                this.telChangePage();
            }

            if (utils.isPage('/investor/pass_change.html')) { // 修改登录密码
                this.passChangePage();
            }

            if (utils.isPage('/investor/msg.html')) { // 消息中心
                this.msgPage();
            }

            if (utils.isPage('/investor/balance_return.html')) { // 余额复投
                this.balanceReturnPage();
            }
        },
        userCenterPage: function() {
            // 投资人--个人中心
            user.investUserCenter({
                callback: function(data) {
                    console.log(data);

                    userNavInfo(data.user); // 侧边栏用户信息

                    showDOM(data.money_info, data.batch_auto_info);

                    // 显示隐藏金额
                    $("#toogleBtn").on('click', function(e) {
                        e.preventDefault();

                        toogleMoney($(this));
                    });

                    // 回款概况
                    var nowDate = new Date();
                    var year = nowDate.getFullYear();
                    var month = nowDate.getMonth() + 1;
                    var optionYearHtml = '';
                    var optionMonthHtml = '';
                    for (var i = (year-3); i <= (year+3); i++) {
                        if (i === year) {
                        	var attr = 'selected';
                        } else {
                            var attr = '';
                        }
                    	optionYearHtml += '<option value="'+i+'" '+attr+'>'+i+'年</option>';
                    }
                    for (var i = 1; i <= 12; i++) {
                        if (i === month) {
                            var attr = 'selected';
                        } else {
                            var attr = '';
                        }
                        optionMonthHtml += '<option value="'+numDou(i)+'" '+attr+'>'+i+'月</option>';
                    }
                    $("#selectYear").empty().append(optionYearHtml);
                    $("#selectMonth").empty().append(optionMonthHtml);
                    form.render('select');

                    getPaybackCalendarData('' + year+numDou(month)+'01');

                    form.on('select(selectYear)', function(data) {

                        var year = data.value;
                        var month = $("#selectMonth").val();

                        getPaybackCalendarData(year + month + '01');

                    });

                    form.on('select(selectMonth)', function(data) {

                        var year = $("#selectYear").val();
                        var month = data.value;

                        getPaybackCalendarData(year + month + '01');

                    });

                    // 待收收益详情
                    $('#waitInvestReward, #waitInviteReward').on('click', function(e) {
                        e.preventDefault();
                        couponLayer($(this));
                    });

                    // 是否开通存管
                    var isBankUser = data.user.srbank.is_srbank_user;

                    if (!isBankUser) { // 非存管
                        $("#tradeInBtn, #tradeOutBtn").on('click', function(e) {
                            e.preventDefault();

                            popup.openTips02Layer('INVESTOR');
                        });

                        if (!$.cookie('is_open_bank_layer')) {
                            $.cookie('is_open_bank_layer', 1);
                            popup.bankTipLayer('INVESTOR');
                        }

                        $("#userAccountInfo").slideDown().find('p').html('<i class="sr-tip-icon"></i>为了您的资金安全和交易合规，投资前需先开通上饶银行存管账户。<a href="javascript:;" id="quick_open_sr">立即开通</a>');
                        $("#quick_open_sr").on('click', function(e) {
                            e.preventDefault();
                            var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;
                            bank.openBank({
                               redirectUrl: redirectUrl
                            });
                        });
                    }

                }
            });

            function showDOM(data, batchData) {
                var totalAssetFormat = data.totalAsset_format; // 总资产
                var waitPrincipal = data.wait_principal; // 待收本金
                var blockTotalMoney = data.block_total_money; // 冻结金额
                var availableTotalMoney = data.available_total_money; // 可用余额
//                  var totalIncome = data.total_income_format; // 累计已收收益
                var pendingIncome = data.pending_income; // 累计待收收益
                var pendingTotalInterest = data.pending_total_interest; // 待收利息
                var pendingInvestReward = data.pending_invest_reward; // 待收返现
                var pendingInviteReward = data.pending_invite_reward; // 待收返佣

                $("#totalAssetFormat").text(totalAssetFormat).data('money', totalAssetFormat);
                $("#waitPrincipal").text(waitPrincipal).data('money', waitPrincipal);
                $("#blockTotalMoney").text(blockTotalMoney).data('money', blockTotalMoney);
                $("#availableTotalMoney").text(availableTotalMoney).data('money', availableTotalMoney);
                $("#pendingIncome").text(pendingIncome).data('money', pendingIncome);
                $("#pendingTotalInterest").text(pendingTotalInterest).data('money', pendingTotalInterest);
                $("#pendingInvestReward").text(pendingInvestReward).data('money', pendingInvestReward);
                $("#pendingInviteReward").text(pendingInviteReward).data('money', pendingInviteReward);

                var batchAutoNo = batchData.batch_no;
                batchAutoHref = '/standard/reservation_tender?batch_no=' + batchAutoNo;
                $("#batchAutoHref").attr('href', batchAutoHref);

                // 隐藏显示金额
                var isShowMoneys = $.cookie('is_show_money');
                if (isShowMoneys === '0') {
                    hideMoney($("#toogleBtn"));
                } else {
                    showMoney($("#toogleBtn"));
                }

                $("#waitInvestReward").data('coupon_ids', data.pending_invest_reward_coupon_ids);
                $("#waitInviteReward").data('coupon_ids', data.pending_invite_reward_coupon_ids);

            }

            function toogleMoney(obj) {
                var isShowMoney = $.cookie('is_show_money');

                if (isShowMoney === '1') {
                    $.cookie('is_show_money', 0, {expires: 10, path: '/'});
                    hideMoney(obj);
                } else {
                    showMoney(obj);
                    $.cookie('is_show_money', 1, {expires: 10, path: '/'});
                }
            };

            function hideMoney(obj) {
                obj.addClass('active');
                $(".js-money").each(function(index, value) {
                    $(this).html('--.--');
                });
            }

            function showMoney(obj) {
                obj.removeClass('active');
                $(".js-money").each(function(index, value) {
                    var val = $(this).data('money');
                    $(this).html(val);
                });
            }

            function numDou(num) {
                if (num < 10) {
                    num = '0' + num;
                }

                return num;
            };

            function getPaybackCalendarData(month) {
                user.paybackCalendarNew({
                    month: month,
                    day: '',
                    page: 1,
                    pageSize: 10,
                    callback: function(data) {

                        showPaybackCalendar(data);
                    }
                });
            }

            function showPaybackCalendar(data) {
                var paybackDetail = data.survey;
                var monthPayment = paybackDetail.month_payment; // 当月应回本息
                var monthPaymentNum = paybackDetail.month_payment_num; // 当月应回笔数
                var monthEarnedPayment = paybackDetail.month_earned_payment; // 当月已回本息
                var monthForwardPayment = paybackDetail.month_forward_payment; // 当月提前回款

                $("#monthPayment").text(monthPayment).data('money', monthPayment);
                $("#monthPaymentNum").text(monthPaymentNum).data('money', monthPaymentNum);
                $("#monthEarnedPayment").text(monthEarnedPayment).data('money', monthEarnedPayment);
                $("#monthForwardPayment").text(monthForwardPayment).data('money', monthForwardPayment);
            }

            function couponLayer(obj) {

                var couponIds = obj.data('coupon_ids');

                if (!couponIds) {
                    layer.msg('已全部返完');
                    return;
                }
            }
        },
        tradeInPage: function() {
            // 投资人--充值页面
            bank.tradeInPage(function(data) {
                console.log(data);
                var userData = data.user;
                var userSRData = userData.srbank;
                var isSRbankUser = userSRData.is_srbank_user;
                var isSRbankBindCard = userSRData.is_srbank_user_bindcard;
                var isDLBindCardStatus = userData.bankcard_status;
                var isNeedRestPWD = userSRData.need_reset_pwd_first;
                var isSRbankUserSignAutoBid = userSRData.is_srbank_user_sign_auto_bid;
                var isSRbankUserSignCreditTransfer = userSRData.is_srbank_user_sign_credit_transfer;
                var isSRbackUserSignTransfer = userSRData.is_srbank_user_sign_transfer;

                userNavInfo(data.user); // 侧边栏用户信息

                bank.validateBank({
                    validata: {
                        signAutoBid: false
                    },
                    isSrbankUser: isSRbankUser,
                    srbankUserCallback: function() {
                        // 开通存管
                        popup.bankTipLayer('INVESTOR');
                    },
                    isSrbankUserBindcard: isSRbankBindCard,
                    bankcardStatus: isDLBindCardStatus,
                    bindCardCallback: function() {},
                    isNeedRestPWD: isNeedRestPWD,
                    resetPWDCallback: function() {},
                    validataSuccessCallback: function() {
                        // 展示元素
                        showDom(data);

                        var bankCode = userSRData.bankcard.bankcode;
                        var redirectUrl = path.openBankRedirectUrl + path.investTradeInResultUrl;
                        var bankCardStatus = userSRData.bankcard.status_order;

                        // 快捷充值
                        quickTradeIn(bankCode, redirectUrl, bankCardStatus);

                        // 网银充值
                        webTradeIn(redirectUrl);
                    }
                });

                // 展开银行列表
                $("#openBankList").on('click', function(e) {
                    e.preventDefault();

                    var $WEB_lists = $("#WEB_lists");
                    var that = $(this);
                    if (!that.data("open")) {
                        $WEB_lists.css({"overflow": "inherit"});
                        that.html('收起<i class="icon open"></i>');
                        that.data("open", true);
                    } else {
                        $WEB_lists.css({"overflow": "hidden"});
                        that.html('展开<i class="icon"></i>');
                        that.data("open", "");
                    }
                });

                // 银行转账
                $("#bankTransferInfoBtn").on('click', function(e) {
                    e.preventDefault();

                    popup.banktransferInfoLayer();
                });

                var copyPath01 = new Clipboard('#copyGSName');
                copyPath01.on("success", function (e) {
                    layer.msg('复制成功！')
                });
                copyPath01.on("error", function (e) {
                   layer.msg("复制失败，您可以使用手动复制!");
                });

                var copyPath02 = new Clipboard('#copyYHName');
                copyPath02.on("success", function (e) {
                    layer.msg('复制成功！')
                });
                copyPath02.on("error", function (e) {
                   layer.msg("复制失败，您可以使用手动复制!");
                });

                var copyPath03 = new Clipboard('#copyYHNo');
                copyPath03.on("success", function (e) {
                    layer.msg('复制成功！')
                });
                copyPath03.on("error", function (e) {
                   layer.msg("复制失败，您可以使用手动复制!");
                });

                // 展示元素
                function showDom(data) {
                    var userInfo = data.user;
                    var bankInfo = userInfo.srbank;
                    var bankCard = bankInfo.bankcard;

                    var isBankCardStatus = bankCard.status_order; // 银行卡状态
                    var availableAmount = userInfo.available_total_money;
                    var bankName = bankCard.bankName;
                    var bankNo = bankCard.bankcardNo_e;
                    var bankImg = bankCard.img_logo_url;
                    var bankLimit = bankCard.bankLimit;

                    var bankLimitArr = bankLimit.split('/');

                    if (!isBankCardStatus) { // 银行卡维护
                        $("#bankImg").addClass('bank-icon-no');
                        $("#bankCardInfo").html('(' + bankName + '暂不支持快捷支付，推荐使用<a class="webbank-btn" id="bankTradePageBtn" href="' + path.investUserTradeIn + '#trade_in=bank">银行转账</a>)');

                    }

                    $("#userAbailableAmont").text(availableAmount);
                    $("#bankImg").css({
                        'background-image': 'url(' + bankImg + ')'
                    });
                    $("#bankName").text(bankName);
                    $("#bankNo").text(bankNo);
                    $("#bankOneLimit").text(bankLimitArr[0]);
                    $("#bankDateLimit").text(bankLimitArr[1]);
                    $("#bankMonthLimit").text(bankLimitArr[2]);

                    var bankListStr = getWebBankList(data.payway.WEB.banks);
                    $("#WEB_lists").empty().append(bankListStr);

                    $("#bankTransferName").text(bankName);
                    $("#bankTransferNo").text(bankNo);
                };

                var layid = location.hash.replace(/^#trade_in=/, '');
                element.tabChange('tradeInTab', layid);

                element.on('tab(tradeInTab)', function(){
                    location.hash = 'trade_in='+ this.getAttribute('lay-id');
                });

                $("#bankTradePageBtn").on('click', function(e) {
                    e.preventDefault();
                    window.location.href = path.investUserTradeIn + '#trade_in=bank';
                    location.reload();
                });

                /*
                 * 获取网银列表
                 */
                function getWebBankList(bankList) {

                    var bankInfoStr = '';
                    var bankListArr = [];

                    for (var i in bankList) {
                        bankListArr.push(bankList[i]);
                    }

                    for (var i = 0; i < bankListArr.length; i++) {

                        if (bankListArr[i].order > 0) {
                            bankInfoStr +=   '<li class="bank-list" data-code="' + bankListArr[i].bankcode + '" data-bankname="' + bankListArr[i].name + '"><img src="' + bankListArr[i].img_all_url + '" alt=""></li>';

                        }
                    }

                    return bankInfoStr;
                }

                /*
                 * 快捷充值
                 */
                function quickTradeIn(bankcode, redirectUrl, bankCardStatus) {
                    // 监听输入框
                    $("#tradeInQuickMoney").on('keyup', function(e) {
                        e.preventDefault();

                        var $tradeInQuickBtn = $("#tradeInQuickBtn");
                        var isDisabeldClass = 'is-disabled';
                        var tradeMoney = $(this).val() * 1;

                        if (tradeMoney >= 100) {
                            $tradeInQuickBtn.removeClass(isDisabeldClass).attr({
                                'disabled': false
                            });
                        } else {
                            layer.tips('充值金额不能低于100元', '#tradeInQuickMoney');
                            $tradeInQuickBtn.addClass(isDisabeldClass).attr({
                                'disabled': true
                            });
                        }
                    });

                    form.on('submit(tradeInQuick)', function(data) {

                        if (!bankCardStatus) {
                            layer.tips('银行维护中，请使用转账充值!', '#tradeInQuickBtn');
                            return false;
                        }

                        var tradeMoney = data.field.trade_in_money;

                        bank.tradeIn({
                            amount: tradeMoney,
                            rechargeWay: 'SWIFT',
                            bankcode: bankcode,
                            redirectUrl: redirectUrl,
                            callback: function(data) {
                                window.location.href = data;
                            }
                        });

                        return false;
                    });
                };

                /*
                 * 网银充值
                 */
                function webTradeIn(redirectUrl) {
                    var $tradeInWebMoney = $("#tradeInWebMoney");

                    var $tradeInWebBtn = $("#tradeInWebBtn");
                    var isDisabeldClass = 'is-disabled';

                    // 选择银行
                    $("body").on('click', '#WEB_lists li.bank-list', function(e) {
                        e.preventDefault();
                        $(this).addClass('is-select').siblings().removeClass('is-select');

                        var tradeMoney = $tradeInWebMoney.val() * 1;
                        var isSelectBank = $(this).data('code');

                        if (tradeMoney >= 100 && isSelectBank) {
                            $tradeInWebBtn.removeClass(isDisabeldClass).attr({
                                'disabled': false
                            });
                        } else {
                            $tradeInWebBtn.addClass(isDisabeldClass).attr({
                                'disabled': true
                            });
                        }
                    });

                    // 监听输入框
                    $("#tradeInWebMoney").on('keyup', function(e) {
                        e.preventDefault();
                        var tradeMoney = $(this).val() * 1;
                        var isSelectBank = $("#WEB_lists .bank-list.is-select").data('code');

                        if (tradeMoney >= 100 && isSelectBank) {
                            $tradeInWebBtn.removeClass(isDisabeldClass).attr({
                                'disabled': false
                            });
                        } else {
                            if (tradeMoney < 100) {

                                layer.tips('充值金额不能低于100元', '#tradeInWebMoney');
                            }
                            $tradeInWebBtn.addClass(isDisabeldClass).attr({
                                'disabled': true
                            });
                        }

                    });

                    form.on('submit(tradeInWeb)', function(data) {

                        var tradeMoney = data.field.trade_in_web_money;
                        var bankcode = $("#WEB_lists .bank-list.is-select").data('code');

                        bank.tradeIn({
                            amount: tradeMoney,
                            rechargeWay: 'WEB',
                            bankcode: bankcode,
                            redirectUrl: redirectUrl,
                            callback: function(data) {

                                window.location.href = data;
                            }
                        });


                        return false;
                    });
                };
            });

            // 查看银行限额列表
            $("#bankLimitBtn").on('click', function(e) {
                e.preventDefault();

                popup.bankListLayer();
            });

        },
        tradeOutPage: function() {
            // 投资人--提现页面
            bank.tradeOutPage(function(data) {
                console.log(data);
                var userData = data.user;
                var userSRData = userData.srbank;

                var isSRbankUser = userSRData.is_srbank_user;
                var isSRbankBindCard = userSRData.is_srbank_user_bindcard;
                var isDLBindCardStatus = userData.bankcard_status;
                var isNeedRestPWD = userSRData.need_reset_pwd_first;
                var isSRbankUserSignAutoBid = userSRData.is_srbank_user_sign_auto_bid;
                var isSRbankUserSignCreditTransfer = userSRData.is_srbank_user_sign_credit_transfer;
                var isSRbackUserSignTransfer = userSRData.is_srbank_user_sign_transfer;

                userNavInfo(data.user); // 侧边栏用户信息

                bank.validateBank({
                    validata: {
                        signAutoBid: false
                    },
                    isSrbankUser: isSRbankUser,
                    srbankUserCallback: function() {
                        // 开通存管
                        popup.bankTipLayer('INVESTOR');
                    },
                    isSrbankUserBindcard: isSRbankBindCard,
                    bankcardStatus: isDLBindCardStatus,
                    bindCardCallback: function() {},
                    isNeedRestPWD: isNeedRestPWD,
                    resetPWDCallback: function() {},
                    validataSuccessCallback: function() {
                        // 展示元素
                        showDom(data);

                        var availableAmount = userData.available_total_money * 1;
                        validateInput(availableAmount, userData.withdraw_info.rate);

                        // 全部提现
                        $("#tradeOutAllBtn").on('click', function(e) {
                            e.preventDefault();

                            $("#tradeOutInput").val(availableAmount);

                            var freeMoney = (availableAmount * userData.withdraw_info.rate).toFixed(2);

                            $("#getMoney").text(availableAmount - freeMoney);
                            $("#freeMoney").text(freeMoney);

                            if (availableAmount < 100) {
                                layer.tips('提现金额不可低于100元', '#tradeOutInput');

                                return false;
                            } else {
                                $("#tradeOutBtn").attr({
                                    'disabled': false
                                }).removeClass('is-disabled');
                            }
                        });

                        // 提现
                        var redirectUrl = path.openBankRedirectUrl + path.tradeOutSuccessUrl + 'user_type=investor';
                        tradeOut(redirectUrl);
                    }
                });

                // 展示元素
                function showDom(data) {
                    var userInfo = data.user;
                    var bankInfo = userInfo.srbank;
                    var bankCard = bankInfo.bankcard;

                    var availableAmount = userInfo.available_total_money;
                    var bankName = bankCard.bankName;
                    var bankNo = bankCard.bankcardNo;
                    var bankImg = bankCard.img_logo_url;
                    var bankUser = bankCard.realName_e;

                    var withdrawInfo = userInfo.withdraw_info;

                    var bankNo_4 = bankNo.replace(/^(\d{4})(\d*)(\d{4})$/, '$3');

                    var isTradeOuting = userInfo.usr_note_title;

                    $("#freeRate").text(withdrawInfo.rate);
                    $("#TradeOutFreeNum").text(withdrawInfo.free_times);

                    $("#availableAmount").text(availableAmount);
                    $("#bankName").text(bankName).css({
                        'background-image': 'url(' + bankImg + ')'
                    });
                    $("#bankNo").text(bankNo);
                    $("#bankUser").text(bankUser);
                    $("#bankCardNo").text(bankNo_4);

                    if (isTradeOuting) {
                        $("#tradeOutList").show();
                        $("#tradeOutListBtn").attr('href', path.tradeOutList);
                    }
                };

                // 输入框验证
                function validateInput(availableAmount, rate) {
                    // 监听输入框
                    $("#tradeOutInput").on('input propertychange', function(e) {
                        e.preventDefault();

                        var $tradeOutBtn = $("#tradeOutBtn");
                        var inputMoney = $(this).val() * 1;

                        var freeMoney = (inputMoney * rate).toFixed(2);

                        $("#getMoney").text(inputMoney - freeMoney);
                        $("#freeMoney").text(freeMoney);

                        if (inputMoney < 100) {
                            layer.tips('提现金额不可低于100元', '#tradeOutInput');
                            $tradeOutBtn.attr({
                                'disabled': true
                            }).addClass('is-disabled');
                            return false;
                        } else if (inputMoney > availableAmount) {
                            layer.tips('超出可提现金额！', '#tradeOutInput');
                            $tradeOutBtn.attr({
                                'disabled': true
                            }).addClass('is-disabled');
                            return false;
                        } else {
                            $tradeOutBtn.attr({
                                'disabled': false
                            }).removeClass('is-disabled');
                        }
                    });
                }

                /*
                 * 提现
                 */
                function tradeOut(redirectUrl) {
                    form.on('submit(tradeOutForm)', function(data) {

                        var tradeMoney = data.field.trade_out_money;

                        bank.tradeOut({
                            amount: tradeMoney,
                            redirectUrl: redirectUrl,
                            callback: function(data) {
                                console.log(data);
                                window.location.href = data;
                            }
                        });

                        return false;
                    });
                };

            });
        },
        tradeOutListPage: function() {
            user.withdrawList({
                callback: function(data) {
                    console.log(data);

                    userNavInfo(data.user);

                    showDOM(data.list);
                }
            });

            function showDOM(data) {

                if (data.length > 0) {
                    var html = '';
                    for (var i = 0; i< data.length; i++) {

                        var leftTime = data[i].left_time;

                    	html += '<tr>' +
                    	           '<td>' + data[i].time + '</td>' +
                    	           '<td>' + data[i].money + '</td>' +
                    	           '<td>' + data[i].fee + '</td>' +
                    	           '<td>' + data[i].status + '(<span id="leftTime">'+ leftTime +'</span>)' + '</td>' +
                	            '</tr>';
                    }

                    $("#tradeOutListTable").empty().append(html);

                    if (leftTime > 0) {
                        utils.cuntDown('#leftTime', leftTime, function(time, date) {
                            layui.$('#leftTime').html(date[2]+'分'+date[3]+'秒');
                        });
                    }
                }
            }
        },
        captialDetailPage: function() {
            // 投资人--资金明细
            laydate.render({
                elem: '#dateStart'
            });

            laydate.render({
                elem: '#dateEnd'
            });

            // 初始化数据
            user.investFundList({
                page: 1,
                pageSize: 10,
                timeType: 0,
                startTime: 0,
                endTime: 0,
                detailType: 'invest',
                callback: function(data) {
                    console.log(data);
                    userNavInfo(data.user); // 侧边栏用户信息

                    showDOM(data.list);

                    showPage(data.list);
                }
            });

            // 筛选日期
            $(".js-invest-time").on('click', function() {
                console.log();
                $(this).addClass('is-select').siblings().removeClass('is-select');

                var timeType = $(this).data('time');
                var detailType = $(".js-invest-type.is-select").data('type');

                console.log(detailType);
                user.investFundList({
                    page: 1,
                    pageSize: 10,
                    timeType: timeType,
                    startTime: 0,
                    endTime: 0,
                    detailType: detailType,
                    callback: function(data) {
                        showDOM(data.list);

                        showPage(data.list);
                    }
                });
            });

            $(".js-invest-type").on('click', function() {

                $(this).addClass('is-select').siblings().removeClass('is-select');

                var detailType = $(this).data('type');
                var timeType = $(".js-invest-time.is-select").data('time');

                if (!timeType) {
                    timeType = 0;
                }

                user.investFundList({
                    page: 1,
                    pageSize: 10,
                    timeType: timeType,
                    startTime: 0,
                    endTime: 0,
                    detailType: detailType,
                    callback: function(data) {
                        showDOM(data.list);

                        showPage(data.list);
                    }
                });
            });

            $("#timeSearchBtn").on('click', function(e) {
                e.preventDefault();

                var startTime = $("#dateStart").val();
                var endTime = $("#dateEnd").val();
                var detailType = $(".js-invest-type.is-select").data('type');

                if (!startTime && !endTime) {
                    layer.tips('请选择起始时间和结束时间!', '#timeSearchBtn');
                } else {
                    $(".js-invest-time").removeClass('is-select');

                    user.investFundList({
                        page: 1,
                        pageSize: 10,
                        timeType: 0,
                        startTime: startTime,
                        endTime: endTime,
                        detailType: detailType,
                        callback: function(data) {
                            showDOM(data.list);

                            showPage(data.list);
                        }
                    });
                }
            });

            function showDOM(data) {
                var html = '';
                var num = data.count.num;
                var dataList = data.list;
                var billType = '';

                if (num > 0) {
                    for (var i = 0; i < dataList.length; i++) {

                        if (dataList[i].bill_type === '冻结') {
                            billType = '<td class="bill-black">' + dataList[i].money + '</td>';
                        } else if (dataList[i].bill_type === '支出') {
                            billType = '<td class="bill-red">-' + dataList[i].money + '</td>';
                        } else if (dataList[i].bill_type === '收入') {
                            billType = '<td class="bill-green">+' + dataList[i].money + '</td>';
                        }

                        html += '<tr>' +
                                    '<td>' + dataList[i].time + '</td>' +
                                    '<td>' + dataList[i].bill_type + '</td>' +
                                    '<td>' + dataList[i].trade_type + '</td>' +
                                    billType +
                                    '<td>' + dataList[i].new_balance + '元</td>' +
                                    '<td>' + dataList[i].remark_user + '</td>' +
                                '</tr>';
                    }
                } else {
                    html +=  '<tr class="empty">' +
                                    '<td colspan="6">空空如也...</td>' +
                                '</tr>';
                }

                $("#capitalTable").empty().append(html);
            };

            function showPage(data) {
                console.log(data);
                var maxPage = data.count.page_count;

                if (maxPage > 1) {
                    laypage.render({
                        elem: 'capitalPage',
                        count: data.count.num, // 数据总数，从服务端得到
                        limit: 10,
                        theme: "#f60",
                        layout: ['prev', 'page', 'next', 'skip'],
                        jump: function(obj, first) {
                            if (!first) {

                                var timeType = $(".js-invest-time.is-select").data('type');
                                var detailType = $(".js-invest-type.is-select").data('type');

                                if (!timeType) {
                                    timeType = 0;
                                }

                                user.investFundList({
                                    page: obj.curr,
                                    pageSize: 10,
                                    timeType: timeType,
                                    startTime: 0,
                                    endTime: 0,
                                    detailType: detailType,
                                    callback: function(data) {
                                        showDOM(data.list);
                                    }
                                });
                            }

                        }
                    });
                } else {
                    $("#capitalPage").hide();
                }
            }

        },
        loanRecordPage: function() {
            var params = {
                page: 1,
                page_size: 10,
                filter_from: 'STANDARD,TRANSFER',
                filter_period: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36',
                filter_status: 'FUNDRAISING,PAYBACK,FINISH,ADVAN_FINISH,FAILURE'
            };

            user.investInvestmentList({
                page: params.page,
                pageSize: params.page_size,
                filterFrom: params.filter_from,
                filterPeriod: params.filter_period,
                filterStatus: params.filter_status,
                callback: function(data) {
                    console.log(data);
                    userNavInfo(data.user); // 侧边栏用户信息
                    showDOM(data.list);

                    showPage(data);
                }
            });

            $("#pro_type, #pro_status, #pro_date").find("dd").on("click", function() {
                filterPage($(this));
            });

            // 条件筛选
            function filterPage(obj) {

                obj.addClass("select").siblings().removeClass("select");
                var proType = $("#pro_type").find("dd.select").data("protype");
                var proStatus = $("#pro_status").find("dd.select").data("prostatus");
                var proDate = $("#pro_date").find("dd.select").data("prodate");

                var fileterParams = getParams(proType, proStatus, proDate);

                user.investInvestmentList({
                    page: 1,
                    pageSize: 10,
                    filterFrom: fileterParams.filter_from,
                    filterPeriod: fileterParams.filter_period,
                    filterStatus: fileterParams.filter_status,
                    callback: function(data) {
                        showDOM(data.list);
                    }
                });

            };

            function showDOM(data) {
                var html = '';
                if (data.length > 0) {
                    $.each(data, function(k, v) {
                        var check = "";

                        if (v.history_interest !== 0) {
                            check =
                                '<td><a href="javascript:;" class="link pay-btn back_money_js" data-payback_principal_interest="' +
                                v.payback_principal_interest +
                                '" data-investment_id="' + v.investment_id +
                                '">还款计划</a><br /><a href="javascript:;" data-url="' +
                                v.contract_url +
                                '" class="link protocol protocol-btn" style="color: #141414;">合同协议</a></td>';
                        } else {
                            check = "<td></td>";
                        }

                        var noviceIcon = "";
                        if (v.is_novice > 0) {
                            noviceIcon = '<i class="icon" style="display: inline-block; width: 60px;height: 24px;background-color: #f45e5e;border-radius: 3px;text-align: center;line-height: 24px;font-size: 12px;color: #fff;margin-right: 5px;">新手专享</i>';
                        } else {
                            noviceIcon = "";
                        }

                        var leftDateMonth = "";
                        var leftDateDay = "";
                        if (v.left_investment_month > 0) {
                            leftDateMonth = v.left_investment_month + '个月';
                        }

                        if (v.left_investment_day > 0) {
                            leftDateDay = v.left_investment_day + '天';
                        }

                        html += '<tr>' +
                            '<td style="text-align: left;width:230px;"><a target="_bank" href="' + v.forward_url +
                            '" style="color: #141414;font-size: 13px;">' + noviceIcon + v.loan_text +
                            '</a></td>' +
                            '<td>' + leftDateMonth + leftDateDay + '</td>' +
                            '<td>' + v.principal + '</td>' +
                            '<td>' + v.interest_rate + '%</td>' +
                            '<td>' + v.history_interest + '</td>' +
                            '<td>' + v.payback_principal_interest + '</td>' +
                            '<td>' + v.due_date + '</td>' +
                            check;

                        if (v.can_transfer == 'true' || v.can_transfer == true) {
                            html +=
                                '<td class="zr"><a href="' + path.investTransfer + '" class="transfer-btn can_buy_js" >' +
                                v.can_transfer_text + '</a></td>';
                        } else {
                            html += '<td style="color: #757575;">' + v.can_transfer_text +
                                '</td>';
                        }
                        html += '</tr>';
                    });
                } else {
                    html +=  '<tr class="empty">' +
                                    '<td colspan="9">空空如也...</td>' +
                                '</tr>';
                }

                $("#loanTable").empty().append(html);
            };

            function showPage(data) {

                if (data.maxPage > 1) {
                    $('#loanPage').show();
                    laypage.render({
                        elem: 'loanPage',
                        count: data.total, // 数据总数，从服务端得到
                        limit: data.limit,
                        theme: "#f60",
                        layout: ['prev', 'page', 'next', 'skip'],
                        jump: function(obj, first) {
                            if (!first) {
                                var proType = $("#pro_type").find("dd.select").data("protype");
                                var proStatus = $("#pro_status").find("dd.select").data("prostatus");
                                var proDate = $("#pro_date").find("dd.select").data("prodate");

                                var fileterParams = getParams(proType, proStatus, proDate);

                                user.investInvestmentList({
                                    page: obj.curr,
                                    pageSize: 10,
                                    filterFrom: fileterParams.filter_from,
                                    filterPeriod: fileterParams.filter_period,
                                    filterStatus: fileterParams.filter_status,
                                    callback: function(data) {
                                        showDOM(data.list);
                                    }
                                });
                            }

                        }
                    });
                } else {
                    $('#loanPage').hide();
                }
            };

            // 获取筛选参数
            function getParams(proType, proStatus, proDate) {
                var filterFrom = "";
                var filterStatus = "";
                var filterPeriod = "";

                var filterObj = {};

                switch (proType) {
                    case 0:
                        filterFrom = "STANDARD,TRANSFER";
                        break;
                    case 1:
                        filterFrom = "STANDARD";
                        break;
                    case 2:
                        filterFrom = "TRANSFER";
                        break;
                    default:
                        break;
                }
                switch (proStatus) {
                    case 0:
                        filterStatus = "FUNDRAISING,PAYBACK,FINISH,ADVAN_FINISH,FAILURE";
                        break;
                    case 1:
                        filterStatus = "FUNDRAISING";
                        break;
                    case 2:
                        filterStatus = "PAYBACK";
                        break;
                    case 3:
                        filterStatus = "FINISH";
                        break;
                    case 4:
                        filterStatus = "FAILURE";
                        break;
                    case 5:
                        filterStatus = "ADVAN_FINISH";
                        break;
                    default:
                        break;
                }
                switch (proDate) {
                    case 0:
                        filterPeriod =
                            "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36";
                        break;
                    case 1:
                        filterPeriod = "1,2,3";
                        break;
                    case 2:
                        filterPeriod = "3,4,5,6";
                        break;
                    case 3:
                        filterPeriod = "6,7,8,9,10,11,12";
                        break;
                    case 4:
                        filterPeriod = "12,13,14,15,16,17,18,19,20,21,22,23,24";
                        break;
                    case 5:
                        filterPeriod = "24,25,26,27,28,29,30,31,32,33,34,35,36";
                        break;
                    default:
                        break;
                }

                filterObj['filter_from'] = filterFrom;
                filterObj['filter_status'] = filterStatus;
                filterObj['filter_period'] = filterPeriod;

                return filterObj;
            };

            // 查看合同
            $("body").on("click", ".protocol", function() {
                var url = $(this).data('url');

                popup.protocolLayer('借款协议', url);
            });

            // 查看还款计划
            $("body").on("click", ".back_money_js", function(e) {
                e.preventDefault();
                var $this = $(this);
                var investmentID = $(this).data("investment_id");

                user.investInvestmentSchedules({
                    investmentID: investmentID,
                    callback: function(data) {
                        var hasPrincipalInterestTotal = data.has_principal_interest_total; // 已回本息
                        var waitPrincipalInterestTotal = data.wait_principal_interest_total; // 待回本息

                        var tableStr = payBackPlanPage(data.list);

                        var layerHtml = '<div class="pay-back-wrapper">' +
                                            '<div class="pay-back-info">' +
                                                '<span>已回本息:' + hasPrincipalInterestTotal + '元</span>' +
                                                '<span>待回本息:' + waitPrincipalInterestTotal + '元</span>' +
                                            '</div>' +
                                            '<div class="pay-back-tip">注：投资管理费按投资收益的10%收取(2018.05.01~2018.12.31期间投资可享受投资管理费五折优惠)</div>' +
                                            '<table class="layui-table">' +
                                                '<thead>' +
                                                    '<tr>' +
                                                        '<th>期次</th>' +
                                                        '<th>还款日期</th>' +
                                                        '<th>还款本息</th>' +
                                                        '<th>还款本金</th>' +
                                                        '<th>还款利息</th>' +
                                                        '<th>投资管理费（优惠前）</th>' +
                                                        '<th>还款状态</th>' +
                                                    '</tr>' +
                                                '</thead>' +
                                                '<tbody id="capitalTable">' +
                                                   tableStr +
                                                '</tbody>' +
                                            '</table>' +
                                        '</div>';

                        layer.open({
                            type: 1,
                            content: layerHtml,
                            skin: 'dl__layer back-plan-layer',
                            title: '还款计划',
                            area: ['604px','478px'],
                            shade: [0.4, '#000'],
                            move: false,
                            resize: false,
                        });
                    }
                });

            });

            // 还款计划表格
            function payBackPlanPage(data) {
                var str = "";
                $.each(data, function(key, value) {
                    str += '<tr>' +
                                '<td>' + value.sequence + '</td>' +
                                '<td>' + value.payment_date_format + '</td>' +
                                '<td>' + value.principal_interest + '</td>' +
                                '<td>' + value.principal + '</td>' +
                                '<td>' + value.interest + '</td>' +
                                '<td>' + value.fee + '</td>' +
                                '<td>' + value.payment_status_format; + '</td>' +
                            '</tr>';
                });
                return str;
            }
        },
        reservationPage: function() {
            // 获取数据
            function getData(type, page, pageSize, callback) {

                user.reservationList({
                    type: type,
                    page: page,
                    pageSize: pageSize,
                    callback: function(data) {
                        callback(data);
                    }
                });
            }

            var config = {
                LOADING_TYPE: 1,    // 等待
                DONE_TYPE: 2,   // 完成
                CANCEL_TYPE: 3,  // 失效
                LOADING_PAGE_SIZE: 10,
                DONE_PAGE_SIZE: 10,
                CANCEL_PAGE_SIZE: 10
            };
            // 获取第一页数据
            getData(1, 1, 10, function(data) {
                console.log(data)
                userNavInfo(data.user); // 侧边栏用户信息

                showDOM(1, data.list);

                showPage(data, 'cancelPage', 1, config.CANCEL_PAGE_SIZE);

                if (data.wait_num > 0) {
                    $("#waitingNum").text('(' + data.wait_num + ')');
                }
            });

            element.on('tab(reservationTab)', function(){
                var type = this.getAttribute('lay-id') * 1;

                if (type === 1) {
                    console.log(type);
                    getData(1, 1, 10, function(data) {
                        showDOM(1, data.list);

                        showPage(data, 'watingPage', 1, config.LOADING_PAGE_SIZE);
                    });
                } else if (type === 2) {
                    getData(2, 1, 10, function(data) {
                        showDOM(2, data.list);

                        showPage(data, 'donePage', 2, config.LOADING_PAGE_SIZE);
                    });
                } else if (type === 3) {
                    getData(3, 1, 10, function(data) {

                        showDOM(3, data.list);

                        showPage(data, 'cancelPage', 3, config.CANCEL_PAGE_SIZE);
                    });
                }
            });

            function showPage(data, ele, type, pageSize) {

                if (data.maxPage > 1) {
                    laypage.render({
                        elem: ele,
                        count: data.total,
                        limit: data.limit,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#f60',
                        jump: function (obj, first) {

                            if (!first) {
                                getData(type, obj.curr, pageSize, function(data) {
                                    showDOM(type, data.list);
                                });
                            }
                        }
                    });
                } else {
                    $('#'+ele).hide();
                }
            }

            function showDOM(type, data) {
                if (type === 1) {
                    var htmlStr = "";
                    var buttonHtml = "";

                    if (data.length > 0) {

                        for (var i = 0; i < data.length; i++) {

                            var noviceIcon = "";
                            if (data[i].is_novice > 0) {
                                noviceIcon = '<i class="icon" style="display: inline-block; width: 60px;height: 24px;background-color: #f45e5e;border-radius: 3px;text-align: center;line-height: 24px;font-size: 12px;color: #fff;margin-right: 5px;">新手专享</i>';
                            } else {
                                noviceIcon = "";
                            }

                            if (data[i].is_can_cancel === 1) {
                                buttonHtml = '<button class="btn__operation" id="cancel_btn" data-batch_auto_id="' + data[i].id + '">取消</button>';
                            } else {
                                buttonHtml = '<span class="btn__operation--disabled" >不可取消</span>'
                            }

                            htmlStr += '<tr>' +
                                            '<td>' + noviceIcon + data[i].time_desc + '</td>' +
                                            '<td>' + data[i].period_desc + '个月</td>' +
                                            '<td>' + data[i].rate_desc + '%</td>' +
                                            '<td>' + data[i].total_money + '</td>' +
                                            '<td>' + buttonHtml + '</td>' +
                                        '</tr>';
                        }

                    } else {
                        htmlStr +=  '<tr class="empty">' +
                                        '<td colspan="5">空空如也...</td>' +
                                    '</tr>';
                    }

                    $("#waitingTable").empty().append(htmlStr);
                } else if (type === 2) {
                    var htmlStr = "";

                    if (data.length > 0) {

                        for (var i = 0; i < data.length; i++) {

                            var noviceIcon = "";
                            if (data[i].is_novice > 0) {
                                noviceIcon = '<i class="icon" style="display: inline-block; width: 60px;height: 24px;background-color: #f45e5e;border-radius: 3px;text-align: center;line-height: 24px;font-size: 12px;color: #fff;margin-right: 5px;">新手专享</i>';
                            } else {
                                noviceIcon = "";
                            }

                            htmlStr += '<tr>' +
                                            '<td>' + noviceIcon + data[i].time_desc + '</td>' +
                                            '<td>' + data[i].period_desc + '个月</td>' +
                                            '<td>' + data[i].rate_desc + '%</td>' +
                                            '<td>' + data[i].total_money + '</td>' +
                                            '<td>' + data[i].use_money + '</td>' +
                                            '<td>' + data[i].transfer_interest + '</td>' +
                                            '<td>' + data[i].end_time_desc + '</td>' +
                                        '</tr>';
                        }

                    } else {
                        htmlStr += '<tr class="empty">' +
                                        '<td colspan="7">空空如也...</td>' +
                                    '</tr>';
                    }

                    $("#doneTable").empty().append(htmlStr);
                } else if (type === 3) {
                    var htmlStr = "";

                    if (data.length > 0) {

                        for (var i = 0; i < data.length; i++) {
                            htmlStr += '<tr>' +
                                    '<td>' + data[i].time_desc + '</td>' +
                                    '<td>' + data[i].period_desc + '个月</td>' +
                                    '<td>' + data[i].rate_desc + '%</td>' +
                                    '<td>' + data[i].total_money + '</td>' +
                                    '<td>' + data[i].end_time_desc + '</td>' +
                                    '<td>' + data[i].desc + '</td>' +
                                '</tr>';
                        }

                    } else {
                        htmlStr += '<tr class="empty" >' +
                                '<td colspan="6">空空如也...</td>' +
                            '</tr>';
                    }

                    $("#cancelTable").empty().append(htmlStr);
                }
            };

            $('body').on('click', '#cancel_btn', function (e) {
                e.preventDefault();
                var $that = $(this);

                var html = "取消预约后系统会对该笔预约金额进行资金解冻，该笔预约金额将不参与投资";

                layer.confirm(html, {
                    title: '确认取消预约？',
                    btn: ['确认取消', '暂不取消'],
                    move: false,
                    resize: false
                }, function () {  // 确认取消
                    user.reservationCancel({
                        batchAutoId: $that.data('batch_auto_id'),
                        callback: function(data) {
                            layer.msg("取消成功！", {
                                time: 500
                            }, function () {
                                window.location.reload();
                            });
                        }
                    });
                }, function () {
                    layer.closeAll();
                });
            });
        },
        transferPage: function() {
            // 获取数据
            function getData(filterStatus, page, pageSize, callback) {

                user.investTransferList({
                    filterStatus: filterStatus,
                    page: page,
                    pageSize: pageSize,
                    callback: function(data) {
                        callback(data);
                    }
                });
            }

            var config = {
                doingStatus: 'QUEUE',
                todoStatus: 'NO',
                doneStatus: 'FINISH'
            };

            // 获取第一页数据
            getData(config.doingStatus, 1, 10, function(data) {
console.log(data);
                $("#isBalanceStatus").val(data.user.balance_auto_status); // 保存余额复投状态

                userNavInfo(data.user); // 侧边栏用户信息

                showDOM(config.doingStatus, data.list);

                showPage(data, 'doingPage', 1, 10);

            });

            element.on('tab(transferTab)', function(){
                var type = this.getAttribute('lay-id');
console.log(type)
                    if (type === 'QUEUE') {
                    console.log(type);
                    getData(type, 1, 10, function(data) {
                        showDOM(type, data.list);

                        showPage(data, 'doingPage', type, 10);
                    });
                } else if (type === 'NO') {
                    getData(type, 1, 10, function(data) {
                        showDOM(type, data.list);

                        showPage(data, 'todoPage', type, 10);
                    });
                } else if (type === 'FINISH') {
                    getData(type, 1, 10, function(data) {

                        showDOM(type, data.list);

                        showPage(data, 'donePage', type, 10);
                    });
                }
            });

            function showPage(data, ele, type, pageSize) {

                if (data.maxPage > 1) {
                    laypage.render({
                        elem: ele,
                        count: data.total,
                        limit: data.limit,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#ff6600',
                        jump: function (obj, first) {

                            if (!first) {
                                getData(type, obj.curr, pageSize, function(data) {
                                    showDOM(type, data.list);
                                });
                            }
                        }
                    });
                } else {
                    $('#' + ele).hide();
                }
            }

            function showDOM(type, data) {
                if (type === 'QUEUE') {
                    var html = "";

                    if (data.length > 0) {
                        $.each(data, function (k, v) {
                            var noviceIcon = "";
                            if (v.is_novice > 0) {
                                noviceIcon = '<i class="icon" style="display: inline-block; width: 60px;height: 24px;background-color: #f45e5e;border-radius: 3px;text-align: center;line-height: 24px;font-size: 12px;color: #fff;margin-right: 5px;">新手专享</i>';
                            } else {
                                noviceIcon = "";
                            }

                            html += '<tr>' +
                                '<td style="text-align: left;width:230px;"><a href="/standard/detail/' + v.loan_id + '" style="color: #141414;font-size: 13px;">' + noviceIcon + v.loan_text + '</a></td>' +
                                '<td>' + v.loan_period + '个月</td>' +
                                '<td>' + v.amount + '</td>' +
                                '<td>' + v.interest_rate + '%</td>' +
                                '<td>' + v.history_interest + '</td>' +
                                '<td>' + v.now_payback + '</td>' +
                                '<td>' + v.transfer_money + '</td>' +
                                /* '<td>'+v.accept_money+'</td>'+*/
                                '<td>' + v.create_time_text + '</td>';

                            html += '</tr>';

                        });

                    } else {
                        html +=  '<tr class="empty">' +
                                        '<td colspan="8">空空如也...</td>' +
                                    '</tr>';
                    }

                    $("#doingTable").empty().append(html);
                } else if (type === 'NO') {
                    var html = "";

                    if (data.length > 0) {

                        $.each(data, function (k, v) {
                        console.log(v);
                            var noviceIcon = "";
                            if (v.is_novice > 0) {
                                noviceIcon = '<i class="icon" style="display: inline-block; width: 60px;height: 24px;background-color: #f45e5e;border-radius: 3px;text-align: center;line-height: 24px;font-size: 12px;color: #fff;margin-right: 5px;">新手专享</i>';
                            } else {
                                noviceIcon = "";
                            }

                            html += '<tr>' +
                                '<td style="text-align: left;width:230px;"><a href="/standard/detail/' + v.loan_id + '" style="color: #141414;font-size: 13px;">' + noviceIcon + v.loan_text + '</a></td>' +
                                '<td>' + v.loan_period + '个月</td>' +
                                '<td class="inveset_money_js">' + v.amount + '</td>' +
                                '<td>' + v.interest_rate + '%</td>' +
                                '<td>' + v.history_interest + '</td>' +
                                '<td>' + v.now_payback + '</td>' +
                                '<td>' + v.left_payback + '</td>' +
                                '<td>' + v.due_date_text + '</td>';
                            if (v.transfer_status == 0) {
                                html += '<td class="zr"><a href="javascript:;" class="transfer-btn transferStandard-js" data-principal="' + v.principal + '" data-manage_fee="' + v.manage_fee + '" data-money_interval="' + v.money_interval + '" data-investment_id="' + v.investment_id + '">' + v.transfer_status_text + '</a></td>';
                            } else {
                                html += '<td style="color: #757575;"><a href="javascript:;">' + v.transfer_status_text + '</a></td>';
                            }

                            html += '</tr>';

                        });


                    } else {
                        html += '<tr class="empty">' +
                                        '<td colspan="9">空空如也...</td>' +
                                    '</tr>';
                    }

                    $("#todoTable").empty().append(html);
                } else if (type === 'FINISH') {
                    var html = "";

                    if (data.length > 0) {

                        $.each(data, function (k, v) {
                            var noviceIcon = "";
                            if (v.is_novice > 0) {
                                noviceIcon = '<i class="icon" style="display: inline-block; width: 60px;height: 24px;background-color: #f45e5e;border-radius: 3px;text-align: center;line-height: 24px;font-size: 12px;color: #fff;margin-right: 5px;">新手专享</i>';
                            } else {
                                noviceIcon = "";
                            }

                            html += '<tr>' +
                                '<td style="text-align: left;width:230px;"><a href="/standard/detail/' + v.loan_id + '" style="color: #141414;font-size: 13px;">' + noviceIcon + v.loan_text + '</a></td>' +
                                '<td>' + v.loan_period + '个月</td>' +
                                '<td>' + v.amount + '</td>' +
                                '<td>' + v.interest_rate + '%</td>' +
                                '<td>' + v.now_payback + '</td>' +
                                '<td>' + v.transfer_money + '</td>' +
                                /*'<td>'+v.accept_money+'</td>'+*/
                                '<td>' + v.create_time_text + '</td>' +
                                '<td>' + v.transfer_time_text + '</td>';
                            html += '</tr>';

                        });

                    } else {
                        html += '<tr class="empty" >' +
                                '<td colspan="8">空空如也...</td>' +
                            '</tr>';
                    }

                    $("#doneTable").empty().append(html);
                }
            };

            // 申请转让
            $('body').on('click', '.transferStandard-js', function (e) {
                e.preventDefault();
                var $this = $(this);

                var userBanlanceStatus = $("#isBalanceStatus").val()*1;

                if (!userBanlanceStatus) {

                    // 通过验证后弹窗
                    var principal = $this.data('principal');
                    var manage_fee = $this.data('manage_fee');
                    var money_interval = $this.data('money_interval');

                    $("#transfer_money_layer").text(principal + '元');
                    $("#manage_fee_layer").text(manage_fee);
                    $("#money_interval_layer").attr({"placeholder": "请输入" + money_interval + "之间的金额"});
                    transferFn($this);

                    function transferFn($this) {
                        layer.open({
                            type: 1,
                            content: $("#transfer_standard_layer"),
                            skin: 'transfer-standard',
                            title: '转让确认',
                            area: ['604px', '510px'],
                            resize: false,
                            success: function (layero, index) {

                                $("#sure_btn").off("click").on("click", function (e) {
                                    e.preventDefault();

                                    var investment_id = $this.data('investment_id');
                                    var investment_money = $("#money_interval_layer").val();
                                    var investment_pass = $("#pass").val();
                                    var userIDNo = $("#user_id_no").val();  // 身份证号末四位
                                    var userReason = $("#select_reason").val();

                                    var params = {
                                        money_interval: money_interval,
                                        investment_id: investment_id,
                                        money: principal,
                                        reason: userReason,
                                        userIDNo: userIDNo
                                    };

                                    transferSure(params);
                                });

                                // 取消申请
                                $("#cancel_btn").off("click").on("click", function () {
                                    layer.close(index);
                                    window.location.reload();
                                });
                            },
                            cancel: function () {
                                window.location.reload();
                            }
                        });
                    }
                } else {
                    // 提示关闭余额复投
                    $("#isOpenBalance").show();
                    popup.closeBalanceTipLayer({
                        yes: function(index, layno) {
                            window.location.href = path.balanceReturnUrl;
                        },
                        btn2: function(index, layno) {
                            // 通过验证后弹窗
                            var principal = $this.data('principal');
                            var manage_fee = $this.data('manage_fee');
                            var money_interval = $this.data('money_interval');

                            $("#transfer_money_layer").text(principal + '元');
                            $("#manage_fee_layer").text(manage_fee);
                            $("#money_interval_layer").attr({"placeholder": "请输入" + money_interval + "之间的金额"});
                            transferFn($this);

                            function transferFn($this) {
                                layer.open({
                                    type: 1,
                                    content: $("#transfer_standard_layer"),
                                    skin: 'transfer-standard',
                                    title: '转让确认',
                                    area: ['604px', '510px'],
                                    resize: false,
                                    success: function (layero, index) {

                                        $("#sure_btn").off("click").on("click", function (e) {
                                            e.preventDefault();

                                            var investment_id = $this.data('investment_id');
                                            var investment_money = $("#money_interval_layer").val();
                                            var investment_pass = $("#pass").val();
                                            var userIDNo = $("#user_id_no").val();  // 身份证号末四位
                                            var userReason = $("#select_reason").val();

                                            var params = {
                                                money_interval: money_interval,
                                                investment_id: investment_id,
                                                money: principal,
                                                reason: userReason,
                                                userIDNo: userIDNo
                                            };

                                            transferSure(params);
                                        });

                                        // 取消申请
                                        $("#cancel_btn").off("click").on("click", function () {
                                            layer.close(index);
                                            window.location.reload();
                                        });
                                    },
                                    cancel: function () {
                                        window.location.reload();
                                    }
                                });
                            }
                        }
                    });
                }
            });

            // 勾选协议
            $("body").on("click", "#user_checked", function () {
                if ($(this).data("checked") === 1) {
                    $(this).removeClass("checked");
                    $(this).data("checked", 0);
                } else {
                    $(this).data("checked", 1);
                    $(this).addClass("checked");
                }
            });

            function transferSure(params) {
                var isChecked = $("#user_checked").data("checked");
                var money_interval_arr = (params.money_interval).split('-');
                var min_money_interval = money_interval_arr[0];
                var max_money_interval = money_interval_arr[1];
                // 验证
                if (isChecked !== 1) {
                    layer.msg("请同意协议！");
                    return;
                }

                /* if (!params.money) {
                     layer.msg("请输入转让价格!");
                     return;
                 } else if (params.money * 1 < min_money_interval * 1 || params.money * 1 > max_money_interval * 1) {
                     layer.msg("请输入" + min_money_interval + "-" + max_money_interval + "之间的金额");
                     return;
                 }*/

                if (!params.userIDNo) {
                    layer.msg("请输入身份证末四位！");
                    return;
                }

                user.investInvestmentTransfer({
                    investmentId: params.investment_id,
                    money: params.money,
                    reason: params.reason,
                    identification: params.userIDNo,
                    callback: function (data) {

                        layer.open({
                            title: "提示",
                            content: "转让申请成功!",
                            yes: function (index) {
                                layer.closeAll();
                                window.location.reload();
                            }
                        });
                    }
                });


            }
        },
        inviteFriendsPage: function() {
            user.inviteData({
                callback: function(data) {
                    console.log(data);

                    userNavInfo(data.user);

                    showDOM(data);

                    // 调取百度分享
                    var button_type = '';
                    $(".js-share-btn").mouseover(function () {
                        button_type = $(this).data('cmd');
                    });

                    function SetShareUrl(cmd, config) {
                        if (button_type == 'tsina' || button_type == 'qzone') {
                            config.bdUrl = data.pc_invite_url;
                        }else{
                            config.bdUrl = data.pc_invite_url;
                        }
                        return config;
                    }

                    window._bd_share_config = {
                        common: { // 此处放置通用设置
                            bdText: '多啦聚财-安全、透明的互联网金融理财平台',
                            bdDesc: '我在多啦聚财投资，邀请你一起加入，让财富稳健增长，注册有惊喜哦！',
                            bdMini: 1,
                            bdMiniList: false,
                            bdStyle: 1,
                            bdSize: 32,
                            onBeforeClick: SetShareUrl,
                            bdPic: path.shareLogoImg
                        },
                        share: [ // 此处放置分享按钮设置
                            {
                                "tag" : "share_platform",
                                "bdSize" : 16
                            }, {
                                "bdSize" : 32
                            }
                        ]
                    };

                    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src=path.shareJs+'?cdnversion='+~(-new Date()/36e5)];

                    // 短信分享
                    $("#msgShareBtn").on('click', function(e) {
                        e.preventDefault();

                        layer.open({
                            content: $('#msgShareWrapper').html(),
                            skin: 'dl__layer share-msg-layer',
                            btn: false,
                            move: false,
                            resize: false,
                            area: ['600px', '258px'],
                            success: function() {
                                form.on('submit(sendMsgForm)', function(data) {
                                    console.log(data);

                                    return false;
                                });
                            }
                        });
                    });

                    // 复制链接
                    var copyPath01 = new Clipboard('#copyInviteShareLink');
                    copyPath01.on("success", function (e) {
                        layer.open({
                            content: '链接复制成功，发送给好友！'
                        });
                    });
                    copyPath01.on("error", function (e) {
                       layer.msg("复制失败，您可以使用手动复制!");
                    });
                }
            });

            user.inviteList({
                page: 1,
                pageSize: 10,
                callback: function(data) {
                    showInviteList(data.data);

                    showInvitePage(data); // 分页
                }
            });

            function showDOM(data) {

                var inviteBannerLink = data.pc_url;
                var inviteBannerImg = data.pc_img_url;
                var inviteNum = data.total_num; // 邀请总人数
                var hasCashBackTotal = data.hasCashBackTotal_format; // 已发放返佣
                var waitCashBackTotal = data.waitCashBackTotal_format; // 待发放返佣
                var inviteShareLink = data.pc_invite_url;

                $("#inviteLink").attr('href', inviteBannerLink);
                $("#inviteImg").attr('src', inviteBannerImg);
                $("#inviteNum").text(inviteNum);
                $("#hasCashBackTotal").text(hasCashBackTotal);
                $("#waitCashBackTotal").text(waitCashBackTotal);
                $("#inviteShareLink").val(inviteShareLink);

                var inviteInvestList = data.invest_list;
                var inviteInvestHtml = '';
                if (inviteInvestList) {
                    for (var i = 0; i < inviteInvestList.length; i++) {
                        inviteInvestHtml += '<tr>' +
                                    '<td>' + inviteInvestList[i].mobile + '</td>' +
                                    '<td>' + inviteInvestList[i].real_name + '</td>' +
                                    '<td>' + inviteInvestList[i].register_time + '</td>' +
                                    '<td>' + inviteInvestList[i].invest_time + '</td>' +
                                    '<td>' + inviteInvestList[i].remark + '</td>' +
                                '</tr>';
                    }
                } else {
                    inviteInvestHtml = '<tr class="empty"><td colspan="5">空空如也...</td></tr>';
                }
                $("#inviteInvestTable").empty().append(inviteInvestHtml);
            }

            function showInviteList(data) {
                var html = '';
                if (data.length > 0) {

                    for (var i = 0; i < data.length; i++) {
                        html += '<tr>' +
                                    '<td>' + data[i].mobile + '</td>' +
                                    '<td>' + data[i].real_name + '</td>' +
                                    '<td>' + data[i].register_time + '</td>' +
                                    '<td>' + data[i].first_invest_time + '</td>' +
                                    '<td>' + data[i].remark + '</td>' +
                                '</tr>';
                    }
                } else {
                    html = '<tr class="empty"><td colspan="5">空空如也...</td></tr>';
                }
                $("#inviteAllTable").empty().append(html);
            }

            function showInvitePage(data) {
                console.log(data);
                if (data.pageTotal > 1) {
                    laypage.render({
                        elem: 'inviteAllPage',
                        count: data.total,
                        limit: data.pageSize * 1,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#ff6600',
                        jump: function(obj, first) {
                            if(!first){
                                user.inviteList({
                                    page: obj.curr,
                                    pageSize: data.pageSize * 1,
                                    callback: function(data) {
                                        showInviteList(data.data);
                                    }
                                });
                            }
                        }
                    });
                }
            };
        },
        settingPage: function() {
            user.setting({
                callback: function(data) {
console.log(data);
                    var userData = data.user;
                    var userBankData = userData.srbank;
                    var isBankUser = userBankData.is_srbank_user; // 是否开通存管

                    userNavInfo(data.user); // 侧边栏用户信息

                    showDom(userData);

                    // 重置密码
                    $("#resetPassBtn").on('click', function(e) {
                        e.preventDefault();

                        var redirectUrl = path.debtorUserCenterUrl;

                        if (!isBankUser) { // 未开通存管
                            popup.openTips02Layer('INVESTOR');
                        } else {
                            bank.resetPass({
                                redirectUrl: redirectUrl,
                                authCode: '',
                                needCheck: false,
                                callback: function(data) {

                                    window.location.href = data;
                                }
                            });
                        }
                    });

                    // 风险测评
                    $("#riskBtn").on('click', function(e) {
                        e.preventDefault();

                        riskTestLayer();

                    });

                }
            });

            function riskTestLayer() {
                user.riskEvaluationQuestion({
                    callback: function(data) {
                        console.log(data);

                        riskHtml = getRiskHtml(data);

                        var riskIndex = layer.open({
                            type: 1,
                            content: riskHtml,
                            area: '630px',
                            resize: false,
                            move: false,
                            title: '风险测评',
                            fixed: false,
                            skin: 'dl__layer risk-layer',
                            success: function() {
                                form.render();

                                // 下一题
                                var riskCount = 0;
                                var riskQuestionLists = $("#riskQuestionLists").children();
                                var riskQuestionListsLength = riskQuestionLists.length;
                                var riskBtnDisabledClass = 'risk-btn--disabled';
                                var $riskPrevBtn = $("#riskPrevBtn");
                                var $riskNextBtn = $("#riskNextBtn");
                                var $riskSubmitBtn = $("#riskSubmitBtn");

                                $riskNextBtn.on('click', function(e) {
                                    e.preventDefault();

                                    nextQuestion($(this));
                                });

                                // 上一题
                                $riskPrevBtn.on('click', function(e) {
                                    e.preventDefault();
                                    prevQuestion($(this));
                                });

                                // 上一题
                                function prevQuestion(ele) {
                                    riskCount--;
                                    if (riskCount < riskQuestionListsLength) {
                                        $riskSubmitBtn.hide();
                                        $riskNextBtn.show();
                                    }

                                    toggleActiveBtn(ele, riskBtnDisabledClass, riskCount);
                                    riskQuestionLists.eq(riskCount).show().addClass('active').siblings().removeClass('active').hide();
                                }

                                // 下一题
                                function nextQuestion(ele) {
                                    var val = $("#riskQuestionLists li.active input:radio:checked").val();
                                    if (!val) {
                                        layer.tips('请选择与您情况相符合的选项！', '#riskNextBtn');
                                        return;
                                    }

                                    riskCount++;
                                    toggleActiveBtn($riskPrevBtn, riskBtnDisabledClass, riskCount);

                                    if (riskCount === riskQuestionListsLength - 1) {
                                        ele.hide();
                                        $riskSubmitBtn.show();
                                    }
                                    riskQuestionLists.eq(riskCount).show().addClass('active').siblings().removeClass('active').hide();
                                }

                                function toggleActiveBtn(ele, disabledClass, riskCount) {
                                    if (!riskCount) {
                                        ele.addClass(riskBtnDisabledClass).attr('disabled', true);
                                    } else {
                                        ele.removeClass(riskBtnDisabledClass).attr('disabled', false);
                                    }
                                }

                                // 选取后自动跳到下一题
                                form.on('radio(risk_radio)', function(data) {
                                    var val = $("#riskQuestionLists li.active input:radio:checked").val();
                                    if (riskCount === riskQuestionListsLength - 1) {
                                        if (val) {
                                            $riskSubmitBtn.removeClass(riskBtnDisabledClass).attr('disabled', false);
                                        }
                                        return;
                                    }

                                    setTimeout(function(){
                                        nextQuestion($riskNextBtn);
                                    }, 300);
                                });

                                // 提交
                                form.on('submit(risk_form)', function(data) {

                                    var riskResultObj = data.field;
                                    var riskData = [];
                                    for (var key in riskResultObj) {
                                        riskData.push(Number(riskResultObj[key]));
                                    }

                                    user.riskEvaluation({
                                        answer: JSON.stringify(riskData),
                                        callback: function(data) {

                                            layer.close(riskIndex);

                                            var riskResultHtml =    '<div class="risk-result">' +
                                                                        '<div class="result-icon">' +
                                                                            '<i class="result-icon-text">恭喜您完成评测！</i>' +
                                                                        '</div>' +
                                                                        '<div class="result-text">您的风险评测为：' + data.type_data + '</div>' +
                                                                        '<div class="result-desc">' + getRiskInfo(data.type_data).riskDesc + '</div>' +
                                                                        '<ul class="result-info-lists">' +
                                                                            '<li class="result-info-item clearfix">' +
                                                                                '<span class="result-info-tit">您的个人出借金额上限</span>' +
                                                                                '<span class="result-info-text">' + data.amount + '万</span>' +
                                                                            '</li>' +
                                                                            '<li class="result-info-item clearfix">' +
                                                                                '<span class="result-info-tit">适合投资项目安全等级</span>' +
                                                                                '<span class="result-info-text">' + data.star_desc + '</span>' +
                                                                            '</li>' +
                                                                        '</ul>' +
                                                                        '<div class="result-tip">注：以上建议仅供参考，不构成任何收益保证。</div>' +
                                                                        '<div class="result-btn-wrapper">' +
                                                                            '<button class="result-btn result-btn--sure" id="confirmBtn">确认</button>' +
                                                                            '<button class="result-btn result-btn--reset" id="resetBtn">重新评测</button>' +
                                                                        '</div>' +
                                                                    '</div>';

                                            layer.open({
                                                type: 1,
                                                content: riskResultHtml,
                                                area: '630px',
                                                resize: false,
                                                move: false,
                                                title: '风险评测',
                                                skin: 'dl__layer risk-result-layer',
                                                fixed: false,
                                                success: function(layero, index) {
                                                    $("#confirmBtn").on('click', function(e) {
                                                        e.preventDefault();

                                                        layer.close(index);
                                                        window.location.reload();
                                                    });

                                                    $("#resetBtn").on('click', function(e) {
                                                        e.preventDefault();

                                                        layer.close(index);

                                                        form.render();

                                                        riskTestLayer();
                                                    });
                                                }
                                            });

                                        }
                                    });

                                    return false;
                                });

                            }
                        });
                    }
                });
            };

            function getRiskHtml(data) {
                var riskHtml = '';

                riskHtml += '<div class="risk-content">' +
                                '<form class="layui-form">' +
                                    '<ol class="risk-question-lists" id="riskQuestionLists">';

                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        var fristLi = '<li class="risk-question-item active" style="display: block">';
                    } else {
                        var fristLi = '<li class="risk-question-item active">';
                    }
                    riskHtml += fristLi +
                                    '<h3 class="risk-question-tit">' + data[i].title + '</h3>';

                    var contentList = data[i].content;
                    for (var contKey in contentList) {
                        riskHtml += '<div class="risk-row">' +
                                        '<input type="radio" name="'+i+'" value="' + (contKey) + '" title="' + contentList[contKey] + '" lay-filter="risk_radio">' +
                                    '</div>';
                    }

                    riskHtml += '</li>';

                }
                riskHtml += '</ol>' +
                            '<div class="btn-wrapper clearfix">' +
                                '<button class="risk-btn risk-btn--disabled fl" id="riskPrevBtn" disabled>上一题</button>' +
                                '<button class="risk-btn fr" id="riskNextBtn">下一题</button>' +
                                '<button class="risk-btn risk-btn--disabled fr" id="riskSubmitBtn" style="display: none;" disabled lay-submit lay-filter="risk_form">提交</button>' +
                            '</div>' +
                        '</form>' +
                    '</div>';

                    return riskHtml;
                }

                function showDom(data) {
console.log(data)
                    var userBankData = data.srbank;
                    var isBankUser = userBankData.is_srbank_user; // 是否开通存管
                var isSignSutoBid = userBankData.is_srbank_user_sign_auto_bid; // 自动投标签约
                var isSignCreditTransfer = userBankData.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
                var isSignTransfere = userBankData.is_srbank_user_sign_transfer; // 转让方转让手续费签约
                var isBindCard = data.bankcard_status; // 是否绑卡
                var isWhetherEvaluation = data.whether_evaluation; // 是否测评

                if (isWhetherEvaluation) {
                    $("#riskType, #riskType02").text(data.evaluation_type);
                    $("#riskBtn").text('重新测评');
                    $("#userRisk").addClass('icon-risk-s');
                    $("#riskDesc").html(getDetectionDesc(data.evaluation_type));
                }


                if (!isBankUser) { // 未开通存管
                    $("#bankBtn").on('click', function(e) {
                        e.preventDefault();

                        var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;

                        bank.openBank({
                            redirectUrl: redirectUrl,
                            userRole: 'INVESTOR'
                        });
                    });

                    // 签约，绑卡
                    $("#bankCardBtn, #checkSignBtn").on('click', function(e) {
                        e.preventDefault();

                        popup.openTips02Layer('INVESTOR');
                    });
                } else {
                    var bankCardNo = userBankData.card_no_e;
                    var userTel = userBankData.mobile_e;
                    var name = userBankData.name_e;
                    var id = userBankData.cert_no_e;

                    // 存管账户
                    $("#bankIcon").addClass('icon-bank-s');
                    $("#bankCardNo").text(bankCardNo);
                    $("#bankBtn").text('查看').attr({
                        'href': path.investUserBank
                    });

                    // 授权签约
                    if (isSignSutoBid && isSignCreditTransfer && isSignTransfere) {
                        $("#bankSignIcon").addClass('icon-sign-s');
                    }

                    // 银行卡管理
                    if (isBindCard !== 'UNBIND') {
                        var bankCard_4 = (userBankData.bankcard.bankcardNo).replace(/^(\d{4})(\d*)(\d{4})$/, '$3');
                        $("#cardIcon").addClass('icon-card-s');
                        $("#bankCard").text('尾号' + bankCard_4 + ' | ' + name + ' | ' + id);
                        $("#bankCardBtn").text('查看').attr({
                            'href': path.investUserBankCard
                        });
                    }

                    // 注册手机号
                    $("#userTel").text(userTel);

                    // 交易密码
                    $("#userPass02").addClass('icon-pass02-s');
                }
            };

            function getDetectionDesc(type) {

                var detectionDesc = "";
                switch(type) {
                    case '保守型':
                        detectionDesc = '风险承受能力极低，对收益要求不高，追求资本金绝对安全。预期报酬率优于中长期存款利率（约3-5年），并确保本金在通货膨胀中发挥保值功能。<br />您的个人出借金额上限：100万。<br />适合投资项目安全等级：五星。<br />注：以上建议仅供参考，不构成任何收益保证。';
                    break;
                    case '稳健型':
                        detectionDesc = '风险承受度适中，偏向于资产均衡配置，能够承受一定的投资风险，同时，对资产收益要求高于保守型投资者。<br />您的个人出借金额上限：400万。<br />适合投资项目安全等级：五星和四星半、四星。<br />注：以上建议仅供参考，不构成任何收益保证。';
                    break;
                    case '成长型':
                        detectionDesc = '风险承受能力较高，投资收益预期相对较高，资产配置以高风险品种为主，资产市值波动较大，除获取资本利得之外，也寻求投资差价收益。<br />您的个人出借金额上限：1500万。<br />适合投资项目安全等级：五星、四星半和四星、三星半。<br />注：以上建议仅供参考，不构成任何收益保证。';
                    break;
                    case '激进型':
                        detectionDesc = '对风险有非常高的承受能力，资产配置以高风险投资品种为主，投机性强，利用市场波动赢取差价，追求在较短周期内的收益最大化。<br />您的个人出借金额上限：4000万。<br />适合投资项目安全等级：五星、四星半、四星、三星半、三星。<br />注：以上建议仅供参考，不构成任何收益保证。';
                    break;
                    default:
                    break;
                }

                return detectionDesc;
            }

            function getRiskInfo(type) {
                var riskDesc = '';
                var riskMoney = '';
                var riskStar = '';

                switch (type) {
                    case "保守型":
                        riskDesc = '风险承受能力极低，对收益要求不高，追求资本金绝对安全。预期报酬率优于中长期存款利率（约3-5年），并确保本金在通货膨胀中发挥保值功能。';
                        riskMoney = '100万';
                        riskStar = '五星';
                    break;

                    case "稳健型":
                        riskDesc = '风险承受度适中，偏向于资产均衡配置，能够承受一定的投资风险，同时，对资产收益要求高于保守型投资者。';
                        riskMoney = '400万';
                        riskStar = '五星和四星半、四星';
                    break;

                    case "成长型":
                        riskDesc = '风险承受能力较高，投资收益预期相对较高，资产配置以高风险品种为主，资产市值波动较大，除获取资本利得之外，也寻求投资差价收益。';
                        riskMoney = '1500万';
                        riskStar = '五星、四星半和四星、三星半';
                    break;

                    case "激进型":
                        riskDesc = '对风险有非常高的承受能力，资产配置以高风险投资品种为主，投机性强，利用市场波动赢取差价，追求在较短周期内的收益最大化。';
                        riskMoney = '4000万';
                        riskStar = '五星、四星半、四星、三星半、三星';
                    break;

                    default:
                    break;
                }

                return {
                    riskDesc: riskDesc,
                    riskMoney: riskMoney,
                    riskStar: riskStar
                };
            }
        },
        depositoryAccountPage: function() {
            bank.getBankInformation({
                callback: function(data) {
console.log(data);
                    userNavInfo(data.user);

                    var isOrganization = data.user.is_organization; // 是否是企业用户
                    var bankInfo = data.user.srbank;
                    var bankCardNo = bankInfo.card_no_e; // 卡号
                    var bankName = bankInfo.name_e; // 姓名
                    var bankId = bankInfo.cert_no_e; // 身份证号
                    var bankTel = bankInfo.mobile_e; // 手机号
                    var customerNo = bankInfo.customer_no ? bankInfo.customer_no : ''; // 营业执照编号
                    var $noOrganization = $("#no_organization");
                    var $organization = $("#organization");

                    bankCardNo = bankCardNo.replace(/(.{4})/g, "$1" + " ");
                    customerNo = customerNo.replace(/^(\d{4})(\d*)(\d{4})$/g, "$1****$3");

                    $("#bankCardNo").text(bankCardNo);
                    $(".js-bank-name").text(bankName);
                    $(".js-bank-id").text(bankId);
                    $(".js-bank-tel").text(bankTel);
                    $("#bank_custom_no").text(customerNo);

                    if (!isOrganization) {  // 个人用户
                        $noOrganization.show();
                        $organization.remove();
                    } else {
                        $organization.show();
                        $noOrganization.remove();
                    }
                }
            });
        },
        bankTelChangePage: function() {

            userNavInfoSesstionStorage();

            // 获取验证码
            $("#getCode").on('click', function(e) {
                var $that = $(this);

                var userTel = $("#userTel").val();

                if (!userTel) {
                	$("#formTip").show().text('请输入手机号');
                	return false;
                } else if (!validate.isTel(userTel)) {
                	$("#formTip").show().text('手机号输入错误');
                	return false;
                }

                utils.cuntDown('#getCode', 60)

                e.preventDefault();
                bank.sendPhoneYzm({
                    phoneNum: userTel * 1,
                    type: "update_mobile",
                    checkMobile: 0,
                    callback: function(data) {
                        layer.msg('发送成功！');
                    }
                });
            });

            form.on('submit()', function(data) {
                console.log(data);

                var inputData = data.field;

                bank.modifyReservedMobile({
                    mobile: inputData.user_tel,
                    authCode: inputData.user_code,
                    callback: function(data) {
                        layer.open({
                            content: '预留手机号修改成功!',
                            yes: function() {
                                window.location.href = path.investUserBank;
                            },
                            cancle: function() {
                                window.location.reload();
                            }
                        });
                    }
                });

                return false;
            });

        },
        bankCardPage: function() {
            bank.getBankInformation({
                callback: function(data) {
console.log(data);
                    userNavInfoSesstionStorage();

                    var bankInfo = data.user.srbank;
                    var bindCardStatus = data.user.bankcard_status;
                    var bankCardNo = bankInfo.bankcard.bankcardNo_e;
                    var bankMobile = bankInfo.bankcard.mobile_e;
//bindCardStatus = 'BIND';
                    var $bindCard = $("#bindCard");
                    var $unbindingCard = $("#unbindingCard");
                    var $unbindCard = $("#unbindCard");

                    if (bindCardStatus === 'BIND') {
                        $(".js-card-no").text(bankCardNo);
                        $(".js-card-tel").text(bankMobile);
                        $bindCard.show();
                    } else if (bindCardStatus === 'UNBINDING') {
                        $(".js-card-no").text(bankCardNo);
                        $unbindingCard.show();
                    } else {
                        $unbindCard.show();
                    }
                }
            });

            // 保留银行卡
            $("#saveCard").on('click', function(e) {
                e.preventDefault();

                popup.saveCardLayer();
            });
        },
        unbindCardStepPage: function() {
            bank.unbindBankcardPage({
                callback: function(data) {
                    console.log(data);

                    userNavInfoSesstionStorage();

                    var userInfo = data.user;
                    var reg =  /^(\d{4})(\d*)(\d{4})$/;

                    $("#userCardName").text(userInfo.realName);
                    $("#userName").val(userInfo.realName);
                    $("#userID").val(userInfo.idCardNo.replace(reg, '$1****$3'));
                    $("#userTel").val(userInfo.mobile);

                    // 获取验证码
                    $("#getCode").on('click', function(e) {
                        var $that = $(this);
                        var serverTime = new Date().getTime();
                        var endTime = serverTime + 59*1000;
                        util.countdown(endTime, serverTime, function(date, serverTime, timer) {

                            var miao = date[3] < 10 ? '0' + date[3] : date[3];
                            if (miao <= 0 ) {
                                layui.$("#getCode").val('获取验证码').attr('disabled', false).removeClass('is-disabled');
                                return;
                            }
                            layui.$("#getCode").val(miao + 's后重新获取').attr('disabled', true).addClass('is-disabled');
                        });

                        e.preventDefault();
                        bank.sendPhoneYzm({
                            phoneNum: userInfo.mobile * 1,
                            type: 'update_mobile',
                            checkMobile: 0,
                            callback: function(data) {
                                layer.msg('发送成功！');
                            }
                        })
                    });

                    // 第一步表单验证
                    form.on('submit(unbindForm01)', function(data) {

                        var inputDate = data.field;

                        bank.unbindBankcardCheck({
                            verifyCode: inputDate.user_code,
                            bankcardno: inputDate.user_card_no,
                            mobile: inputDate.user_tel,
                            callback: function(data) {
                                $("#inputForm").remove();
                                $("#uploadIDForm").show();
                            }
                        });

                        return false;
                    });

                    // 上传身份证
                    $('#uploadImgBtn').on('click', function(e) {
                        e.preventDefault();

                        if (!$("#upload_img").attr('src')) {
                            layer.tips('请添加照片', '#uploadImgBtn');
                        }
                    });

                    var $uploadImages = $(".upload_images");
                    $uploadImages.on("change", function() {
                        lrz(this.files[0], {width: 400}, function (results) {

                            // 获取base64图片
                            var base64Image = results.base64;
                            var imgName = results.origin.name;

                            var base64UploadImage = base64Image.split(",")[1];
                            var imgTypeArr = imgName.split(".");
                            var imgType = imgTypeArr[imgTypeArr.length - 1];

                            // 图片预览
                            $("#upload_img").show().attr("src", base64Image);
                            $(".change-upload01").hide();
                            $(".change-upload02").show().css({'z-index': 10000});

                            // 提交后台
                            $("#uploadImgBtn").off("click").on("click", function(e) {
                                e.preventDefault();

                                bank.unbindBankcardApply({
                                    imgbase64: base64UploadImage,
                                    type: imgType,
                                    callback: function(data) {

                                        $("#upload_img").attr("src", data.img_path);

                                        var redirectUrl = path.debtorUserBankCard;
                                        popup.uploadImgLayer(redirectUrl);
                                    }
                                });
                            });
                        });
                    });
                }
            });
        },
        userSignPage: function() {
            user.setting({
                callback: function(data) {
                    console.log(data);
                    userNavInfoSesstionStorage();

                    var srbankInfo = data.user.srbank;
                    var isSignSutoBid = srbankInfo.is_srbank_user_sign_auto_bid; // 自动投标签约
                    var isSignCreditTransfer = srbankInfo.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
                    var isSignTransfere = srbankInfo.is_srbank_user_sign_transfer; // 转让方转让手续费签约
                    var isInvestProtocol = data.user.is_sign_invest_agreement;

                    if (!isSignSutoBid) { // 未签约
                        $("#signSutoBid").show();
                        $("#isSignSutoBid").remove();

                        $("#signSutoBid").on('click', function(e) {
                            e.preventDefault();

                            goSign('sign_auto_bid');
                        });

                    } else {
                        $("#signSutoBid").remove();
                        $("#isSignSutoBid").show();
                    }

                    if (!isSignCreditTransfer) { // 未签约
                        $("#signCreditTransfer").show();
                        $("#isSignCreditTransfer").remove();

                        $("#signCreditTransfer").on('click', function(e) {
                            e.preventDefault();

                            goSign('sign_credit_transfer');
                        });

                    } else {
                        $("#signCreditTransfer").remove();
                        $("#isSignCreditTransfer").show();
                    }

                    if (!isSignTransfere) { // 未签约
                        $("#signTransfere").show();
                        $("#isSignTransfere").remove();

                        $("#signTransfere").on('click', function(e) {
                            e.preventDefault();

                            goSign('sign_transfer');
                        });

                    } else {
                        $("#signTransfere").remove();
                        $("#isSignTransfere").show();
                    }

                    // 是否签署投资协议
                    if (isInvestProtocol) {
                        $("#isInvestProtocol").show();
                    }

                    $("#investProtocolBtn").on('click', function(e) {
                        e.preventDefault();

                        popup.protocolLayer('投资授权协议', '/about/invest_sign_pc');
                    });

                    $("#serverProtocolBtn").on('click', function(e) {
                        e.preventDefault();

                        popup.protocolLayer('多啦聚财咨询服务协议', '/about/service');
                    });

                    $("#registerProtocolBtn").on('click', function(e) {
                        e.preventDefault();

                        popup.protocolLayer('多啦聚财注册服务协议', '/about/register');
                    });

                    $("#riskBnt").on('click', function(e) {
                        e.preventDefault();

                        popup.protocolLayer('风险提示书', '/about/risk');
                    });
                }
            });

            function goSign(type) {
                var redirectUrl = path.investUserCenterUrl;

                bank.sign({
                    signType: type,
                    redirectUrl: redirectUrl,
                    callback: function(data) {
                        window.location.href = data;
                    }
                });
            }
        },
        telAuthenticationPage: function() {
            var tel = $.cookie('mobile');
            $("#userTel").text(tel);
        },
        telChangePage: function() {
            $("#getCode").on('click', function(e) {
                e.preventDefault();

                var userMobile = $("#userTel").val();

                user.getUnionSendAuthCode({
                    mobile: userMobile,
                    transactionType: 'update_mobile',
                    callback: function(data) {
                        layer.msg('发送成功！');
                        var serverTime = new Date().getTime();
                        var endTime = serverTime + 59*1000;
                        util.countdown(endTime, serverTime, function(date, serverTime, timer) {

                            var miao = date[3] < 10 ? '0' + date[3] : date[3];
                            if (miao <= 0 ) {
                                layui.$("#getCode").text('获取验证码').attr('disabled', false).removeClass('is-disabled');
                                return;
                            }
                            layui.$("#getCode").text(miao + 's后重新获取').attr('disabled', true).addClass('is-disabled');
                        });
                    }
                });
            });

            form.on('submit(changeTelFrom)', function(data) {
                var inputData = data.field;

                user.unionChangeMobile({
                    mobile: inputData.user_tel,
                    authCode: inputData.user_code,
                    transactionType: 'update_mobile',
                    callback: function(data) {
                        var html = '手机号修改成功';
                        popup.changePassLayer(html, function(index, layno) {
                            // 清除token--mobile -- 跳转登录
                            $.cookie('token', null,{ expires: 0, path: '/' });
                            $.cookie('mobile', '',{ expires: 0, path: '/' });
                            $.cookie('user_type', '',{ expires: 0, path: '/' });
                            window.location.href = path.debtorLoginUrl;
                        });
                    }
                });

                return false;
            });
        },
        passChangePage: function() {
            form.on('submit(changePassFrom)', function(data) {

                var inputData = data.field;
                var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

                if (!passReg.test(inputData.new_pass)) {
                    layer.msg('新密码为8-16位字母与数字的组合!');
                } else {
                    user.unionUpdatePassword({
                        oldPassword: inputData.now_pass,
                        newPassword: inputData.new_pass,
                        newPasswordRe: inputData.re_new_pass,
                        callback: function(data) {
                            var html = '密码修改成功';
                            popup.changePassLayer(html, function(index, layno) {
                                // 清除token--mobile -- 跳转登录
                                $.cookie('token', null,{ expires: 0, path: '/' });
                                $.cookie('mobile', '',{ expires: 0, path: '/' });
                                $.cookie('user_type', '',{ expires: 0, path: '/' });
                                window.location.href = path.debtorLoginUrl;
                            });
                        }
                    });
                }

                return false;
            });
        },
        msgPage: function() {
            user.getNotes({
                page: 1,
                pageSize: 10,
                callback: function(data) {
                    console.log(data);
                    userNavInfo(data.user); // 侧边栏用户信息

                    showDom(data);

                    noticePage(data);
                }
            });

            function showDom(data) {
                var html = getDomStr(data.list);

                $("#userMsgList").empty().append(html);

                form.render();
                element.render();


            };

            function getDomStr(dataList) {
                var html = '';

                var dataLength = dataList.length;

                if (dataLength > 0) {
                    for (var i = 0; i< dataLength; i++) {

                        if (!dataList[i].is_read) { // 未读
                            var isReady = '';
                            var isChecked = '';
                        } else {
                            var isReady = 'is-ready';
                            var isChecked = 'checked';
                        }

                        html += '<div class="layui-colla-item ' + isReady + '" data-id="' + dataList[i].id + '" data-isRead="'+dataList[i].is_read+'">' +
                                    '<h2 class="layui-colla-title clearfix">' +
                                        '<span class="msg-tit">' + dataList[i].subject + '</span>' +
                                        '<span class="msg-time fr">' + dataList[i].time + '</span>' +
                                    '</h2>' +
                                    '<div class="layui-colla-content">' + dataList[i].content + '</div>' +
                                '</div>';
                    }
                } else {
                    html = '<div class="empty empty-div"><span>空空如也...</span></div>';;
                }

                return html;
            }

            function noticePage(data) {
                if (data.maxPage > 1) {
                    laypage.render({
                        elem: 'noticePage',
                        count: data.total,
                        limit: data.limit,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#ff6600',
                        jump: function(obj, first) {
                            if(!first){
                                user.getNotes({
                                    page: obj.curr,
                                    pageSize: obj.limit,
                                    callback: function(data) {
                                        showDom(data);
                                    }
                                });
                            }
                        }
                    });
                }
            }

            // 单个消息标记为已读
            $("body").on('click', '#userMsgList .layui-colla-item', function() {

                var isRead = $(this).data('isread');
                var noticeID = $(this).data('id');

                $(this).addClass('is-ready');
                $(this).find('.layui-form-checkbox').addClass('layui-form-checked');

                if (!isRead) {
                    user.isReadyNotice({
                        ids: noticeID,
                        callback: function(data) {

                        }
                    });
                }
            });

            // 全部标记为已读
            form.on('submit(checkReady)', function(data) {

                user.isReadyNotice({
                    ids: 'all',
                    callback: function(data) {

                        window.location.reload();
                    }
                });
            });
        },
        balanceReturnPage: function() {
            user.balanceInfo({
                callback: function(data) {
                    console.log(data);
                    userNavInfo(data.user); // 侧边栏用户信息
                    // 显示dom
                    showDom(data);

                    // 关闭复投
                    closeBalance(data.balance_info.status, data.user);
                }
            });

            // 展示dom
            function showDom(data) {
                // 是否已开启余额复投
                var userBalanceInfo = data.balance_info;
                var sysBalanceInfo = data.balance_sys_conf;
    //          console.log(userBalanceInfo);

                if (userBalanceInfo && userBalanceInfo.status === 1) { // 已开启了复投

                    $("#isOpenBalance").val(1); // 保存开启状态
                    $("#userMinDate").val(userBalanceInfo.period_min);
                    $("#userMaxDate").val(userBalanceInfo.period_max);
                    $("#userHoleMoney").val(userBalanceInfo.hold_money);

                    // 开关开启
                    var flag = $("input[name='switch']").prop("checked");
                    $("input[name='switch']").prop("checked", !flag);
                    form.render("checkbox");

                    // dom展示
                    $("#balanceTips").hide();
                    $("#setBalaceForm").show();

                } else {
                    $("#isOpenBalance").val(0); // 保存开启状态
                }

                if (userBalanceInfo) {
                    // 保留金额
                    $("#holdMoney").val(userBalanceInfo.hold_money);

                    // 复投金额
                    $("#balanceSuccessMoney").text(userBalanceInfo.balance_total_money);
                }

                // 日期
                var minPeriodHtml = '';
                var maxPeriodHtml = '';

                var minUserPeriod = userBalanceInfo.period_min;
                var maxUserPeriod = userBalanceInfo.period_max;

                var sysMinPeriod = sysBalanceInfo.period_min * 1;
                var sysMaxPeriod = sysBalanceInfo.period_max * 1;

                for (var i = sysMinPeriod; i <= sysMaxPeriod; i++) {

                    if (i === minUserPeriod * 1) {
                        var isMinSelect = 'selected';
                    } else {
                        var isMinSelect = '';
                    }

                    if (i === maxUserPeriod * 1) {
                        var isMaxSelect = 'selected';
                    } else {
                        var isMaxSelect = '';
                    }

                    if (maxUserPeriod > sysMaxPeriod) {
                        if (i === sysMaxPeriod) {
                            var isMaxSelect = 'selected';
                        }
                    }

                    minPeriodHtml += '<option value="' + i + '" ' + isMinSelect+'>' + i + '个月</option>';
                    maxPeriodHtml += '<option value="' + i + '" ' + isMaxSelect+'>' + i + '个月</option>';
                }

                $("#minPeriod").empty().append(minPeriodHtml);
                $("#maxPeriod").empty().append(maxPeriodHtml);
                form.render("select");

                // 利率
                var minRate = getRate(minUserPeriod);
                var maxRate = getRate(maxUserPeriod);

                $("#minRate").html(minRate);
                $("#maxRate").html(maxRate);
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
                } else if (25 <= period && period <= 36 ) {
                    return '11.0';
                }
            };

            // 监听输入框
            $("#holdMoney").on('input', function() {
                var holeMoney = $(this).val();

                if (holeMoney) {
                    $("#balanceBtn").addClass('is-success');
                }
            });

            // 利率
            form.on('select(leftSelect)', function(data){

                if (data.value) {
                    $("#balanceBtn").addClass('is-success');
                }

                var rate = getRate(data.value);

                $("#minRate").text(rate);

            });

            form.on('select(rightSelect)', function(data){

                if (data.value) {
                    $("#balanceBtn").addClass('is-success');
                }

                var rate = getRate(data.value);

                $("#maxRate").text(rate);

            });

            // 关闭复投
            function closeBalance(balanceStatus, userInfo) {

                if (balanceStatus === 1) {

                    form.on('switch(open_form)', function(data) {

                        if (!data.elem.checked) {
                            $("#balanceForm").addClass('is-visibility');
                            $("#balanceProtocol").addClass('is-visibility');
                            $("#balanceBtn").hide();
                            $("#closeBtn").show().addClass('is-success');
                        } else {
                            $("#balanceForm").removeClass('is-visibility');
                            $("#balanceProtocol").removeClass('is-visibility');
                            $("#balanceBtn").show();
                            $("#closeBtn").hide().removeClass('is-success');
                        }
                    });
                } else {
                    form.on('switch(open_form)', function(data) {

                        var isWhetherEvaluation = userInfo.whether_evaluation;  // 风险测评
                        var isSRBankBindCard = userInfo.srbank.is_srbank_user_bindcard; // 是否绑卡
                        var userBindCardStatus = userInfo.bankcard_status;  // 绑卡状态
                        var isSRBankUser = userInfo.srbank.is_srbank_user;  // 是否是存管用户
                        var isNeedResetPass = userInfo.srbank.need_reset_pwd_first;  // 老用户重置密码
                        var isSRBindCardStatus = userInfo.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                        var SRBankSignAutoBidStatus = userInfo.srbank.is_srbank_user_sign_auto_bid; // 自动投标签约
                        var SRBankSignCreditTransferStatus = userInfo.srbank.is_srbank_user_sign_credit_transfer;   // 自动债转签约

                        bank.validateBank({
                            validata: {
                                signAutoBid: true,
                                signCreditTransfer: true,
                                signTransfer: false,
                                whetherEvaluation: true
                            },
                            isSrbankUser: isSRBankUser,
                            srbankUserCallback: function() {
                                popup.bankTipLayer('INVESTOR');
                            },
                            isSrbankUserBindcard: isSRBankBindCard,
                            bankcardStatus: userBindCardStatus,
                            bindCardCallback: function() {
                                popup.bankBindCardLayer('开启复投');
                            },
                            needResetPwdFirst: isNeedResetPass,
                            resetPWDCallback: function() {
                                alert('重置密码!');
                            },
                            isSrbankUserSignAutoBid: SRBankSignAutoBidStatus,
                            signAutoBidCallback: function() {
                                var layerTit = '开启投资授权协议签约';
                                var layerMsg = '<p class="text">您还未开启<a href="javascript:;" >《投资授权协议》</a>中的“自动投标签约”，请先进行签约再进行投资';
                                var signType = 'sign_auto_bid';
                                popup.signLayer(layerTit, layerMsg, signType);   // 签约
                            },
                            isSrbankUserSignCreditTransfer: SRBankSignCreditTransferStatus,
                            signCreditTransferCallback: function() {
                                // 自动债转签约
                                var layerTit = '开启投资授权协议签约';
                                var layerMsg = '<p class="text">您还未开启<a href="javascript:;" >《投资授权协议》</a>中的“自动购买债权签约”，请先进行签约再进行投资</p>';
                                var signType = 'sign_credit_transfer';
                                popup.signLayer(layerTit, layerMsg, signType);
                            },
                            isWhetherEvaluation: isWhetherEvaluation,
                            whetherEvaluationCallback: function() {
                                layer.alert('您还未进行风险测评，请先进行风险测评!', {
                                    yes: function() {
                                        window.location.href = path.investorSetting;
                                        layer.closeAll();
                                    }
                                });
                            },
                            validataSuccessCallback: function() {
                                if (data.elem.checked) {
                                    $("#balanceTips").hide();
                                    $("#setBalaceForm").show();
                                } else {
                                    $("#setBalaceForm").hide();
                                    $("#balanceTips").show();
                                }
                            }
                        });

                    });
                }
            }


            form.on('submit(saveSet)', function(data) {
                var subData = data.field;

                var isSelectProtocol = $("#selectProtocol").hasClass('is-select');
                var userMinDate = $("#userMinDate").val() * 1;
                var userMaxDate = $("#userMaxDate").val() * 1;
                var userHoldMoney = $("#userHoleMoney").val() * 1;
                var selectMinDate = subData.start_date;
                var selectMaxDate = subData.end_date;

                if (selectMinDate * 1 === userMinDate && selectMaxDate * 1 === userMaxDate && subData.save_money * 1 === userHoldMoney) {
                    layer.msg('没有修改，无需提交!');
                    return false;
                }

                if (!isSelectProtocol) {
                    layer.tips('请同意协议！', '#balanceBtn', {
                        tips: 1
                    });
                } else {

                    if (selectMaxDate * 1 < selectMinDate * 1) {
                        layer.msg('投资期限区间选择错误!');
                        return false;
                    } else {
                        // 开启复投
                        user.balanceOpen({
                            holdMoney: subData.save_money,
                            periodMin: selectMinDate,
                            periodMax: selectMaxDate,
                            callback: function(data) {
                                var balanceStatus = $("#isOpenBalance").val();

                                if (balanceStatus * 1 === 1) {
                                    layer.msg('修改设置成功', function() {
                                        window.location.reload();
                                    });
                                } else {
                                    layer.msg('设置成功', function() {
                                        window.location.reload();
                                    });
                                }
                            }
                        });
                    }

                }

                return false;
            });


            form.on('submit(closeSet)', function(data) {
                var subData = data.field;
                var isSelectProtocol = $("#selectProtocol").hasClass('is-select');

                // 关闭复投
                user.balanceClose({
                    callback: function(data) {
                        layer.msg('已为您关闭余额自动复投', function() {
                            window.location.reload();
                        });
                    }
                });

                return false;
            });

            // 选择协议
            $("#selectProtocol").on('click', function(e) {
                e.preventDefault();

                var $that = $(this);
                var $balanceBtn = $("#balanceBtn");

                if ($that.hasClass('is-select')) {
                    $that.removeClass('is-select');
                    $balanceBtn.removeClass('is-success');
                } else {
                    $that.addClass('is-select');
                    $balanceBtn.addClass('is-success');
                }
            });

            // 投资授权协议
            $("#invest_protocol").on('click', function(e) {
                e.preventDefault();
                popup.investProtocolLayer('invest');
            });

            // 规则
            $("#balanceRule").on('click', function(e) {
                e.preventDefault();

                var balanceRuleHtml =   '<dl class="rule-contanier">' +
                                            '<dt class="rule-tit">余额自动投标排队规则说明：</dt>' +
                                            '<dd class="rule-text">按照开启时间先后顺序进行排队，以下几种情况会导致重新排队：</dd>' +
                                            '<dd class="rule-text">1、关闭余额自动复投后重新开启。</dd>' +
                                            '<dd class="rule-text">2、修改余额自动复投设置。</dd>' +
                                        '</dl>' +
                                        '<dl class="rule-contanier">' +
                                            '<dt class="rule-tit">自动投标与设置说明：</dt>' +
                                            '<dd>' +
                                                '<dl class="rule-contanier--seconed">' +
                                                    '<dt class="rule-text">【账户保留余额】</dt>' +
                                                    '<dd class="rule-text">账户可用余额减去账户保留余额可用于自动投标；若账户保留余额为0时，则账户全部可用余额可用于自动投标；若账户可用余额减去账户保留余额小于起投金额100元，不会触发自动投标机制。</dd>' +
                                                    '<dt class="rule-text">【投标期限】</dt>' +
                                                    '<dd class="rule-text">出借人选择的期限范围，具体以每个实际匹配的项目期限为准。</dd>' +
                                                    '<dt class="rule-text">【投资利率】</dt>' +
                                                    '<dd class="rule-text">实际利率具体以每个匹配的项目往期参考利率为准。</dd>' +
                                                    '<dt class="rule-text">【投标范围】</dt>' +
                                                    '<dd class="rule-text">平台所有可投标的。</dd>' +
                                                    '<dt class="rule-text">【回款方式】</dt>' +
                                                    '<dd class="rule-text">等额本息。</dd>' +
                                                    '<dt class="rule-text">【投资管理费说明】</dt>' +
                                                    '<dd class="rule-text">具体以每个实际匹配的项目投资管理费为准。</dd>' +
                                                    '<dt class="rule-text">【转让说明】</dt>' +
                                                    '<dd class="rule-text">具体以每个实际匹配的项目转让方式为准。</dd>' +
                                                    '<dt class="rule-text">【垫息说明】</dt>' +
                                                    '<dd class="rule-text">投标项目为债转项目时，需将转让人本期持有天数所得收益垫付给转让人，垫付利息会在最近一次回款日返回至您的账户。</dd>' +
                                                '</dl>' +
                                            '</dd>' +
                                        '</dl>';

                layer.open({
                    type: 1,
                    content: balanceRuleHtml,
                    area: ['630px', '560px'],
                    title: '规则说明',
                    skin: 'balance-rule-layer',
                    resize: false,
                    move: false
                });
            });
        },
    });
});