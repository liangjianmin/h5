<template>
    <section class="dola-person">
        <div class="dola-person-top clr boxsiz" v-if="userDetail.user">
            <a class="fl head-pic" href="/user/setting">
                <img :src="userDetail.user.avatar" :alt="userDetail.user.showName" :title="userDetail.user.showName" class="lineBlock va-m"/>
                <b class="lineBlock emptys"></b>
            </a>
            <h2>{{userDetail.user.showName}}</h2>
            <a class="msg fr" href="/user/message_list">
                <i class="lineBlock va-m ico"></i>
                <template v-if="userDetail.unReadNotice">
                    <i class="tip"></i>
                </template>
                <b class="lineBlock emptys"></b>
            </a>
        </div>
        <div class="dola-person-view" v-if="userDetail.user">
            <!--公告优先显示后台-->
            <template v-if="userDetail.user.usr_note_title != ''">
                <a class="dola-person-bank boxsiz clr" :href="userDetail.user.usr_note_link">
                    <div class="fl l">
                        <i class="lineBlock va-m"></i>
                        <span class="va-m">{{userDetail.user.usr_note_title}}</span>
                    </div>
                    <div class="fr r" v-if="userDetail.user.usr_note_link != ''">点击查看</div>
                </a>
            </template>
            <template v-else>
                <!--未开通存管账户 新用户-->
                <template v-if="!userDetail.user.srbank.is_srbank_user">
                    <div class="dola-person-bank boxsiz clr" @click="bindCardFn(0)">
                        <div class="fl l">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">投资前需先开通银行存管账户</span>
                        </div>
                        <a class="fr r">去开通>></a>
                    </div>
                </template>
                <!--银行卡解绑成功 走换绑-->
                <template v-else-if="userDetail.user.bankcard_status == 'UNBIND' ">
                    <div class="dola-person-bank boxsiz clr" @click="bindCardFn(0,'UNBIND')">
                        <div class="fl l">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">投资前请先绑定银行卡</span>
                        </div>
                        <a class="fr r">去绑卡>></a>
                    </div>
                </template>
                <!--老用户迁移-->
                <template v-else-if="userDetail.user.srbank.need_reset_pwd_first">
                    <div class="dola-person-bank boxsiz clr" @click="bindCardFn(5)">
                        <div class="fl l">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">投资前请先设置交易密码</span>
                        </div>
                        <a class="fr r">去设置>></a>
                    </div>
                </template>
                <!--自动投标签约-->
                <template v-else-if="!userDetail.user.srbank.is_srbank_user_sign_auto_bid">
                    <div class="dola-person-bank boxsiz clr" @click="bindCardFn(6,'sign_auto_bid')">
                        <div class="fl l">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">投资前请先进行“自动投标签约”</span>
                        </div>
                    </div>
                </template>
                <!--自动债权转让签约-->
                <template v-else-if="!userDetail.user.srbank.is_srbank_user_sign_credit_transfer">
                    <div class="dola-person-bank boxsiz clr" @click="bindCardFn(6,'sign_credit_transfer')">
                        <div class="fl l">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">投资前请先进行“自动购买转让标签约”</span>
                        </div>
                    </div>
                </template>
                <!--风险提示-->
                <template v-else-if="userDetail.user.whether_evaluation == 0">
                    <div class="dola-person-bank boxsiz clr">
                        <div class="fl l">
                            <i class="lineBlock va-m"></i>
                            <span class="va-m">投资前请先进行“风险评测”</span>
                        </div>
                        <a class="fr r" @click="bindCardFn(7)">立即评测>></a>
                    </div>
                </template>
            </template>
            <div class="dola-person-show">
                <div class="income-text" :class="{'i-curr' : eyes_flag}">
                    <span class="t1 va-m" @click="showPoint(1)">昨日收益(元)</span>
                    <i class="va-m" @click="toggle()"></i>
                    <div class="tip" v-if="shows">
                        <p>当前投资昨日获得的账面收益</p>
                    </div>
                </div>
                <template v-if="eyes_flag">
                    <p class="money">****</p>
                </template>
                <template v-else>
                    <p class="money">{{userDetail.yesterdayTotalIncome_format}}</p>
                </template>
                <ul class="incomes boxsiz">
                    <li>
                        <p class="t1" @click="showPoint(2)">累计收益(元)</p>
                        <p class="t2">
                            <template v-if="eyes_flag">
                                <span>****</span>
                            </template>
                            <template v-else>
                                <span>{{userDetail.totalIncome_format}}</span>
                            </template>
                        </p>
                        <div class="tip" v-if="show">
                            <p>历史投资累计获得的账面收益</p>
                        </div>
                    </li>
                    <router-link to="/user/assetsdetails" tag="li" class="r">
                        <p class="t1">总资产(元)</p>
                        <p class="t2">
                            <template v-if="eyes_flag">
                                <span class="va-m">****</span>
                            </template>
                            <template v-else>
                                <span class="va-m">{{userDetail.totalAsset_format}}</span>
                            </template>
                            <i class="va-m"></i>
                        </p>
                    </router-link>
                </ul>
            </div>
            <div class="dola-balance boxsiz">
                <div class="dola-balance-text">
                    <p class="t1">可用余额（元）</p>
                    <template v-if="eyes_flag">
                        <p class="t2">****</p>
                    </template>
                    <template v-else>
                        <p class="t2">{{userDetail.availableMoney_format}}</p>
                    </template>
                </div>
                <div class="dola-balance-btn">
                    <!--公司-->
                    <template v-if="userDetail.user.is_organization">
                        <a @click="bindCardFn(4)" class="b1 lineBlock va-m">充值</a>
                        <a @click="bindCardFn(4)" class="b2 lineBlock va-m">提现</a>
                    </template>
                    <!--个人-->
                    <template v-else>
                        <!--已开通存管账户-->
                        <template v-if="userDetail.user.srbank.is_srbank_user">
                            <!--银行卡审核中-->
                            <template v-if="userDetail.user.bankcard_status == 'UNBINDING' ">
                                <a class="b1 lineBlock va-m" @click="bindCardFn(3)">充值</a>
                                <a class="b2 lineBlock va-m" @click="bindCardFn(3)">提现</a>
                            </template>
                            <!--已绑定银行卡-->
                            <template v-else-if="userDetail.user.bankcard_status == 'BIND' ">
                                <!--老用户-->
                                <template v-if="userDetail.user.srbank.need_reset_pwd_first">
                                    <a class="b1 lineBlock va-m" @click="bindCardFn(5)">充值</a>
                                    <a class="b2 lineBlock va-m" @click="bindCardFn(5)">提现</a>
                                </template>
                                <!--新用户-->
                                <template v-else>
                                    <router-link class="b1 lineBlock va-m" to="/bank/recharge">充值</router-link>
                                    <router-link class="b2 lineBlock va-m" to="/bank/withdraw">提现</router-link>
                                </template>
                            </template>
                            <!--银行卡解绑成功 走换绑-->
                            <template v-else-if="userDetail.user.bankcard_status == 'UNBIND' ">
                                <a class="b1 lineBlock va-m" @click="bindCardFn(1,'UNBIND')">充值</a>
                                <a class="b2 lineBlock va-m" @click="bindCardFn(2,'UNBIND')">提现</a>
                            </template>
                        </template>
                        <!--未开通存管账户 新用户-->
                        <template v-else>
                            <a @click="bindCardFn(1)" class="b1 lineBlock va-m">充值</a>
                            <a @click="bindCardFn(2)" class="b2 lineBlock va-m">提现</a>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div class="dola-person-content boxsiz" v-if="userDetail.user">
            <!--<div class="dola-person-record clr boxsiz">
                <router-link to="/user/investmentdetails" tag="a" class="boxsiz">
                    <i class="ico-1"></i>
                    <span>投资明细</span>
                </router-link>
                <template v-if="userDetail.batch_auto_info">
                    <template v-if="userDetail.batch_auto_info.is_open_user == 1">
                        <router-link to="/user/minebespeak" tag="a" class="boxsiz">
                            <i class="ico-6"></i>
                            <span>预约投标</span>
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/user/bespeaklist" tag="a" class="boxsiz">
                            <i class="ico-6"></i>
                            <span>预约投标</span>
                        </router-link>
                    </template>
                </template>

            </div>
            <div class="dola-person-record clr boxsiz">
                <router-link to="/user/transferlist" tag="a" class="boxsiz">
                    <i class="ico-2"></i>
                    <span>债权转让</span>
                </router-link>
                <a class="boxsiz" :href="'/user/record_detail?usr_available_money='+userDetail.availableMoney">
                    <i class="ico-3"></i>
                    <span>交易记录</span>
                </a>
            </div>-->
            <div class="dola-person-record boxsiz">
                <router-link to="/user/investmentdetails" tag="a" class="boxsiz">
                    <div>
                        <i class="ico-1"></i>
                        <span>投资明细</span>
                    </div>
                </router-link>
                <template v-if="userDetail.batch_auto_info">
                    <template v-if="userDetail.batch_auto_info.is_open_user == 1">
                        <router-link to="/user/minebespeak" tag="a" class="boxsiz">
                            <div>
                                <i class="ico-6"></i>
                                <span>预约投标</span>
                            </div>
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/user/bespeaklist" tag="a" class="boxsiz">
                            <div>
                                <i class="ico-6"></i>
                                <span>预约投标</span>
                            </div>
                        </router-link>
                    </template>
                </template>
                <router-link to="/user/transferlist" tag="a" class="boxsiz">
                    <div>
                        <i class="ico-5"></i>
                        <span>债权转让</span>
                    </div>
                </router-link>
                <a class="boxsiz" :href="'/user/record_detail?usr_available_money='+userDetail.availableMoney">
                    <div>
                        <i class="ico-3"></i>
                        <span>交易记录</span>
                    </div>
                </a>
            </div>
            <div class="balance-wrapper">
                <router-link to="/user/balance" class="balance-link">
                    <span class="tit"><i class="icon"></i>余额自动复投</span>
                    <span class="status-text" v-if="userDetail.user.balance_auto_status">已开启</span>
                    <span class="status-text" v-else>未开启</span>
                </router-link>
            </div>
            <div class="dola-person-ad" v-if="userDetail.forwardInvite">
                <a :href="userDetail.forwardInvite.forward_url">
                    <img :src="userDetail.forwardInvite.img_url" alt="多啦聚财"/>
                </a>
            </div>
            <ul class="dola-person-menu">
                <li>
                    <a :href="'#/user/reward?pending_invest_id='+userDetail.coupon_reward_info.pending_invest_reward_coupon_ids+'&pending_invite_id='+userDetail.coupon_reward_info.pending_invite_reward_coupon_ids" class="boxsiz">
                        <div class="ico lineBlock va-m boxsiz">
                            <i class="ico-6"></i>
                        </div>
                        <div class="view clr lineBlock va-m boxsiz">
                            <span class="t1 fl">我的奖励</span>
                            <div class="fr">
                                <span class="t2 va-m">{{userDetail.coupon_reward_info.pending_num}}笔</span>
                                <span class="ico-arrow ico-arrows"></span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="/active/voucher" class="boxsiz">
                        <div class="ico lineBlock va-m boxsiz">
                            <i class="ico-1"></i>
                        </div>
                        <div class="view clr lineBlock va-m boxsiz">
                            <span class="t1 fl">我的红包</span>
                            <template v-if="userDetail.coupon.totalVoucher !=''">
                                <span class="t2 fr">{{userDetail.coupon.totalVoucher}}</span>
                            </template>
                            <template v-else>
                                <span class="fr ico-arrow"></span>
                            </template>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="/active/interest" class="boxsiz">
                        <div class="ico lineBlock va-m boxsiz">
                            <i class="ico-2"></i>
                        </div>
                        <div class="view clr lineBlock va-m boxsiz">
                            <span class="t1 fl">我的加息券</span>
                            <template v-if="userDetail.coupon.totalInterest != ''">
                                <span class="t2 fr">{{userDetail.coupon.totalInterest}}</span>
                            </template>
                            <template v-else>
                                <span class="fr ico-arrow"></span>
                            </template>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="boxsiz" href="/user/experience_money">
                        <div class="ico lineBlock va-m boxsiz">
                            <i class="ico-3"></i>
                        </div>
                        <div class="view clr lineBlock va-m boxsiz">
                            <span class="t1 fl">我的体验金</span>
                            <template v-if="userDetail.coupon.totalExperienceMoney != ''">
                                <span class="t2 fr">{{userDetail.coupon.totalExperienceMoney}}元</span>
                            </template>
                            <template v-else>
                                <span class="fr ico-arrow"></span>
                            </template>
                        </div>
                    </a>
                </li>
                <li>
                    <router-link to="/user/activity" tag="a" class="boxsiz">
                        <div class="ico lineBlock va-m boxsiz">
                            <i class="ico-4"></i>
                        </div>
                        <div class="view clr lineBlock va-m boxsiz">
                            <span class="t1 fl">活动中心</span>
                            <span class="t3 fr">{{userDetail.forwardActivity.content}}</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <a href="https://www.dolabank.com/more/online_service" class="boxsiz">
                        <div class="ico lineBlock va-m boxsiz">
                            <i class="ico-5"></i>
                        </div>
                        <div class="view clr lineBlock va-m boxsiz">
                            <span class="t1 fl">客服中心</span>
                            <span class="t2 fr">{{userDetail.customService}}</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <template v-if="channel == true">
            <ChannelFooter></ChannelFooter>
        </template>
        <template v-else-if="channel == false">
            <Footers></Footers>
        </template>
        <div class="dola-person-risk" v-if="userDetail.detection_status == 1">
            <i class="dola-person-risk-ico" @click="risk_flag = true"></i>
        </div>
        <div class="dola-person-risk-show-wrap" v-if="risk_flag">
            <div class="dola-person-risk-show lineBlock">
                <div class="top">
                    <img src="../../assets/images/app/risk-pop-wap-bg03.png" alt="10元抵扣红包">
                    <p>测试风险承受能力</p>
                    <p>赢<em>10元红包</em></p>
                    <i class="close" @click="risk_flag = false"></i>
                </div>
                <div class="bottom">
                    <a href="/app/v1220/ucenter/risk_activity" class="xiangqing">查看详情</a>
                    <a href="/app/v1220/ucenter/risk_evaluation" class="ceshi">立即测试</a>
                </div>
            </div>
        </div>
        <!--提现弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="layerWithdraw">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">提现前请先绑定银行卡</p>
                    <p class="t2">绑卡操作请在银行页面完成</p>
                </div>
            </div>
        </div>
        <!--充值弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="layerRechage">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1"><em>充值</em>&nbsp;前请开通银行存管账户 </p>
                    <p class="t2">银行存管账户用于对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。</p>
                </div>
            </div>
        </div>
        <!--审核弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="audit">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">您正在申请解绑银行卡，请在审核结束后操作</p>
                    <p class="t3 tl">审核通过：您可以绑定新的银行卡<br/>审核失败：您需要重新提交审核，或保留原银行卡</p>
                </div>
            </div>
        </div>
        <!--企业用户充值和提现提示-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="organization">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">企业用户充值、提现请前往PC操作</p>
                </div>
            </div>
        </div>
        <!--老用户弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="olduser">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">为保障资金安全，投资前请先设置银行存管账户交易密码</p>
                    <p class="t3 tl">平台已为您开通银行存管账户。银行存管账户用于对您的资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Footers from '../common/Footer.vue'
    import ChannelFooter from '../common/ChannelFooter.vue'
    import {MessageBox} from 'mint-ui'

    export default {
        name: 'userdetail',
        data() {
            return {
                eyes_flag: false,
                show: false,
                shows: false,
                risk_flag: false
            }
        },
        computed: mapState({
            userDetail: state => state.user.userDetail,
            channel: state => state.user.channel
        }),
        created() {
            var path = this.$route.path.substring(1);
            if (path == 'user/detail') {
                this.getUserData(path);
            }
        },
        methods: {
            getUserData(path) {
                this.$store.dispatch({
                    type: 'userDetail'
                });
            },
            toggle() {
                this.eyes_flag = !this.eyes_flag;
            },
            showPoint(type) {
                var timeout;
                this.show = false;
                this.shows = false;
                if (type == 1) {
                    this.shows = true;
                } else if (type == 2) {
                    this.show = true;
                }
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.show = false;
                    this.shows = false;
                    clearTimeout(timeout);
                }, 3000)
            },
            bindCardFn(type, status) {
                if (type == 0) {
                    if (status == 'UNBIND') {
                        //已经解绑的用户  跳转上饶银行换绑
                        //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                        this.$store.dispatch({
                            type: 'rebindBankcardPage',
                            redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/user/detail?'
                        });
                    } else {
                        //未开通存管的用户 跳转开户
                        this.$store.dispatch({
                            type: 'personalRegister',
                            redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?'
                        });
                    }
                } else if (type == 1) {
                    //去充值
                    MessageBox({
                        title: '',
                        message: this.$refs.layerRechage.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即开通',
                        cancelButtonText: '暂不开通'
                    }).then(action => {
                        if (action == 'confirm') {
                            if (status == 'UNBIND') {
                                //已经解绑的用户  跳转上饶银行换绑
                                //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                                this.$store.dispatch({
                                    type: 'rebindBankcardPage',
                                    redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/user/detail?'
                                });
                            } else {
                                //未开通存管的用户 跳转开户
                                this.$store.dispatch({
                                    type: 'personalRegister',
                                    redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?'
                                });
                            }
                        } else if (action === 'cancel') {

                        }
                    });
                } else if (type == 2) {
                    //去提现
                    MessageBox({
                        title: '',
                        message: this.$refs.layerWithdraw.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即绑定',
                        cancelButtonText: '暂不绑定'
                    }).then(action => {
                        if (action == 'confirm') {
                            if (status == 'UNBIND') {
                                //已经解绑的用户  跳转上饶银行换绑
                                //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                                this.$store.dispatch({
                                    type: 'rebindBankcardPage',
                                    redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/user/detail?'
                                });
                            } else {
                                //未开通存管的用户 跳转开户
                                this.$store.dispatch({
                                    type: 'personalRegister',
                                    redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?'
                                });
                            }
                        } else if (action === 'cancel') {

                        }
                    });
                } else if (type == 3) {
                    //审核银行卡不能进行提现操作
                    MessageBox({
                        title: '',
                        message: this.$refs.audit.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonClass: 'bank-btn-confirm'
                    }).then(action => {
                        if (action == 'confirm') {

                        }
                    });
                } else if (type == 4) {
                    //企业用户
                    MessageBox({
                        title: '',
                        message: this.$refs.organization.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonClass: 'bank-btn-confirm'
                    }).then(action => {
                        if (action == 'confirm') {

                        }
                    });
                } else if (type == 5) {
                    //老用户重置密码
                    MessageBox({
                        title: '',
                        message: this.$refs.olduser.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonClass: 'bank-btn-confirm'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'resetPassword',
                                redirectUrl: window.location.origin + '/#/user/detail?',
                                needCheck: false
                            });
                        }
                    });
                } else if (type == 6) {
                    if (status == 'sign_auto_bid') {
                        var sign_type = 'sign_auto_bid';
                    } else if (status == 'sign_credit_transfer') {
                        var sign_type = 'sign_credit_transfer';
                    }
                    this.$store.dispatch({
                        type: 'srbankSignPage',
                        sign_type: sign_type,
                        redirectUrl: window.location.origin + '/#/bank/sign_page_success?'
                    });
                } else if (type == 7) {
                    window.location.href = '/app/v1220/ucenter/risk_evaluation';
                }
            }
        },
        components: {
            Footers,
            ChannelFooter
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/person.css";
</style>
