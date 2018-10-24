<template>
    <section class="bank-operate-directions boxsiz">
        <div class="text boxsiz">
            <p class="text-t2">1、提现到账时间可参考下表，具体以各个银行实际到账时间为准；</p>
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
            <p class="text-t2">2、单笔提现金额不能低于100元，提现申请提交后不可撤销；</p>
            <p class="text-t2">3、提现手续费为提现金额的0.2%，如果账户有投资金额≥500元的投资记录，则每月可获得一次免费提现机会；</p>
            <p class="text-t2">4、提现操作需在存管银行进行，请在跳转后的页面完成；</p>
            <p class="text-t2">5、工作日17:00-24:00、周末及节假日均不支持单笔大额（>5万）提现，如需大额提现，可采用分为多笔≤5万元的方式逐步进行提现；</p>
        </div>
    </section>
</template>
<script>
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'withdrawDescription',
        data() {
            return {
                title: "提现说明"
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .bank-operate-directions {
        background: #f5f5f5;
        padding: 30px 0 0 0;
    }
</style>
