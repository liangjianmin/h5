<template>
    <section class="bank-info">
        <div class="dola-title">
            <a href="/user/setting" class="backer"></a>
            <h2>银行信息</h2>
        </div>
        <template v-if="bankcardPage.user">
            <!--未绑定银行卡 换绑-->
            <template v-if="bankcardPage.user.bankcard_status == 'UNBIND'">
                <div class="bank-info-empty boxsiz" @click="unbindFn()">
                    <div class="bank-info-empty-wrap">
                        <i class="ico-1"></i>
                        <p class="bank-info-empty-t1">充值投资前请先添加银行卡</p>
                    </div>
                </div>
                <div class="bank-info-empty-text boxsiz">
                    <p class="t1">温馨提示</p>
                    <p class="t2">1.只能绑定您本人开户的银行卡，不支持信用卡；</p>
                    <p class="t2">2.为保障资金安全，只能绑定一张银行卡；</p>
                    <p class="t2">3.如果想更换银行卡，请在解绑旧卡之后再绑定新卡；</p>
                    <p class="t2">4.绑定银行需验证银行预留手机号，详情请咨询开户银行。</p>
                </div>
            </template>
            <!--银行卡审核中-->
            <template v-if="bankcardPage.user.bankcard_status == 'UNBINDING'">
                <div class="bank-info-has clr">
                    <div class="bank-info-card clr" :style="{'backgroundColor':bankcardPage.user.srbank.bankcard.bgcolor}">
                        <div class="top clr">
                            <div class="l fl lbBox">
                                <img :src="bankcardPage.user.srbank.bankcard.img_logo_url" class="lineBlock va-m im" :alt="bankcardPage.user.srbank.bankcard.bankName" width="30" height="30">
                                <div class="text va-m lineBlock">
                                    <p class="text-t1">{{bankcardPage.user.srbank.bankcard.bankName}}</p>
                                    <p class="text-t2">储蓄卡</p>
                                </div>
                            </div>
                            <a class="r fr" @click="saveCard()">保留该卡</a>
                        </div>
                        <div class="bottom clr">
                            <p class="fr">****  ****  ****  {{ bankcardPage.user.srbank.bankcard.bankcardNo | bank}}</p>
                        </div>
                        <div class="audit">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">解绑审核中</span>
                            <b class="lineBlock emptys"></b>
                        </div>
                    </div>
                </div>

                <div class="bank-info-has-text boxsiz clr">
                    <p class="t1">温馨提示</p>
                    <p class="t2">1. 解绑申请提交后，平台会在1-2个工作日内审核，审核期间不支持提现；</p>
                    <p class="t2">2. 解绑申请未通过审核，提现银行卡则默认为原绑定银行卡。解绑申请通过，则请在绑定新银行卡后提现；</p>
                    <p class="t2">3. 如有其它问题，请联系客服；</p>
                </div>
            </template>
            <!--已绑定银行卡-->
            <template v-if="bankcardPage.user.bankcard_status == 'BIND'">
                <div class="bank-info-has">
                    <div class="bank-info-card" :style="{'backgroundColor':bankcardPage.user.srbank.bankcard.bgcolor}">
                        <div class="top clr">
                            <div class="l fl lbBox">
                                <img :src="bankcardPage.user.srbank.bankcard.img_logo_url" class="lineBlock va-m im" :alt="bankcardPage.user.srbank.bankcard.bankName" width="30" height="30">
                                <div class="text va-m lineBlock">
                                    <p class="text-t1">{{bankcardPage.user.srbank.bankcard.bankName}}</p>
                                    <p class="text-t2">储蓄卡</p>
                                </div>
                            </div>
                            <a @click="unbundled()" class="r fr">解绑</a>
                        </div>
                        <div class="bottom clr">
                            <p class="fr">****  ****  ****  {{ bankcardPage.user.srbank.bankcard.bankcardNo | bank}}</p>
                        </div>
                        <!--解绑审核中-->
                        <div class="audit" v-if="audit">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">解绑审核中</span>
                            <b class="lineBlock emptys"></b>
                        </div>
                    </div>
                </div>
                <div class="bank-info-has-mobile  clr">
                    <p class="fl l">银行预留手机号</p>
                    <p class="fr r">
                        <span class="t1 va-m">{{bankcardPage.user.srbank.bankcard.mobile | mobile}}</span>
                    </p>
                </div>
                <div class="bank-info-has-text boxsiz clr">
                    <p class="t1">温馨提示</p>
                    <p class="t2">1. 在银行变更预留手机号后，需在平台同步修改后才能充值；</p>
                    <p class="t2">2. 为保障资金安全，只能绑定一张银行卡；</p>
                    <p class="t2">3. 如果想更换银行卡，请在解绑旧卡之后再绑定新卡；</p>
                    <p class="t2">4. 解绑银行需提供手持身份证与银行卡照片，平台会在1-2个工作日内审核，审核期间不支持提现；</p>
                    <p class="t2">5. 解绑申请未通过审核，提现银行卡则默认为原绑定银行卡。解绑申请通过，则请在绑定新银行卡后提现；</p>
                    <p class="t2">5. 如有其它问题，请联系客服。</p>
                </div>
            </template>
        </template>
        <!--解绑申请中，取消申请操作，保留原卡-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="undoUnbindBankcard">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">确定要保留原银行卡吗？ </p>
                    <p class="t2 tl">解绑申请正在审核，如果取消解绑申请，平台将会为你保留原来的银行卡，充值及提现等操作会继续使用原来的银行卡。</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import {MessageBox, Toast} from 'mint-ui'

    export default {
        name: 'bankinfo',
        data() {
            return {
                title: '银行信息',
                layer_flag: false
            }
        },
        computed: mapState({
            bankcardPage: state => state.bank.bankcardPage
        }),
        watch: {
            $route(to) {
                var path = to.path.substring(1);
                if (path == 'bank/info') {
                    this.$store.dispatch({
                        type: 'bankcardPage',
                        loading: false
                    });
                }
            }
        },
        created() {
            var path = this.$route.path.substring(1);
            if (path == 'bank/info') {
                this.getBankcardPage();
            }
        },
        methods: {
            getBankcardPage() {
                this.$store.dispatch({
                    type: 'bankcardPage',
                    loading: true
                });
            },
            unbindFn() {
                //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                this.$store.dispatch({
                    type: 'rebindBankcardPage',
                    redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/info?'
                });
            },
            unbundled() {
                if (this.bankcardPage.user.is_withdrawing) {
                    let instance = Toast({
                        message: '您有提现记录，不能申请解绑',
                        duration: 2000
                    });
                } else {
                    this.$router.push({path: '/bank/unbundled'});
                }
            },
            saveCard() {
                MessageBox({
                    title: '',
                    message: this.$refs.undoUnbindBankcard.outerHTML,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonClass: 'bank-btn-confirm',
                    cancelButtonClass: 'bank-btn-cancel',
                    confirmButtonText: '等待解绑审核',
                    cancelButtonText: '保留原银行卡',
                }).then(action => {
                    if (action == 'cancel') {
                        this.$store.dispatch({
                            type: 'undoUnbindBankcard'
                        });
                    }
                });
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .bank-info {
        background: #F5F5F5;
    }
</style>
