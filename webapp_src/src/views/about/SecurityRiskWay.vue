<template>
    <section class="dola-about-security_risk_way">
        <AboutNav :type="2"></AboutNav>
        <div class="dola-about-security_risk_way-content">
            <div class="top-banner">保障方式</div>
            <div class="content content0">
                <div class="title-wrapper">
                    <h5 class="title">账户安全险&nbsp;全程保护</h5>
                </div>
                <p class="text">多啦聚财与众安在线财产保险股份有限公司达成合作，通过众安保险为平台的投资用户购买“非金融机构网络支付服务责任保险”（简称“账户安全险”），在多啦聚财投资的用户，其账户资金在操作过程中将得到全程保护，用户无需支付任何费用即可享受该项服务。</p>
            </div>
            <div class="content content1">
                <div class="title-wrapper">
                    <h5 class="title">资金透明&nbsp;去向可追踪</h5>
                </div>
                <p class="text">消费金融是指面向各阶层消费者提供消费贷款的现代金融服务。在真实消费场景下（购买3C、 家电、教育培训、医疗美容等产品／服务），消费者由于自身财务安排需要向特定机构或个人借款，先提前享用产品／服务，然后按月分期还本付息给资金出借人，从而形成特定的债权债务关系。类似的金融产品有淘宝花呗与京东白条。</p>
            </div>
          <!--  <div class="content content2">
                <div class="title-wrapper">
                    <h5 class="title">风险保障&nbsp;机构偿还</h5>
                </div>
                <p class="text">若遇项目逾期，则由风险承担方佰仟金融及其他合作机构偿付投资用户应得本息。</p>
                <img src="../../assets/images/app/dola_guarantee_4.png" alt="" class="guarantee-img01"/>
                <div class="lvs-cont" id="way">
                    <img src="../../assets/images/app/dola_guarantee_6.png" alt="" class="guarantee-img02"/>
                    <dl>
                        <dt>法律保障&nbsp;合规经营</dt>
                        <dd>聘请雅尔德曾陈胡（前海）联营律师事务所为常年法律顾问保障平台合规经营，确保投资人权益。</dd>
                        <dd>律所简介：雅尔德曾陈胡（前海）联营律师事务所，由广东雅尔德律师事务所与香港曾陈胡律师行共同联营设立，是落户前海自贸区的第五家粤港联营律师事务所。广东雅尔德律师事务所首创“深港澳台两岸四地一站式法律服务平台”和“跨行业中介联盟”服务模式，并于2013年9月正式加入了欧洲国际法律联盟，是欧洲国际法律联盟在中国华南地区唯一认证的律师事务所，以公司化、专业化、平台化的运营模式彰显服务特色。</dd>
                    </dl>
                </div>
            </div>-->
            <div class="content content3" style="background:#fff">
                <div class="title-wrapper">
                    <h5 class="title">电子签章&nbsp;合同可查</h5>
                </div>
                <p class="text">引进第三方平台法大大采用电子签章技术对平台合同进行自动签名，保证合同法律有效性，防止合同被篡改。签名后的合同托管于法大大，确保合同的安全保密性，投资人可自行前往法大大官网进行查验。法大大是国内领先的第三方电子合同平台，目前主要为金融、保险、第三方支付、旅游等企业及个人用户提供电子合同、电子文件签署及存证服务，同时整合提供司法鉴定、网络仲裁和律师服务。法大大目前已通过ISO27001安全认证并获得众安保险承保，产品和服务已被阿里巴巴、微软（中国）、携程、同程旅游、众安保险、美团网等众多知名平台所采用。</p>
            </div>
            <div class="content content4" style="background: #fafafa">
                <div class="title-wrapper">
                    <h5 class="title">资金同卡进出</h5>
                </div>
                <div class="cont">
                    <p class="text">用户资金充值与提现，只能同一张银行卡，且银行卡必须与注册实名一致，若要更换银行卡，则必须本人手持身份证合照，平台审核通过才可更换，确保用户资金安全。</p>
                </div>
            </div>
            <div class="content content5">
                <div class="title-wrapper">
                    <h5 class="title">技术保障&nbsp;信息安全</h5>
                </div>
                <p class="text">引入权威的VeriSign SSL数据传输加密技术技术以及阿里云Web应用防火墙、DDOS高防IP、态势感知等技术，全方位多终端的对平台数据及用户信息进行保护，网站安全级别同天猫、淘宝等大型电商、信息交流网站。自平台运营至今，未发生过一起用户信息与资金泄露等问题。</p>
            </div>
        </div>
    </section>
</template>
<script>
    import AboutNav from '../about/AboutNav.vue'
    import {jsAppPropertyFn} from '../../util/appCallback'

    export default {
        name: 'security_risk_way',
        data() {
            return {}
        },
        created() {
            window.jsAppProperty = function () {
                return jsAppPropertyFn('保障方式');
            }
        },
        components: {
            AboutNav
        }
    }
</script>

