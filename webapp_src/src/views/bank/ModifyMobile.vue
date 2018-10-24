<template>
    <section class="dola-user">
        <TitleBar :title="title"></TitleBar>
        <div class="dola-user-wrap">
            <div class="dola-user-wrap-form boxsiz">
                <div class="dola-user-wrap-form-input boxsiz">
                    <input type="text" placeholder="请输入手机号" maxlength="11" class="tx" v-model="mobile">
                </div>
                <div class="dola-user-wrap-form-input boxsiz">
                    <input type="text" placeholder="请输入短信验证码" class="tx" v-model="code">
                    <input type="button" class="code" :value="codetext" @click="getCode()" :class="{'code-curr':codeactive}" :disabled="disabled"/>
                </div>
                <div class="dola-user-btn">
                    <a class="btn" @click="submit()">提交</a>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import {Toast} from 'mint-ui'
    import TitleBar from '../common/TitleBar.vue'
    import {services as Services} from '../../api/index'
    import Util from '../../util/index'

    export default {
        name: 'rebind',
        data() {
            return {
                title: '修改电子账号手机号',
                codetext: '获取验证码',
                mobile: '',
                code: '',
                disabled: false,
                codeactive: false
            }
        },
        methods: {
            getCode() {
                var tel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!this.mobile) {
                    let instance = Toast({
                        message: '请输入手机号码',
                        duration: 2000
                    });
                } else if (!tel.test(this.mobile)) {
                    let instance = Toast({
                        message: '请输入有效的手机号码',
                        duration: 2000
                    });
                } else {
                    this.$store.dispatch({
                        type: 'sendPhoneyzm',
                        phone_num: this.mobile,
                        checkMobile: 0
                    });
                    this.timeNum();
                }
            },
            timeNum() {
                var me = this;
                var wait = 60;
                me.disabled = true;
                me.codeactive = true;
                me.codetext = wait + '秒后获取';
                var clock = setInterval(doLoop, 1000);

                function doLoop() {
                    wait--;
                    if (wait > 0) {
                        me.codetext = wait + '秒后获取';
                        me.codeactive = true;
                    } else {
                        clearInterval(clock);
                        me.disabled = false;
                        me.codeactive = false;
                        me.codetext = '重新获取';
                        wait = 60;
                    }
                }
            },
            submit() {
                var tel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!this.mobile) {
                    let instance = Toast({
                        message: '请输入手机号码',
                        duration: 2000
                    });
                } else if (!tel.test(this.mobile)) {
                    let instance = Toast({
                        message: '请输入有效的手机号码',
                        duration: 2000
                    });
                } else if (!this.code) {
                    let instance = Toast({
                        message: '请获取手机验证码',
                        duration: 2000
                    });
                } else {
                    this.$store.dispatch({
                        type: 'modifyReservedMobile',
                        mobile: this.mobile,
                        authCode: this.code
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
</style>
