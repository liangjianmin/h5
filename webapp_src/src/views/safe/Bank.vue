<template>
    <section class="dola-about-bank">
        <div class="dola-about-bank-banner boxsiz"></div>
        <div class="dola-about-bank-cen boxsiz">
            <p class="tit lineBlock">
                <span>为什么要银行存管</span>
                <i></i>
            </p>
            <p class="text">
                2018年4月28日多啦聚财正式上线资金存管系统。<br/>
                依据2016年8月24日由银监会、工信部、公安部、网信办联合公布的《网络借贷信息中介机构业务活动管理暂行办法》要求，需要互联网金融平台与银行业金融机构对接，对平台资金进行银行存管，具体做法是互联网金融平台在银行业金融机构开设独立账户，用于存放用户的交易资金，银行业金融机构根据用户的指令、合同内容，对用户的交易与资金流水进行划拨和簿记，以保障用户的资金安全。<br/><br/>
            </p>
        </div>
        <div class="dola-about-bank-cen dola-about-bank-cen-bg boxsiz">
            <p class="tit lineBlock">
                <span>银行存管的优势</span>
                <i></i>
            </p>
            <ul class="dola-about-bank-cen-advan clr boxsiz">
                <li class="boxsiz">
                    <p class="t1">资金有效隔离</p>
                    <p class="t2">用户在存管银行有专门的独立存管子账户，平台无法触碰用户资金。</p>
                    <i class="ico1"></i>
                </li>
                <li class="boxsiz">
                    <p class="t1">用户授权操作</p>
                    <p class="t2">存管银行只有在收到用户授权操作指令时，才进行资金划拨、转账等操作。</p>
                    <i class="ico2"></i>
                </li>
                <li class="boxsiz">
                    <p class="t1">保障信息安全</p>
                    <p class="t2">用户需要单独设立存管银行交易密码，用户的账户信息由存管银行管理并记录。</p>
                    <i class="ico3"></i>
                </li>
            </ul>
        </div>
        <!--<div class="dola-about-bank-cen  boxsiz">
            <p class="tit lineBlock">
                <span>为什么选择上饶银行</span>
                <i></i>
            </p>
            <p class="text">
                上饶银行，于 2007年6月，经中国银行业监督管理委员会批准，在原上饶市城市信用社的基础上改制组建成城市商业银行；2009年9月正式更名为“上饶银行股份有限公司”。<br/><br/>
                上饶银行自组建以来，坚持以效益、质量、规模协调发展为战略指导思想；坚持以服务地方经济、服务中小企业、服务市民为市场定位；坚持以实现股东、客户、员工、社会价值最大化为目标，在机构发展、管理优化、服务提升、文化建设等方面均取得了显著的成效。
            </p>
            <ul class="dola-about-bank-cen-shanghai boxsiz clr">
                <li class="boxsiz">
                    <p class="t1 lineBlock va-m" style="margin-right: 0.2rem">资本雄厚<br/>品牌影响力大</p>
                    <b class="lineBlock va-m emptys"></b>
                    <i class="ico1"></i>
                </li>
                <li class="boxsiz">
                    <p class="t1 lineBlock va-m">直连存管<br/>模式</p>
                    <b class="lineBlock va-m emptys"></b>
                    <i class="ico2"></i>
                </li>
                <li class="boxsiz">
                    <p class="t1 lineBlock va-m">历史悠久<br/>安全可靠</p>
                    <b class="lineBlock va-m emptys"></b>
                    <i class="ico3"></i>
                </li>
                <li class="boxsiz">
                    <p class="t1 lineBlock va-m">存管系统<br/>技术成熟</p>
                    <b class="lineBlock va-m emptys"></b>
                    <i class="ico5"></i>
                </li>
            </ul>
        </div>-->
        <div class="dola-about-bank-cen dola-about-bank-cen-bg  boxsiz">
            <p class="tit lineBlock">
                <span>借贷流程</span>
                <i></i>
            </p>
            <div class="in-banners">
                <img src="../../assets/images/app/dola_guarantee_45.png" alt="多啦聚财运作模式"/>
            </div>
        </div>
        <div class="dola-about-bank-cen-s">
            <h3 class="new-person-title">如何开通银行存管账户</h3>
            <ul class="register-lists">
                <li class="list list1"><span>第一步</span> <span>:&nbsp;登录多啦聚财账户，根据提示点击立即开通</span></li>
                <li class="list list2"><span>第二步</span> <span>:&nbsp;在银行页面填写开户信息，完成开户</span></li>
                <li class="list list3"><span>第三步</span> <span>:&nbsp;成功开通银行存管账户，点击开启投资授权</span></li>
                <li class="list list4"><span>第四步</span> <span>:&nbsp;在银行页面校验交易密码，确认开启投资授权</span></li>
                <li class="list list4"><span>第五步</span> <span>:&nbsp;成功开启授权，点击立即投资去选择投资项目</span></li>
            </ul>
        </div>
    </section>
</template>
<script>

    import Vue from 'vue'
    import {Swipe, SwipeItem} from 'mint-ui';
    import TitleBar from '../common/TitleBar.vue'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'safe-bank',
        data() {
            return {
                title:'银行存管'
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/wap/information.css";

    .dola-about-bank .dola-about-bank-banner {
        background: url("../../assets/images/app/information/bank-bg.png") no-repeat;
        background-size: cover;
    }
    .dola-about-bank-cen.dola-about-bank-cen-bg .in-banners {
        height: auto;
    }
    .dola-about-bank-cen.dola-about-bank-cen-bg .in-banners img {
        height: auto;
        display: block;
        width: 100%;
        margin: .533rem auto 0;
    }
</style>