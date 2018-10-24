<template>
    <section class="bank-status boxsiz">
        <template v-if="status == 'fail'">
            <div class="bank-status-text">
                <i class="ico-2"></i>
                <p class="t1">签约失败！</p>
            </div>
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
            <div class="bank-status-text">
                <i class="ico-1"></i>
                <p class="t1">恭喜您，签约成功！</p>
            </div>
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
                status: ''
            }
        },
        created() {
            var status = this.$route.query.status;
            var app = Util.getCookie('platform');

            if (app != '') {
                this.app = true;
            } else {
                this.app = false;
            }

            if (status == 'fail') {
                this.status = status;
            }
        },
        methods: {
            openWebview(type) {
                var platform = Util.getCookie('platform');
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
