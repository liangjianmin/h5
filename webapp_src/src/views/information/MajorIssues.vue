<template>
    <section class="dola-information-page dola-info-matter">
        <div class="info-matter-table">
            <table cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    <td>公司减资、合并、分立、解散或申请破产</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>公司依法进入破产程序</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>公司被责令停业、整顿、关闭</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>公司主要或者全部业务陷入停顿</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td style="text-align: left;">公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td style="text-align: left;">公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td style="text-align: left;">存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项</td>
                    <td>无</td>
                </tr>
                </tbody>
            </table>
            <div style="width: 93%;margin: 0 auto;background: #fff;text-align: right">
                <img src="../../assets/images/app/promise.png">
            </div>
        </div>
    </section>
</template>
<script>

    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'information-major-issues',
        data() {
            return {
                title:'重大事件'
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";
    .dola-info-matter{
        width: 100%;
        height: auto;
        background: url("../../assets/images/app/information/inf-bf.png") no-repeat center bottom;
        background-size: contain;
    }
</style>