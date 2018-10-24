<template>
    <section class="bank-guide">
        <i class="ico-1"></i>
        <p class="t1">恭喜您，注册成功！</p>
        <p class="t2">开始投资前，您需要开通银行存管账户</p>
        <div class="btn">
            <a @click="open()" class="btn-t1">立即开通 {{num}}S</a>
            <router-link to="/user/detail" class="btn-t2">暂不开通</router-link>
        </div>
        <a href="javascript:;" class="down">
            <i class="ico-2 va-m lineBlock"></i>
            <span class="lineBlock down-t1 va-m">下载APP </span>
            <span class="lineBlock down-t2 va-m">投资更便捷</span>
            <b class="lineBlock emptys"></b>
        </a>
        <div class="text">
            <p class="text-t1">温馨提示</p>
            <p class="text-t2">根据《网络借贷信息中介机构业务活动管理暂行办法》及《网络借贷资金存管业务指引》等相关法规要求，所有网络借贷信息中介机构均需委托一家商业银行提供资金存管服务，履行网络借贷资金存管专用账户的开立与销户、资金保管、资金清算、账务核对、提供信息报告等职责的业务。</p>
        </div>
    </section>
</template>
<script>

    export default {
        name: 'registerSuccess',
        data() {
            return {
                num: 5
            }
        },
        mounted() {
            this.countdown();
        },
        methods: {
            open() {
                this.$store.dispatch({
                    type: 'personalRegister',
                    redirectUrl: window.location.origin+'/#/bank/waiting?callback='+window.location.origin + '/#/bank/open_account_success?'
                });
            },
            countdown() {
                var fn;
                fn = setInterval(() => {
                    this.num--;
                    if (this.num <= 0) {
                        clearInterval(fn);
                        this.$store.dispatch({
                            type: 'personalRegister',
                            redirectUrl: window.location.origin+'/#/bank/waiting?callback='+window.location.origin + '/#/bank/open_account_success?'
                        });
                    }
                }, 1000)
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";
</style>
