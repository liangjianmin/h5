<template>
    <section class="dola-about-new-person">
        <div class="content content1">
            <h3 class="new-person-title">多啦聚财是做什么的？</h3>
            <p class="text">多啦聚财成立于2014年，注册资金1亿元，总部位于深圳市金融中心福田区。为深圳嘉银普惠科技有限公司旗下的一家专注于小额消费金融的互联网投资平台。多啦聚财凭借专业高效的人才队伍，构建了严密的风险控制系统和贴心的客户服务体系，通过云计算、大数据和移动支付等先进的互联网技术，打造出智能债权匹配系统，为投资人提供一个合规、安全、便捷的互联网投资平台。</p>
        </div>
        <div class="content content2">
            <h3 class="new-person-title">多啦聚财是如何运作的？</h3>
            <img src="../../assets/images/app/dola_guarantee_45.png" alt="多啦聚财运作模式" style="height: auto;"/>
        </div>
        <div class="content content3">
            <h3 class="new-person-title">选择多啦聚财的4大理由</h3>
            <ul class="choose-lists clearfix">
                <li class="list list1">
                    <dl>
                        <dt>安全保障</dt>
                        <dd>●&nbsp;&nbsp;银行存管</dd>
                        <dd>●&nbsp;&nbsp;双重风控</dd>
                        <dd>●&nbsp;&nbsp;资金同卡进出</dd>
                        <dd>●&nbsp;&nbsp;律所合作</dd>
                        <dd>●&nbsp;&nbsp;电子签章</dd>
                        <dd>●&nbsp;&nbsp;阿里云Web应用防火墙</dd>
                        <dd>●&nbsp;&nbsp;VeriSign&nbsp;SSL数据传输加密</dd>
                    </dl>
                </li>
                <li class="list list2">
                    <dl>
                        <dt>精彩活动</dt>
                        <dd>●&nbsp;&nbsp;投资返现活动</dd>
                        <dd>●&nbsp;&nbsp;邀请好友返现活动</dd>
                        <dd>●&nbsp;&nbsp;疯狂加息活动</dd>
                        <dd>●&nbsp;&nbsp;投资抽奖活动</dd>
                        <dd>●&nbsp;&nbsp;微信赠送体验金</dd>
                    </dl>
                </li>
                <li class="list list3">
                    <dl>
                        <dt>资金灵活</dt>
                        <dd>●&nbsp;&nbsp;100元即可起投</dd>
                        <dd>●&nbsp;&nbsp;持有30天后可提前退出</dd>
                        <dd>●&nbsp;&nbsp;多终端入口，简易操作   </dd>
                    </dl>
                </li>
                <li class="list list4">
                    <dl>
                        <dt>专业风控</dt>
                        <dd>●&nbsp;&nbsp;天盾大数据风控系统</dd>
                        <dd>●&nbsp;&nbsp;双重风控机制</dd>
                        <dd>●&nbsp;&nbsp;完善的反欺诈管理制度</dd>
                        <dd>●&nbsp;&nbsp;专业的风控团队</dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="content content4">
            <h3 class="new-person-title">如何注册投资</h3>
            <ul class="register-lists">
                <li class="list list1">
                    <span>第一步</span>
                    <span>:&nbsp;进入多啦聚财官网首页 点击注册</span>
                </li>
                <li class="list list2">
                    <span>第二步</span>
                    <span>:&nbsp;设置帐号及密码</span>
                </li>
                <li class="list list3">
                    <span>第三步</span>
                    <span>:&nbsp;根据提示开通银行存管账户并充值</span>
                </li>
                <li class="list list4">
                    <span>第四步</span>
                    <span>:&nbsp;返回首页，选择散标进行投资</span>
                </li>
            </ul>
        </div>
        <div class="content content5" v-if="!app">
            <div class="cont clearfix">
                <div class="left"><img src="../../assets/images/app/dola_guarantee_51.png" alt="下载多啦APP"/></div>
                <div class="right">
                    <dl>
                        <dt>下载APP</dt>
                        <dd class="desc">随时随地即可投资</dd>
                        <dd class="download-btn-wrapper"><a class="new-person-btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jyph.dolabank">立即下载</a></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="new-person-nav clearfix">
            <!--app-->
            <template v-if="app">
                <!--app 登录-->
                <template v-if="uid == 1 && app_ios == true">
                    <a class="new-person-btn register-btn" @click="appCallback('ios',2)">立即投资</a>
                    <a class="new-person-btn link-btn" href="https://www.dolabank.com/more/online_service"><i class="icon"></i>联系客服</a>
                </template>
                <template v-else-if="uid == 1 && app_android == true">
                    <a class="new-person-btn register-btn" @click="appCallback('android',2)">立即投资</a>
                    <a class="new-person-btn link-btn" href="https://www.dolabank.com/more/online_service"><i class="icon"></i>联系客服</a>
                </template>
                <!--app 未登录-->
                <template v-else-if="uid == 0 && app_ios == true">
                    <a class="new-person-btn register-btn" @click="appCallback('ios',0)">立即注册</a>
                    <a class="new-person-btn link-btn" href="https://www.dolabank.com/more/online_service"><i class="icon"></i>联系客服</a>
                </template>
                <template v-else-if="uid == 0 && app_android == true">
                    <a class="new-person-btn register-btn" @click="appCallback('android',0)">立即注册</a>
                    <a class="new-person-btn link-btn" href="https://www.dolabank.com/more/online_service"><i class="icon"></i>联系客服</a>
                </template>
            </template>
            <!-- wechat -->
            <template v-else>
                <!--wechat 登录状态-->
                <template v-if="tokencheck == true">
                    <router-link class="new-person-btn register-btn" to="/regular">立即投资</router-link>
                    <a class="new-person-btn link-btn" href="https://www.dolabank.com/more/online_service"><i class="icon"></i>联系客服</a>
                </template>
                <!--未登录状态-->
                <template v-else="tokencheck == false">
                    <a class="new-person-btn register-btn" href="/register">立即注册</a>
                    <a class="new-person-btn link-btn" href="https://www.dolabank.com/more/online_service"><i class="icon"></i>联系客服</a>
                </template>
            </template>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import {jsShowLoginCallBack, jsShowProductListCallBack, jsShowProductDetailCallBack} from '../../util/appCallback'
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'new-person',
        data() {
            return {
                title:'新手指引',
                app_ios: false,
                app_android: false,
                app: false,
                uid: 0,
                token: ''
            }
        },
        computed: mapState({
            productPlan: state => state.home.productPlan,
            tokencheck: state => state.home.tokencheck,
            uiddata: state => state.home.uiddata
        }),
        created() {
            var ios = this.$route.query.ios_callback;
            var android = this.$route.query.android_callback;
            var uid = this.$route.query.uid;
            if (ios != undefined) {
                this.app_ios = true;
                this.app = true;
            } else if (android != undefined) {
                this.app_android = true;
                this.app = true;
            }
            this.getHome();
            if (uid != undefined) {
                this.uid = 1;
                this.getUserInfoByUid(uid);
            }
        },
        methods: {
            getHome() {
                this.$store.dispatch({
                    type: 'getRecentProductPlan'
                });
                this.$store.dispatch({
                    type: 'tokenCheck'
                });
            },
            appCallback(platform, type, planID) {
                if (platform == 'ios') {
                    if (type == 0) {
                        jsShowLoginCallBack(platform);
                    } else if (type == 1) {
                        jsShowProductDetailCallBack(platform, '', planID);
                    } else if (type == 2) {
                        jsShowProductListCallBack(platform);
                    }
                } else if (platform == 'android') {
                    if (type == 0) {
                        jsShowLoginCallBack(platform);
                    } else if (type == 1) {
                        jsShowProductDetailCallBack(platform, '', planID);
                    } else if (type == 2) {
                        jsShowProductListCallBack(platform);
                    }
                }
            },
            getUserInfoByUid(uid) {
                this.$store.dispatch({
                    type: 'getUserInfoByUid',
                    uid: uid
                });
            }
        },
        components: {
            TitleBar
        }
    }
</script>

