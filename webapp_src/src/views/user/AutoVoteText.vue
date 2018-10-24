<template>
    <section class="dola-autovote">
        <div class="dola-autovote-content">
            <p class="t1">什么是自动续投？</p>
            <i class="ico-1"></i>
            <p class="t2">自动续投是一个帮助您自动打理投资资产的工具，为了避免您资金赎回到账后忘记及时购买，造成资产闲置，系统会根据您的设置到期自动为您投资新的产品，及时获取更多收益。</p>
        </div>
        <div class="dola-autovote-content">
            <p class="t1">自动续投有多牛！</p>
            <i class="ico-1"></i>
            <div class="txt clr">
                <div class="fl b">
                    <div class="wrap">
                        <i class="ico-1"></i>
                        <p class="txt-t1">防止资金站岗</p>
                        <p class="txt-t2">到期赎回自动续投</p>
                    </div>
                </div>
                <div class="fr b">
                    <div class="wrap">
                        <i class="ico-2"></i>
                        <p class="txt-t1">延长优惠券有效期</p>
                        <p class="txt-t2">优惠券高效使用不浪费</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dola-autovote-content">
            <p class="t1">续投是本息全额续投吗？</p>
            <i class="ico-2"></i>
            <ul class="txts">
                <li class="lbBox">
                    <div class="lineBlock ico">
                        <i class="ico-3"></i>
                    </div>
                    <div class="lineBlock va-m t">
                        <p class="txts-t1">续投是本息全额续投吗？</p>
                        <p class="txts-t2">按到期回款的本金和利息100元取整，不足100的部分回款至账户</p>
                    </div>
                </li>
                <li class="lbBox boxsiz">
                    <div class="lineBlock ico">
                        <i class="ico-3"></i>
                    </div>
                    <div class="lineBlock va-m t">
                        <p class="txts-t1">续投可以取消和修改吗？</p>
                        <p class="txts-t2">设置续投后，到期前5天内不能修改和取消续投</p>
                    </div>
                </li>
                <li class="lbBox">
                    <div class="lineBlock ico">
                        <i class="ico-3"></i>
                    </div>
                    <div class="lineBlock va-m t">
                        <p class="txts-t1">取消续投，优惠券还会延长期限吗？</p>
                        <p class="txts-t2">开启续投可以延长您设置的优惠券的有效期，若您取消续投，优惠券会根据实际有效期自动失效。</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    import {Toast} from 'mint-ui'
    import TitleBar from '../common/TitleBar.vue'
    import {services as Services} from '../../api/index'
    import Util from '../../util/index'

    export default {
        name: 'auto-vote-text'
    }
</script>
<style scoped>
    @import "../../assets/css/wap/autovote.css";
</style>