<template>
    <section class="bank-operate-directions boxsiz">
        <div class="text boxsiz">
            <p class="text-t1">1、单笔充值金额不能低于100元，最高不可超过银行限额 <a @click="tipFn()">查看银行限额</a>；</p>
            <p class="text-t1">2、充值操作需在银行页面进行，请在跳转后的页面完成；</p>
            <p class="text-t1">3、用户充值免费且充值次数不限，充值手续费已由多啦承担；</p>
            <p class="text-t1">4、使用转账充值时，由于银行通道处理通知需要有一定的时间，因此一般2小时左右充值到账，请耐心等待；</p>
            <p class="text-t1">5、充值操作完成后可进入“我的账户“刷新“可用余额”查看是否到账；</p>
            <p class="text-t1">6、快捷充值单笔/单日限额为0表示渠道正在维护不支持充值，可选择转账充值或前往PC选择网银支付。</p>
        </div>
        <BankIist ref="banklist" v-show="flag"></BankIist>
    </section>
</template>
<script>
    import BankIist from '../bank/BankIist.vue'
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'RechargeDescription',
        data() {
            return {
                flag: false,
                title: '充值说明'
            }
        },
        methods: {
            tipFn() {
                this.$refs.banklist.$emit('bankIistModel', this.$refs.banklist.$el.innerHTML);
            }
        },
        components: {
            BankIist,
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
