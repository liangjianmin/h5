<template>
    <section class="dola-reports" v-if="getOperationReportsT1">
        <template v-if="getOperationReportsT1.data_profile">
            <div class="head-tab lbBox">
                <a href="/#/about/reports_realtime" class="curr lineBlock">实时数据</a>
                <a href="/#/about/reports" class="lineBlock">月度报告</a>
            </div>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">数据概览</em>
                </div>
               <!-- <div class="r">
                    <span>数据截止至{{time}}</span>
                </div>-->
            </div>
            <div class="content" v-if="getOperationReportsT1.data_profile">
                <div class="re-data">
                    <div class="re-data-wrap">
                        <p class="t1">{{getOperationReportsT1.data_profile.invest_amount_money_total}}</p>
                        <p class="t2">累计成交额（元）</p>
                        <p class="t3">安全运营{{getOperationReportsT1.data_profile.open_time}}</p>
                    </div>
                </div>
            </div>
            <ul class="list" v-if="getOperationReportsT1.data_profile">
                <li>
                    <div class="bb">
                        <p class="t1">累计注册（人）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.reg_user_count_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计为投资人赚取收益（元）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.invest_interest_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">待还余额（元）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.principal_money_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计撮合借款（笔）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.loan_count_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">往期平均年化收益率（%）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.invest_interest_rate_avg_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">历史本息兑付率（%）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.historical_interest_rate}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">关联关系借款余额（元）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.associated_loan_amount}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">关联关系借款笔数（笔）</p>
                        <p class="t2">{{getOperationReportsT1.data_profile.associated_loan_count}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">历史平均单笔借款金额（元）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.loan_amount_avg_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">历史平均借款期限（天）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.loan_period_avg_total}}</p>
                    </div>
                </li>
            </ul>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">出借用户数据</em>
                </div>
            </div>
            <ul class="list" v-if="getOperationReportsT1.lend_user_data">
                <li>
                    <div class="bb">
                        <p class="t1">累计出借人数量（人）</p>
                        <p class="t2">{{getOperationReportsT1.lend_user_data.invest_user_count_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计用户投资笔数（笔）</p>
                        <p class="t2">{{getOperationReportsT1.lend_user_data.invest_count_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">人均投资金额（元）</p>
                        <p class="t2">{{getOperationReportsT1.lend_user_data.invest_amount_money_avg_total}}</p>
                    </div>
                </li>
            </ul>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">借款用户数据</em>
                </div>
            </div>
            <ul class="list" v-if="getOperationReportsT1.loan_user_data">
                <li>
                    <div class="bb">
                        <p class="t1">累计借款人数量（人）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.debtor_count_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">平均单笔借款（元）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.loan_amount_avg_total}}</p>
                    </div>

                </li>
                <li>
                    <div class="bb">
                        <p class="t1">平均借款期限（月）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.loan_period_avg_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">最大单户借款余额（元）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.debtor_loan_amount_max_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">最大十户借款余额（元）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.debtor_top10_loan_amount_max_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">最大单一借款人待还金额占比（%）</p>
                        <p class="t2">{{getOperationReportsT1.loan_user_data.principal_debtor_top1_rate_total}}</p>
                    </div>
                </li>
            </ul>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">风控数据</em>
                </div>
                <div class="r">
                    <span>数据截止至{{time}}</span>
                </div>
            </div>
            <ul class="list" v-if="getOperationReportsT1.pneumatic_control_data">
                <li>
                    <div class="bb">
                        <p class="t1">逾期金额（元）</p>
                        <p class="t2">{{getOperationReportsT1.pneumatic_control_data.overdue_money_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">逾期笔数（笔）</p>
                        <p class="t2">{{getOperationReportsT1.pneumatic_control_data.overdue_time_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">累计代偿金额（元）</p>
                        <p class="t2">{{getOperationReportsT1.pneumatic_control_data.repay_money_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计代偿笔数（笔）</p>
                        <p class="t2">{{getOperationReportsT1.pneumatic_control_data.repay_time_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">逾期90天（不含）以上金额</p>
                        <p class="t2">0.00</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">逾期90天（不含）以上笔数</p>
                        <p class="t2">0</p>
                    </div>
                </li>
            </ul>
            <div class="list" style="text-align: right">
                <img src="../../assets/images/app/promise.png">
            </div>
            <div class="footer-text">
                <p>*更多数据详情，请查阅多啦聚财官网*</p>
            </div>
        </template>
    </section>
</template>
<script>

    import {mapState} from 'vuex'
    import Util from '../../util/index'

    let today = new Date()

    export default {
        name: 'getOperationReportsT1',
        data() {
            return {
                title: '运营数据',
                year: '',
                month: '',
                date: '',
                time: ''
            }
        },
        computed: mapState({
            getOperationReportsT1: state => state.report.getOperationReportsT1,
        }),
        created() {
            this.year = `${today.getFullYear()}`;
            this.month = `${today.getMonth()}`;
            this.date = this.year + Util.p(parseInt(this.month));
            //数据截止日期
            this.time = Util.formateTime(today.setDate(today.getDate() - 1),false)+'-31';

            this.getData();
        },
        methods: {
            getData(date) {
                this.$store.dispatch({
                    type: 'getOperationReportsT1'
                })
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/report.css";
</style>
