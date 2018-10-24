<template>
    <section class="dola-about-risk">
        <div class="dola-about-risk-cen boxsiz">
            <p class="t1">天盾大数据风控系统</p>
            <i class="ico1"></i>
            <i class="ico2"></i>
            <p class="t2">多啦聚财自主研发的智能风控系统——天盾系统，采用高新科学技术，结合心理学、组织行为学、社会学、马斯洛需要层次理论等专业学科知识，全方位多层次高纬度地挖掘用户信息，涉及借款用户消费行为、社交网络、信用情况、心理活动、历史数据、地域分布、年龄阶段、学历层次及收入高低等方面。力求最大限度挖掘用户深层信息，拦截借款用户欺诈、篡改等诈骗行为，确保借款用户信息真实可信，保障投资人的资金安全。</p>
            <ul class="dola-about-risk-cen-list boxsiz">
                <li>
                    <span class="dola-about-risk-t1">信用黑名单</span>
                    <p class="dola-about-risk-txt-a">
                        全行业共享黑名单，强力狙击信用不良用户，防止其在多家平台重复借款
                    </p>
                </li>
                <li>
                    <span class="dola-about-risk-t1">反欺诈拦截</span>
                    <p class="dola-about-risk-txt-b">
                        1、电话回访，信息再确认<br/>
                        2、人工抽查确认用户信息准确无误<br/>
                        3、设置系统用户信息异常提醒、拦截功能<br/>
                    </p>
                </li>
                <li>
                    <span class="dola-about-risk-t1">智能数据分析</span>
                    <p class="dola-about-risk-txt-e">
                        1、借款行为分析 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、社交网络分析<br/>
                        3、消费行为分析 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、用户属性分析
                    </p>
                </li>
                <li>
                    <span class="dola-about-risk-t1">信用评核系统</span>
                    <p class="dola-about-risk-txt-b">
                        1、电话回访，信息再确认<br/>
                        2、人工抽查确认用户信息准确无误<br/>
                        3、设置系统用户信息异常提醒、拦截功能
                    </p>
                </li>
                <li>
                    <span class="dola-about-risk-t1">OCR人脸识别技术</span>
                    <p class="dola-about-risk-txt-d">
                        身份证信息、图像智能核验，识别用户真实性，防止作假伪造或挪用他人证件等欺诈行为
                    </p>
                </li>
                <li>
                    <span class="dola-about-risk-t1">智能数据采集</span>
                    <p class="dola-about-risk-txt-c">
                        1、覆盖全国23个省份亿万人口<br/>
                        2、用户全行业历史借款数据，以便追踪<br/>
                        3、用户属性、需求、行为实时采集录入系统
                    </p>
                </li>
            </ul>
            <p class="t3">
                多啦聚财运用天盾系统对资产端合作机构推送过来的每一笔借款进行第二轮智能分析与判别。通过资产合作机构与平台智能风控系统，打造出的双重风控体系，将信用不良用户、心存诈骗用户拦截在外，筛选出优质客户，在为投资者创造收益额同时，保障投资人的资金安全。
            </p>
            <p class="t4">
                多啦聚财践行国家普惠金融理念，严格按照合规要求，紧跟时代步伐，将科学技术应用到金融领域，创造出一套智能风控系统，以全面、多维、深层、精准为特点，打造一个安全、透明、合规、便捷的理财平台，源源不断地提供优质资产，为投资人创造收益，实现多方互惠共赢。
            </p>
        </div>
    </section>
</template>
<script>
    import AboutNav from '../about/AboutNav.vue'
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'security_risk_system',
        data() {
            return {
                title: "风控系统"
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