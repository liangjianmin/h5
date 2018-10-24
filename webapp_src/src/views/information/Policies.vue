<template>
    <section class="dola-information">
        <ul class="information-lists">
            <li class="infor-list infor-list01">
                <a href="http://www.gov.cn/banshi/2005-07/11/content_13695.htm">1.中华人民共和国合同法</a>
            </li>
            <li class="infor-list infor-list02">
                <a href="http://www.gov.cn/flfg/2005-06/27/content_9785.htm">2.中华人民共和国电子签名法</a>
            </li>
            <li class="infor-list infor-list03">
                <a href="http://www.gov.cn/xinwen/2016-11/07/content_5129723.htm">3.中华人民共和国网络安全法</a>
            </li>
            <li class="infor-list infor-list04">
                <a href="http://www.gov.cn/flfg/2006-10/31/content_429381.htm">4.中华人民共和国反洗钱法</a>
            </li>
            <li class="infor-list infor-list05">
                <a href="http://www.court.gov.cn/fabu-xiangqing-15146.html">5.最高人民法院关于审理民间借贷案件适用法律若干问题的规定</a>
            </li>
            <li class="infor-list infor-list06">
                <a href="http://www.cbrc.gov.cn/govView_37D312933F1A4CECBC18F9A96293F450.html">6.网络借贷信息中介机构业务活动管理暂行办法</a>
            </li>
            <li class="infor-list infor-list07">
                <a href="http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/DD36A6654C7E4D0D9D658E712BFB46C5.html">7.中国人民银行等十部委发布《关于促进互联网金融健康发展的指导意见》</a>
            </li>
            <li class="infor-list infor-list08">
                <a href="http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D81B52D3D20A49A99522C48FA8F1C752.html">8.P2P网络借贷风险专项整治工作实施方案</a>
            </li>
            <li class="infor-list infor-list09">
                <a href="http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html">9.网络借贷资金存管业务指引</a>
            </li>
            <li class="infor-list infor-list09">
                <a href="http://www.cbrc.gov.cn/govView_E7B94B41E8C340E4833472632308AEC5.html">10.网络借贷信息中介机构备案登记管理指引</a>
            </li>
            <li class="infor-list infor-list09">
                <a href="http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html">11.中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知</a>
            </li>
        </ul>
        <div style="width: 93%;margin: 0 auto;background: #fff;text-align: right">
            <img src="../../assets/images/app/promise.png">
        </div>
    </section>
</template>
<script>
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'information-policies',
        data() {
            return {
                title: '政策法规'
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