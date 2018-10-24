/*
 * 弹窗
 */
layui.define(['jquery', 'layer', 'bank', 'path'], function(exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var bank = layui.bank;
    var path = layui.path;

    function dlLayerFn(options) {
        var fixed = typeof options.fixed === 'undefined';

        var layerIndex = layer.open({
            type: options.type || 1,
            skin: options.skin,
            area: options.area,
            content: options.content,
            btn: options.btn,
            btnAlign: 'c',
            title: options.title,
            shade: [0.4, '#000'],
            move: false,
            resize: false,
            fixed: fixed,
            yes: options.yes,
            cancel: function(index, layero) {
                if (options.cancel && typeof options.cancel === 'function') {
                    options.cancel(index, layero);
                }
            },
            btn2: function(index, layero) {
                if (options.btn2 && typeof options.btn2 === 'function') {
                    options.btn2(index, layero);
                }
            },
            success: function(index, layero) {
                if (options.success && typeof options.success === 'function') {
                    options.success(index, layero);
                }
            }
        });
    };

    // 银行列表
    function boscBankListInfo(bankListsArr) {
        if (bankListsArr.length > 0) {
            // 遍历银行卡
            var bankInfoStr = '';
            var bankLimit = {};
            var bankNameStr = '';

            for (var i = 0; i < bankListsArr.length; i++) {

                if (bankListsArr[i].order > 0) {

                    bankInfoStr +=   '<li class="bank-trade-list clearfix">' +
                                        '<div class="left">' +
                                            '<img src="' + bankListsArr[i].img_logo_url + '" width="48px" height="48px"/>' +
                                        '</div>' +
                                        '<div class="right">' +
                                            '<div class="name">' + bankListsArr[i].name + '</div>' +
                                            '<div class="text">限额（单笔/单日/单月）：' + bankListsArr[i].bankLimit + '</div>' +
                                        '</div>' +
                                    '</li>';

                    bankNameStr += bankListsArr[i].name + '、';

                }


            }
            bankInfoStr =   '<ul class="bank-trade-lists">' +
                                bankInfoStr +
                            '</ul>';

            return {
                bankInfoStr: bankInfoStr,
                bankNameStr: bankNameStr
            };
        }
    };

    exports('popup', {
        /*
         * 开通存管提醒弹窗
         */
        bankTipLayer: function(userRole) {

            bank.getBankList({
                callback: function(data) {
                    var bankNameStr = boscBankListInfo(data).bankNameStr;

                    var html =  '<p class="tit">为保障资金安全，投资前请开通银行存管账户</p>' +
                        '<p class="cont">根据《网络借贷信息中介机构业务活动管理暂行办法》及《网络借贷资金存管业务指引》等相关法规要求，所有网络借贷信息中介机构均需委托一家商业银行提供资金存管服务，履行网络借贷资金存管专用账户的开立与销户、资金保管、资金清算、账务核对、提供信息报告等职责的业务。</p>' +
                        '<p class="bank-list"><span class="bank-tit">充值支持银行：</span>' + bankNameStr + '</p>';

                    dlLayerFn({
                        content: html,
                        skin: 'dl__layer bank-tip-layer',
                        title: '开通银行存管账户',
                        btn: '立即开通',
                        area: ['604px', 'auto'],
                        yes: function() {
                            var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;

                            bank.openBank({
                                redirectUrl: redirectUrl,
                                userRole: userRole
                            });
                        }
                    });
                }
            });
        },
        /*
         * 银行列表弹窗
         */
        bankListLayer: function() {

            bank.getBankList({
                callback: function(data) {
                    var html = boscBankListInfo(data).bankInfoStr;

                    dlLayerFn({
                        content: html,
                        skin: 'dl__layer bank-list-layer',
                        title: '支持银行限额说明',
                        area: ['508px', '556px']
                    });
                }
            });
        },
        /*
         * 银行转账政策弹窗
         */
        banktransferInfoLayer: function() {
            dlLayerFn({
                content: '<img src="https://dolabank-apk.oss-cn-shenzhen.aliyuncs.com/dolabank/static/images/v2/bank_detail.jpg" >',
                skin: 'dl__layer bank-transfer-info-layer',
                title: '存管银行通知',
                area: ['471px', '568px']
            });
        },
        /*
         * 提示开通存管弹窗
         */
        openTips02Layer: function(userRole) {
            dlLayerFn({
                content: '<p class="tip-text"><i class="icon"></i>您还未开通银行存管账户，请先开通银行存管账户</p>',
                skin: 'dl__layer bank__layer bank-tips-layer',
                title: '提示',
                btn: '立即开通',
                area: ['516px', '280px'],
                yes: function(index, layno) {
                    var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;

                    bank.openBank({
                        redirectUrl: redirectUrl,
                        userRole: userRole
                    });
                }
            });
        },
        /*
         * 提示绑卡存管弹窗
         */
        bankBindCardLayer: function(behavior) {
            dlLayerFn({
                content: '<p class="tip-text"><i class="icon"></i>您还未绑定银行卡，请先绑定银行卡后再进行' + behavior + '</p>',
                skin: 'dl__layer bank__layer bank-tips-layer',
                title: '提示',
                btn: '立即绑卡',
                area: ['516px', '280px'],
                yes: function(index, layno) {
                }
            });
        },
        /*
         * 保留银行卡弹窗
         */
        saveCardLayer: function() {
            dlLayerFn({
                content: '<p class="savecard-tit">确定要保留原银行卡吗？</p><p class="savecard-text">解绑申请正在审核，如果取消解绑申请，平台将会为你保留原来的银行卡，充值及提现等操作会继续使用原来的银行卡。</p>',
                skin: 'dl__layer bank__layer save-card-layer',
                title: '提示',
                btn: ['保留原银行卡', '等待解绑审核'],
                area: ['516px', '296px'],
                yes: function(index, layno) {
                    bank.undoUnbindBankcard({
                        callback: function(data) {
                            layer.close(index);
                        }
                    });
                },
                btn2: function(index, layno) {
                    layer.close(index);
                }
            });
        },
        /*
         * 解绑银行卡上传照片成功
         */
        uploadImgLayer: function(redirectUrl) {
            dlLayerFn({
                content: '<div class="success-icon"></div><p class="upload-tit">提交成功，平台将在1-2个工作日内审核</p><p class="tip-text">（审核期间，不可申请提现）</p><p class="upload-text">审核通过：您可以绑定新的银行卡</p><p class="upload-text">审核失败：您需要重新提交审核，或保留原银行卡</p>',
                skin: 'dl__layer bank__layer upload-layer',
                title: '提示',
                btn: ['知道了'],
                area: ['516px', '406px'],
                yes: function(index, layno) {
                    window.location.href = redirectUrl;
                },
                cancel: function() {
                    window.location.href = redirectUrl;
                }
            });
        },
        /*
         * 本地修改密码成功弹窗
         */
        changePassLayer: function(html, callback) {
            layer.alert(html, {
                icon: 1,
                resize: false,
                move: false,
                title: '提示',
                yes: function(index, layno) {
                    callback(index, layno);
                }
            });
        },
        /*
         * 还款详情弹窗
         */
        repayDetailLayer: function() {
            var html = '<div class="now-repay-total">' +
                            '<h4 class="repay-tit">当期应还总额</h4>' +
                            '<div class="repay-cont"><b class="repay-money">100.00</b>元</div>' +
                        '</div>' +
                        '<dl class="detail-wrapper">' +
                            '<dt class="detail-tit">还款明细:</dt>' +
                            '<dd>' +
                                '<table class="layui-table debtor-table">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>还款期数</th>' +
                                            '<th>还款本金</th>' +
                                            '<th>还款利息</th>' +
                                            '<th>逾期罚息</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<td>6/12期</td>' +
                                            '<td>1024.34元</td>' +
                                            '<td>1975.66元</td>' +
                                            '<td>1234,00元</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>6/12期</td>' +
                                            '<td>1024.34元</td>' +
                                            '<td>1975.66元</td>' +
                                            '<td>1234,00元</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                            '</dd>' +
                            '<div class="user-money">可用余额 68723.00元<a href="javascript:;">充值</a></div>' +
                        '</dl>';

            dlLayerFn({
                content: html,
                skin: 'dl__layer repay-detail-layer',
                title: '还款详情',
                btn: ['确认还款'],
                area: ['630px', '484px'],
                yes: function(index, layno) {

                }
            });
        },
        /*
         * 我要借款--申请成功弹窗
         */
        applicationLayer: function() {
            var html = '借款申请提交成功，已为您分配专属客户经理，我们将尽快联系您，注意接听来电，谢谢合作！';

            dlLayerFn({
                content: html,
                skin: 'dl__layer tip__layer application-layer',
                title: ' ',
                btn: ['确认'],
                area: ['508px', 'auto'],
                yes: function(index, layno) {
                    window.location.reload();
                },
                cancel: function() {
                    window.location.reload();
                }
            });
        },
        /*
         * 签约
         */
        signLayer: function(layerTit, layerMsg, signType) {
            dlLayerFn({
                content: layerMsg,
                skin: 'dl__layer bank__layer sign-layer',
                title: layerTit,
                btn: ['立即签约'],
                area: ['516px', '276px'],
                yes: function(index, layno) {
                    bank.sign({
                        signType: signType,
                        redirectUrl: window.location.href + '?',
                        callback: function(data) {
                            window.location.href = data;
                        }
                    });
                },
                cancel: function() {

                }
            });
        },
        /*
         * 投资授权协议
         */
        investProtocolLayer: function(protocolName) {
            var title = '';
            var protocolHref = '';

            if (protocolName === 'invest') {
                title = '投资授权协议';
                protocolHref = '/about/invest_sign_pc';
            }

            layer.open({
                type: 2,
                content: protocolHref,
                area: ['780px', '570px'],
                title: title,
                resize: false,
                move: false
            });
        },
        /*
         * 协议
         */
        protocolLayer: function(title, url) {
            dlLayerFn({
                type: 2,
                content: url,
                title: title,
                skin: 'dl__layer protocol-layer',
                area: ['780px', '570px']
            });
        },
        /*
         * 关闭复投
         */
        closeBalanceTipLayer: function(options) {
            var html = '您当前【余额自动复投】为开启状态，开启状态下平台会按您设置的条件将账户余额自动投资。';

            dlLayerFn({
                content: html,
                skin: 'dl__layer close-balance-layer',
                title: '温馨提醒',
                btn: ['现在去关闭', '继续转让'],
                area: ['508px', 'auto'],
                yes: function(index, layno) {
                    options.yes(index, layno);
                },
                btn2: function(index, layno) {
                    options.btn2(index, layno);
                }
            });
        }
    });
});