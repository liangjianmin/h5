layui.define(['element', 'form', 'laypage', 'util', 'user', 'path', 'utils', 'bank', 'popup', 'laydate'], function(exports) {
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

    exports('debtor', {
        init: function() {

            if (utils.isPage('/debtor/user_info.html')) { // 借款人--个人中心
                this.userInfoPage();
            }

            if (utils.isPage('/debtor/user_trade_in.html')) { // 充值页面
                this.tradeInPage();
            }

            if (utils.isPage('/debtor/user_trade_out.html')) { // 提现页面
                this.tradeOutPage();
            }

            if (utils.isPage('/debtor/user_record.html')) { // 借款记录
                this.recordPage();
            }

            if (utils.isPage('/debtor/user_repayment.html')) { // 我要还款
                this.repaymentPage();
            }

            if (utils.isPage('/debtor/user_loan_details.html')) { // 借款详情
                this.loanDetailsPage();
            }

            if (utils.isPage('/debtor/user_application.html')) { // 我要借款
                this.applicationPage();
            }

            if (utils.isPage('/debtor/user_capital_details.html')) { // 借款人--资金明细
                this.capitalDetailsPage();
            }

            if (utils.isPage('/debtor/user_setting.html')) { // 设置中心
                this.settingPage();
            }

            if (utils.isPage('/debtor/user_depository_account.html')) { // 设置--存管
                this.depositoryAccountPage();
            }

            if (utils.isPage('/debtor/user_sign.html')) { // 设置--签约
                this.userSignPage();
            }

            if (utils.isPage('/debtor/user_bank_card.html')) { // 设置--银行卡管理
                this.bankCardPage();
            }

            if (utils.isPage('/debtor/user_pass_change.html')) { // 修改登录密码
                this.passChangePage();
            }

            if (utils.isPage('/debtor/user_tel_authentication.html')) { // 手机号认证
                this.telAuthenticationPage();
            }

            if (utils.isPage('/debtor/user_tel_change.html')) { // 修改登录手机号
                this.telChangePage();
            }

            if (utils.isPage('/debtor/user_unbind_card_step.html')) { // 设置--解绑银行卡申请
                this.unbingCardStepPage();
            }

            if (utils.isPage('/debtor/user_msg.html')) { // 消息中心
                this.msgPage();
            }

        },
        userInfoPage: function() {
            user.debtorDetail({
                callback: function(data) {

                    showDom(data);

                    var isBankUser = data.user.srbank.is_srbank_user;

                    if (!isBankUser) { // 非存管
                        $("#tradeInBtn, #tradeOutBtn").on('click', function(e) {
                            e.preventDefault();

                            popup.openTips02Layer('BORROWERS');
                        });

                        if (!$.cookie('is_open_bank_layer')) {
                            $.cookie('is_open_bank_layer', 1);
                            popup.bankTipLayer('BORROWERS');
                        }
                    }
                }
            });

            function showDom(data) {
                var isBankUser = data.user.srbank.is_srbank_user; // 存管
                var isCardStatus = data.user.bankcard_status; // 绑卡状态
                var mobile = data.user.mobile;
                mobile = mobile.substr(0, 3) + '****' + mobile.substr(7); // 手机号
                var availableTotalMoney = data.availableMoney_format ? data.availableMoney_format : '0.00'; // 可用余额
                var notRepay = data.all_not_repay;
                var paymentAmount = notRepay.payment_amount ? notRepay.payment_amount : '0.00'; // 待还总额
                var principalAmount = notRepay.principal_amount ? notRepay.principal_amount : '0.00'; // 待还本金
                var interestAmount = notRepay.interest_amount ? notRepay.interest_amount : '0.00'; // 待还利息
                var todayNotRepay = data.today_not_repay;
                var todayPaymentAmount = todayNotRepay.payment_amount ? todayNotRepay.payment_amount : '0.00'; // 今日待还总额
                var todayNotRepayList = todayNotRepay.list;

                var todayNotRepayListHtml = '';
                for (var i = 0; i < todayNotRepayList.length; i++) {
                    todayNotRepayListHtml += '<dl class="order-wrapper">' +
                                                '<dt class="order-tit">借款订单<span>' + todayNotRepayList[i].order_id + '</span><b class="status">待还款</b></dt>' +
                                                '<dd class="order-cont">' +
                                                    '<ul class="order-detail clearfix">' +
                                                        '<li class="order-item order-item01 fl">' +
                                                            '<span class="tit">当期应还<span class="tip-icon"><i class="tip-text">包含当期本息、逾期本息及逾期罚息</i></span></span><br />' +
                                                            '<span class="cont">' + todayNotRepayList[i].loan_amount + '元</span>' +
                                                        '</li>' +
                                                        '<li class="order-item order-item02 fl">' +
                                                            '<span class="tit">当期还款日</span><br />' +
                                                            '<span class="cont">' + todayNotRepayList[i].payment_date + '（' + todayNotRepayList[i].period + '）</span>' +
                                                        '</li>' +
                                                        '<li class="order-item order-item03 fl">' +
                                                            '<span class="tit">应还本息</span><br />' +
                                                            '<span class="cont">' + todayNotRepayList[i].principal + '元</span>' +
                                                        '</li>' +
                                                        '<li class="order-item order-item04 fl">' +
                                                            '<span class="tit">逾期罚息</span><br />' +
                                                            '<span class="cont">0.00元</span>' +
                                                        '</li>' +
                                                        '<li class="order-item order-item05 fl">' +
                                                            '<a href="javascript:;">立即还款</a>' +
                                                        '</li>' +
                                                    '</ul>' +
                                                '</dd>' +
                                            '</dl>';
                }

                if (isBankUser) {
                    $("#isBankUser").addClass('user-icon-bank-s');
                }

                if (isCardStatus !== 'UNBIND') {
                    $("#isBindCard").addClass('user-icon-card-s');
                }

                $("#userMobile").text(mobile);
                $("#availableMoney").text(availableTotalMoney);
                $("#paymentAmount").text(paymentAmount);
                $("#principalAmount").text(principalAmount);
                $("#interestAmount").text(interestAmount);
                $("#todayPaymentAmount").text(todayPaymentAmount);
                $("#notRepayList").empty().append(todayNotRepayListHtml);
            };
        },
        tradeInPage: function() {
            // 渲染充值页面
            bank.tradeInPage(function(data) {
                var userData = data.user;
                var userSRData = userData.srbank;
                var isSRbankUser = userSRData.is_srbank_user;
                var isSRbankBindCard = userSRData.is_srbank_user_bindcard;
                var isDLBindCardStatus = userData.bankcard_status;
                var isNeedRestPWD = userSRData.need_reset_pwd_first;
                var isSRbankUserSignAutoBid = userSRData.is_srbank_user_sign_auto_bid;
                var isSRbankUserSignCreditTransfer = userSRData.is_srbank_user_sign_credit_transfer;
                var isSRbackUserSignTransfer = userSRData.is_srbank_user_sign_transfer;


                bank.validateBank({
                    validata: {
                        signAutoBid: false
                    },
                    isSrbankUser: isSRbankUser,
                    srbankUserCallback: function() {
                        // 开通存管
                        popup.bankTipLayer('BORROWERS');
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
                        var redirectUrl = path.openBankRedirectUrl + path.debtorTradeInResultUrl;

                        // 快捷充值
                        quickTradeIn(bankCode, redirectUrl);

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

                    var availableAmount = userInfo.available_total_money;
                    var bankName = bankCard.bankName;
                    var bankNo = bankCard.bankcardNo_e;
                    var bankImg = bankCard.img_logo_url;
                    var bankLimit = bankCard.bankLimit;

                    var bankLimitArr = bankLimit.split('/');

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
                function quickTradeIn(bankcode, redirectUrl) {
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
            // 渲染充值页面
            bank.tradeOutPage(function(data) {
                var userData = data.user;
                var userSRData = userData.srbank;

                var isSRbankUser = userSRData.is_srbank_user;
                var isSRbankBindCard = userSRData.is_srbank_user_bindcard;
                var isDLBindCardStatus = userData.bankcard_status;
                var isNeedRestPWD = userSRData.need_reset_pwd_first;
                var isSRbankUserSignAutoBid = userSRData.is_srbank_user_sign_auto_bid;
                var isSRbankUserSignCreditTransfer = userSRData.is_srbank_user_sign_credit_transfer;
                var isSRbackUserSignTransfer = userSRData.is_srbank_user_sign_transfer;


                bank.validateBank({
                    validata: {
                        signAutoBid: false
                    },
                    isSrbankUser: isSRbankUser,
                    srbankUserCallback: function() {
                        // 开通存管
                        popup.bankTipLayer('BORROWERS');
                    },
                    isSrbankUserBindcard: isSRbankBindCard,
                    bankcardStatus: isDLBindCardStatus,
                    bindCardCallback: function() {},
                    isNeedRestPWD: isNeedRestPWD,
                    resetPWDCallback: function() {},
                    validataSuccessCallback: function() {
                        // 展示元素
                        showDom(data);

                        var availableAmount = userSRData.availableAmount * 1;
                        validateInput(availableAmount);

                        // 全部提现
                        $("#tradeOutAllBtn").on('click', function(e) {
                            e.preventDefault();

                            $("#tradeOutInput").val(availableAmount);
                            $("#getMoney").text(availableAmount);

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
                        var redirectUrl = path.openBankRedirectUrl + path.tradeOutSuccessUrl + 'user_type=borrowers';
                        tradeOut(redirectUrl);
                    }
                });

                // 展示元素
                function showDom(data) {
                    var userInfo = data.user;
                    var bankInfo = userInfo.srbank;
                    var bankCard = bankInfo.bankcard;

                    var availableAmount = bankInfo.availableAmount;
                    var bankName = bankCard.bankName;
                    var bankNo = bankCard.bankcardNo;
                    var bankImg = bankCard.img_logo_url;
                    var bankUser = bankCard.realName_e;

                    var bankNo_4 = bankNo.replace(/^(\d{4})(\d*)(\d{4})$/, '$3');

                    $("#availableAmount").text(availableAmount);
                    $("#bankName").text(bankName).css({
                        'background-image': 'url(' + bankImg + ')'
                    });
                    $("#bankNo").text(bankNo);
                    $("#bankUser").text(bankUser);
                    $("#bankCardNo").text(bankNo_4);
                };

                // 输入框验证
                function validateInput(availableAmount) {
                    // 监听输入框
                    $("#tradeOutInput").on('input propertychange', function(e) {
                        e.preventDefault();

                        var $tradeOutBtn = $("#tradeOutBtn");
                        var inputMoney = $(this).val() * 1;
                        $("#getMoney").text(inputMoney);

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
                                window.location.href = data;
                            }
                        });

                        return false;
                    });
                };

            });
        },
        recordPage: function() {
            var emptyHtml = '<tr class="empty"><td colspan="7">空空如也...</td></tr>';
            var $recordTable = $("#recordTable");
            /*
             * 请求数据
             * page { number } 页码
             * pageSize { number } 每页条数
             * type { number } 类型 1：审核中 2： 募集中 3：已放款
             * callback { function } 回调
             */
            function getDebtorLoanList(page, pageSize, type, callback) {
                user.debtorLoanList({
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    callback: function(data) {
                        callback(data);
                    }
                });
            };

            // 初始化页面
            getDebtorLoanList(1, 10, 1, function(data) {
                showDom(data); // 展示dom
                recordPage(data, 1); // 分页
            });

            function showDom(data) {

                var totolCont = data.type_count;
                var html = getDomStr(data.list);

                $("#auditCount").text(totolCont.audit_total);
                $("#collectCount").text(totolCont.collect_total);
                $("#releasedCount").text(totolCont.released_total);

                $recordTable.empty().append(html);

            }

            function getDomStr(dataList) {
                var html = '';

                var dataLength = dataList.length;

                if (dataLength > 0) {
                    for (var i = 0; i< dataLength; i++) {
                        html += '<tr>' +
                                    '<td>' + dataList[i].source_order_code + '</td>' +
                                    '<td>' + dataList[i].c_time + '</td>' +
                                    '<td>' + dataList[i].loan_amount + '元</td>' +
                                    '<td>' + dataList[i].loan_period + '月</td>' +
                                    '<td>' + dataList[i].interest_rate + '%</td>' +
                                    '<td>' + dataList[i].repay_type + '</td>' +
                                    '<td>' + dataList[i].status + '</td>' +
                                '</tr>';
                    }
                } else {
                    html = emptyHtml;
                }

                return html;
            }

            function recordPage(data, detailType) {
                if (data.maxPage > 1) {
                    laypage.render({
                        elem: 'recordPage',
                        count: data.total,
                        limit: data.limit,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#ff6600',
                        jump: function(obj, first) {
                            if(!first){
                                // 分页
                                getDebtorLoanList(obj.curr, obj.limit, detailType, function() {
                                    showDom(data);
                                });
                            }
                        }
                    });
                }
            }

            // 筛选
            $("#recordTypeLists").on('click', '.js-record-type', function() {
                var detailType = $(this).data('type');
                $(this).addClass('is-select').siblings().removeClass('is-select');

                getDebtorLoanList(1, 10, detailType, function(data) {
                    showDom(data); // 展示dom

                    recordPage(data, detailType); // 分页
                });

            });
        },
        repaymentPage: function() {
            var $repaymentTable = $("#repaymentTable");
            /*
             * 请求数据
             * page { number } 页码
             * pageSize { number } 每页条数
             * type { number } 类型 1：审核中 2： 募集中 3：已放款
             * callback { function } 回调
             */
            function getDebtorLoanScheduleList(page, pageSize, type, callback) {
                user.debtorLoanScheduleList({
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    callback: function(data) {
                        callback(data);
                    }
                });
            };

            // 初始化页面
            getDebtorLoanScheduleList(1, 10, 3, function(data) {
                showDom(data); // 展示dom
                repaymentPage(data, 3); // 分页
            });

            function showDom(data) {

                var totolCont = data.type_count;
                var html = getDomStr(data.list);

                $("#repayCount").text(totolCont.repay_total);
                $("#earlyCount").text(totolCont.early_total);
                $("#overdueCount").text(totolCont.overdue_total);

                $repaymentTable.empty().append(html);

            }

            function getDomStr(dataList) {
                var html = '';
console.log(dataList)
                var dataLength = dataList.length;
                var btnStatus = '';

                if (dataLength > 0) {
                    for (var i = 0; i< dataLength; i++) {
                        if (dataList[i].repay_status > 0) {
                            btnStatus = '<a class="btn-back" href="javascript:;">立即还款</a>';
                        } else {
                            btnStatus = '未到期';
                        }

                        html += '<tr>' +
                                    '<td><a class="btn-back" href="' + path.debtorRepaymentDetailUrl + dataList[i].loan_id + '">' + dataList[i].source_order_code + '</a></td>' +
                                    '<td>' + dataList[i].loan_amount + '元</td>' +
                                    '<td>' + dataList[i].wait_repay + '元</td>' +
                                    '<td>' + dataList[i].haved_repay + '元</td>' +
                                    '<td>' + dataList[i].repay_date + '<br />(' + dataList[i].current_schedule + '/' + dataList[i].loan_period + '期)</td>' +
                                    '<td>' + dataList[i].now_repay + '元</td>' +
                                    '<td>' + dataList[i].status + '</td>' +
                                    '<td>' + btnStatus + '</td>' +
                                '</tr>';
                    }
                } else {
                    html = '<tr class="empty"><td colspan="8">空空如也...</td></tr>';
                }

                return html;
            }

            function repaymentPage(data, detailType) {
                if (data.maxPage > 1) {
                    laypage.render({
                        elem: 'recordPage',
                        count: data.total,
                        limit: data.limit,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#ff6600',
                        jump: function(obj, first) {

                            if(!first){
                                // 分页
                                getDebtorLoanScheduleList(obj.curr, obj.limit, detailType, function() {
                                    showDom(data);
                                });
                            }
                        }
                    });
                }
            }

            // 筛选
            $("#repaymentTypeLists").on('click', '.js-repayment-type', function() {
                var detailType = $(this).data('type');
                $(this).addClass('is-select').siblings().removeClass('is-select');

                getDebtorLoanScheduleList(1, 10, detailType, function(data) {
                    showDom(data); // 展示dom

                    repaymentPage(data, detailType); // 分页
                });

            });
        },
        loanDetailsPage: function() {
            var loanId = utils.getQueryString('loan_id');

            user.loanScheduleDetail({
                loanId: loanId,
                callback: function(data) {
                    showDom(data);

                    // 协议
                    $("#protocolLayer").on('click', function(e) {
                        e.preventDefault();

                        var protocolHtml = getProtocolHtml(data.contracts);

                        layer.open({
                            type: 1,
                            content: protocolHtml,
                            area: ['630px', 'auto'],
                            move: false,
                            resize: false,
                            skin: 'dl__layer loan-protocol-layer',
                            title: '借款协议',
                            success: function(index, layno) {
                                $(".js-protocol").on('click', function(e) {
                                    e.preventDefault();

                                    var contractUrl = $(this).data('url');

                                    popup.protocolLayer('借款协议', contractUrl);
                                });
                            }
                        });
                    });
                }
            });

            function showDom(data) {
                console.log(data);
                var loanInfo = data.loan_info;
                $("#loanOrder").text(loanInfo.source_order_code);
                $("#statusTxt").text(loanInfo.status_txt);
                $("#orderTime").text(loanInfo.c_time);
                $("#loanAmount").text(loanInfo.loan_amount);
                $("#loanPeriod").text(loanInfo.loan_period);
                $("#loanRate").text(loanInfo.interest_rate + '%');
                $("#loanType").text(loanInfo.repay_type);
                $("#waitPayment").text(loanInfo.wait_payment + '元');
                $("#interestDate").text(loanInfo.interest_date);
                $("#havedPayment").text(loanInfo.haved_payment + '元');
                $("#endTime").text(loanInfo.end_time);
                $("#totalDefaultInterest").text(loanInfo.total_default_interest + '元');

                var waitRepayList = data.wait_repay_list;
                var waitRepayListLength = waitRepayList.length;
                var waitRepayListHtml = '';
                for (var i = 0; i < waitRepayListLength; i++) {

                    if (waitRepayList[i].repay_status) {
                        var btnHtml = '<a class="btn-back btn-back-default" href="javascript:;">立即还款</a>';
                    } else {
                        var btnHtml = '<a class="btn-back" href="javascript:;">待还款</a>';
                    }

                    waitRepayListHtml +=   '<div class="details-info wating-back-info">' +
                                                '<ul class="wating-back-lists clearfix">' +
                                                    '<li class="list-item list-item01">' +
                                                        '<div class="list-tit">当期应还</div>' +
                                                        '<div class="list-text">'+waitRepayList[i].payment+'元</div>' +
                                                    '</li>' +
                                                    '<li class="list-item list-item02">' +
                                                        '<div class="list-tit">当期还款日</div>' +
                                                        '<div class="list-text">'+waitRepayList[i].payment_date+'（'+waitRepayList[i].sequence+'/'+waitRepayList[i].loan_period+'期）</div>' +
                                                    '</li>' +
                                                    '<li class="list-item list-item03">' +
                                                        '<div class="list-tit">应还本息</div>' +
                                                        '<div class="list-text">'+waitRepayList[i].payment+'元</div>' +
                                                    '</li>' +
                                                    '<li class="list-item list-item04">' +
                                                        '<div class="list-tit">逾期罚息</div>' +
                                                        '<div class="list-text">' + waitRepayList[i].default_interest + '元</div>' +
                                                    '</li>' +
                                                    '<li class="list-item list-item05">' +
                                                        btnHtml +
                                                    '</li>' +
                                                '</ul>' +
                                            '</div>';
                }

                $("#waitRepayListWrapper").empty().append(waitRepayListHtml);


                var scheduleList = data.schedule_list;
                var scheduleListLength = scheduleList.length;
                var scheduleListHtml = '';
                var scheduleRate = '';

                    for (var i = 0; i < scheduleListLength; i++) {
                        scheduleRate = scheduleList[0].manage_fee_rate;
console.log(scheduleList[i])
                        if (scheduleList[i].status_txt === '已还款') {
                        var scheduleClass = 'back-success';
                    } else {
                        var scheduleClass = '';
                    }

                    scheduleListHtml += '<tr class="' + scheduleClass + '">' +
                                            '<td>' + scheduleList[i].sequence + '/' + scheduleList[i].loan_period + '期</td>' +
                                            '<td>' + scheduleList[i].payment_date + '</td>' +
                                            '<td>' + scheduleList[i].payment + '元</td>' +
                                            '<td>' + scheduleList[i].principal + '元</td>' +
                                            '<td>' +  scheduleList[i].interest + '元</td>' +
//                                          '<td>' + scheduleList[i].manage_fee + '元</td>' +
                                            '<td>' + scheduleList[i].status_txt + '</td>' +
                                        '</tr>';
                }

                $("#scheduleTable").empty().append(scheduleListHtml);
                $("#yearRate").text(scheduleRate + '%');
            }

            function getProtocolHtml(data) {
                var html = '';

                if (data) {
                    var html = '<table class="layui-table protocol-table">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>序号</th>' +
                                            '<th>出借人</th>' +
                                            '<th>出借金额</th>' +
                                            '<th>合同协议</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
                    for (var i = 0; i < data.length; i++) {
                        html += '<tr>' +
                                   '<td>' + (i + 1) + '</td>' +
                                   '<td>' + data[i].show_name + '</td>' +
                                   '<td>' + data[i].amount + '元</td>' +
                                   '<td><a class="check-protocol js-protocol" href="javascript:;" data-url="' + data[i].contract_url + '">查看</a></td>' +
                                '</tr>';
                    }

                    html +=    '</tbody>' +
                            '</table>';
                } else {
                    html = '<tr class="empty"><td colspan="4">空空如也...</td></tr>';
                }

                return html;
            }
        },
        applicationPage: function() {
            // 选择期限
            var selectDateHtml = '<option value="">请选择</option>';
            for (var i = 1; i <= 36; i++) {
                selectDateHtml += '<option value="' + i + '">' + i + '个月</option>';
            }

            $('#selectDate').empty().append(selectDateHtml);

            // 选择银行
            bank.getBankList({
                callback: function(data) {

                    if (data.length > 0) {
                        var bankSelectListHtml = '<option value="">请选择</option>';

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].order > 0) {
                                bankSelectListHtml += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
                            }
                        }

                        $('#selectBank').empty().append(bankSelectListHtml);

                        form.render('select');
                    }
                }
            });

            var defaults = {
                s1: 'provid',
                s2: 'cityid',
                s3: 'areaid',
                v1: null,
                v2: null,
                v3: null
            };

            var defaultss = {
                s1: 'provids',
                s2: 'cityids',
                s3: 'areaids',
                v1: null,
                v2: null,
                v3: null
            };

            treeSelect(defaultss);

            // 提交
            form.on('submit(applicationForm)', function(data) {

                var inputData = data.field;
                var provid = $("#selectProvid input").val();
                var cityid = $("#selectCityid input").val();
                var areaid = $("#selectAreaid input").val();
                var provids = $("#selectProvids input").val();
                var cityids = $("#selectCityids input").val();
                var areaids = $("#selectAreaids input").val();

                user.srbankEstablishLoan({
                    realName: inputData.debtor_name,
                    idCardNo: inputData.debtor_id,
                    loanAmount: inputData.debtor_money,
                    loanPeriod: inputData.debtor_date,
                    loanRemark: inputData.debtor_use,
                    bankNum: inputData.debtor_bank_no,
                    bankName: inputData.debtor_bank,
                    sex: inputData.debtor_sex,
                    eduExperience: inputData.debtor_school,
                    mobileTelephone: inputData.debtor_tel,
                    nativeplace: provid,
                    villagetown: cityid,
                    street: areaid,
                    community: inputData.debtor_address,
                    familyAdd: provids,
                    countryside: cityids,
                    villagecenter: areaids,
                    plot: inputData.debtor_address02,
                    callback: function(data) {

                        popup.applicationLayer();
                    }
                });

                return false;
            });
        },
        capitalDetailsPage: function() {
            function getDebtorFundList(page, pageSize, type, callback) {
                user.debtorFundList({
                    page: page,
                    pageSize: pageSize,
                    detailType: type,
                    callback: function(data) {

                        callback(data);
                    }
                });
            };

            getDebtorFundList(1, 10, 'borrow', function(data) {
                showDom(data);
                capitalDetailPage(data, 'borrow');
            });

            function showDom(data) {

                var html = getDomStr(data.list);

                $("#capitalTable").empty().append(html);

            }

            function getDomStr(dataList) {
                var html = '';

                var dataLength = dataList.length;

                if (dataLength > 0) {
                    for (var i = 0; i< dataLength; i++) {
                        html += '<tr>' +
                                    '<td>' + dataList[i].time + '</td>' +
                                    '<td>' + dataList[i].type + '</td>' +
                                    '<td>' + dataList[i].money + '</td>' +
                                    '<td>0.00元</td>' +
                                    '<td>' + dataList[i].remark + '</td>' +
                                '</tr>';
                    }
                } else {
                    html = '<tr class="empty"><td colspan="5">空空如也...</td></tr>';
                }

                return html;
            }

            function capitalDetailPage(data, detailType) {
                if (data.maxPage > 1) {
                    laypage.render({
                        elem: 'capitalPage',
                        count: data.list.length,
                        limit: 10,
                        groups: 10,
                        layout: ['prev', 'page', 'next', 'skip'],
                        theme: '#ff6600',
                        jump: function(obj, first) {

                            if(!first){
                                getDebtorFundList(obj.curr, 10, detailType, function(data) {
                                    showDom(data);
                                });
                            }
                        }
                    });
                }
            }

            // 筛选
            $("#debotrTypeLists").on('click', '.js-debtor-type', function() {
                var detailType = $(this).data('type');
                $(this).addClass('is-select').siblings().removeClass('is-select');

                getDebtorFundList(1, 10, detailType, function(data) {
                    showDom(data);
                    capitalDetailPage(data, detailType);
                });

            });
        },
        settingPage: function() {
            bank.getBankInformation({
                callback: function(data) {

                    var userData = data.user;
                    var userBankData = userData.srbank;
                    var isBankUser = userBankData.is_srbank_user; // 是否开通存管

                    showDom(userData);

                    // 重置密码
                    $("#resetPassBtn").on('click', function(e) {
                        e.preventDefault();

                        var redirectUrl = path.debtorUserCenterUrl;

                        if (!isBankUser) { // 未开通存管
                            popup.openTips02Layer('BORROWERS');
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
                }
            });

            function showDom(data) {

                var userBankData = data.srbank;
                var isBankUser = userBankData.is_srbank_user; // 是否开通存管
                var isSign = userBankData.is_srbank_user_sign_borrower; // 是否签约
                var isBindCard = data.bankcard_status; // 是否绑卡

                if (!isBankUser) { // 未开通存管
                    $("#bankBtn").on('click', function(e) {
                        e.preventDefault();

                        var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;

                        bank.openBank({
                            redirectUrl: redirectUrl,
                            userRole: 'BORROWERS'
                        });
                    });


                    // 签约，绑卡
                    $("#bankCardBtn, #checkSignBtn").on('click', function(e) {
                        e.preventDefault();

                        popup.openTips02Layer('BORROWERS');
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
                        'href': path.debtorUserBank
                    });

                    // 授权签约
                    if (isSign) {
                        $("#bankSignIcon").addClass('icon-sign-s');
                    }

                    // 银行卡管理
                    if (isBindCard !== 'UNBIND') {
                        var bankCard_4 = (userBankData.bankcard.bankcardNo).replace(/^(\d{4})(\d*)(\d{4})$/, '$3');
                        $("#cardIcon").addClass('icon-card-s');
                        $("#bankCard").text('尾号' + bankCard_4 + ' | ' + name + ' | ' + id);
                        $("#bankCardBtn").text('查看').attr({
                            'href': path.debtorUserBankCard
                        });
                    }

                    // 注册手机号
                    $("#userTel").text(userTel);

                    // 交易密码
                    $("#userPass02").addClass('icon-pass02-s');
                }
            };
        },
        depositoryAccountPage: function() {
            bank.getBankInformation({
                callback: function(data) {

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
        userSignPage: function() {
            bank.getBankInformation({
                callback: function(data) {
                    var isSignDeposit = data.user.srbank.is_srbank_user_sign_borrower;

                    if (!isSignDeposit) { // 未签约
                        $("#signBtn").show();
                        $("#isSign").remove();

                        $("#signBtn").on('click', function(e) {
                            e.preventDefault();

                            var redirectUrl = path.debtorUserCenterUrl;

                            bank.sign({
                                signType: 'sign_borrower',
                                redirectUrl: redirectUrl,
                                callback: function(data) {
                                    window.location.href = data;
                                }
                            });
                        });

                    } else {
                        $("#signBtn").remove();
                        $("#isSign").show();
                    }
                }
            });
        },
        bankCardPage: function() {
            bank.getBankInformation({
                callback: function(data) {

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
        passChangePage: function() {
            form.on('submit(changePassFrom)', function(data) {

                var inputData = data.field;
                var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

                if (!inputData.now_pass) {
                    layer.msg('密码为8-16位字母与数字的组合!');
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
        unbingCardStepPage: function() {
            bank.unbindBankcardPage({
                callback: function(data) {
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
                            phoneNum: userInfo.mobile,
                            type: "update_mobile",
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
        msgPage: function() {
            user.getNotes({
                page: 1,
                pageSize: 10,
                callback: function(data) {
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
        }
    });
});
