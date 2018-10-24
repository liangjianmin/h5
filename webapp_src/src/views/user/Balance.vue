<template>
    <section class="balance" v-if="balanceInfo.user">
        <div class="dola-title">
            <a href="javascript:;" class="backer" @click.prevent="toMine" v-if="isApp"></a>
            <h2>余额自动复投</h2>
            <div class="tip" @click="agreement(5)">规则</div>
        </div>
        <ul class="balance-info-lists">
            <li class="balance-info-item">
                <span class="balance-info-tit">已为您累计复投</span>
                <span class="balance-info-cont" v-if="balanceInfo.balance_info">{{ balanceInfo.balance_info.balance_total_money }}元</span>
                <span class="balance-info-cont" v-else>0.00元</span>
            </li>
            <li class="balance-info-item balance-info-item02">
                <span class="balance-info-tit">余额自动复投</span>
                <span class="balance-info-cont" v-if="balanceInfo.balance_info">
                    <!--<span class="switch-text" v-if="closeBalanceStatus">未开启</span>
                    <span class="switch-text" v-else>已开启</span>-->
                    <span class="switch-wrapper">
                        <template v-if="closeBalanceStatus"><!-- 未开启/已关闭 -->
                            <mt-switch v-model="isBalance" :class="{'isDisabled': !isDisabled}" @change="vilidateUser"></mt-switch>
                        </template>
                        <template v-else><!-- 已开启 -->
                            <mt-switch v-model="isOpenBalance" @change="isOpenBalanceFn"></mt-switch>
                        </template>
                    </span>
                </span>
            </li>
        </ul>
        <hr class="balance-hr"/>
        <template v-if="!isBalance && !openBalanceStatus">
            <dl class="balance-tips">
                <dt>功能说明</dt>
                <dd>1、该功能旨在满足用户的投标条件时自动投标，节约用户投资时间；</dd>
                <dd>2、用户自定义投资期限区间、往期年化收益率和账户保留金额等，平台将按照设置的条件自动投标；</dd>
                <dd>3、开启该功能能有效避免资金闲置，提高资金利用率。</dd>
            </dl>
        </template>
        <template v-else>
            <form class="balance-form" v-if="balanceInfo.balance_info">
                <ul class="balance-setting" v-show="isClose">
                    <li class="balance-set-item">
                        <div class="balance-set-tit">账户保留金额</div>
                        <div class="balance-set-cont">
                            <input class="balance-input" type="number" placeholder="0" v-model="holdMoney" @input="watchMoney"/>
                            <span class="balance-company">元</span>
                        </div>
                    </li>
                    <li class="balance-set-item">
                        <div class="balance-set-tit">投标期限区间</div>
                        <div class="balance-set-cont">
                            <span class="select-btn" :class="{'select-text-theme': selectTheme || balanceInfo.balance_info.status === 1}" @click="showSelect">{{ minPeriod }}</span>
                            <span class="select-text">至</span>
                            <span class="select-btn" :class="{'select-text-theme': selectTheme || balanceInfo.balance_info.status === 1}" @click="showSelect">{{ maxPeriod }}</span>
                        </div>
                    </li>
                    <li class="balance-set-item">
                        <div class="balance-set-tit">往期年化收益率</div>
                        <div class="balance-set-cont">{{ minRate }}%~{{ maxRate }}%</div>
                    </li>
                    <li class="balance-set-item">
                        <div class="balance-set-tit">回款方式</div>
                        <div class="balance-set-cont">等额本息</div>
                    </li>
                </ul>
                <div class="sub-wrapper">
                    <div class="btn-wrapper">
                        <div class="protocol" v-show="isClose"><i class="select-icon" :class="{'is-select': isSelect}" @click="selectProtocol"></i>同意并签署<a href="/about/invest_sign">《投资授权协议》</a></div>
                        <mt-button class="sub-btn" v-if="isClose" :class="{'primary': isCanSaveBalance}" type="primary" size="large" @click.native.prevent="saveBalance">保存设置</mt-button>
                        <mt-button class="sub-btn"  v-else :class="{'primary': isCanCloseBalance}" type="primary" size="large" @click.native.prevent="closeBalance">保存设置</mt-button>
                    </div>
                </div>
            </form>
        </template>
        <mt-popup class="select-date-popup" position="bottom" v-model="popupVisible" :closeOnClickModal="false">
            <mt-picker class="select-date-wrapper" :slots="slots" :showToolbar="true" @change="onValuesChange">
                <div class="select-date-tit">
                    <span>投标选择期限区间</span>
                    <a href="javascript:;" @click="confirmSelect">确认</a>
                </div>
            </mt-picker>
        </mt-popup>
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
        <BalanceAgreement ref="BalanceAgreement" v-show="agreement_flag"></BalanceAgreement>
    </section>
