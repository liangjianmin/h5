<template>
    <section class="dola-introduction">
        <div class="dola-introduction-wrapper">
            <div class="banner"></div>
            <div class="introduction-container introduction-container01">
                <h3 class="introduction-title">产品介绍</h3>
                <p class="text">随心投是多啦聚财为用户提供的智能化自动投标工具。经由用户授权后，通过系统自动投资以达到分散投资、节省投资时间、提高投资效率的目的。用户投资所获得的利息收益可选择收益复投（到期一次性领取本金和收益）或收益返还（收益分期返还，到期领取本金），收益复投的参考收益可能会略高于收益返还，具体以加入时页面展示的参考收益为准。参考收益不等于实际收益，出借人需自行承担资金出借的风险与责任。</p>
                <!--<p class="text">您出借所获得的利息收益可选择收益复投（到期一次性领取本金和收益）或收益返还（收益不定时返还，到期领取本金），不同的收益处理方式对应的预期收益率不同，具体以您在加入时页面展示的相应预期收益率为准。预期收益不等于实际收益，出借人需自行承担资金出借的风险与责任。</p>-->
            </div>
            <div class="introduction-container introduction-container02">
                <h3 class="introduction-title">产品周期</h3>
                <div class="content">
                    <p class="text">加入当天开始计息</p>
                    <div class="line"></div>
                    <div class="cont">
                        <div class="left">锁定期不可退出</div>
                        <div class="right">可退出提现</div>
                    </div>
                    <div class="desc clearfix">
                        <p class="desc-text desc-left">开始</p>
                        <p class="desc-text desc-right">结束</p>
                    </div>
                    <p class="tips">温馨提示：提前退出或到期自动退出，系统会发起债权转让一般1~3个工作日完成，转让成功可随时提现</p>
                </div>
            </div>
            <div class="introduction-container introduction-container03">
                <h3 class="introduction-title">退出方式与费用</h3>
                <div class="content">
                    <p class="text">1. 到期自动退出：免费</p>
                    <p class="text">2.锁定期后提前退出：收取加入本金*0.2%*未持有月份的管理费</p>
                    <p class="text">3.超出期待回报部分作为服务费</p>
                </div>
            </div>
            <div class="introduction-container introduction-container04">
                <h3 class="introduction-title">投资流程</h3>
                <div class="content">
                    <img src="../../assets/images/app/introduction/lc01.png" alt=""/>
                </div>
            </div>
            <div class="introduction-container introduction-container05">
                <h3 class="introduction-title">产品特点</h3>
                <div class="content">
                    <ul class="lists clearfix">
                        <li class="list">
                            <img src="../../assets/images/app/introduction/pro01.png" alt=""/>
                            <p class="text">小额分散</p>
                        </li>
                        <li class="list">
                            <img src="../../assets/images/app/introduction/pro02.png" alt=""/>
                            <p class="text">期限灵活</p>
                        </li>
                        <li class="list">
                            <img src="../../assets/images/app/introduction/pro03.png" alt=""/>
                            <p class="text">收益稳定</p>
                        </li>
                        <li class="list">
                            <img src="../../assets/images/app/introduction/pro04.png" alt=""/>
                            <p class="text">当天计息</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="go-back-wrapper">
                <template v-if="app">
                    <a @click="toWebview" class="go-back">返回投资</a>
                </template>
                <template v-else>
                    <router-link to="/regular" class="go-back">返回投资</router-link>
                </template>
            </div>
        </div>
    </section>
</template>
<script>
    import {Toast} from 'mint-ui'
    import Util from '../../util/index'
    import {jsCloseCallBack} from '../../util/appCallback'

    export default {
        name: 'PlanIntroduction',
        data() {
            return {
                app: false
            }
        },
        created() {
            var ios = this.$route.query.ios_callback;
            var android = this.$route.query.android_callback;
            if (ios != undefined) {
                this.app = true;
            } else if (android != undefined) {
                this.app = true;
            }
        },
        methods: {
            toWebview() {
                var platform = Util.isUerAgent();
                if (platform == 'ios') {
                    jsCloseCallBack(platform);
                } else if (platform == 'android') {
                    jsCloseCallBack(platform);
                } else {
                    let instance = Toast({
                        message: '请在多啦聚财App中打开',
                        duration: 2000
                    });
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/introduction.css";
</style>
