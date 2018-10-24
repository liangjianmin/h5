<template>
    <section class="dola-standard-powder">
        <div class="dola-title">
            <a href="/#/regular" class="backer" v-if="!isApp"></a>
            <h2>{{title}}</h2>
            <div class="tip" @click="agreement(1)">
                <i class="lineBlock va-m"></i>
                <em class="lineBlock va-m">规则</em>
            </div>
        </div>
        <section class="dola-standard-powder-detail" v-if="noviceDetail.list">
            <div class="detail-wrapper">
                <div class="detail-container">
                    <div class="top clr">
                        <div class="left">
                            <p class="text">
                                <template v-if="noviceDetail.list.novice_zone_interest_rate_three">
                                    <b>{{noviceDetail.list.novice_zone_interest_rate_one}}</b>%+{{noviceDetail.list.novice_zone_interest_rate_three}}%
                                </template>
                                <template v-else>
                                    <b>{{noviceDetail.list.novice_zone_interest_rate_one}}</b>%
                                </template>
                            </p>
                            <h5 class="tit">往期年化收益率</h5>
                        </div>
                        <div class="right">
                            <p class="text"><b>{{noviceDetail.list.period}}</b>个月</p>
                            <h5 class="tit" v-if="noviceDetail.list.novice_zone_interest_rate_three">期限</h5>
                            <h5 class="tit" v-else>期满免费自动债转</h5>
                        </div>
                    </div>
                    <div class="bottom clr">
                        <div class="l">
                            <h5 class="tit">剩余可投</h5>
                            <p class="text">{{noviceDetail.list.surplus_money}}元</p>
                        </div>
                        <div class="c">
                            <h5 class="tit">回款方式</h5>
                            <p class="text">等额本息</p>
                        </div>
                        <div class="r">
                            <h5 class="tit">每人限投额度</h5>
                            <p class="text">{{noviceDetail.list.limit_for_money}}元</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-lists-wrapper">
                <ul class="detail-lists">
                    <li class="list list01">
                        <template v-if="noviceDetail.user">
                            <span class="tit">可用余额</span>
                            <span class="cont"><b>{{noviceDetail.user.available_total_money}}</b>元</span>
                            <a href="javascript:;" class="trade-in-btn" @click.prevent="tradeIn">充值</a>
                        </template>
                        <template v-else>
                            <span class="tit">可用余额</span>
                            <span class="cont"><a style="color: #f2843a;" @click="userLogin">登录后可查看</a></span>
                        </template>
                    </li>
                </ul>
            </div>
            <div class="detail-input-wrapper">
                <form class="inveset-form">
                    <div class="input lbBox">
                        <span class="desc">金额</span>
                        <input type="number" name="money" :placeholder="parseInt(noviceDetail.list.buy_money_min)+'元起投'" class="inveset-money" v-model="invest_money" @keyup="calc(invest_money)">
                        <span class="all-inveset" @click="maxIn">全投</span>
                    </div>
                    <div class="sy-calc" v-if="noviceDetail.list.novice_zone_interest_rate_three">往期参考收益{{ all_interset }}元(含平台1%年化奖励: {{ jl_interset }}元)</div>
                    <div class="agree-yx">
                        <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                        <div class="lineBlock agree-yx-text">
                            <span>勾选表示同意</span>
                            <a href="/about/invest_sign">《投资授权协议》</a>
                        </div>
                    </div>
                    <template v-if="noviceDetail.user != undefined">
                        <template v-if="noviceDetail.user.can_buy_novice_zone.code === 910063">
                            <input type="button" value="仅限新手" class="join-btn join-btn-end" @click="submit()">
                        </template>
                        <template v-else>
                            <input type="button" value="立即预约" class="join-btn" @click="submit()" :disabled="statusBtn" :class="{'disabale-active':statusBtn}">
                        </template>
                    </template>
                    <template v-else>
                        <input type="button" value="立即预约" class="join-btn" @click="submit()" :disabled="statusBtn" :class="{'disabale-active':statusBtn}">
                    </template>
                </form>
            </div>
            <div class="reserve-text" v-if="noviceDetail.list.novice_zone_interest_rate_three">
                <p class="t1">说明：</p>
                <p>1、新手专享标投资采用预约投标机制，预约成功后预计需1-3天内为您匹配债权；</p>
                <p>2、平台1%年化奖励按月随息发放，若提前退出，则退出项目所对应的后续1%年化奖励将不再发放。</p>
            </div>
            <div class="reserve-text" v-else>
                <p class="t1">说明：</p>
                <p>1、3个月期满系统为您自动债转，并减免债转手续费；</p>
                <p>2、预约成功后，系统匹配预计需等待1-3天</p>
            </div>
        </section>
        <template v-if="noviceDetail.list">
            <NoviceAgreement :novice_rate="noviceDetail.list.novice_zone_interest_rate_three" ref="NoviceAgreement" v-show="agreement_flag"></NoviceAgreement>
        </template>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import Util from '../../util/index'
    import {Toast, MessageBox} from 'mint-ui'
    import {jsWebViewCallBack, jsShowLoginCallBack, jsShowRechargeCallBack, jsSettingSafePwdCallBack} from '../../util/appCallback'
    import NoviceAgreement from '../agreement/NoviceAgreement.vue'

    let Base64 = require('js-base64').Base64

    export default {
        name: 'noviceDetail',
        data() {
            return {
                title: '新手专享',
                is_checked: true,
                invest_money: '',
                agreement_flag: false,
                all_interset: 0,
                jl_interset: 0
            }
        },
        computed: {
            ...mapState({
                noviceDetail: state => state.novice.noviceDetail,
                statusBtn: state => state.novice.statusBtn
            }),
            batch_no() {
                return this.$route.params.id;
            }
        },
        watch: {
            $route(to) {
                var batch_no = to.params.id;
                if (batch_no != undefined) {
                    this.getData(batch_no);
                }
            }
        },
        created() {
            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }

            this.getData();
        },
        methods: {
            getData() {
                this.$store.dispatch({
                    type: 'noviceDetail',
                    batch_no: this.batch_no
                });
            },
            calc(val) {
                var allInterset = Util.history_interest(val, 9, 3);
                var jlInterset = Util.history_interest(val, 1, 3);
                this.all_interset = allInterset;
                this.jl_interset = jlInterset;
            },
            submit() {
                var isLogin = this.noviceDetail.user;
                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 2000
                    });
                } else {
                    // 判断是否风险评测
                    var isWhetherEvaluation = this.noviceDetail.user.whether_evaluation;
                    //判断存管状态
                    var userBindCardStatus = this.noviceDetail.user.bankcard_status;  // 绑卡状态
                    var isSRBankUser = this.noviceDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                    var isNeedResetPass = this.noviceDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                    var isSRBindCardStatus = this.noviceDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                    var SRBankSignStatus = this.noviceDetail.user.srbank.is_srbank_user_sign_auto_bid; // 自动投标签约
                    var SRBankSignStatusTr = this.noviceDetail.user.srbank.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
                    var SRBankSignTransfer = this.noviceDetail.user.srbank.is_srbank_user_sign_transfer;    // 转让手续费签约
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
                            } else if (!SRBankSignTransfer) {
                                // 转让手续费签约
                                this.tipFn(6);
                                return false;
                            } else if (!isWhetherEvaluation) {
                                MessageBox.alert('您未进行风险评测，请先评测再进行投资').then(() => {
                                    window.location.href = '/app/v1220/ucenter/risk_evaluation';
                                    return false;
                                });
                            } else {
                                // 条件
                                if (this.noviceDetail.user.can_buy_novice_zone.code !== 0) {
                                    let instance = Toast({
                                        message: this.noviceDetail.user.can_buy_novice_zone.msg,
                                        duration: 2000
                                    });
                                    return false;
                                } else if (!this.invest_money) {
                                    let instance = Toast({
                                        message: '请输入金额',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 < this.noviceDetail.list.buy_money_min) {
                                    let instance = Toast({
                                        message: '个人最小投资金额为100元',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 > this.noviceDetail.list.surplus_money * 1) {
                                    let instance = Toast({
                                        message: '个人最大投资金额为' + this.noviceDetail.list.surplus_money * 1 + '元',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 > this.noviceDetail.user.available_total_money * 1) {
                                    // 余额不足去充值
                                    this.tipFn(3);
                                } else {
                                    if (!this.is_checked) {
                                        let instance = Toast({
                                            message: '请同意协议',
                                            duration: 2000
                                        });
                                    } else {
                                        this.$store.dispatch({
                                            type: 'standardBespeaks',
                                            invest_money: this.invest_money,
                                            reservation_id: this.noviceDetail.list.id
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            },
            maxIn() {
                if (!this.noviceDetail.hasOwnProperty('user')) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 1500
                    });
                } else {
                    var userAvailableMoney = this.noviceDetail.user.available_total_money * 1;
                    var maxMoney = this.noviceDetail.list.surplus_money * 1;

                    if (userAvailableMoney > maxMoney) {
                        this.invest_money = maxMoney;
                        this.calc(maxMoney);
                    } else {
                        this.invest_money = userAvailableMoney;
                        this.calc(userAvailableMoney);
                    }

                }
            },
            userLogin() {
                var batch_no = this.$route.params.id;
                var platform = Util.getCookie('platform');

                if (batch_no != undefined) {
                    if (platform != '') {
                        jsShowLoginCallBack(platform);
                    } else {
                        var decode = '/#/novice/detail/' + batch_no;
                        window.location.href = '/user/login?forward_url=' + Base64.encode(decode);
                    }
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
                        cancelButtonText: '暂不开通',
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
                        cancelButtonText: '暂不绑卡',
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
                    MessageBox({
                        title: '温馨提示',
                        message: '您还未开启《投资授权协议》,请先开启《投资授权协议》后再进行投资',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '开启授权',
                        cancelButtonText: '暂不授权',
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
                        cancelButtonText: '确定',
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
                } else if (type == 6) {
                    // 转让手续费签约
                    MessageBox({
                        title: '手续费签约',
                        message: '为符合银行存管系统规范，平台投资人发起债权转让需进行转让手续费签约，完成后方可进行线上债权转让标的发布。',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即签约',
                        cancelButtonText: '暂不签约',
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'srbankSignPage',
                                sign_type: 'sign_transfer',
                                redirectUrl: window.location.origin + '/#/bank/sign_page_success?',
                            });
                        }
                    });
                }
            },
            tradeIn() {
                //判断app来源
                var platform = Util.getCookie('platform');
                //判断存管状态
                var userBindCardStatus = this.noviceDetail.user.bankcard_status;  // 绑卡状态
                var isSRBankUser = this.noviceDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                var isNeedResetPass = this.noviceDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                var isSRBindCardStatus = this.noviceDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态

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
                            //jsShowRechargeCallBack(platform);
                            window.location.href = '/#/bank/recharge';
                        } else {
                            window.location.href = '/#/bank/recharge';
                        }
                    }
                }
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.NoviceAgreement.$emit('agreementNoviceModel', this.$refs.NoviceAgreement.$el.innerHTML);
                }
            }
        },
        components: {
            TitleBar,
            NoviceAgreement
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/standard_powder.css";

    .dola-standard-powder .dola-standard-powder-detail {
        padding-bottom: 0;
    }

    .dola-standard-powder .dola-standard-powder-detail .detail-input-wrapper .inveset-form .join-btn {
        box-shadow: none;
    }

    .dola-standard-powder .dola-standard-powder-detail .detail-lists-wrapper {
        padding-top: 18px;
        padding-bottom: 15px;
    }

    .dola-standard-powder .dola-standard-powder-detail .detail-lists-wrapper .detail-lists .list.list01 .cont b {
        color: #141414;
    }

    .reserve-text {
        background: #fff;
        padding: 0.533rem;
    }

    .reserve-text p {
        font-size: 12px;
        color: #a5a5a5;
    }

    .reserve-text .t1 {
        margin-bottom: 0.44rem;
        font-size: 14px;
        color: #000000;
    }

    .agree-yx a {
        color: #141414;
    }

    .sy-calc {
        margin: 0 0.533rem;
    }
</style>