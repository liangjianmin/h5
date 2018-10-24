<template>
    <section class="dola-pwd-manage">
        <div class="dola-title">
            <a href="/user/setting" class="backer"></a>
            <h2>{{title}}</h2>
        </div>
        <!--个人角色-->
        <template v-if="userType == 'PERSONAL' ">
            <dl class="dola-pwd-manage-list" v-if="userSetting.user">
                <dd>
                    <a class="clr">
                        <span class="fl l">电子交易账户</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.card_no_e}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
                <dd>
                    <a class="clr">
                        <span class="fl l">开户名</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.name_e}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
                <dd>
                    <a class="clr">
                        <span class="fl l">身份证号</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.cert_no | card}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
                <dd>
                    <a class="clr" href="/#/bank/modify_mobile">
                        <span class="fl l">手机号码</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.mobile | mobile}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i></i>
                        </div>
                    </a>
                </dd>
            </dl>
        </template>
        <!--企业角色-->
        <template v-else-if="userType == 'ORGANIZATION'">
            <dl class="dola-pwd-manage-list" v-if="userSetting.user">
                <dd>
                    <a class="clr">
                        <span class="fl l">电子交易账户</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.card_no_e}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
                <dd>
                    <a class="clr">
                        <span class="fl l">企业名称</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.name_e}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
                <dd>
                    <a class="clr">
                        <span class="fl l">营业执照编号</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.customer_no}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
                <dd>
                    <a class="clr">
                        <span class="fl l">手机号码</span>
                        <div class="fr r">
                            <span class="text lineBlock va-m">{{userSetting.user.srbank.mobile | mobile}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </a>
                </dd>
            </dl>
        </template>
    </section>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'pwd-manage',
        data() {
            return {
                title: '',
                userType: ''
            }
        },
        computed: mapState({
            userSetting: state => state.user.userSetting
        }),
        created() {
            var userType = this.$route.query.userType;
            if (userType == 'PERSONAL') {
                this.title = '银行存管账户';
                this.userType = userType;
            } else if (userType == 'ORGANIZATION') {
                this.title = '企业信息';
                this.userType = userType;
            }
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                this.$store.dispatch({
                    type: 'userSetting'
                });
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/user.css";

    .dola-title {
        position: relative;
    }
</style>