</template>

<script>
    import Vue from 'vue';
    import {Switch, Button, Picker, Popup} from 'mint-ui';
    import {mapState} from 'vuex';
    import Util from '../../util/index';
    import { Toast, MessageBox } from 'mint-ui';
    import { jsNeedShowTitleBarCallBack, jsShowMineCallBack, setupWebViewJavascriptBridge } from '../../util/appCallback';
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue';
    import BalanceAgreement from '../agreement/BalanceAgreement.vue';

    Vue.component(Switch.name, Switch);
    Vue.component(Button.name, Button);
    Vue.component(Picker.name, Picker);
    Vue.component(Popup.name, Popup);

    export default {
        name: 'Balance',
        data() {
            return {
                isApp: true,
                isBalance: false,
                isOpenBalance: true,
                isCloseBalance: false,
                popupVisible: false,
                leftDate: '1个月',
                rightDate: '36个月',
                selectTheme: false,
                isSelect: false,
                isDisabled: false,
                isClose: true,
                isCanSaveBalance: false,
                isCanCloseBalance: false
            };
        },
        computed: {
            ...mapState({
                balanceInfo: state => state.balance.balanceInfo,
                slots: state => state.balance.slots,
                minRate: state => state.balance.minRate,
                maxRate: state => state.balance.maxRate,
                noBalanceStatus: state => state.balance.noBalanceStatus,
                closeBalanceStatus: state => state.balance.closeBalanceStatus,
                openBalanceStatus: state => state.balance.openBalanceStatus
            }),
            holdMoney: {
                get () {
                    return this.$store.state.balance.holdMoney;
                },
                set (value) {
                    this.$store.commit('updateMessage', value);
                }
            },
            minPeriod: {
                get () {
                    return this.$store.state.balance.minPeriod;
                },
                set (value) {
                    this.$store.commit('updateMinPeriod', value);
                }
            },
            maxPeriod: {
                get () {
                    return this.$store.state.balance.maxPeriod;
                },
                set (value) {
                    this.$store.commit('updateMaxPeriod', value);
                }
            }
        },
        methods: {
            watchMoney() {
                if (this.holdMoney) {
                    this.isCanSaveBalance = true;
                }
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
                } else if (type == 5) {
                    this.$refs.BalanceAgreement.$emit('agreementBalanceModel', this.$refs.BalanceAgreement.$el.innerHTML);
                }
            },
            isOpenBalanceFn(isChecked) {
                this.isClose = !this.isClose;
                this.isSelect = !this.isSelect;

                console.log(this.isCanSaveBalance);
                this.isCanSaveBalance = !this.isCanSaveBalance;
                this.isCanCloseBalance = true;

            },
            vilidateUser() {
                console.log(this.isBalance);
                this.isCanSaveBalance = true;
                if (this.isBalance) {

                    this.isBalance = false;

                    var isLogin = this.balanceInfo.user;
                    if (!isLogin) {
                        let instance = Toast({
                            message: '您还没有登录，请先登录后在进行操作',
                            duration: 2000
                        });
                    } else {
                        // 判断是否风险评测
                        var isWhetherEvaluation = this.balanceInfo.user.whether_evaluation;
                        //判断存管状态
                        var userBindCardStatus = this.balanceInfo.user.bankcard_status;  // 绑卡状态
                        var isSRBankUser = this.balanceInfo.user.srbank.is_srbank_user;  // 是否是存管用户
                        var isNeedResetPass = this.balanceInfo.user.srbank.need_reset_pwd_first; // 老用户重置密码
                        var isSRBindCardStatus = this.balanceInfo.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                        var SRBankSignStatus = this.balanceInfo.user.srbank.is_srbank_user_sign_auto_bid; // 自动投标签约
                        var SRBankSignStatusTr = this.balanceInfo.user.srbank.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
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
                                    this.isBalance = true;
                                    this.isDisabled = true;
                                }
                            }
                        }
                    }
                }


            },
            showSelect() {
                this.popupVisible = true;
            },
            onValuesChange(picker, values) {
                console.log(values);
                this.leftDate = values[0];
                this.rightDate = values[1];
            },
            confirmSelect() {
                this.popupVisible = false;
                this.selectTheme = true;
                this.isCanSaveBalance = true;

                if (this.leftDate && this.rightDate) {
                    this.$store.commit('updateMinPeriod', this.leftDate);
                    this.$store.commit('updateMaxPeriod', this.rightDate);
                }

            },
            selectProtocol() {
                this.isSelect = !this.isSelect;
            },
            saveBalance() {

//              if (!this.isClose) { // 关闭复投
//                  this.$store.dispatch({
//                      type: 'closeBalance'
//                  });
//              } else {

                    if (this.isCanSaveBalance) {
                        if (!this.isSelect) {
                            Toast({
                                message: '请同意协议！',
                                position: 'bottom',
                                duration: 2000
                            });
                        } else if (parseInt(this.rightDate) < parseInt(this.leftDate)) {
                            Toast({
                                message: '期限区间选择有误！',
                                position: 'bottom',
                                duration: 2000
                            });
                        } else {
                            // 开启复投

                            this.$store.dispatch({
                                type: 'openBalance',
                                hold_money: this.holdMoney * 1,
                                period_min: parseInt(this.minPeriod),
                                period_max: parseInt(this.maxPeriod)
                            });
                        }
                    } else {
                        Toast({
                            message: '您没有修改，无需提交！',
                            position: 'bottom',
                            duration: 2000
                        });
                        return;
                    }
//              }

            },
            closeBalance() {
                this.$store.dispatch({
                    type: 'closeBalance'
                });
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
            toMine() {
                var platform = Util.getCookie('platform');

                if (platform !== '') {
                    jsShowMineCallBack(platform);
                } else {
                    window.location.href = '/#/user/detail';
                }
            }
        },
        created() {
            var platform = Util.getCookie('platform');
            if (platform == 'ios') {
                setTimeout(()=>{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('jsNeedShowTitleBarCallBack', {
                            'is_show': '0'
                        }, function responseCallback(responseData) {
                            console.log("JS received response:", responseData);
                        })
                    });
                },100);

            } else if (platform == 'android') {
            	jsNeedShowTitleBarCallBack(platform, '0');
            }

            this.$store.dispatch({
                type: 'getBalanceInfo'
            });
        },
        mounted() {
        },
        components: {
            BalanceAgreement
        }
    };
