<template>
    <section class="dola-maimaiti-success">
        <div class="dola-title">
            <h2>多啦聚财</h2>
        </div>
        <div class="tip"><i></i></div>
        <div class="text">
            <p class="t1">恭喜您！关联成功 </p>
            <template v-if="flag == 1">
                <p class="t2">您以后可以在佰仟买买钱包app查看多啦聚财账户资产无需手动登录。</p>
            </template>
            <template v-if="flag == 2">
                <p class="t2">您的多啦聚财默认登录密码已通过短信发送，请尽快修改。您以后可以在佰仟买买钱包app查看多啦聚财账户资产无需手动登录。</p>
            </template>
        </div>
        <div class="btnwrap boxsiz">
            <a href="javascript:;" class="btn" @click="openWebview()">完成</a>
        </div>
    </section>
</template>
<script>
    import {Toast} from 'mint-ui'
    import Util from '../../util/index'

    export default {
        name: 'associated-success',
        data() {
            return {
                title: '多啦聚财',
                flag: ''
            }
        },
        created() {
            var flag = this.$route.query.flag;
            if (flag != undefined) {
                this.flag = flag;
            }
        },
        methods: {
            openWebview() {
                var platform = Util.isUerAgent();
                if (platform == 'ios') {
                    var json = {
                        "type": "goBackAndRefreshMineVc"
                    };
                    window.webkit.messageHandlers.AppModel.postMessage(JSON.stringify(json));
                } else if (platform == 'android') {
                    android.refreshduolaInfo();
                } else {
                    let instance = Toast({
                        message: '请在佰仟买买钱包App中打开',
                        duration: 2000
                    });
                }
            }
        }
    }
</script>
<style>
    @import "../../assets/css/wap/maimaiti.css";
</style>
