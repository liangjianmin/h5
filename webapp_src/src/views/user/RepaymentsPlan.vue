<template>
    <section class="dola-repayments-plan" :class="{isApp:isApp}" v-if="investmentSchedule.list">
        <div class="dola-title" v-if="!isApp">
            <a href="/#/user/investmentdetails" class="backer"></a>
            <h2>回款计划</h2>
        </div>
        <table>
            <tbody>
            <tr>
                <th>期次</th>
                <th>还款日期</th>
                <th>还款本金</th>
                <th>还款利息	</th>
                <th>还款状态</th>
                <th>投资管理费(优惠前)</th>
            </tr>
            <tr v-for="(item,index) in investmentSchedule.list" :key="index">
                <td>{{item.sequence}}</td>
                <td>{{item.payment_date_format}}</td>
                <td>{{item.principal}}</td>
                <td>{{item.interest}}</td>
                <td>{{item.payment_status_format}}</td>
                <td>{{item.fee}}</td>
            </tr>
            </tbody>
        </table>
        <p class="sm">注：投资管理费按投资收益的10%收取(2018.05.01~2018.12.31期间投资可享受投资管理费五折优惠)</p>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Util from '../../util/index'

    export default {
        name: 'repaymentsplan',
        computed: mapState({
            investmentSchedule: state => state.user.investmentSchedule,
        }),
        data() {
            return {
                isApp:false
            }
        },
        watch: {
            $route(to) {
                var id = to.query.id;
                if (id != undefined) {
                    this.getInvestmentSchedule(id);
                }
            }
        },
        created(){
            var id = this.$route.query.id;
            if(id != undefined){
                this.getInvestmentSchedule(id);
            }
            var platform = Util.getCookie('platform');

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            getInvestmentSchedule(id){
                this.$store.dispatch({
                    type: 'investmentSchedule',
                    investment_id:id
                });
            }
        },
        components: {}
    }
</script>
<style scoped>
    @import "../../assets/css/wap/repayments.css";
    .isApp{
        padding-top: 0;
    }
    .sm {
        padding: 0 10px;
        font-size: 12px;
        margin-top: 20px;
    }
</style>
