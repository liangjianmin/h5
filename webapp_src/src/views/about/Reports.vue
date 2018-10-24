<template>
    <section class="dola-reports" v-if="operationReportsNew">
        <template v-if="operationReportsNew.data_profile">
            <div class="head-tab lbBox">
                <a href="/#/about/reports_realtime" class="lineBlock">实时数据</a>
                <a href="/#/about/reports" class="lineBlock curr">月度报告</a>
            </div>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">数据概览</em>
                </div>
                <div class="r">
                    <select class="lineBlock va-m boxsiz" v-model="year">
                        <option value="2018">2018年</option>
                    </select>
                    <select class="lineBlock va-m boxsiz" v-model="month" v-on:change.prevent="selectGroupMonth(month)">
                        <option value="8" selected="selected">8月</option>
                        <option value="7">7月</option>
                        <option value="6">6月</option>
                        <option value="5">5月</option>
                        <option value="4">4月</option>
                    </select>
                </div>
            </div>
            <div class="content" v-if="operationReportsNew.data_profile">
                <div class="re-data">
                    <div class="re-data-wrap">
                        <p class="t1">{{operationReportsNew.data_profile.invest_amount_money_total}}</p>
                        <p class="t2">累计成交额（元）</p>
                        <p class="t3">安全运营{{operationReportsNew.data_profile.open_time}}</p>
                    </div>
                </div>
            </div>
            <ul class="list" v-if="operationReportsNew.data_profile">
                <li>
                    <div class="bb">
                        <p class="t1">累计注册（人）</p>
                        <p class="t2">{{operationReportsNew.data_profile.reg_user_count_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计为投资人赚取收益（元）</p>
                        <p class="t2">{{operationReportsNew.data_profile.invest_interest_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">
                            <span class="va-m">待还余额（元）</span>
                            <i class="icn va-m" @click="tip" v-if="month == 4"></i>
                        </p>
                        <p class="t2">{{operationReportsNew.data_profile.principal_money_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计撮合借款（笔）</p>
                        <p class="t2">{{operationReportsNew.data_profile.loan_count_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">往期平均年化收益率（%）</p>
                        <p class="t2">{{operationReportsNew.data_profile.invest_interest_rate_avg_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">历史本息兑付率（%）</p>
                        <p class="t2">{{operationReportsNew.data_profile.historical_interest_rate}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">关联关系借款余额（元）</p>
                        <p class="t2">{{operationReportsNew.data_profile.associated_loan_amount}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">关联关系借款笔数（笔）</p>
                        <p class="t2">{{operationReportsNew.data_profile.associated_loan_count}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">历史平均单笔借款金额（元）</p>
                        <p class="t2">{{operationReportsNew.data_profile.loan_amount_avg_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">历史平均借款期限（月）</p>
                        <p class="t2">{{operationReportsNew.data_profile.loan_period_avg_total}}</p>
                    </div>
                </li>
            </ul>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">出借用户数据</em>
                </div>
            </div>
            <ul class="list" v-if="operationReportsNew.lend_user_data">
                <li>
                    <div class="bb">
                        <p class="t1">累计出借人数量（人）</p>
                        <p class="t2">{{operationReportsNew.lend_user_data.invest_user_count_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">当期出借人数量（人）</p>
                        <p class="t2">{{operationReportsNew.lend_user_data.invest_user_count_mon_inc}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">累计用户投资笔数（笔）</p>
                        <p class="t2">{{operationReportsNew.lend_user_data.invest_count_mon_inc}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">人均投资金额（元）</p>
                        <p class="t2">{{operationReportsNew.lend_user_data.invest_amount_money_avg_mon_inc}}</p>
                    </div>
                </li>
            </ul>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">借款用户数据</em>
                </div>
            </div>
            <ul class="list" v-if="operationReportsNew.loan_user_data">
                <li>
                    <div class="bb">
                        <p class="t1">累计借款人数量（人）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.debtor_count_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">当期借款人数量（人）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.debtor_count_mon_inc}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">平均单笔借款（元）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.loan_amount_avg_mon_inc}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">平均借款期限（月）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.loan_period_avg_mon_inc}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">最大单户借款余额（元）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.debtor_loan_amount_max_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">最大十户借款余额（元）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.debtor_top10_loan_amount_max_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">前十大借款人待还金额占比（%）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.principal_debtor_top10_rate_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">最大单一借款人待还金额占比（%）</p>
                        <p class="t2">{{operationReportsNew.loan_user_data.principal_debtor_top1_rate_total}}</p>
                    </div>
                </li>
            </ul>
            <div class="head">
                <div class="l">
                    <span class="lineBlock va-m"></span>
                    <em class="lineBlock va-m">风控数据</em>
                </div>
            </div>
            <ul class="list" v-if="operationReportsNew.pneumatic_control_data">
                <li>
                    <div class="bb">
                        <p class="t1">逾期金额（元）</p>
                        <p class="t2">{{operationReportsNew.pneumatic_control_data.overdue_money_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">逾期笔数（笔）</p>
                        <p class="t2">{{operationReportsNew.pneumatic_control_data.overdue_time_total}}</p>
                    </div>
                </li>
                <li>
                    <div class="bb">
                        <p class="t1">累计代偿金额（元）</p>
                        <p class="t2">{{operationReportsNew.pneumatic_control_data.repay_money_total}}</p>
                    </div>
                    <div class="bb bor">
                        <p class="t1">累计代偿笔数（笔）</p>
                        <p class="t2">{{operationReportsNew.pneumatic_control_data.repay_time_total}}</p>
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
            <div class="list" style="text-align: right;">
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
    import {MessageBox} from 'mint-ui'

    let today = new Date()

    export default {
        name: 'operationReportsNew',
        data() {
            return {
                title: '运营数据',
                year: '',
                month: '',
                date: ''
            }
        },
        computed: mapState({
            operationReportsNew: state => state.report.operationReportsNew,
        }),
        created() {
            this.year = `${today.getFullYear()}`;
            this.month = `${today.getMonth()}`;
            this.date = this.year + Util.p(parseInt(this.month));

            this.getData(this.date);
        },
        methods: {
            getData(date) {
                this.$store.dispatch({
                    type: 'getOperationReportsNew',
                    date: date
                })
            },
            tip() {
                MessageBox.alert('按照平台合规工作安排将于2018年4月28日上线银行存管系统，平台已于4月底前对原有债权做全部提前结清，故4月底待还余额为“0”').then(() => {

                });
            },
            selectGroupMonth(value) {
                var date = this.year + Util.p(parseInt(value));
                this.getData(date);
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/report.css";
</style>
