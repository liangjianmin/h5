<template>
    <section class="dola-download_app">
        <div class="dola-download-wrapper">
            <div class="in-banner">
                <div class="in-banner-img">
                    <mt-swipe :auto="0" class="my-swipe clear down-ul" :speed="300">
                        <mt-swipe-item class="slide-item">
                            <div class="list01 clr down-li">
                                <div class="left">
                                    <img src="../../assets/images/app/download/screen_01.png"/>
                                </div>
                                <div class="right">
                                    <p class="desc">随时随地&nbsp;&nbsp;畅享收益</p>
                                    <p class="text">在路上？在开会？在旅游？</p>
                                    <p class="text">想看就看&nbsp;&nbsp;想投就投</p>
                                </div>
                            </div>
                        </mt-swipe-item>
                        <mt-swipe-item class="slide-item">
                            <div class="list02 clr down-li">
                                <div class="left">
                                    <img src="../../assets/images/app/download/screen_02.png"/>
                                </div>
                                <div class="right">
                                    <p class="desc">账户资产一目了然</p>
                                    <p class="text">资金流水&nbsp;条条清楚</p>
                                    <p class="text">投资记录&nbsp;历历在目</p>
                                </div>
                            </div>
                        </mt-swipe-item>
                        <mt-swipe-item class="slide-item">
                            <div class="list03 clr down-li">
                                <div class="left">
                                    <img src="../../assets/images/app/download/screen_03.png"/>
                                </div>
                                <div class="right">
                                    <p class="desc">便捷高效&nbsp;&nbsp;安全可靠</p>
                                    <p class="text">同卡进出&nbsp;充值方便&nbsp;提现快速</p>
                                    <p class="text">手势密码&nbsp;指纹解锁&nbsp;交易密码</p>
                                </div>
                            </div>
                        </mt-swipe-item>
                        <mt-swipe-item class="slide-item">
                            <div class="list04 clr down-li">
                                <div class="left">
                                    <img src="../../assets/images/app/download/screen_04.png"/>
                                </div>
                                <div class="right">
                                    <p class="desc">多重防护让您安心</p>
                                    <p class="text">项目本息有保障 </p>
                                    <p class="text">数据加密安全传输</p>
                                </div>
                            </div>
                        </mt-swipe-item>
                        <a class="down-logo"></a>
                    </mt-swipe>
                </div>
            </div>
            <div class="download-btn-wrapper">
                <img src="../../assets/images/app/download/image_logo.png" alt="多啦聚财"/>
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jyph.dolabank">点击下载</a>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue';
    import {Swipe, SwipeItem} from 'mint-ui';
    import Util from '../../util/index'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);


    export default {
        name: 'download',
        created() {
            var params = this.$route.query.from;
            if (params != undefined) {
                this.jumpToApp(params);
            }
        },
        methods: {
            jumpToApp(params) {
                if (params == 'sms') {
                    var platform = Util.isUerAgent();
                    if (platform == 'ios') {
                        window.location.href = 'wb4270780532://';
                    } else if (platform == 'android') {
                        //暂时没有提供跳转链接
                    } else {
                        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jyph.dolabank';
                    }
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/app_download.css";
</style>
