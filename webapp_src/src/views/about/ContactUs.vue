<template>
    <section class="dola-about-contact">
        <div class="bannner"></div>
        <div class="section color-a">
            <div class="title-wrapper">
                <h5 class="title">客户服务</h5>
            </div>
            <div class="wrap">
                <p class="t1">咨询热线：400-9300-986（工作日：9:00 - 18:00）</p>
                <p class="t1">客服邮箱：kefu@dolabank.com </p>
                <p class="t1">投诉/举报：400-9300-986</p>
                <a href="https://www.dolabank.com/more/online_service" class="kefu"><i></i><span class="va-m">在线客服</span><b class="lineBlock emptys"></b></a>
            </div>
        </div>
        <div class="section color-b">
            <div class="title-wrapper">
                <h5 class="title">官方渠道</h5>
            </div>
            <div class="wrap">
                <p class="t1">平台网址：www.dolabank</p>
                <p class="t1">微信公众号：dolabank</p>
                <p class="t1">微博号：@多啦聚财 </p>
                <p class="t1">移动APP：多啦聚财</p>
            </div>
        </div>
        <div class="section color-a">
            <div class="title-wrapper">
                <h5 class="title">媒体合作</h5>
            </div>
            <div class="wrap">
                <p class="t1">合作邮箱：guihua.xu@dolabank.com</p>
            </div>
        </div>
        <div class="section color-b">
            <div class="title-wrapper">
                <h5 class="title">商务合作</h5>
            </div>
            <div class="wrap">
                <p class="t1">合作邮箱：dan.chen@dolabank.com</p>
                <img src="../../assets/images/app/information/map.png" alt="" class="im">
            </div>
        </div>
    </section>
</template>
<script>
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'contactus',
        data() {
            return {
                title:'联系我们'
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";
</style>
