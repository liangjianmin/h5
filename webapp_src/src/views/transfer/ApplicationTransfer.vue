<template>
    <section class="application-transfer" v-if="applicationTransferInfo.user">
        <TitleBar :title="title" v-if="!isApp" class="application-title"></TitleBar>
        <div class="detail-wrapper" :class="{isApp:isApp}">
            <div class="detail-container">
                <div class="top clr">
                    <div class="left">
                        <h5 class="tit">往期年化收益率</h5>
                        <p class="text"><b>{{applicationTransferInfo.interest_rate}}</b>%</p>
                    </div>
                    <div class="right">
                        <h5 class="tit">期限</h5>
                        <p class="text"><b>{{applicationTransferInfo.loan_period}}</b>个月</p>
                    </div>
                </div>
                <div class="bottom clr">
                    <div class="l">
                        <h5 class="tit">下一回款日</h5>
                        <p class="text">{{ applicationTransferInfo.payment_date }}</p>
                    </div>
                    <div class="c">
                        <h5 class="tit">回款方式</h5>
                        <p class="text">{{ applicationTransferInfo.repay_type }}</p>
                    </div>
                    <div class="r">
                        <h5 class="tit">到期时间</h5>
                        <p class="text">{{ applicationTransferInfo.end_time }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <form class="application-form">
                <ul class="application-lists">
                    <li class="list list01">
                        <span class="tit">转让本金</span>
                        <span class="txt">{{applicationTransferInfo.principal}}元</span>
                    </li>
                    <li class="list list05 clr">
                        <span class="tit">转让手续费<i class="icon" @click="tip"></i></span>
                        <span class="txt" style="float: right;">{{ applicationTransferInfo.transfer_fee }}元</span>
                    </li>
                    <li class="list list02">
                        <span class="tit">转让原因</span>
                        <select name="reson" v-model="reason">
                            <option value="1">急用资金</option>
                            <option value="2">信用卡还款</option>
                            <option value="3">其他原因</option>
                        </select>
                    </li>
                    <!--  <li class="list list03">
                          <span class="tit">出让金额</span>
                          <input type="number" :placeholder="money_ok" v-model="transferMoney"/>
                      </li>
                      <p style="font-size: 10px;margin: 0 0.533rem 0.266rem;color: #ccc;">按剩余本金设置的折扣价，需单笔全额转让</p>-->
                    <li class="list list04">
                        <span class="tit">身份证号末四位</span>
                        <input type="password" placeholder="请输入身份证号末四位" v-model="safePass" class="safe-pwd"/>
                    </li>
                </ul>
                <div class="agree-yx">
                    <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                    <div class="lineBlock agree-yx-text">
                        <span>同意</span>
                        <a href="javascript:;" @click="agreement(1)">《投资与咨询服务协议》</a>
                    </div>
                </div>
                <a class="transfer-btn" @click.prevent="transferPro">确认转让</a>
                <div class="balance-status" v-if="applicationTransferInfo.user.balance_auto_status * 1">您当前【余额自动复投】为开启状态，开启状态下平台会按您设置的条件将账户余额自动投资。<a href="/#/user/balance">点击进入关闭>></a></div>
            </form>
        </div>
        <InvestmentAgreement :agreement-type="agreementtype" ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import {Indicator, Toast, MessageBox} from 'mint-ui'
    import {services as Services} from '../../api/index'
    import Util from '../../util/index'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'

    export default {
        name: 'applicationTransfer',
        data() {
            return {
                title: '申请转让',
                reason: '1',
                transferMoney: '',
                safePass: '',
                isApp: false,
                is_checked: true,
                agreement_flag: false,
                agreementtype: 'standard'
            }
        },
        computed: {
            ...mapState({
                applicationTransferInfo: state => state.transfer.applicationTransferInfo
            }),
            money_ok() {
                return this.applicationTransferInfo.money_min + '-' + this.applicationTransferInfo.money_max + '之间的金额'
            }
        },
        methods: {
            getApplicationTransferInfo(investment_id) {
                this.$store.dispatch({
                    type: 'applicationTransferInfo',
                    investment_id: investment_id
                });
            },
            transferPro() {
                //判断存管状态
                var userBindCardStatus = this.applicationTransferInfo.user.bankcard_status;  // 绑卡状态
                var isSRBankUser = this.applicationTransferInfo.user.srbank.is_srbank_user;  // 是否是存管用户
                var isNeedResetPass = this.applicationTransferInfo.user.srbank.need_reset_pwd_first; // 老用户重置密码
                var isSRBindCardStatus = this.applicationTransferInfo.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                var SRBankSignStatus = this.applicationTransferInfo.user.srbank.is_srbank_user_sign_transfer; // 是否转让签约
                var transferMoney = this.transferMoney;

                if (!SRBankSignStatus) {
                    // 未签约状态
                    this.tipFn(2);
                    return false;
                } else {
                    //条件
                    /*                if (!transferMoney) {
                                        let instance = Toast({
                                            message: '请输入转让金额',
                                            duration: 1500
                                        });
                                    } else {
                                        if (transferMoney < this.applicationTransferInfo.money_min) {
                                            let instance = Toast({
                                                message: '出让金额低于最小可转让金额',
                                                duration: 1500
                                            });
                                        } else if (transferMoney > this.applicationTransferInfo.money_max) {
                                            let instance = Toast({
                                                message: '出让金额高于最大可转让金额',
                                                duration: 1500
                                            });
                                        } else {

                                        }
                                    }*/
                    if (!this.safePass) {
                        let instance = Toast({
                            message: '请输入安全密码',
                            duration: 1500
                        });
                    } else {
                        // 验证通过
                        let paramsData = {
                            investment_id: this.$route.query.id,
                            money: this.applicationTransferInfo.principal,
                            reason: this.reason,
                            identification: this.safePass
                        };
                        let Codekey = Util.getRrandomStr();
                        let token = Util.getCookie('token');
                        let parames = Util.getParams('wechat', token, paramsData);
                        parames = Util.encryption(Codekey, parames, 'code');
                        Services.investmentTransfer(Codekey, parames).then((res) => {
                            var key = res.headers['x-dola-edoc'];
                            var data = res.data;
                            var str = Util.decrypt(key, data, 'code');
                            var data = JSON.parse(str);
                            console.log(data);
                            if (data.code === 0) {
                                // 转让成功 -> 债权转让列表页
                                let instance = Toast({
                                    message: '转让成功！'
                                });
                                setTimeout(() => {
                                    instance.close();
                                    this.$router.push({
                                        path: '/user/transferlist'
                                    });
                                }, 2000);
                            } else {
                                let instance = Toast({
                                    message: data.msg,
                                    duration: 2000
                                });
                            }
                        }).catch(function (err) {
                            let instance = Toast({
                                message: '网络不通，请重试',
                                duration: 2000
                            });
                        });
            /*            if (Util.getCookie('transferClick')) {

                        } else {
                            MessageBox.alert('根据政策合规要求，持有债权不得折价转让，平台已根据合规要求下线了‘债权折价转让’功能，请您按照转让本金进行债权转让，感谢您的支持和使用').then(action => {
                                Util.setCookie('transferClick', true);
                                Services.investmentTransfer(Codekey, parames).then((res) => {
                                    var key = res.headers['x-dola-edoc'];
                                    var data = res.data;
                                    var str = Util.decrypt(key, data, 'code');
                                    var data = JSON.parse(str);
                                    console.log(data);
                                    if (data.code === 0) {
                                        // 转让成功 -> 债权转让列表页
                                        let instance = Toast({
                                            message: '转让成功！'
                                        });
                                        setTimeout(() => {
                                            instance.close();
                                            this.$router.push({
                                                path: '/user/transferlist'
                                            });
                                        }, 2000);
                                    } else {
                                        let instance = Toast({
                                            message: data.msg,
                                            duration: 2000
                                        });
                                    }
                                }).catch(function (err) {
                                    let instance = Toast({
                                        message: '网络不通，请重试',
                                        duration: 2000
                                    });
                                });
                            });
                        }*/
                    }
                }
            },
            tip() {
                MessageBox.alert(
                    '转让手续费=转让本金*0.2%*未持有的月份；未持有月份=项目实际月份-已持有月份（不满一个月，该月份不计算入内）。'
                );
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
                            if (platform === 'ios') {
                                jsShowRechargeCallBack(platform);
                            } else if (platform === 'android') {
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
                }
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.InvestmentAgreement.$emit('agreementInvestModel',
                        this.$refs.InvestmentAgreement.$el.innerHTML);
                } else if (type == 2) {
                    window.location.href = '/about/regular/' + this.regulardetail
                        .plan.id;
                } else if (type == 3) {
                    this.$refs.RiskAgreement.$emit('agreementRiskModel', this.$refs
                        .RiskAgreement.$el.innerHTML);
                }
            }
        },
        created() {
            const investment_id = this.$route.query.id;

            if (investment_id) {
                this.getApplicationTransferInfo(investment_id);
            }

            var platform = Util.getCookie('platform');

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }

        },
        components: {
            TitleBar,
            InvestmentAgreement
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/wap/standard_powder.css";

    .safe-pwd {
        width: 4.06rem !important;
    }

    @media only screen and (max-width: 370px) {
        .safe-pwd {
            width: 3.2rem !important;
        }
    }

    .balance-status {
        margin: 0.3rem 0.533rem 0.266rem;
        line-height: 20px;
        font-size: 12px;
        color: #444;
        a {
            color: #f60;
        }
    }
</style>