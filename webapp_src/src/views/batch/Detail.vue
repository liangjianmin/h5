<template>
    <section class="dola-automatic">
        <div class="dola-title">
            <a href="/#/regular" class="backer" v-if="!isApp"></a>
            <h2>一键投标工具</h2>
            <div class="tip" @click="agreement(4)">
                <i class="lineBlock va-m"></i>
                <em class="lineBlock va-m">规则</em>
            </div>
        </div>
        <div class="dola-automatic-wrap" v-if="quickBuyDetail.loan_collect_info">
            <ul class="dola-automatic-show">
                <li class="a boxsiz">
                    <p class="t1">往期年化收益率</p>
                    <template v-if="is_touch">
                        <p class="t2">
                            <span>{{min_interest_rate}}</span>
                            <em>%</em>
                            <span>-{{max_interest_rate}}</span>
                            <em>%</em>
                        </p>
                    </template>
                    <template v-else>
                        <p class="t2">
                            <span>{{defaultQuick.min_interest_rate}}</span>
                            <em>%</em>
                            <span>-{{defaultQuick.max_interest_rate}}</span>
                            <em>%</em>
                        </p>
                    </template>
                </li>
                <li class="b boxsiz">
                    <p class="t1">期限</p>
                    <p class="t3">
                        <span>{{min_month}}<template v-if="min_month != max_month">-{{max_month}}</template></span>
                        <em>个月</em>
                    </p>
                </li>
            </ul>
            <div class="dola-automatic-drag">
                <p class="text">调整投标期限区间(月)</p>
                <div class="dola-automatic-drag-wrap">
                    <vue-slider ref="slider" :value="value" v-bind="options" @callback="cb"></vue-slider>
                </div>
            </div>
            <dl class="dola-automatic-list">
                <dd class="clr">
                    <template v-if="quickBuyDetail.user != ''">
                        <div class="fl l">
                            <p class="t1">可用余额&nbsp;&nbsp;&nbsp;<span> {{quickBuyDetail.user.available_total_money}}</span>元</p>
                        </div>
                        <div class="fr r" @click.prevent="tradeIn">
                            <span class="t1 va-m">充值</span>
                            <i class="lineBlock va-m ico"></i>
                        </div>
                    </template>
                    <template v-else>
                        <div class="fl l">
                            <p class="t1" @click="userLogin">可用余额&nbsp;&nbsp;&nbsp;<em>登录后可查看</em></p>
                        </div>
                    </template>
                </dd>
                <!--<dd class="clr">
                    <div class="fl l">
                        <p class="t1">项目类型</p>
                    </div>
                    <div class="fr r">
                        <ul class="selected clr">
                            <li @click="tab(index)" :class="{'curr':active==index}" v-for="(item,index) in typeArr" :key="index" class="lineBlock">
                                <span>{{item}}</span>
                                <i class="icn"></i>
                            </li>
                        </ul>
                    </div>
                </dd>-->
                <dd class="clr">
                    <template v-if="is_touch">
                        <a class="clr" :href="'/#/batch/list?type='+type+'&start='+min_month+'&end='+max_month">
                            <div class="fl l">
                                <p class="t1">可投项目</p>
                            </div>
                            <div class="fr r">
                                <span class="t1 va-m">{{can_buy_total}}个</span>
                                <i class="lineBlock va-m ico"></i>
                            </div>
                        </a>
                    </template>
                    <template v-else>
                        <a class="clr" :href="'/#/batch/list?type='+type+'&start='+min_month+'&end='+max_month">
                            <div class="fl l">
                                <p class="t1">可投项目</p>
                            </div>
                            <div class="fr r">
                                <span class="t1 va-m">{{parseInt(defaultQuick.can_buy_total)}}个</span>
                                <i class="lineBlock va-m ico"></i>
                            </div>
                        </a>
                    </template>
                </dd>
                <dd class="clr">
                    <div class="fl l">
                        <p class="t1">剩余可投金额</p>
                    </div>
                    <div class="fr r">
                        <template v-if="is_touch">
                            <span class="t1 va-m">{{can_buy_amount}}元</span>
                        </template>
                        <template v-else>
                            <span class="t1 va-m">{{defaultQuick.can_buy_amount}}元</span>
                        </template>
                    </div>
                </dd>
            </dl>
            <div class="detail-input-wrapper">
                <div class="inveset-form">
                    <div class="input">
                        <span class="desc">金额</span>
                        <template v-if="is_touch">
                            <input class="inveset-money" type="number" name="money" :placeholder="'100元起投，剩余'+can_buy_amount+'元'" v-model="invest_money"/>
                        </template>
                        <template v-else>
                            <input class="inveset-money" type="number" name="money" :placeholder="'100元起投，剩余'+defaultQuick.can_buy_amount+'元'" v-model="invest_money"/>
                        </template>
                        <span class="all-inveset" @click="allIn">余额全投</span>
                    </div>
                    <a class="join-btn" @click="submit()">一键投标</a>
                </div>
            </div>
        </div>
        <!-- 确认投资 -->
        <div class="invest-affirm" v-if="invest_confirm">
            <section class="invest-affirm-wrapper">
                <div class="title-wrapper">
                    <span class="close-wrapper" @click="invest_confirm = false"></span>
                    <h5 class="title">确认投资</h5>
                </div>
                <div name="affirm-form" class="affrim-join-pro-from">
                    <ul class="form-lists">
                        <li class="list list2">
                            <span class="desc">冻结金额</span>
                            <span class="content">{{invest_money}}元</span>
                        </li>
                        <!--<li class="list">
                            <span class="desc">投标种类</span>
                            <template v-if="type == 1">
                                <span class="content">散标列表</span>
                            </template>
                            <template v-else-if="type == 2">
                                <span class="content">债权转让</span>
                            </template>
                            <template v-else-if="type == 3">
                                <span class="content">散标列表和债权转让</span>
                            </template>
                        </li>-->
                        <li class="list">
                            <span class="desc">往期参考利率</span>
                            <template v-if="is_touch">
                                <span class="content">{{min_interest_rate}}%<template v-if="min_interest_rate != max_interest_rate">-{{max_interest_rate}}%</template></span>
                            </template>
                            <template v-else>
                                <span class="content">{{defaultQuick.min_interest_rate}}%<template v-if="defaultQuick.min_interest_rate != defaultQuick.max_interest_rate">-{{defaultQuick.max_interest_rate}}%</template></span>
                            </template>
                        </li>
                        <li class="list">
                            <span class="desc">投标期限区间</span>
                            <span class="content">{{min_month}}<template v-if="min_month != max_month">-{{max_month}}</template>个月</span>
                        </li>
                        <li class="list list3">
                            <span class="desc">往期参考收益</span>
                            <span class="content">{{min_historty_money}}~{{max_historty_money}}元</span>
                        </li>
                    </ul>
                    <div class="agree-yx">
                        <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                        <div class="lineBlock agree-yx-text">
                            <span>同意</span>
                            <a href="javascript:;" @click="agreement(1)">《投资与咨询服务协议》</a>和
                            <a href="javascript:;" @click="agreement(3)">《风险提示》</a>
                        </div>
                    </div>
                    <div class="affirm-btn-wrapper">
                        <input type="button" :value="'确认支付'+invest_money_confirm+'元'" class="affirm-btn" @click.prevent="verifyJoinSubmit()" :disabled="statusBtn" :class="{'disabale-active':statusBtn}"/>
                    </div>
                </div>
            </section>
        </div>
        <!--老用户弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="olduser">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">为保障资金安全，投资前请先设置银行存管账户交易密码</p>
                    <p class="t3 tl">平台已为您开通银行存管账户。银行存管账户用于对您的资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。</p>
                </div>
            </div>
        </div>
        <InvestmentAgreement :agreement-type="agreementtype" ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
        <RiskAgreement ref="RiskAgreement" v-show="agreement_flag"></RiskAgreement>
        <BatchAgreement ref="BatchAgreement" v-show="agreement_flag"></BatchAgreement>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import vueSlider from 'vue-slider-component'
    import Util from '../../util/index'
    import {services as Services} from '../../api/index'
    import {Indicator, Toast, MessageBox} from 'mint-ui'
    import {jsWebViewCallBack, jsShowLoginCallBack, jsShowRechargeCallBack, jsSettingSafePwdCallBack} from '../../util/appCallback'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'
    import RiskAgreement from '../agreement/RiskAgreement.vue'
    import BatchAgreement from '../agreement/BatchAgreement.vue'

    let Base64 = require('js-base64').Base64;


    export default {
        name: 'batchcDetail',
        computed: mapState({
            quickBuyDetail: state => state.regular.quickBuyDetail,
            defaultQuick: state => state.regular.defaultQuick,
            statusBtn: state => state.regular.statusBtn
        }),
        data() {
            return {
                title: '一键投标工具',
                invest_confirm: false,
                is_touch: false,
                is_checked: true,
                value: ["0", "36"],
                isApp: false,
                active: 0,
                typeArr: ['全部', '散标列表', '债权转让'],
                min_interest_rate: '',
                max_interest_rate: '',
                min_month: '0',
                max_month: '36',
                can_buy_total: '',
                can_buy_amount: '',
                invest_money: '',
                invest_money_confirm: '',
                min_historty_money: '',
                max_historty_money: '',
                safe_pwd: '',
                type: 3,
                options: {
                    width: "100%",
                    height: 8,
                    dotSize: 14,
                    min: 1,
                    max: 100,
                    interval: 3,
                    disabled: false,
                    show: true,
                    tooltip: "always",
                    piecewise: true,
                    piecewiseLabel: true,
                    labelStyle: {
                        "color": "#b4b4b4"
                    },
                    labelActiveStyle: {
                        "color": "#333333"
                    },
                    bgStyle: {
                        backgroundColor: '#e5e5e5'
                    },
                    tooltipStyle: {
                        backgroundColor: '#ffc823',
                        borderColor: '#fea621'
                    },
                    processStyle: {
                        backgroundColor: '#ffc823'
                    },
                    data: ["0", "3", "6", "9", "12", "18", "24", "36"]
                },
                agreementtype: 'standard'
            }
        },
        created() {
            // type: 1散标 2转让 3全部
            var type = this.$route.query.type;
            var platform = Util.getCookie('platform');

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }

            if (type == 1) {
                this.active = 1;
                this.type = 1;
            } else if (type == 2) {
                this.active = 2;
                this.type = 2;
            } else if (type == 3) {
                this.active = 0;
                this.type = 3;
            } else {
                this.active = 0;
                this.type = 3;
            }
            this.getQuickBuyDetail();
        },
        methods: {
            getQuickBuyDetail() {
                this.$store.dispatch({
                    type: 'quickBuyDetail',
                    types: this.type
                });
            },
            tab(index) {
                this.is_touch = true;
                var obj = this.$refs['slider'].getValue();
                this.active = index;
                console.log(obj)
                if (index == 0) {
                    this.type = 3;
                } else if (index == 1) {
                    this.type = 1;
                } else if (index == 2) {
                    this.type = 2;
                }
                this.handelFilterRate(obj);
            },
            userLogin() {
                var platform = Util.getCookie('platform');
                if (platform !== '') {
                    jsShowLoginCallBack(platform);
                } else {
                    var decode = '/#/batch/detail/?type=' + this.type;
                    window.location.href = '/user/login?forward_url=' + Base64.encode(decode);
                }
            },
            tradeIn() {
                //判断app来源
                var platform = Util.getCookie('platform');
                //判断存管状态
                var userBindCardStatus = this.quickBuyDetail.user.bankcard_status;  // 绑卡状态
                var isSRBankUser = this.quickBuyDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                var isNeedResetPass = this.quickBuyDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                var isSRBindCardStatus = this.quickBuyDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态

                if (!isSRBankUser) {
                    // 非存管用户提醒开户
                    this.tipFn(0);
                    return false;
                } else if (!isSRBindCardStatus || userBindCardStatus === "UNBIND") {
                    // 非绑卡状态提示绑卡
                    this.tipFn(1);
                    return false;
                } else {
                    // 已开通存管
                    if (isNeedResetPass) {
                        // 老用户重置密码
                        this.tipFn(4);
                        return false;
                    } else {
                        //区分app
                        if (platform != '') {
                            window.location.href = '/#/bank/recharge';
                            //jsShowRechargeCallBack(platform);
                        } else {
                            window.location.href = '/#/bank/recharge';
                        }
                    }
                }
            },
            cb(obj) {
                console.log(obj);
                this.is_touch = true;
                this.handelFilterRate(obj);
            },
            handelFilterRate(obj) {
                //期限
                if (parseInt(obj[0]) != obj[1]) {
                    this.min_month = parseInt(obj[0]);
                    this.max_month = obj[1];
                } else {
                    this.min_month = parseInt(obj[0]);
                    this.max_month = parseInt(obj[0]);
                }

                //往期年化收益率
                if (this.type == 1) {
                    var loan_Arr = this.quickBuyDetail.loan_collect_info;
                    if (parseInt(obj[0]) != obj[1]) {
                        var loanArr = Util.filterRate(loan_Arr, parseInt(obj[0]), parseInt(obj[1]) + 1);
                    } else {
                        var loanArr = Util.filterRate(loan_Arr, parseInt(obj[0]));
                    }
                    this.min_interest_rate = loanArr.min_interest_rate;
                    this.max_interest_rate = loanArr.max_interest_rate;
                    this.can_buy_total = parseInt(loanArr.can_buy_total);
                    this.can_buy_amount = loanArr.can_buy_amount;
                } else if (this.type == 2) {
                    var transfer_Arr = this.quickBuyDetail.transfer_collect_info;
                    if (parseInt(obj[0]) != obj[1]) {
                        var transferArr = Util.filterRate(transfer_Arr, parseInt(obj[0]), parseInt(obj[1]) + 1);
                    } else {
                        var transferArr = Util.filterRate(transfer_Arr, parseInt(obj[0]));
                    }
                    this.min_interest_rate = transferArr.min_interest_rate;
                    this.max_interest_rate = transferArr.max_interest_rate;
                    this.can_buy_total = parseInt(transferArr.can_buy_total);
                    this.can_buy_amount = transferArr.can_buy_amount;
                } else if (this.type == 3) {
                    var loan_Arr = this.quickBuyDetail.loan_collect_info;
                    var transfer_Arr = this.quickBuyDetail.transfer_collect_info;
                    if (parseInt(obj[0]) != obj[1]) {
                        var collectArr = Util.filterCollection(loan_Arr, transfer_Arr, parseInt(obj[0]), parseInt(obj[1]) + 1);
                    } else {
                        var collectArr = Util.filterCollection(loan_Arr, transfer_Arr, parseInt(obj[0]));
                    }
                    this.min_interest_rate = collectArr.min_interest_rate;
                    this.max_interest_rate = collectArr.max_interest_rate;
                    this.can_buy_total = parseInt(collectArr.can_buy_total);
                    this.can_buy_amount = collectArr.can_buy_amount;
                }
            },
            allIn() {
                var isLogin = this.quickBuyDetail.user;
                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 1500
                    });
                } else {
                    if (this.is_touch) {
                        this.invest_money = Math.min(this.quickBuyDetail.user.available_total_money * 1, this.can_buy_amount * 1);
                    } else {
                        this.invest_money = Math.min(this.quickBuyDetail.user.available_total_money * 1, this.defaultQuick.can_buy_amount * 1);
                    }
                }
            },
            submit() {
                var isLogin = this.quickBuyDetail.user;
                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 2000
                    });
                } else {
                    // 判断是否风险评测
                    var isWhetherEvaluation = this.quickBuyDetail.user.whether_evaluation;
                    //判断存管状态
                    var userBindCardStatus = this.quickBuyDetail.user.bankcard_status;  // 绑卡状态
                    var isSRBankUser = this.quickBuyDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                    var isNeedResetPass = this.quickBuyDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                    var isSRBindCardStatus = this.quickBuyDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                    var SRBankSignStatus = this.quickBuyDetail.user.srbank.is_srbank_user_sign_auto_bid; // 自动投标签约
                    var SRBankSignStatusTr = this.quickBuyDetail.user.srbank.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
                    if (!isSRBankUser) {
                        // 非存管用户提醒开户
                        this.tipFn(0);
                        return false;
                    } else if (!isSRBindCardStatus || userBindCardStatus === "UNBIND") {
                        // 非绑卡状态提示绑卡
                        this.tipFn(1);
                        return false;
                    } else {
                        // 已开通存管
                        if (isNeedResetPass) {
                            // 老用户重置密码
                            this.tipFn(4);
                            return false;
                        } else {
                            if (!SRBankSignStatus) {
                                // 自动投标签约
                                this.tipFn(2);
                                return false;
                            } else if (!SRBankSignStatusTr) {
                                // 自动债权转让签约
                                this.tipFn(5);
                                return false;
                            } else if (!isWhetherEvaluation) {
                                MessageBox.alert('您未进行风险评测，请先评测再进行投资').then(() => {
                                    window.location.href = '/app/v1220/ucenter/risk_evaluation';
                                    return false;
                                });
                            } else {
                                //条件
                                if (!this.invest_money) {
                                    let instance = Toast({
                                        message: '请输入金额',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 < parseInt(this.quickBuyDetail.min_money)) {
                                    let instance = Toast({
                                        message: '个人最小投资金额为' + this.quickBuyDetail.min_money + '元',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 > this.quickBuyDetail.user.available_total_money * 1) {
                                    //余额不足去充值
                                    this.tipFn(3);
                                } else {
                                    //判断是否触摸
                                    if (this.is_touch) {
                                        if (this.invest_money * 1 > this.can_buy_amount * 1) {
                                            let instance = Toast({
                                                message: '剩余可投' + this.can_buy_amount + '元',
                                                duration: 2000
                                            });
                                        } else {
                                            this.min_historty_money = this.historyInterest(this.invest_money, this.min_interest_rate, this.min_month);
                                            this.max_historty_money = this.historyInterest(this.invest_money, this.max_interest_rate, this.max_month);
                                            this.invest_confirm = true;
                                            this.invest_money_confirm = this.invest_money;
                                        }
                                    } else {
                                        if (this.invest_money * 1 > this.defaultQuick.can_buy_amount * 1) {
                                            let instance = Toast({
                                                message: '剩余可投' + this.defaultQuick.can_buy_amount + '元',
                                                duration: 2000
                                            });
                                        } else {
                                            this.min_historty_money = this.historyInterest(this.invest_money, this.defaultQuick.min_interest_rate, this.min_month);
                                            this.max_historty_money = this.historyInterest(this.invest_money, this.defaultQuick.max_interest_rate, this.max_month);
                                            this.invest_confirm = true;
                                            this.invest_money_confirm = this.invest_money;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            verifyJoinSubmit() {
                if (!this.is_checked) {
                    let instance = Toast({
                        message: '请同意《投资与咨询服务协议》与《随心投服务说明》',
                        duration: 2000
                    });
                } else {
                    if (this.is_touch) {
                        var interest_rate = this.min_interest_rate + ',' + this.max_interest_rate;
                        var period = this.min_month + ',' + this.max_month;
                    } else {
                        var interest_rate = this.defaultQuick.min_interest_rate + ',' + this.defaultQuick.max_interest_rate;
                        var period = '0,36';
                    }
                    this.$store.dispatch({
                        type: 'batch',
                        invest_money: this.invest_money,
                        interest_rate: interest_rate,
                        period: period,
//                      types: this.type
                        types: 3
                    });
                }
            },
            historyInterest(money, interest_rate, period) {
                var period = period * 1;
                var money = money * 1;
                var interest_rate = interest_rate * 1;
                if (period === 0) {
                    return 0;
                }
                var ylv = interest_rate / 100 / 12;
                var month_pay = money * ylv * Math.pow(1 + ylv, period) / (Math.pow(1 + ylv, period) - 1);
                var total_pay = month_pay * period;
                var historyInterest = total_pay - money;

                historyInterest = historyInterest.toFixed(2);
                month_pay = month_pay.toFixed(2);

                return historyInterest;
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.InvestmentAgreement.$emit('agreementInvestModel', this.$refs.InvestmentAgreement.$el.innerHTML);
                } else if (type == 2) {
                    window.location.href = '/about/regular/' + this.regulardetail.plan.id;
                } else if (type == 3) {
                    this.$refs.RiskAgreement.$emit('agreementRiskModel', this.$refs.RiskAgreement.$el.innerHTML);
                } else if (type == 4) {
                    this.$refs.BatchAgreement.$emit('agreementBatchModel', this.$refs.BatchAgreement.$el.innerHTML);
                }
            },
            tipFn(type) {
                //区分app来源
                var platform = Util.getCookie('platform');
                if (type == 0) {
                    //开通存管
                    MessageBox({
                        title: '温馨提示',
                        message: '银行存管账户用于对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即开通',
                        cancelButtonText: '暂不开通'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'personalRegister',
                                redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?'
                            });
                        }
                    });
                } else if (type == 1) {
                    MessageBox({
                        title: '温馨提示',
                        message: '您还未绑定银行卡，请先绑定银行卡后再进行投资。',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即绑卡',
                        cancelButtonText: '暂不绑卡'
                    }).then(action => {
                        if (action == 'confirm') {
                            //已经解绑的用户  跳转上饶银行换绑
                            //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                            this.$store.dispatch({
                                type: 'rebindBankcardPage',
                                redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?from=rebind'
                            });
                        }
                    });
                } else if (type == 2) {
                    // 自动投标签约
                    MessageBox({
                        title: '开启投资授权协议签约',
                        message: '您还未开启《投资授权协议》中的"自动投标签约"，请先进行签约再进行投资',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '开启签约',
                        cancelButtonText: '暂不签约'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'srbankSignPage',
                                sign_type: 'sign_auto_bid',
                                redirectUrl: window.location.origin + '/#/bank/sign_page_success?',
                            });
                        }
                    });
                } else if (type == 3) {
                    //去充值
                    MessageBox({
                        title: '温馨提示',
                        message: '可用余额不足，请前往充值',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '去充值',
                        cancelButtonText: '确定'
                    }).then(action => {
                        if (action == 'confirm') {
                            if (platform === 'android') {
                                jsShowRechargeCallBack(platform);
                            } else {
                                window.location.href = '/#/bank/recharge';
                            }
                        }
                    });
                } else if (type == 4) {
                    //老用户重置密码
                    MessageBox({
                        title: '',
                        message: this.$refs.olduser.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonClass: 'bank-btn-confirm'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'resetPassword',
                                redirectUrl: window.location.origin + '/#/user/detail?',
                                needCheck: false
                            });
                        }
                    });
                } else if (type == 5) {
                    // 自动债权转让签约
                    MessageBox({
                        title: '开启投资授权协议签约',
                        message: '您还未开启《投资授权协议》中的"自动购买债权签约"，请先进行签约再进行投资',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '开启签约',
                        cancelButtonText: '暂不签约'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'srbankSignPage',
                                sign_type: 'sign_credit_transfer',
                                redirectUrl: window.location.origin + '/#/bank/sign_page_success?',
                            });
                        }
                    });
                }
            },
            tip() {
                MessageBox.alert('本平台所有项目年化利率是在参考同类型项目历史数据得出，实际收益请参考往期年化收益率。市场有风险，投资需谨慎。');
            },
        },
        components: {
            TitleBar,
            vueSlider,
            InvestmentAgreement,
            RiskAgreement,
            BatchAgreement
        }
    }
</script>

<style scoped>
    @import "../../assets/css/wap/automatic.css";
</style>