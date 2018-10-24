<template>
    <section class="dola-information">
        <div class="infomation-banner infomation-banner-im2"></div>
        <ul class="information-lists">
            <li class="infor-list infor-list01">
                <a href="/#/safe/bank">银行存管</a>
            </li>
            <li class="infor-list infor-list02">
                <a href="/#/safe/assetquality">资产优质</a>
            </li>
            <li class="infor-list infor-list03">
                <a href="/#/safe/security">保障体系</a>
            </li>
            <li class="infor-list infor-list04">
                <a href="/#/safe/securitysystem">风控系统</a>
            </li>
            <li class="infor-list infor-list05">
                <a href="/#/safe/insurance">众安保险</a>
            </li>
            <li class="infor-list infor-list06">
                <a href="/#/safe/signature">电子签章</a>
            </li>
            <li class="infor-list infor-list07">
                <a href="/#/safe/riskmanage">信息安全</a>
            </li>
        </ul>
    </section>
</template>
<script>

    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'safe-index',
        data() {
            return {
                title: '安全保障'
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