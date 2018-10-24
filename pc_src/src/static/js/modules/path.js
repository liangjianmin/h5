/*
 * 路径管理
 */
layui.define(['jquery'], function(exports) {
    var $ = layui.jquery;

    var hostname = window.location.hostname;
    var baseUrl = '';
    switch (hostname) {
        case 'www.dola.dev':
            baseUrl = 'https://www.dola.dev/pc/dev';
            break;
        case 'localhost':
            baseUrl = 'http://localhost:3000';
            break;
        case 'www.dolabank.club':
            baseUrl = 'https://www.dolabank.club/pc';
            break;
        default:
            baseUrl = 'https://' + hostname + '/pc';
            break;
    }

    var path = {
        /*
         * 投资人
         */
        investLoginUrl: baseUrl + '/form/investor_login.html?forwardurl=', // 投资人--登录
        investUserCenterUrl: baseUrl + '/investor/user_center.html?', // 投资人--个人中心
        investUserTradeIn: baseUrl + '/investor/trade_in.html?', // 投资人 -- 充值
        investTradeInResultUrl: baseUrl + '/result/investor_trade_in_success.html?', // 投资人 -- 充值结果
        tradeOutList: baseUrl + '/investor/trade_out_list.html', // 投资人--提现记录
        investUserBankCard: baseUrl + '/investor/bank_card.html', // 投资人--绑卡
        investUserBank: baseUrl + '/investor/depository_account.html', // 投资人--存管
        balanceReturnUrl: baseUrl + '/investor/balance_return.html', // 余额复投
        investTransfer: baseUrl + '/investor/transfer.html', // 债权转让
        investorSetting: baseUrl + '/investor/setting.html', // 设置中心
        /*
         * 借款人
         */
        debtorLoginUrl: baseUrl + '/form/debtor_login.html?forwardurl=', // 借款人--登录
        debtorUserCenterUrl: baseUrl + '/debtor/user_info.html?', // 借款人--个人中心
        debtorUserTradeIn: baseUrl + '/debtor/user_trade_in.html', // 借款人 -- 充值
        debtorTradeInResultUrl: baseUrl + '/result/user_trade_in_success.html?', // 借款人 -- 充值结果
        debtorUserTradeOut: baseUrl + '/debtor/user_trade_out.html', // 借款人--提现
        debtorUserBankCard: baseUrl + '/debtor/user_bank_card.html', // 借款人--绑卡
        debtorUserBank: baseUrl + '/debtor/user_depository_account.html', // 借款人--存管
        debtorRepaymentDetailUrl: baseUrl + '/debtor/user_loan_details.html?loan_id=', // 借款详情
        /*
         * 结果页
         */
        openBankRedirectUrl: baseUrl + '/result/wating.html?callback=', // 开户成功后的回调地址
        openBankSuccessUrl: baseUrl + '/result/open_bank_success.html?', // 等待后跳转地址
        registerSuccessUrl: baseUrl + '/result/user_register_success.html', // 注册成功
        forgetPassSuccess: baseUrl + '/result/forget_pass_success.html', // 找回密码
        tradeOutSuccessUrl: baseUrl + '/result/user_trade_out_success.html?', // 提现结果
        /*
         * 表单
         */
        debtorRegisterUrl: baseUrl + '/form/debtor_register.html', // 借款人--注册
        /*
         * images, js
         */
        shareLogoImg: baseUrl + '/static/images/duola_logo_large.png',
        shareJs: baseUrl + '/static/api/js/share.js'
    };

    exports('path', path);
});
