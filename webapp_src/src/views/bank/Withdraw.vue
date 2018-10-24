<template>
    <section class="bank-operate" :class="{'mt':app}">
        <div class="dola-title" v-if="!app">
            <a href="/#/user/detail" class="backer"></a>
            <h2>提现</h2>
        </div>
        <template v-if="withdrawPage.user">
            <div class="withdraw-tip" v-if="withdrawPage.user.usr_note_title">
                <div class="l">
                    <i class="lineBlock va-m"></i>
                    <span class="va-m">当前有1笔提现未完成操作</span>
                </div>
                <a class="r" :href="withdrawPage.user.usr_note_link">查看详情></a>
            </div>
        </template>
        <template v-if="withdrawPage.user">
            <div class="bank-operate-head boxsiz bank-operate-head-bor">
                <div class="bank-operate-head-l">
                    <img :src="withdrawPage.user.srbank.bankcard.img_logo_url" width="27" height="27" class="lineBlock va-m im">
                    <div class="text lineBlock va-m">
                        <p class="text-t1">{{withdrawPage.user.srbank.bankcard.bankName}}</p>
                        <p class="text-t2">尾号{{withdrawPage.user.srbank.bankcard.bankcardNo | bank}}</p>
                    </div>
                </div>
            </div>
            <div class="bank-operate-withdraw boxsiz">
                <div class="bank-operate-withdraw-text boxsiz clr">
                    <p class="t1 fl"><span class="va-m">可提现金额</span><i @click="tip" class="lineBlock va-m"></i></p>
                    <span class="t2 fr">{{withdrawPage.user.available_total_money}} 元</span>
                </div>
                <div class="bank-operate-withdraw-input boxsiz clr">
                    <div class="bank-operate-withdraw-input-tx fl">
                        <input type="number" :placeholder="'请输入提现金额，单笔最低'+withdrawPage.system.withdraw_info.lowest_get+'元'" v-model.number="withdrawForm.amount" v-on:input="inputFun(withdrawForm.amount)">
                    </div>
                    <span class="fr t2" @click="allWithdraw(withdrawPage.user.available_total_money)">全部提现</span>
                </div>
            </div>
            <p class="bank-operate-withdraw-prompt  clr">
                <span class="fl t1">到账金额：<em>{{money}}</em>元</span>
                <span class="fr t2">（已扣除手续费 {{feeMoney}}元）</span>
            </p>
            <p class="bank-operate-withdraw-prompt-text clr">（提现费率：{{withdrawPage.user.withdraw_info.rate}}，本月还可免费提现 {{withdrawPage.user.withdraw_info.free_times}} 次） </p>
            <div class="bank-operate-form boxsiz clr">
                <button class="btn" :disabled="withdrawStatus" :class="{'btn-end':disabled && !withdrawStatus}" @click="submit(withdrawForm.amount)">下一步</button>
            </div>
            <a @click="modify" class="forget">忘记密码</a>
            <div class="bank-operate-tx">
                <p class="t1">提现说明</p>
                <p class="t2">1、单笔提现金额最低100元。</p>
                <p class="t2">2、提现手续费=提现金额*0.2%。如果账户有投资金额≥500元的投资记录，则每月可获得5次免费提现机会；</p>
                <p class="t2">3、当日充值未投资金额，1日后才可提现；</p>
                <p class="t2">4、因平台风控要求，未投资过的用户，不能进行提现，需联系平台客服解除限制；</p>
                <p class="t2">5、提现到账时间说明：</p>
                <div class="t2">
                    <table class="table-txt">
                        <tbody>
                        <tr>
                            <th>单笔提现金额</th>
                            <th>提现时间</th>
                            <th>到账时间</th>
                        </tr>
                        <tr>
                            <td>≤5万</td>
                            <td>00：00-24：00</td>
                            <td>预计当日</td>
                        </tr>
                        <tr>
                            <td>>5万</td>
                            <td>仅限工作日00:10-17:00</td>
                            <td>预计当日</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p class="t2">注：工作日17:00-24:00、周末及节假日，如需大额提现（金额大于5万），可采用分为多笔金额小于等于5万元的方式逐步进行提现。</p>
            </div>
        </template>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import {Toast,MessageBox} from 'mint-ui'
    import Util from '../../util/index'

    export default {
        name: 'withdraw',
        data() {
            return {
                title: '提现',
                wrapperHeight: '',
                landingPageText: '提现说明',
                landingPage: true,
                landingPageHref: '/#/bank/withdraw_description',
                disabled: false,
                money: 0,
                feeMoney: 0,
                app: false,
                withdrawForm: {
                    amount: ''
                }
            }
        },
        computed: mapState({
            withdrawPage: state => state.bank.withdrawPage,
            withdrawStatus: state => state.bank.withdrawStatus
        }),
        watch: {
            $route(to) {
                var path = to.path.substring(1);
                if (path == 'bank/withdraw') {
                    this.$store.dispatch({
                        type: 'rechargePage',
                        loading: false
                    });
                }
            }
        },
        created() {
            var path = this.$route.path.substring(1);
            var app = Util.getCookie('platform');
            if (app != '') {
                this.app = true;
            } else {
                this.app = false;
            }
            if (path == 'bank/withdraw') {
                this.getWithdraw();
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight;
        },
        methods: {
            getWithdraw() {
                this.$store.dispatch({
                    type: 'withdrawPage',
                    loading: true
                });
            },
            modify() {
                this.$store.dispatch({
                    type: 'resetPassword',
                    redirectUrl: window.location.origin + '/#/bank/withdraw?',
                    needCheck: false
                });
            },
            tip() {
                MessageBox.alert('可提现金额=账户余额-当天充值金额-冻结金额（投资匹配中、提现中）').then(() => {

                });
            },
            inputFun(val) {
                //判断下一步的条件是最低提现
                var lowest_get = this.withdrawPage.system.withdraw_info.lowest_get * 1;
                var maxMoney = Math.min(this.withdrawPage.user.available_total_money * 1, this.withdrawPage.user.srbank.withdrawAmount * 1)

                //提现不低于最低提现金额
                if (val != '' && val >= lowest_get) {
                    this.disabled = true;
                    //计算手续费
                    this.feeMoney = parseFloat(val * this.withdrawPage.user.withdraw_info.rate).toFixed(2);
                    this.money = parseFloat(val - this.feeMoney).toFixed(2);
                } else {
                    this.disabled = false;
                    this.feeMoney = 0;
                    this.money = 0;
                }

                // 提现不能超过可提现金额
                if (val > maxMoney) {
                    this.disabled = false;
                    this.feeMoney = 0;
                    this.money = 0;
                }

            },
            allWithdraw(val) {
                var money = Math.min(val * 1, this.withdrawPage.user.srbank.withdrawAmount * 1);
                this.withdrawForm.amount = val;
                this.feeMoney = parseFloat(val * this.withdrawPage.user.withdraw_info.rate).toFixed(2);
                this.money = parseFloat(val - this.feeMoney).toFixed(2);

                if (money >= 100) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
            },
            submit(val) {
                var lowest_get = parseInt(this.withdrawPage.system.withdraw_info.lowest_get);
                if (val == '' || val < lowest_get) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '单笔提现金额不能低于' + lowest_get + '元',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else if (val > parseFloat(this.withdrawPage.user.available_total_money)) {
                    var maxMoney = parseFloat(this.withdrawPage.user.available_total_money);
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '可提现金额最大为' + maxMoney + '元',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else {
                    this.$store.dispatch({
                        type: 'withdraw',
                        amount: parseFloat(this.withdrawForm.amount).toFixed(2),
                        redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/withdraw_success?'
                    });
                }
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .mt {
        padding-top: 0;
    }

    .bank-operate {
        background: #f5f5f5;
        height: auto;
    }

    .bank-operate .bank-operate-form .btn {
        width: 100%;
    }
</style>
