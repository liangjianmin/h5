layui.define(function(exports) {
    exports('apis', {
        getIndexData: 'v1/homepage/getIndexData',
        /*
         * 表单
         */
        unionSendAuthCode: 'v1/user/union_send_auth_code', // 注册验证码
        sendPhoneYzm: 'v1/user/send_phone_yzm', // 发送验证码
        unionGetPictureCode: 'v1/user/union_get_picture_code', // 图形验证码
        unionRegister: 'v1/user/union_register', // 注册
        unionLogin: 'v1/user/union_login', // 登录
        unionUpdatePassword: 'v1/user/union_update_password', // 修改登录密码
        unionChangeMobile: 'v1/user/union_change_mobile', // 修改手机号
        unionFindPassword: 'v1/user/union_find_password', // 找回密码
        unionLogout: 'v1/user/union_logout', // 登出
        /*
         * 用户
         */
        investUserCenter: 'v1/user/ucenter', // 投资人--用户中心
        withdrawList: 'v1/user/withdraw_list', // 提现记录
        balanceInfo: 'v1/user_balance/get_info', // 投资人--余额复投信息
        balanceOpen: 'v1/user_balance/set_open', // 投资人--开启复投
        balanceClose: 'v1/user_balance/set_close', // 投资人--关闭复投
        investFundList: 'v1/user/fund_list', // 投资人--资金明细
        reservationList: 'v1/user/user_batch_auto_list', // 预约投标--记录
        reservationCancel: 'v1/user/user_batch_auto_cancel', // 取消预约
        investTransferList: 'v1/user/transfer_list', // 债权转让--列表
        investInvestmentTransfer: 'v1/standard/investment_transfer', // 债权转让--申请转让
        investInvestmentList: 'v1/user/investment_list', // 投资人--出借记录
        investInvestmentSchedules: 'v1/standard/investment_schedules', // 回款计划
        riskEvaluationQuestion: 'v1/user/risk_evaluation_question', // 风险测评--题目
        riskEvaluation: 'v1/user/risk_evaluation', // 风险测评--提交
        inviteData: 'v1/user/invite_data', // 邀请好友--页面
        inviteList: 'v1/user/invite_list', // 邀请好友--列表
        paybackCalendarNew: 'v1/user/payback_calendar_new', // 回款日历--新版
        setting: 'v1/user/setting', // 设置中心
        notes: 'v1/user/notes', // 消息中心
        readNotes: 'v1/user/read_notes', // 标记已读信息
        couponRecordInfo: 'v1/user_coupon/user_coupon_record_info', // 待收奖励列表
        debtorDetail: 'v1/debtor/detail', // 借款人--个人中心
        fundList: 'v1/debtor/fund_list', // 借款人--借款人资金明细
        debtorLoanList: 'v1/debtor/loan_list', // 借款人--借款记录
        debtorLoanScheduleList: 'v1/debtor/loan_schedule_list', // 借款人--我要还款列表
        srbankEstablishLoan: 'v1/loan/srbank_establish_loan', // 借款人--我要借款
        loanScheduleDetail: 'v1/debtor/loan_schedule_detail', // 借款人--借款详情
        /*
         * 存管
         */
        bankInfo: 'v1/srbankaccount/bankinfo', // 银行卡信息
        checkRegister: 'v1/srbankaccount/check_register', // 是否开通存管
        personalRegister: 'v1/srbankaccount/personal_register', // 开通存管
        modifyReservedMobile: 'v1/srbankaccount/modify_reserved_mobile', // 修改预留手机号
        srbankSignPage: 'v1/srbankaccount/srbank_sign_page', // 签约
        queryInformation: 'v1/srbankaccount/query_information', // 查看存管信息
        rechargePage: 'v1/srbankaccount/recharge_page', // 充值页面
        recharge: 'v1/srbankaccount/recharge', // 充值
        checkChargeSuccess: 'v1/srbankaccount/check_charge_success', // 充值是否成功
        withdrawPage: 'v1/srbankaccount/withdraw_page', // 提现页面
        withdraw: 'v1/srbankaccount/withdraw', // 提现
        bankcardPage: 'v1/srbankaccount/bankcard_page', // 银行卡管理页面
        unbindBankcardPage: 'v1/srbankaccount/unbind_bankcard_page', // 解绑银行卡页面
        unbindBankcardCheck: 'v1/srbankaccount/unbind_bankcard_check', // 验证原银行卡号和验证码
        unbindBankcardApply: 'v1/srbankaccount/unbind_bankcard_apply', // 身份证上传
        rebindBankcardPage: 'v1/srbankaccount/rebind_bankcard_page', // 绑定另外的银行卡
        undoUnbindBankcard: 'v1/srbankaccount/undo_unbind_bankcard', // 取消解绑申请
        resetPassword: 'v1/srbankaccount/reset_password', // 修改交易密码
        srbankAccountInfo: 'v1/srbankaccount/srbank_account_info', // 个人信息
        debtorRegister: 'v1/srbankaccount/debtor_register', // 开通存管
    });
});