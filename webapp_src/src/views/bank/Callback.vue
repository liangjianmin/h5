<template>
    <section class="bank-status">
        <div class="bank-status-text">
            <i class="ico-1 lineBlock va-m"></i>
            <template v-if="type =='ResetPasswordSucces' ">
                <p class="lineBlock va-m t1">恭喜您，修改交易密码成功！</p>
            </template>
            <template v-else-if="type == 'ModifyMobileSuccess'">
                <p class="lineBlock va-m t1">恭喜您，手机号码修改成功！</p>
            </template>
            <template v-else-if="type == 'UpdateMobileSuccess'">
                <p class="lineBlock va-m t1">恭喜您，修改预留手机号成功！</p>
            </template>
            <template v-else-if="type == 'ChangeBindSuccess'">
                <p class="lineBlock va-m t1">恭喜您，绑定银行卡成功！</p>
            </template>
        </div>
        <div class="btn-box">
            <template v-if="type =='ResetPasswordSucces' ">
                <a class="btn-t2" @click="openWebview(2)">我的账户</a>
            </template>
            <template v-else-if="type == 'ModifyMobileSuccess'">
                <a class="btn-t2" @click="openWebview(2)">返回安全中心</a>
            </template>
            <template v-else-if="type == 'UpdateMobileSuccess'">
                <a class="btn-t1 mt" @click="openWebview(1)">返回</a>
                <a class="btn-t2" @click="openWebview(2)">我的账户</a>
            </template>
            <template v-if="type =='ChangeBindSuccess' ">
                <a class="btn-t1 mt" @click="openWebview(1)">返回</a>
                <a class="btn-t2" @click="openWebview(2)">我的账户</a>
            </template>
        </div>
    </section>
</template>
<script>
    import Util from '../../util/index'
    import {jsCloseCallBack, jsShowMineCallBack, jsCallNotification} from '../../util/appCallback'

    export default {
        name: 'updateMobileSuccess',
        data() {
            return {
                type: ''
            }
        },
        created() {
            var type = this.$route.query.type;
            if (type != undefined) {
                this.typeCallback(type);
            }
        },
        methods: {
            typeCallback(type) {
                if (type == 'ResetPasswordSucces') {
                    document.title = '修改交易密码成功'
                    this.type = 'ResetPasswordSucces';
                } else if (type == 'UpdateMobileSuccess') {
                    document.title = '修改预留手机号成功'
                    this.type = 'UpdateMobileSuccess';
                } else if (type == 'ChangeBindSuccess') {
                    document.title = '绑定银行卡成功'
                    this.type = 'ChangeBindSuccess';
                }
            },
            openWebview(type) {
                var platform = Util.isUerAgent();
                if (type == 1) {
                    if (platform == 'ios') {
                        jsCallNotification(platform);
                        jsCloseCallBack(platform);
                    } else if (platform == 'android') {
                        jsCloseCallBack(platform);
                    }
                } else if (type == 2) {
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

    .bank-status {
        overflow: hidden;
    }
</style>
