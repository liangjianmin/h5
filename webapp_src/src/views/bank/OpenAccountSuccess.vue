<template>
    <section class="bank-status boxsiz">
        <div class="bank-status-text">
            <i class="ico-1"></i>
            <template v-if="from == 'rebind'">
                <p class="t1">恭喜您，绑卡成功！</p>
            </template>
            <template v-else>
                <p class="t1">恭喜您，银行存管开户成功！</p>
            </template>
        </div>
        <template v-if="from == 'rebind'">
            <template v-if="app">
                <div class="btn-box">
                    <a class="btn-t1 mt" @click="openWebview(1)">去投资</a>
                    <a class="btn-t2" @click="openWebview(2)">查看账户</a>
                </div>
            </template>
            <template v-else>
                <div class="btn-box">
                    <router-link to="/regular" class="btn-t1 mt">去投资</router-link>
                    <router-link to="/user/detail" class="btn-t2">查看账户</router-link>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-if="app">
                <div class="btn-box">
                    <a class="btn-t1 mt" @click="handleAuthorize()">开启投资授权</a>
                    <a class="btn-t2" @click="openWebview(2)">暂不开启，进入我的账户</a>
                </div>
            </template>
            <template v-else>
                <div class="btn-box">
                    <a class="btn-t1 mt" @click="handleAuthorize()">开启投资授权</a>
                    <router-link to="/user/detail" class="btn-t2">暂不开启，进入我的账户</router-link>
                </div>
            </template>
            <p class="agreement">开启授权即表示同意<a href="/about/invest_sign">《投资授权协议》</a></p>
        </template>
    </section>
</template>
<script>

    import Util from '../../util/index'
    import {jsCloseCallBack, jsShowMineCallBack, jsCallNotification, jsShowProductListCallBack} from '../../util/appCallback'

    export default {
        name: 'OpenAccountSuccess',
        data() {
            return {
                app: false,
                from: ''
            }
        },
        created() {
            var app = Util.getCookie('platform');
            var from = this.$route.query.from;

            if (app != '') {
                this.app = true;
            } else {
                this.app = false;
            }

            if (from) {
                this.from = from;
            }
        },
        methods: {
            openWebview(type) {
                var platform = Util.isUerAgent();
                if (type == 1) {
                    if (platform == 'ios') {
                        jsShowProductListCallBack(platform);
                    } else if (platform == 'android') {
                        jsShowProductListCallBack(platform);
                    }
                } else if (type == 2) {
                    if (platform == 'ios') {
                        jsCallNotification(platform);
                        jsShowMineCallBack(platform);
                    } else if (platform == 'android') {
                        jsShowMineCallBack(platform);
                    }
                }
            },
            handleAuthorize() {
                this.$store.dispatch({
                    type: 'srbankSignPage',
                    sign_type: 'sign_auto_bid',
                    redirectUrl: window.location.origin + '/#/bank/signing?',
                });
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
