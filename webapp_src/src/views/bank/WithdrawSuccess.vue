<template>
    <section class="bank-withdraw-success">
        <i class="icn-1"></i>
        <p class="t1">提现申请成功！</p>
        <p class="t2" style="width: 90%;margin: 10px auto 0;line-height: 21px">具体到账时间视各银行处理时间而定，请留意银行卡余额变动。如提现未到账，请及时咨询客服处理。  </p>
        <template v-if="isApp">
            <a @click="openWebview(1)" class="back">返回账户</a>
        </template>
        <template v-else>
            <router-link to="/user/detail" class="back">返回账户</router-link>
        </template>
    </section>
</template>
<script>

    import Util from '../../util/index'
    import {jsShowRechargeCallBack} from '../../util/appCallback'
    import {jsShowMineCallBack} from '../../util/appCallback'
    import {jsCallNotification} from '../../util/appCallback'

    export default {
        name: 'withdrawSuccess',
        data() {
            return {
                isApp: false
            }
        },
        created() {
            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            openWebview(type) {
                var platform = Util.isUerAgent();
                if (type == 1) {
                    if (platform == 'ios') {
                        jsCallNotification(platform);
                        jsShowMineCallBack(platform);
                    } else if (platform == 'android') {
                        jsShowMineCallBack(platform);
                    }
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";
</style>