</script>

<style lang="scss">
    .balance .dola-title {
        background-color: #fff;
    }

    .balance .dola-title .backer {
        color: #666;
    }

    .balance .dola-title .backer:before {
        border-color: #666;
    }

    .balance .dola-title h2 {
        color: #030303;
    }

    .balance .dola-title .tip {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 44px;
        padding-right: 0.44rem;
        padding-left: 0.44rem;
        font-size: 14px;
        color: #666;
    }

    .balance-info-lists {
        padding-top: 44px;
        padding-left: 16px;
    }

    .balance-info-item {
        display: flex;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 20px;
        height: 49px;
        line-height: 49px;
        border-bottom: 1px solid #e9e9e9;
    }

    .balance-info-item:last-child {
        border-bottom: 0;
    }

    .balance-info-tit {
        font-size: 15px;
        color: #000;
    }

    .balance-info-cont {
        font-size: 15px;
        color: #3e3e3e;
    }

    .balance-info-cont .switch-text {
        display: inline-block;
        vertical-align: top;
        margin-right: 7px;
        line-height: 49px;
        font-size: 12px;
        color: #999;
    }

    .balance-info-cont .switch-wrapper {
        display: inline-block;
    }

    .balance-info-cont .mint-switch-core {
        width: 46px;
        height: 24px;
    }

    .balance-info-cont .mint-switch {
        margin-top: 13px;
    }

    .balance-info-cont .mint-switch-core:before {
        width: 44px;
        height: 22px;
        background-color: #c4c4c4;
    }

    .balance-info-cont .mint-switch-core:after {
        width: 12px;
        height: 12px;
        left: 6px;
        top: 50%;
        margin-top: -6px;
    }

    .balance-info-cont .mint-switch-input:checked + .mint-switch-core {
        border-color: #ffd148;
        background-color: #ffd148;
    }

    .balance-info-cont .mint-switch.isDisabled .mint-switch-input:checked + .mint-switch-core {
        border-color: #d9d9d9;
        background-color: #d9d9d9;
    }

    .balance-info-cont .mint-switch.isDisabled .mint-switch-input:checked + .mint-switch-core:after {
        transform: translateX(0);
    }

    .balance-hr {
        border: 0;
        height: 10px;
        background-color: #f5f5f5;
    }

    .balance-tips {
        background-color: #fff;
    }

    .balance-tips dt {
        padding-left: 20px;
        padding-top: 17px;
        padding-bottom: 10px;
        font-size: 14px;
        color: #000;
        background-color: #fff;
    }

    .balance-tips dd {
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        line-height: 22px;
        font-size: 14px;
        color: #999;
        background-color: #fff;
    }

    .balance-form {
        background-color: #fff;
    }

    .balance-setting {
        padding-left: 16px;
        background-color: #fff;
    }

    .balance-set-item {
        display: flex;
        padding-left: 5px;
        height: 49px;
        line-height: 49px;
        border-bottom: 1px solid #e9e9e9;
    }

    .balance-set-tit {
        font-size: 14px;
        color: #000;
        flex: 0 0 1;
        width: 115px;
    }

    .balance-set-cont {
        position: relative;
        flex: 1;
        padding-right: 16px;
        font-size: 14px;
        color: #000;
    }

    .balance-set-cont .select-btn {
        display: inline-block;
        font-size: 15px;
        color: #d1d1d1;
    }

    .balance-set-cont .select-btn.select-text-theme {
        color: #000;
    }

    .balance-set-cont .select-text {
        font-size: 15px;
        color: #020202;
    }

    .balance-input {
        display: block;
        width: 100%;
        height: 49px;
        line-height: 49px;
        color: #000;
        &::-webkit-input-placeholder {
            color: #d1d1d1;
            font-size: 15px;
        }
    }

    .balance-set-cont .balance-company {
        position: absolute;
        top: 0;
        right: 16px;
        font-size: 15px;
        color: #141414;
    }

    .sub-wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 95px;
        border-top: 1px solid #f0f0f0;
        background-color: #fff;
    }

    .sub-wrapper .btn-wrapper {
        width: 100%;
    }

    .sub-wrapper .protocol {
        margin-top: 12px;
        margin-bottom: 10px;
        line-height: 16px;
        font-size: 12px;
        color: #666;
    }

    .sub-wrapper .protocol .select-icon {
        display: inline-block;
        vertical-align: top;
        width: 16px;
        height: 16px;
        background: url("../../assets/images/app/select-no.png") no-repeat center;
        background-size: 16px 16px;
        margin-right: 6px;
    }

    .sub-wrapper .protocol .select-icon.is-select {
        background: url("../../assets/images/app/select-yes.png") no-repeat center;
        background-size: 16px 16px;
    }

    .sub-wrapper .protocol a {
        color: #3f97f3;
    }

    .sub-wrapper .sub-btn {
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        background-color: #d5d5d5;
    }

    .sub-wrapper .sub-btn.primary {
        background-color: #f60;
    }

    .select-date-popup {
        width: 100%;
    }

    .select-date-wrapper .select-date-tit {
        position: relative;
        text-align: center;
        font-size: 17px;
        color: #000;
        line-height: 40px;
    }

    .select-date-wrapper .select-date-tit a {
        position: absolute;
        right: 0;
        line-height: 40px;
        padding: 0 13px;
        font-size: 15px;
        color: #f60;
    }

    .select-date-wrapper .picker-items {
        background-color: #f5f5f5;
    }

    .select-date-wrapper .picker-item {
        text-align: center;
    }

    .select-date-wrapper .picker-item.picker-selected {
        background-color: #fff;
    }

    .select-date-wrapper .picker-slot.picker-slot-divider {
        border-left: 1px solid #dfdfdf;
    }
</style>