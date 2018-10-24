<template>
    <section class="dola-information-page dola-info-charge">
        <div class="info-charge-table">
            <table cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    <td>业务类别</td>
                    <td>资费标准</td>
                </tr>
                <tr>
                    <td>注册</td>
                    <td>免手续费</td>
                </tr>
                <tr>
                    <td>充值</td>
                    <td>免手续费</td>
                </tr>
                <tr>
                    <td>投资</td>
                    <td>免手续费</td>
                </tr>
                <tr>
                    <td>债权转让</td>
                    <td style="text-align: left;">转出本金 x 0.2% x 未持有的月份<br/>注：未持有月份=项目实际月份-已<br/>持有月份（不足30天，该月份不计算入内）</td>
                </tr>
                <tr>
                    <td>提现</td>
                    <td style="text-align: left;">提现金额的0.2%（第三方支付平台收取）注：如果账户有“单笔投资金额超过500元”的记录，则每月可免费提现三次（不可累积）</td>
                </tr>
                <tr>
                    <td>利息管理</td>
                    <td>免手续费</td>
                </tr>
                <tr>
                    <td>账户管理</td>
                    <td>免手续费</td>
                </tr>
                <tr>
                    <td>投资管理费</td>
                    <td>投资收益10%（2018.05.01~2018.12.31期间投资可享受投资管理费五折优惠）</td>
                </tr>
                </tbody>
            </table>
            <div style="width: 93%;margin: 0 auto;background: #fff;text-align: right">
                <img src="../../assets/images/app/promise.png">
            </div>
        </div>
    </section>

</template>
<script>

    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'information-charges',
        data() {
            return {
                title: '收费标准'
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";

    .dola-info-charge {
        width: 100%;
        height: auto;
        background: url("../../assets/images/app/information/inf-bf.png") no-repeat center bottom;
        background-size: contain;
    }
</style>