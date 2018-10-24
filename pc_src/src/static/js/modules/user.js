/*
 * 用户信息
 */
layui.define(['apis', '$http'], function(exports) {
    var apis = layui.apis;
    var $http = layui.$http;

    exports('user', {
        /*
         * 获取验证码
         * options { object }
         * mobile { string } 手机号
         * transactionType { string } 类型 register(需图形验证码),update_mobile(需token),find_password(需图形验证码)
         * captchaMode { string } 图形验证码内容
         * captchaName { string } 图形验证码名称
         * callback { function } 回调函数
         */
        getUnionSendAuthCode: function(options) {
            $http.ajax({
                url: apis.unionSendAuthCode,
                data: {
                    mobile: options.mobile,
                    transaction_type: options.transactionType,
                    captcha_mode: options.captchaMode,
                    captcha_name: options.captchaName
                },
                noLoading: true,
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
         * 图形验证码
         * options { object }
         * callback { function } 回调函数
         */
        unionGetPictureCode: function(options) {
            $http.ajax({
                url: apis.unionGetPictureCode,
                noLoading: true,
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
         * 注册
         * options { object }
         * mobile { string } 手机号
         * password { string } 密码
         * authCode { string } 短信验证码
         * transactionType { string } 业务类型 register--注册,update_mobile(需token)--修改手机号,find_password--找回密码
         * userType { number } 注册类型:1出借人,2借款人
         * organizationCode { number } 机构编码，注册类型为2出借人时必填
         * channelKeyword { number } 渠道编码
         * actKeyword { number } 活动编码
         * inviteCode { number } 邀请人编码
         * inviteMobile { number } 邀请人手机号
         * callback { function } 回调函数
         */
        unionRegister: function(options) {
            $http.ajax({
                url: apis.unionRegister,
                data: {
                    mobile: options.mobile,
                    password: options.password,
                    auth_code: options.authCode,
                    transaction_type: options.transactionType,
                    user_type: options.userType,
                    organization_code: options.organizationCode,
                    channel_keyword: options.channelKeyword,
                    act_keyword: options.actKeyword,
                    invite_code: options.inviteCode,
                    invite_mobile: options.inviteMobile
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
         * 登录
         * options { object }
         * mobile { string } 手机号
         * password { string } 密码
         * userType { string } 类型
         * callback { function } 回调
         */
        unionLogin: function(options) {
            $http.ajax({
                url: apis.unionLogin,
                data: {
                    mobile: options.mobile,
                    password: options.password,
                    user_type: options.userType,
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
         * 退出
         * options { object }
         * mobile { string } 手机号
         * callback { function } 回调
         */
        unionLogout: function(options) {
            $http.ajax({
                url: apis.unionLogout,
                data: {
                    mobile: options.mobile,
                    union_platform: 'pc'
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
         * 找回密码
         * options { object }
         * mobile { string } 手机号
         * authCode { string } 验证码
         * newPassword { string } 新密码
         * newPasswordRe { string } 重复新密码
         * callback { function } 回调
         */
        unionFindPassword: function(options) {
            $http.ajax({
                url: apis.unionFindPassword,
                data: {
                    mobile: options.mobile,
                    auth_code: options.authCode,
                    transaction_type: 'find_password',
                    new_password: options.newPassword,
                    new_password_re: options.newPasswordRe
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
         * 修改登录密码
         * options { object }
         * oldPassword { string } 旧密码
         * newPassword { string } 新密码
         * newPasswordRe { string } 重新验证新密码
         */
        unionUpdatePassword: function(options) {
            $http.ajax({
                url: apis.unionUpdatePassword,
                data: {
                    old_password: options.oldPassword,
                    new_password: options.newPassword,
                    new_password_re: options.newPasswordRe
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
         * 修改登录手机号
         * options { object }
         * mobile { string } 手机号
         * authCode { string } 验证码
         * transactionType { string } register,update_mobile(需token),find_password
         */
        unionChangeMobile: function(options) {
            $http.ajax({
                url: apis.unionChangeMobile,
                data: {
                    mobile: options.mobile,
                    auth_code: options.authCode,
                    transaction_type: options.transactionType
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
         * 借款人--个人中心
         * options { object }
         */
        debtorDetail: function(options) {
            $http.ajax({
                url: apis.debtorDetail,
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
         * 借款人--借款记录
         * options { object }
         * page { number } 页码
         * pageSize { number } 每页条数
         * type { number } 类型  1：审核中 2：筹款中 3：已放款
         */
        debtorLoanList: function(options) {
            $http.ajax({
                url: apis.debtorLoanList,
                data: {
                    page: options.page,
                    page_size: options.pageSize,
                    type: options.type
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
         * 我要借款
         */
        srbankEstablishLoan: function(options) {
            $http.ajax({
                url: apis.srbankEstablishLoan,
                data: {
                    realName: options.realName, // 姓名
                    idCardNo: options.idCardNo, // 身份证号
                    warrant_user_id: 'dl', // 担保户
                    loan_amount: options.loanAmount, // 借款金额
                    interest_rate: 9, // 借款利率
                    loan_period: options.loanPeriod, // 借款期限
                    loan_remark: options.loanRemark, // 借款用途
                    sure_type: 'web',
                    source_order_code: '', // 订单号
                    bank_num: options.bankNum, // 银行卡号
                    bank_name: options.bankName, // 银行卡名称
                    bank_code: '==', // 银行编码
                    area_code: '==',
                    sub_bank_name: '==', // 分行名称
                    province_name: '==', // 开户省
                    city_name: '==', // 开户市
                    district_name: '==', // 支行
                    contractEffectiveDate: '', // 生效时间
                    sex: options.sex, // 性别
                    issueinstitution: '==', // 发证机关
                    maturityDate: '==', // 身份证有效期
                    sino: '', // 社保号码/学生号码
                    eduExperience: options.eduExperience, // 教育程度
                    mobileTelephone: options.mobileTelephone, // 手机号码
                    emailAdd: '', // 电子邮箱
                    qQNo: '', // QQ号码
                    marriage: '', // 婚姻状况
                    childrentotal: '', // 子女数目
                    house: '', // 住房状况
                    nativeplace: options.nativeplace, // 户籍地址：省/直辖市
                    villagetown: options.villagetown, // 镇/乡
                    street: options.street, // 街道/村
                    community: options.community, // 小区/楼盘
                    cellNo: '', // 栋/单元/房间号
                    familyAdd: options.familyAdd, // 现居住地址：省/直辖市
                    countryside: options.countryside, // 现居住地址：镇/乡
                    villagecenter: options.villagecenter, // 现居住地址：街道/村
                    plot: options.plot, // 现居住地址：小区/楼盘
                    room: '', // 现居住地址：栋/单元/房间号
                    flag2: '', // 现居住地址是否与户籍地址相同
                    defaultDueDay: '', // 每月还款日
                    workCorp: '', // 单位/学校/个体全称
                    headShip: '', // 职位
                    unitKind: '', // 行业类型
                    cellProperty: '', // 单位性质
                    workTel: '', // 单位电话
                    workAdd: '', // 单位地址：省/直辖市
                    unitCountryside: '', // 镇/乡
                    unitStreet: '', // 街道/村
                    unitRoom: '', // 小区/楼盘
                    unitNo: '', // 栋/单元/房间号
                    mailingAddress: '', // 邮寄地址
                    jobTotal: '', // 总工作经验/大学学习时间(年)
                    jobTime: '', // 现单位工作/个体营业时间/距离毕业时间(月)
                    spouseName: '', // 配偶姓名
                    spouseTel: '', // 配偶移动电话
                    kinshipName: '', // 家庭成员名称
                    relativeType: '', // 家庭成员类型
                    kinshipTel: '', // 家庭成员电话
                    otherContact: '', // 联系人姓名
                    relativeType1: '', // 与申请人关系
                    relativeType1: '', // 与申请人关系
                    contactTel: '', // 联系电话
                    totalIncome: '', // 月收入总额（元）
                    totalIncome: '', // 月收入总额（元）
                    otherRevenue: '', // 其他收入（元/月）
                    loan_days: '', // 借款天数
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
         * 借款人--我要还款
         * options { object }
         * page { number } 页码
         * pageSize { number } 每页条数
         * type { number } 类型  3：还款中 5：已结清 7：已逾期
         */
        debtorLoanScheduleList: function(options) {
            $http.ajax({
                url: apis.debtorLoanScheduleList,
                data: {
                    page: options.page,
                    page_size: options.pageSize,
                    type: options.type
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
         * 借款人--借款详情
         * options { object }
         * loan_id { number } 借款id
         */
        loanScheduleDetail: function(options) {
            $http.ajax({
                url: apis.loanScheduleDetail,
                data: {
                    loan_id: options.loanId
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
         * 借款人--资金明细
         * options { object }
         * page { number } 页码
         * pageSize { number } 每页条数
         * detailType { string } 类型 borrow--借款 repay--还款 recharge--充值 withdraw--提现
         */
        debtorFundList: function(options) {
            $http.ajax({
                url: apis.fundList,
                data: {
                    page: options.page,
                    page_size: options.pageSize,
                    detail_type: options.detailType
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
         * 消息中心--标记消息状态
         * options { object }
         * ids { number } 消息id
         * callback { function } 回调
         */
        setting: function(options) {
            $http.ajax({
                url: apis.setting,
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
         * 消息中心
         * options { object }
         * page { number } 页码
         * pageSize { number } 每页条数
         * callback { function } 回调
         */
        getNotes: function(options) {
            $http.ajax({
                url: apis.notes,
                data: {
                    page: options.page,
                    page_size: options.pageSize
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
         * 消息中心--标记消息状态
         * options { object }
         * ids { number } 消息id
         * callback { function } 回调
         */
        isReadyNotice: function(options) {
            $http.ajax({
                url: apis.readNotes,
                data: {
                    ids: options.ids
                },
                noLoading: true,
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
         * 余额复投--信息
         * options { object }
         * callback { function } 回调
         */
        balanceInfo: function(options) {
            $http.ajax({
                url: apis.balanceInfo,
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
         * 余额复投--开启复投
         * options { object }
         * holdMoney { number } 账户保留金额
         * periodMin { number } 最小期限
         * periodMax { number } 最大期限
         * callback { function } 回调
         */
        balanceOpen: function(options) {
            $http.ajax({
                url: apis.balanceOpen,
                data: {
                    hold_money: options.holdMoney,
                    period_min: options.periodMin,
                    period_max: options.periodMax
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
         * 余额复投--关闭复投
         * options { object }
         * callback { function } 回调
         */
        balanceClose: function(options) {
            $http.ajax({
                url: apis.balanceClose,
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
         * 投资人--资金明细
         * options { object }
         * page { number } 页码
         * pageSize { number } 每页条数
         * timeType { number } 日期类型 0从一开始, 10001从一周前, 1从一个月前, 3从三个月前, 6从六个月前，12从12个月前
         * startTime { string } 开始时间 time_type为0时才有效
         * endTime { string } 结束时间  time_type为0时才有效
         * detailType { string } 查询类型 all全部 recharge充值 withdraw提现 reward奖励 invest投资 back_money回款 other其他
         * callback { function } 回调
         */
        investFundList: function(options) {
            $http.ajax({
                url: apis.investFundList,
                data: {
                    page: options.page,
                    page_size: options.pageSize,
                    time_type: options.timeType,
                    start_time: options.startTime,
                    end_time: options.endTime,
                    detail_type: options.detailType
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
         * 预约投标--记录
         * options { object }
         * type { string } 类型
         * page { number } 页码
         * pageSize { number } 每页条数
         * callback { function } 回调
         */
        reservationList: function(options) {
            $http.ajax({
                url: apis.reservationList,
                data: {
                    type: options.type,
                    page: options.page,
                    page_size: options.pageSize
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
         * 预约投标--取消预约
         * options { object }
         * batchAutoId { string } 预约投标id
         * callback { function } 回调
         */
        reservationCancel: function(options) {
            $http.ajax({
                url: apis.reservationCancel,
                data: {
                    batch_auto_id: options.batchAutoId
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
         * 债权转让--列表
         * options { object }
         * page { string } 页码
         * pageSize { string } 每页条数
         * filterStatus { string } 类型 NO未转让的 / QUEUE申请中 / FINISH已转让
         * callback { function } 回调
         */
        investTransferList: function(options) {
            $http.ajax({
                url: apis.investTransferList,
                data: {
                    page: options.page,
                    page_size: options.pageSize,
                    filter_status: options.filterStatus
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
         * 债权转让--申请转让
         * options { object }
         * investmentId { string } 转让id
         * money { string } 转让金额
         * reason { string } 转让原因
         * identification { string } 身份证后4位
         * callback { function } 回调
         */
        investInvestmentTransfer: function(options) {
            $http.ajax({
                url: apis.investInvestmentTransfer,
                data: {
                    investment_id: options.investmentId,
                    money: options.money,
                    reason: options.reason,
                    identification: options.identification
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
         * 出借记录
         * options { object }
         * page { string } 页码
         * pageSize { string } 每页条数
         * filterFrom { string } 项目类型
         * filterPeriod { string } 期限
         * filterStatus { string } 状态
         * callback { function } 回调
         */
        investInvestmentList: function(options) {
            $http.ajax({
                url: apis.investInvestmentList,
                data: {
                    page: options.page,
                    page_size: options.pageSize,
                    filter_from: options.filterFrom,
                    filter_period: options.filterPeriod,
                    filter_status: options.filterStatus
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
         * 还款计划
         * options { object }
         * investmentID { number } 还款id
         * callback { function } 回调
         */
        investInvestmentSchedules: function(options) {
            $http.ajax({
                url: apis.investInvestmentSchedules,
                data: {
                    investment_id: options.investmentID
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
         * 投资人--用户中心
         * options { object }
         * callback { function } 回调
         */
        investUserCenter: function(options) {
            $http.ajax({
                url: apis.investUserCenter,
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
         * 风险测评--题目
         * options { object }
         * callback { function } 回调
         */
        riskEvaluationQuestion: function(options) {
            $http.ajax({
                url: apis.riskEvaluationQuestion,
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
         * 风险测评--提交
         * options { object }
         * answer { array } 分数 [4,4,4,4,5]
         * callback { function } 回调
         */
        riskEvaluation: function(options) {
            $http.ajax({
                url: apis.riskEvaluation,
                data: {
                    answer: options.answer
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
         * 邀请好友--页面
         * options { object }
         * callback { function } 回调
         */
        inviteData: function(options) {
            $http.ajax({
                url: apis.inviteData,
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
         * 邀请好友--列表
         * options { object }
         * page { number } 页码
         * pageSize { number } 每页条数
         * callback { function } 回调
         */
        inviteList: function(options) {
            $http.ajax({
                url: apis.inviteList,
                data: {
                    page: options.page,
                    page_size: options.pageSize
                },
                noLoading: true,
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
         * 回款日历--新版
         * options { object }
         * month { number } 月份 20181001
         * day { number } 日期 20181015
         * page { number } 页码
         * pageSize { number } 每页条数
         * callback { function } 回调
         */
        paybackCalendarNew: function(options) {
            $http.ajax({
                url: apis.paybackCalendarNew,
                data: {
                    month: options.month,
                    day: options.day,
                    page: options.page,
                    page_size: options.pageSize
                },
                noLoading: true,
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
         * 提现记录
         * options { object }
         * callback { function } 回调
         */
        withdrawList: function(options) {
            $http.ajax({
                url: apis.withdrawList,
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
         * 待发放奖励列表
         * options { object }
         * paymentStatus { number } 支付状态:0,未支付;1,已支付
         * couponIds { number } 券id
         * order { string } 排序:ASC,DESC
         * page { number } 页码
         * pageSize { number } 每页条数
         * callback { function } 回调
         */
        couponRecordInfo: function(options) {
            $http.ajax({
                url: apis.couponRecordInfo,
                data: {
                    payment_status: options.paymentStatus,
                    coupon_ids: options.couponIds,
                    order: options.order,
                    page: options.page,
                    page_size: options.pageSize
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
