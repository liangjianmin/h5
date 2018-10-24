<template>
    <section class="dola-pwd-manage">
        <div class="dola-title">
            <a href="/user/setting" class="backer"></a>
            <h2>{{title}}</h2>
        </div>
        <dl class="dola-pwd-manage-list" v-if="userSetting.user">
            <dt>
                <a class="clr">
                    <span class="fl l">我的授权签约</span>
                </a>
            </dt>
            <template v-if="userSetting.user.srbank.is_srbank_user_sign_auto_bid">
                <dd>
                    <a class="clr">
                        <span class="fl l">自动投标签约</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">已签约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
            </template>
            <template v-else>
                <dd @click="handleAuthorize(1)">
                    <a class="clr">
                        <span class="fl l">自动投标签约</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">立即签约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i></i>
                        </div>
                    </a>
                </dd>
            </template>
            <template v-if="userSetting.user.srbank.is_srbank_user_sign_credit_transfer">
                <dd>
                    <a class="clr">
                        <span class="fl l">自动购买转让标签约</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">已签约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
            </template>
            <template v-else>
                <dd @click="handleAuthorize(2)">
                    <a class="clr">
                        <span class="fl l">自动购买转让标签约</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">立即签约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i></i>
                        </div>
                    </a>
                </dd>
            </template>
            <template v-if="userSetting.user.srbank.is_srbank_user_sign_transfer">
                <dd class="bornone">
                    <a class="clr">
                        <span class="fl l">债权转让手续费签约</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">已签约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
            </template>
            <template v-else>
                <dd @click="handleAuthorize(3)" class="bornone">
                    <a class="clr">
                        <span class="fl l">债权转让手续费签约</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">立即签约&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i></i>
                        </div>
                    </a>
                </dd>
            </template>
            <dt>
                <a class="clr">
                    <span class="fl l">平台协议</span>
                </a>
            </dt>
            <dd>
                <a class="clr" href="/about/invest_sign">
                    <span class="fl l">《投资授权协议》</span>
                    <template v-if="userSetting.user.is_sign_invest_agreement">
                        <div class="fr r">
                            <span class="text lineBlock va-m">已签署&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i></i>
                        </div>
                    </template>
                   <template v-else>
                       <div class="fr r">
                           <span class="text lineBlock va-m">&nbsp;&nbsp;&nbsp;</span>
                           <i></i>
                       </div>
                   </template>
                </a>
                <a class="clr" @click="agreement(1)">
                    <span class="fl l">《多啦聚财咨询服务协议》</span>
                    <div class="fr r">
                        <span class="text lineBlock va-m">&nbsp;&nbsp;&nbsp;</span>
                        <i></i>
                    </div>
                </a>
                <a class="clr" @click="agreement(2)">
                    <span class="fl l">《多啦聚财注册服务协议》</span>
                    <div class="fr r">
                        <span class="text lineBlock va-m">&nbsp;&nbsp;&nbsp;</span>
                        <i></i>
                    </div>
                </a>
                <a class="clr" @click="agreement(3)">
                    <span class="fl l">《风险提示书》</span>
                    <div class="fr r">
                        <span class="text lineBlock va-m">&nbsp;&nbsp;&nbsp;</span>
                        <i></i>
                    </div>
                </a>
            </dd>
        </dl>
        <InvestmentAgreement :agreement-type="agreementtype" ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
        <RiskAgreement ref="RiskAgreement" v-show="agreement_flag"></RiskAgreement>
        <RegisterAgreement ref="RegisterAgreement" v-show="agreement_flag"></RegisterAgreement>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'
    import RiskAgreement from '../agreement/RiskAgreement.vue'
    import RegisterAgreement from '../agreement/RegisterAgreement.vue'

    export default {
        name: 'agreementinfo',
        data() {
            return {
                title: '授权签约',
                agreement_flag: false
            }
        },
        computed: mapState({
            userSetting: state => state.user.userSetting
        }),
        created() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                this.$store.dispatch({
                    type: 'userSetting'
                });
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.InvestmentAgreement.$emit('agreementInvestModel', this.$refs.InvestmentAgreement.$el.innerHTML)
                } else if (type == 2) {
                    this.$refs.RegisterAgreement.$emit('agreementRegisterModel', this.$refs.RegisterAgreement.$el.innerHTML)
                } else if (type == 3) {
                    this.$refs.RiskAgreement.$emit('agreementRiskModel', this.$refs.RiskAgreement.$el.innerHTML)
                }
            },
            handleAuthorize(type) {
                if (type == 1) {
                    var sign_type = 'sign_auto_bid';
                } else if (type == 2) {
                    var sign_type = 'sign_credit_transfer';
                } else if (type == 3) {
                    var sign_type = 'sign_transfer';
                }
                this.$store.dispatch({
                    type: 'srbankSignPage',
                    sign_type: sign_type,
                    redirectUrl: window.location.origin + '/#/bank/sign_page_success?'
                });
            }
        },
        components: {
            InvestmentAgreement,
            RiskAgreement,
            RegisterAgreement
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/user.css";

    .dola-title {
        position: relative;
    }
</style>