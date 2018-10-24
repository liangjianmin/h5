<template>
    <section class="dl-plan-detail">
        <dl v-if="investmentDetail">
            <dt>
                <div class="clr">
                    <span class="fl l">投资本金</span>
                    <span class="fr r">{{investmentDetail.principal}}元</span>
                </div>
            </dt>
            <dd>
                <div class="clr">
                    <span class="fl l">每月回款日</span>
                    <span class="fr r">{{investmentDetail.due_date}}</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">待回本息</span>
                    <span class="fr r">{{investmentDetail.wait_payment}}元</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">已回本息</span>
                    <span class="fr r">{{investmentDetail.payment}}元</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">往期参考收益</span>
                    <span class="fr r">{{investmentDetail.total_interest}}元</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">加入时间</span>
                    <span class="fr r">{{investmentDetail.invest_time}}</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">起息日期</span>
                    <span class="fr r">{{investmentDetail.raise_time}}</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">到期时间</span>
                    <span class="fr r">{{investmentDetail.end_time}}</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">往期年化收益率</span>
                    <span class="fr r">{{investmentDetail.interest_rate}}%</span>
                </div>
            </dd>
            <dd v-if="isNovice > 0">
                <div class="clr">
                    <span class="fl l">平台奖励年化</span>
                    <span class="fr r">1.00%</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">实际支付</span>
                    <span class="fr r">{{investmentDetail.amount}}元</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">剩余天数</span>
                    <span class="fr r">{{investmentDetail.left_date}}天</span>
                </div>
            </dd>
            <dd>
                <div class="clr">
                    <span class="fl l">保障方式</span>
                    <span class="fr r">双重风控审核</span>
                </div>
            </dd>
            <router-link class="mark" :to="'/standard/detail/'+investmentDetail.loan_id" tag="dd">
                <div class="clr">
                    <span class="fl l">项目详情</span>
                    <i class="fr ico"></i>
                </div>
            </router-link>
            <dd @click="toUrl(investmentDetail.contract_url)">
                <div class="clr">
                    <span class="fl l">投资协议</span>
                    <i class="fr ico"></i>
                </div>
            </dd>
        </dl>
    </section>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'planDetail',
        computed: {
            ...mapState({
                investmentDetail: state => state.regular.investmentDetail
            }),
            isNovice() {
                return this.$route.query.is_novice;
            }
        },
        data() {
            return {}
        },
        watch: {
            $route(to) {
                var investment_id = to.query.id;
                if (investment_id) {
                    this.getInvestmentDetail(investment_id);
                }
            }
        },
        created() {
            var investment_id = this.$route.query.id;
            if (investment_id) {
                this.getInvestmentDetail(investment_id);
            }
        },
        methods: {
            getInvestmentDetail(investment_id) {
                this.$store.dispatch({
                    type: 'investmentDetail',
                    investment_id: investment_id
                });
            },
            toUrl(url) {
                if (url) {
                    window.location.href = url;
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/plan_detail.css";
</style>

