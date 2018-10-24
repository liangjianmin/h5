<template>
    <section class="dola-pwd-manage">
        <TitleBar :title="title"></TitleBar>
        <dl class="dola-pwd-manage-list" v-if="userDetail.user">
            <dd>
                <a href="/user/modify_loginpass" class="clr">
                    <span class="fl">登录密码</span>
                    <span class="fr">修改&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <i class="fr"></i>
                </a>
            </dd>
            <dd>
                <!--已开通存管账户-->
                <template v-if="userDetail.user.srbank.is_srbank_user">
                    <!--银行卡审核中-->
                    <template v-if="userDetail.user.bankcard_status == 'UNBINDING' ">
                        <a @click="tipFn(1)" class="clr">
                            <span class="fl">交易密码</span>
                            <span class="fr">重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i class="fr"></i>
                        </a>
                    </template>
                    <!--已绑定银行卡-->
                    <template v-else-if="userDetail.user.bankcard_status == 'BIND' ">
                        <!--老用户-->
                        <template v-if="userDetail.user.srbank.need_reset_pwd_first">
                            <a @click="tipFn(2)" class="clr">
                                <span class="fl">交易密码</span>
                                <span class="fr">重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <i class="fr"></i>
                            </a>
                        </template>
                        <!--新用户-->
                        <template v-else>
                            <a @click="modify()" class="clr">
                                <span class="fl">交易密码</span>
                                <span class="fr">重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <i class="fr"></i>
                            </a>
                        </template>
                    </template>
                    <!--银行卡解绑成功 走换绑-->
                    <template v-else-if="userDetail.user.bankcard_status == 'UNBIND' ">
                        <a @click="tipFn(0,'UNBIND')" class="clr">
                            <span class="fl">交易密码</span>
                            <span class="fr">重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i class="fr"></i>
                        </a>
                    </template>
                </template>
                <!--未开通存管账户 新用户-->
                <template v-else>
                    <a @click="tipFn(0)" class="clr">
                        <span class="fl">交易密码</span>
                        <span class="fr">未设置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <i class="fr"></i>
                    </a>
                </template>
            </dd>
        </dl>
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
        <!--未绑定-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="layerRechage">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">请开通银行存管账户 </p>
                    <p class="t2">银行存管账户用于对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。</p>
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
    import TitleBar from '../common/TitleBar.vue'
    import {MessageBox} from 'mint-ui'

    export default {
        name: 'pwd-manage',
        data() {
            return {
                title: '密码管理'
            }
        },
        computed: mapState({
            userDetail: state => state.user.userDetail
        }),
        created() {
            this.getUserData();
        },
        methods: {
            getUserData() {
                this.$store.dispatch({
                    type: 'userDetail'
                });
            },
            modify() {
                this.$store.dispatch({
                    type: 'resetPassword',
                    redirectUrl: window.location.origin + '/user/setting?',
                    needCheck: false
                });
            },
            tipFn(type, status) {
                if (type == 0) {
                    MessageBox({
                        title: '',
                        message: this.$refs.layerRechage.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即开通',
                        cancelButtonText: '暂不开通',
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
                        }
                    });
                } else if (type == 1) {
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
                }else if(type ==2){
                    //老用户
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
                                redirectUrl: window.location.origin + '/#/user/detail',
                                needCheck: false
                            });
                        }
                    });
                }
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/user.css";

    .dola-title {
        position: relative;
    }
</style>