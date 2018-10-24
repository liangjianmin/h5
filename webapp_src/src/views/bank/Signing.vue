<template>
    <section class="bank-signing boxsiz" v-if="userDetail.user">
        <div class="bank-signing-list boxsiz">
            <ul class="boxsiz">
                <li class="first curr">
                    <i class="ico"></i>
                    <p class="t1">银行存管开户</p>
                </li>
                <template v-if="type == 'transfer'">
                    <li class="curr">
                        <i class="ico"></i>
                        <p class="t1">自动投标签约</p>
                    </li>
                    <li class="curr">
                        <i class="ico"></i>
                        <p class="t2">自动购买债权签约</p>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <i class="ico"></i>
                        <p class="t1">自动投标签约</p>
                    </li>
                    <li>
                        <i>3</i>
                        <p class="t2">自动购买债权签约</p>
                    </li>
                </template>
                <template v-if="userDetail.user.whether_evaluation == 1">
                    <li class="curr last">
                        <i class="ico"></i>
                        <p class="t2">风险测评</p>
                    </li>
                </template>
                <template v-else>
                    <li class="last">
                        <i>4</i>
                        <p class="t2">风险测评</p>
                    </li>
                </template>
            </ul>
            <div class="bank-signing-btn">
                <a href="javascript:;" class="btn">立即签约（{{num}}S）</a>
                <a href="/#/user/detail" class="btn-end">暂不签约</a>
            </div>
        </div>
        <div class="text">
            <p class="t1">温馨提示：</p>
            <p class="t2">
                首次投资前，您需要进行<a href="/about/invest_sign"> 《投资授权协议》</a>中的自动投标签约、自动购买债权签约，以及进行风险测评。
            </p>
        </div>
    </section>
</template>
<script>

    import Util from '../../util/index'
    import {jsCloseCallBack, jsShowMineCallBack, jsCallNotification, jsShowProductListCallBack} from '../../util/appCallback'
    import {mapState} from 'vuex'

    export default {
        name: 'Signing',
        data() {
            return {
                isApp: false,
                num: 15
            }
        },
        computed: {
            ...mapState({
                userDetail: state => state.user.userDetail
            }),
            type() {
                return this.$route.query.type;
            }
        },
        created() {

            var isApp = Util.getCookie('platform');

            if (isApp != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
            this.getUserData();
        },
        mounted() {
            this.countdown();
        },
        methods: {
            getUserData() {
                this.$store.dispatch({
                    type: 'userDetail'
                });
            },
            countdown() {
                var fn;
                fn = setInterval(() => {
                    this.num--;
                    if (this.num <= 0) {
                        clearInterval(fn);
                        this.handleAuthorize(this.type);
                    }
                }, 1000)
            },
            handleAuthorize(type) {
                if (type == 'transfer') {
                    //自动投标签约、自动购买债权签约完成后，上方置灰图标点亮，进度条更新进度。完成风险测评后跳回到“我的”。
                    if (!this.userDetail.user.whether_evaluation) {
                        window.location.href = '/app/v1220/ucenter/risk_evaluation';
                    }
                } else {
                    if (!this.userDetail.user.whether_evaluation) {
                        this.$store.dispatch({
                            type: 'srbankSignPage',
                            sign_type: 'sign_credit_transfer',
                            redirectUrl: window.location.origin + '/#/bank/signing?type=transfer',
                        });
                    } else {
                        //若签约前用户已进行“风险测评”，则进入此页面时，风险测评图标为点亮，在“自动购买债权”完成后进入“我的账户”
                        this.$store.dispatch({
                            type: 'srbankSignPage',
                            sign_type: 'sign_credit_transfer',
                            redirectUrl: window.location.origin + '/#/user/detail?',
                        });
                    }
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

</style>
