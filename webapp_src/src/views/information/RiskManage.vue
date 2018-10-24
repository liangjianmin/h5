<template>
    <section class="dola-information-page dola-info-risk">
        <div class="infomation-page-banner"></div>
        <div class="info-risk-content-wrapper">
            <div class="info-risk-cont info-risk-cont01">
                <div class="img">
                    <img src="../../assets/images/app/information/info_risk01.png"/>
                </div>
                <h3 class="info-risk-tit">风险管理架构</h3>
                <p class="info-risk-text">1. 完善的风险管理组织架构：明确风险管理中的职责分工，建立部门之间相互协调有效制衡的运行机制管理。</p>
                <p class="info-risk-text">2. 健全的内部控制体系：包括战略风险管理、财务风险管理、运营风险管理、法律风险管理。</p>
                <p class="info-risk-text">3. 全方位业务控制体系：包括用户准入审核、信用风险管理、流动性管理、贷后风险管理。</p>
                <p class="info-risk-text">4. 强大的信息系统建设：包括识别、计量、评估、监测和报告重要风险，风险限额管理，多维度压力测试。</p>
            </div>
            <div class="info-risk-cont info-risk-cont02">
                <div class="img">
                    <img src="../../assets/images/app/information/info_risk02.png"/>
                </div>
                <h3 class="info-risk-tit">风险控制流程</h3>
                <p class="info-risk-text">申请评分卡：根据客户申请时提供的信息进行评分的过程，通过评分高低预测申请客户的资质，判定客户好坏，并给予初始额度或调整额度对策建议。该评分卡属于事前风险控制，主要用于消费金融贷款申请审批和额度管理。</p>
                <p class="info-risk-text">行为评分卡：基于客户历史交易（信用）行为进行评分，预测客户逾期率和流失状况、对公司带来的收益和损失状况。该评分卡主要用于事中风险预警和风险定价。</p>
                <p class="info-risk-text">欺诈评分卡：基于客户的基本信息和过往行为记录，预测客户欺诈的可能性，识别具有欺诈风险的客户。该评分卡主要用于欺诈行为识别和核查。</p>
                <p class="info-risk-text">综合测评：通过各种渠道和技术汇集第三方数据，集合自身业务数据，建立包含客户基本信息、消费行为征信状况和黑名单等信息的数据库，充分利用内外部大数据，实施客户风险识别、主题风险分析、风险监测预警、资产组合管理和风控决策支持。目前我司应用的第三方数据包括不限于身份真实性验证类、征信记录类、反欺诈验证类（黑名单）和运营商数据等。</p>
                <div class="img02">
                    <img src="../../assets/images/app/information/info_risk03.png"/>
                </div>
            </div>
            <div class="info-risk-cont info-risk-cont03">
                <div class="img">
                    <img src="../../assets/images/app/information/info_risk04.png"/>
                </div>
                <h3 class="info-risk-tit">贷后催收策略</h3>
                <p class="info-risk-text">根据客群分类：案件主要分为欺诈风险类、特殊案件类、常规类，针对不同案件类型采取不同 的催收方式。</p>
                <p class="info-risk-text">根据风险等级分类：主要针对常规类案件，将不同逾期阶段的案件分为五级，包括特低风险类低风险类、中风险类、高风险类和特高风险类。</p>
                <p class="info-risk-text">根据逾期阶段分类：按照逾期天数的不同划分为不同逾期阶段的案件，对不同逾期阶段的案件配置不同的催收人力采取不同的催收措施和频率开展催收。逾期阶段包括M0（正常类）、M1（逾期1-30天）、M2（逾期31-60天）、M3（逾期61-90天）、M4+（逾期90天以上）等。</p>
            </div>
            <div class="info-risk-cont info-risk-cont04">
                <div class="img">
                    <img src="../../assets/images/app/information/info_risk05.png"/>
                </div>
                <h3 class="info-risk-tit">催收方式</h3>
                <p class="info-risk-text">1. 预提醒客户：通过电话、短信、APP站内信等方式温馨提示客户及时处理款项。</p>
                <p class="info-risk-text">2. 逾期客户：主要通过自动外呼，人工介入提醒敦促客户及时处理款项。</p>
                <p class="info-risk-text">3. 特殊客户：对于确属特殊情况客户、进入特殊处理流程，制定差异化还款策略。</p>
            </div>
            <div class="wrap-pics" style="text-align:right;background: #fff;">
                <img src="../../assets/images/app/promise.png">
            </div>
        </div>
    </section>
</template>
<script>

    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'information-risk-manage',
        data() {
            return {
                title:"风险管理"
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