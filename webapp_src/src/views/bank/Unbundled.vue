<template>
    <section class="bank-open-account unbundling">
        <TitleBar :title="title"></TitleBar>
        <div class="head-tip boxsiz">为保障您的资金安全，请在验证身份后进行下一步操作。</div>
        <template v-if="unbindBankcardPage.user">
            <div class="bank-form">
                <dl class="boxsiz">
                    <dd class="boxsiz bor">
                        <label>真实姓名</label>
                        <div class="inp">
                            <input type="text" placeholder="请输入真实姓名" class="input-text disable" :value="unbindBankcardPage.user.realName" disabled="disabled">
                        </div>
                    </dd>
                    <dd class="boxsiz bor">
                        <label>身份证号</label>
                        <div class="inp">
                            <input type="text" placeholder="请输入身份证号" class="input-text disable" :value="unbindBankcardPage.user.idCardNo | card" disabled="disabled">
                        </div>
                    </dd>
                    <dd class="boxsiz form-hr">
                        <label>手机号</label>
                        <div class="inp">
                            <input type="text" placeholder="请输入手机号" class="input-text disable" :value="unbindBankcardPage.user.mobile | mobile" disabled="disabled">
                        </div>
                    </dd>
                    <dd class="boxsiz bor">
                        <label>手机验证码</label>
                        <div class="inp">
                            <input type="text" placeholder="请输入验证码" class="input-text codebox va-m" v-model="bankForm.verify_code">
                            <input type="button" class="code-text va-m" :value="codetext" @click="getCode()" :class="{'code-curr':codeactive}" :disabled="disabled"/>
                        </div>
                    </dd>
                    <dd class="boxsiz">
                        <label>原银行卡号</label>
                        <div class="inp">
                            <input type="text" placeholder="请输入原银行卡卡号" class="input-text" v-model="bankForm.bankcardno">
                        </div>
                    </dd>
                </dl>
                <div class="bank-btn-box">
                    <input type="button" value="下一步" class="btn" :class="{'btn-end':disable_flag}"  @click="submit()" />
                </div>
            </div>
        </template>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Util from '../../util/index'
    import {Toast} from 'mint-ui'
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'Unbundled',
        data() {
            return {
                title:'解绑银行卡',
                bankForm: {
                    verify_code: '',
                    bankcardno: ''
                },
                disable_flag: true,
                codetext: '获取验证码',
                disabled: false,
                codeactive: false
            }
        },
        computed: mapState({
            unbindBankcardPage: state => state.bank.unbindBankcardPage
        }),
        watch: {
            bankForm: {
                handler(newValue, oldValue) {
                    if (newValue.verify_code != '' && newValue.bankcardno != '') {
                        this.disable_flag = false;
                    }else{
                        this.disable_flag = true;
                    }
                },
                deep: true
            },
            $route(to) {
                var path = to.path.substring(1);
                if (path == 'bank/unbundled') {
                    this.$store.dispatch({
                        type: 'unbindBankcardPage',
                        loading: false
                    });
                }
            }
        },
        created() {
            var path = this.$route.path.substring(1);
            if (path == 'bank/unbundled') {
                this.getUnbindBankcardPage();
            }
        },
        methods: {
            getUnbindBankcardPage() {
                this.$store.dispatch({
                    type: 'unbindBankcardPage',
                    loading: true
                });
            },
            submit() {
                if (!this.bankForm.verify_code) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '请填写手机验证码',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else if (this.bankForm.bankcardno.length < 16 || this.bankForm.bankcardno.length > 19) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '请填写正确的银行卡号',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else {
                    this.$store.dispatch({
                        type: 'unbindBankcardCheck',
                        verify_code: this.bankForm.verify_code,
                        bankcardno:this.bankForm.bankcardno,
                        mobile:this.unbindBankcardPage.user.mobile
                    });
                }
            },
            getCode() {
                this.$store.dispatch({
                    type: 'sendPhoneyzm',
                    phone_num:this.unbindBankcardPage.user.mobile,
                    checkMobile: 0
                });
                this.timeNum();
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
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";
    .unbundling{
        padding-top: 44px;
    }
</style>
