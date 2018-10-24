<template>
    <section class="dola-information">
        <div class="infomation-banner infomation-banner-im1"></div>
        <ul class="information-lists">
            <li class="infor-list infor-list01">
                <a href="/#/information/organization">机构信息</a>
            </li>
            <li class="infor-list infor-list02">
                <a href="/#/about/report">运营报告</a>
            </li>
            <li class="infor-list infor-list02">
                <a href="/#/information/riskmanage">风险管理</a>
            </li>
            <!-- <li class="infor-list infor-list03">
                 <a href="/#/information/audit">审计信息</a>
             </li>-->
            <li class="infor-list infor-list04">
                <a href="/#/information/record">备案信息</a>
            </li>
            <li class="infor-list infor-list05">
                <a href="/#/information/charges">收费标准</a>
            </li>
            <li class="infor-list infor-list06">
                <a href="/#/information/majorissues">重大事项</a>
            </li>
            <li class="infor-list infor-list07">
                <a href="/#/information/policies">政策法规</a>
            </li>
            <li class="infor-list infor-list08">
                <a href="/#/information/promise">承诺函</a>
            </li>
        </ul>
    </section>
</template>
<script>

    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'information-index',
        data() {
            return {
                title: '信息安全'
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