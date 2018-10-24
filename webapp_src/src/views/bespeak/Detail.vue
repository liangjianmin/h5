<template>
    <section class="reserve">
        <div class="dola-title">
            <a href="/#/regular" class="backer" v-if="!isApp"></a>
            <h2>预约投标</h2>
            <div class="tip" @click="agreement(1)">
                <i class="lineBlock va-m"></i>
                <em class="lineBlock va-m">规则</em>
            </div>
        </div>
        <template v-if="bespeakDetail.list">
            <dl class="dola-reserve-list">
                <dd class="clr">
                    <template v-if="bespeakDetail.user">
                        <div class="fl l">
                            <p class="t1">可用余额&nbsp;&nbsp;&nbsp;<span> {{bespeakDetail.user.available_total_money}}</span>元</p>
                        </div>
                        <div class="fr r" @click.prevent="tradeIn">
                            <span class="t1 va-m">充值</span>
                            <i class="lineBlock va-m ico-1"></i>
                        </div>
                    </template>
                    <template v-else>
                        <div class="fl l">
                            <p class="t1" @click="userLogin">可用余额&nbsp;&nbsp;&nbsp;<span> 登录后可查看</span></p>
                        </div>
                    </template>
                </dd>
                <dd class="clr">
                    <div class="fl l">
                        <p class="t1">选择预约投标期限</p>
                    </div>
                    <div class="fr r lbBox">
                        <template v-if="reservationId == -1">
                            <select v-model="reservation_id" @change="selPeriod(reservation_id)" class="seldef">
                                <option value="-1" class="default">请选择</option>
                                <option v-for="(item,index) in bespeakDetail.list" :value="item.id">{{item.min_period}}-{{item.max_period}}个月({{item.interest_rate}}%)</option>
                            </select>
                        </template>
                        <template v-else>
                            <select v-model="reservation_id" @change="selPeriod(reservation_id)">
                                <option v-for="(item,index) in bespeakDetail.list" :value="item.id">{{item.min_period}}-{{item.max_period}}个月({{item.interest_rate}}%)</option>
                            </select>
                        </template>
                        <i class="lineBlock va-m ico-1"></i>
                    </div>
                </dd>
            </dl>
            <div class="inveset-form clr">
                <div class="input" v-if="bespeakDetail.list">
                    <span class="desc">金额</span>
                    <template v-if="is_touch">
                        <input class="inveset-money" type="number" name="money" :placeholder="placeholder_text" v-model="invest_money"/>
                    </template>
                    <template v-else>
                        <input class="inveset-money" type="number" name="money" :placeholder="parseInt(bespeakDetail.list[0].min_money_for_user)+'元起投，最高'+parseInt(bespeakDetail.list[0].max_money_for_user)+'元'" v-model="invest_money"/>
                    </template>
                    <span class="all-inveset" @click="maxIn">最大金额</span>
                </div>
            </div>
            <dl class="dola-reserve-list">
                <dd class="clr bor">
                    <div class="fl l">
                        <p class="t1">选择预约投标回款方式</p>
                    </div>
                    <div class="fr r">
                        <span class="t1">等额本息</span>
                    </div>
                </dd>
            </dl>
            <div class="reserve-text">
                <div class="text">
                    <p>说明：</p>
                    <p>1.预约投标范围为个人消费贷、渠道消费贷、仟姿贷等散标项目或债转项目。</p>
                    <p>2.系统按预约时间先后顺序进行匹配。</p>
                    <p>3.预约投标有效期为3天，超过有效期后，系统自动将未匹配金额返回账户余额。</p>
                </div>
                <div class="agree-yx">
                    <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                    <div class="lineBlock agree-yx-text">
                        <span>同意</span>
                        <a href="/about/invest_sign">《投资授权协议》</a>
                    </div>
                </div>
            </div>
            <input class="join-btn" @click="submit()" type="button" value="立即预约" :disabled="statusBtn" :class="{'disabale-active':statusBtn}"/>
            <!-- 确认投资 -->
            <div class="invest-affirm" v-if="invest_confirm">
                <section class="invest-affirm-wrapper">
                    <div class="title-wrapper">
                        <span class="close-wrapper" @click="invest_confirm = false"></span>
                        <h5 class="title">短信验证码</h5>
                    </div>
                    <div class="affrim-join-pro-from">
                        <ul class="form-lists">
                            <li class="list list2">
                                <span class="desc">预约确认：验证码已发送至 130******12</span>
                                <span class="content">重发59S</span>
                            </li>
                        </ul>
                        <dl class="code" id="code">
                            <dd>
                                <input type="number" v-model="code_a" name="code_a" v-on:input="sendCode(1)" autofocus="autofocus"/>
                            </dd>
                            <dd>
                                <input type="number" v-model="code_b" name='code_b' v-on:input="sendCode(2)"/>
                            </dd>
                            <dd>
                                <input type="number" v-model="code_c" name='code_c' v-on:input="sendCode(3)"/>
                            </dd>
                            <dd>
                                <input type="number" v-model="code_d" name='code_d' v-on:input="sendCode(4)"/>
                            </dd>
                            <dd>
                                <input type="number" v-model="code_e" name='code_e' v-on:input="sendCode(5)"/>
                            </dd>
                            <dd>
                                <input type="number" v-model="code_f" name='code_f' v-on:input="sendCode(6)"/>
                            </dd>
                        </dl>
                    </div>
                </section>
            </div>
            <!--投资协议-->
            <InvestmentAgreement :agreement-type="agreementtype" ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
        </template>
        <BespeakAgreement ref="BespeakAgreement" v-show="agreement_flag"></BespeakAgreement>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'
    import {Toast, MessageBox} from 'mint-ui'
    import Util from '../../util/index'
    import {jsWebViewCallBack, jsShowLoginCallBack, jsShowRechargeCallBack, jsSettingSafePwdCallBack} from '../../util/appCallback'
    import BespeakAgreement from '../agreement/BespeakAgreement.vue'

    let Base64 = require('js-base64').Base64;


    export default {
        name: 'bespeakDetail',
        computed: mapState({
            bespeakDetail: state => state.bespeak.bespeakDetail,
            statusBtn: state => state.bespeak.statusBtn,
            reservationId(state) {
                if (state.bespeak.reservationId != -1) {
                    this.reservation_id = state.bespeak.reservationId;
                } else {
                    this.reservation_id = -1;
                }
                return state.bespeak.reservationId;
            }
        }),
        data() {
            return {
                is_checked: true,
                agreement_flag: false,
                invest_confirm: false,
                invest_money: '',
                code_a: '',
                code_b: '',
                code_c: '',
                code_d: '',
                code_e: '',
                code_f: '',
                is_touch: false,
                isApp: false,
                minMoney: 100,
                maxMoney: '',
                reservation_id: '',
                placeholder_text: ''
            }
        },
        watch: {
            $route(to) {
                var batch_no = to.query.batchNo;
                if (batch_no != undefined) {
                    this.getBespeakDetail(batch_no);
                }
            }
        },
        created() {
            var batch_no = this.$route.query.batchNo;
            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }

            this.getBespeakDetail(batch_no);
        },
        methods: {
            getBespeakDetail(batch_no) {
                this.$store.dispatch({
                    type: 'bespeakDetail',
                    batch_no: batch_no
                });
            },
            selPeriod(value) {
                this.bespeakDetail.list.filter((ele) => {
                    if (ele['id'] == value) {
                        this.is_touch = true;
                        this.maxMoney = parseInt(ele.max_money_for_user);
                        this.minMoney = parseInt(ele.min_money_for_user);
                        this.placeholder_text = parseInt(ele.min_money_for_user) + '元起投，最高' + parseInt(ele.max_money_for_user) + '元'
                    }
                })
            },
            userLogin() {
                var batchNo = this.$route.query.batchNo;
                var platform = Util.getCookie('platform');

                if (batchNo != undefined) {
                    if (platform != '') {
                        jsShowLoginCallBack(platform);
                    } else {
                        var decode = '/#/bespeak/detail?batchNo=' + batchNo;
                        window.location.href = '/user/login?forward_url=' + Base64.encode(decode);
                    }
                }
            },
            tradeIn() {
                //判断app来源
                var platform = Util.getCookie('platform');
                //判断存管状态
                var userBindCardStatus = this.bespeakDetail.user.bankcard_status;  // 绑卡状态
                var isSRBankUser = this.bespeakDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                var isNeedResetPass = this.bespeakDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                var isSRBindCardStatus = this.bespeakDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态

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
                }
            },
            maxIn() {
                if (!this.bespeakDetail.hasOwnProperty('user')) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 1500
                    });
                } else {
                    var userAvailableMoney = this.bespeakDetail.user.available_total_money * 1;
                    if (!this.is_touch) {
                        this.maxMoney = this.bespeakDetail.list[0].max_money_for_user * 1;
                    }
                    if (userAvailableMoney > this.maxMoney) {
                        this.invest_money = this.maxMoney;
                    } else {
                        this.invest_money = userAvailableMoney;
                    }
                }
            },
            sendCode(type) {
                if (type == 1 && this.code_a.length >= 1) {
                    document.querySelector('input[name="code_b"]').focus();
                } else if (type == 2 && this.code_b.length >= 1) {
                    document.querySelector('input[name="code_c"]').focus();
                } else if (type == 3 && this.code_c.length >= 1) {
                    document.querySelector('input[name="code_d"]').focus();
                } else if (type == 4 && this.code_d.length >= 1) {
                    document.querySelector('input[name="code_e"]').focus();
                } else if (type == 5 && this.code_e.length >= 1) {
                    document.querySelector('input[name="code_f"]').focus();
                } else {

                }
            },
            submit() {
                var isLogin = this.bespeakDetail.user;
                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 2000
                    });
                } else {
                    // 判断是否风险评测
                    var isWhetherEvaluation = this.bespeakDetail.user.whether_evaluation;
                    //判断存管状态
                    var userBindCardStatus = this.bespeakDetail.user.bankcard_status;  // 绑卡状态
                    var isSRBankUser = this.bespeakDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                    var isNeedResetPass = this.bespeakDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                    var isSRBindCardStatus = this.bespeakDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                    var SRBankSignStatus = this.bespeakDetail.user.srbank.is_srbank_user_sign_auto_bid; // 自动投标签约
                    var SRBankSignStatusTr = this.bespeakDetail.user.srbank.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
                    // 是否手动选择期限
                    if (!this.is_touch) {
                        this.maxMoney = this.bespeakDetail.list[0].max_money_for_user * 1;
                    }
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
                                // 条件
                                if (!this.invest_money) {
                                    let instance = Toast({
                                        message: '请输入金额',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 < 100) {
                                    let instance = Toast({
                                        message: '个人最小投资金额为100元',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 > this.maxMoney) {
                                    let instance = Toast({
                                        message: '个人最大投资金额为' + this.maxMoney + '元',
                                        duration: 2000
                                    });
                                } else if (this.invest_money * 1 > this.bespeakDetail.user.available_total_money * 1) {
                                    // 余额不足去充值
                                    this.tipFn(3);
                                } else if (this.reservation_id == -1) {
                                    let instance = Toast({
                                        message: '请选择投标期限',
                                        duration: 2000
                                    });
                                } else {
                                    if (!this.is_checked) {
                                        let instance = Toast({
                                            message: '请同意协议',
                                            duration: 2000
                                        });
                                    } else {
                                        this.$store.dispatch({
                                            type: 'standardBespeak',
                                            invest_money: this.invest_money,
                                            reservation_id: this.reservation_id
                                        });
                                    }
                                }
                            }
                        }
                    }

                }
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.BespeakAgreement.$emit('agreementBatchModel', this.$refs.BespeakAgreement.$el.innerHTML);
                }
            }
        },
        components: {
            BespeakAgreement
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/yuyue.css";
</style>

