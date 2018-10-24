<template>
    <section class="bank-open-account">
        <div class="head">
            <div class="head-wrap">
                <i class="ico-1 lineBlock va-m"></i>
                <span class="va-m">&</span>
                <i class="ico-2 lineBlock va-m"></i>
            </div>
            <p class="text">多啦聚财已接入银行资金存管系统全程保障您的资金安全</p>
        </div>
        <div class="bank-form" v-if="bankcardPage.user">
            <dl class="boxsiz">
                <dd class="boxsiz bor">
                    <label>真实姓名</label>
                    <div class="inp">
                        <input type="text" placeholder="请输入真实姓名" class="input-text" :value="bankcardPage.user.srbank.name" disabled="disabled">
                    </div>
                </dd>
                <dd class="boxsiz form-hr">
                    <label>身份证号</label>
                    <div class="inp">
                        <input type="text" placeholder="请输入身份证号" class="input-text" :value="bankcardPage.user.srbank.cert_no | card" disabled="disabled">
                    </div>
                </dd>
                <dd class="boxsiz bor" :class="{'form-hr' : limit==false}">
                    <label>开户银行</label>
                    <div class="select-box lineBlock va-m">
                        <select v-model="bankform.bankCode" @change="chooseBank(bankform.bankCode)" :class="{'select-box-class' : limit==true}">
                            <option value="" selected="selected">请输入开户银行</option>
                            <option v-for="option in bankinfo" :value="option.oldbankcode">{{ option.name }}</option>
                        </select>
                    </div>
                    <span class="text va-m">查看充值限额</span>
                </dd>
                <dt class="boxsiz dt-tip" v-if="limit">
                    <i class="lineBlock va-m"></i>
                    <span class="va-m">限额：单笔{{single_money}}元,单日{{day_money}}元</span>
                    <b class="lineBlock emptys"></b>
                </dt>
                <dd class="boxsiz bor">
                    <label>银行卡号</label>
                    <div class="inp">
                        <input type="number" placeholder="请输入银行卡号" class="input-text" v-model="bankform.bankcardNo">
                    </div>
                </dd>
                <dd class="boxsiz">
                    <label>预留手机号</label>
                    <div class="inp">
                        <input type="number" placeholder="请输入银行卡预留手机号" class="input-text" v-model="bankform.mobile">
                    </div>
                </dd>
            </dl>
            <div class="bank-btn-box">
                <a class="btn" @click="submit()" :class="{'btn-end':disable_flag}">下一步</a>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Util from '../../util/index'
    import {Toast} from 'mint-ui'

    export default {
        name: 'openAccount',
        data() {
            return {
                single_money: '',
                day_money: '',
                limit: false,
                disable_flag: true,
                platform: '',
                from: '',
                bankform: {
                    realName: '',
                    idCardNo: '',
                    bankcardNo: '',
                    mobile: '',
                    bankCode: ''
                }
            }
        },
        computed: mapState({
            bankinfo: state => state.bank.bankinfo,
            bankcardPage: state => state.bank.bankcardPage
        }),
        watch: {
            bankform: {
                handler(newValue, oldValue) {
                    if (newValue.bankcardNo != '' && newValue.mobile != '' && newValue.bankCode != '') {
                        this.disable_flag = false;
                    }
                },
                deep: true
            }
        },
        created() {
            //获取银行列表
            this.getBankInfo();
            this.getBankcardPage();
        },
        methods: {
            getBankcardPage() {
                this.$store.dispatch({
                    type: 'bankcardPage',
                    loading: true
                });
            },
            getBankInfo() {
                this.$store.dispatch({
                    type: 'bankinfo',
                    bankcode: ''
                });
            },
            chooseBank(val) {
                var moneysArr = [];
                if (val == '') {
                    this.limit = false;
                    return false;
                } else {
                    this.limit = true;
                    this.bankinfo.forEach((value, index, array) => {
                        if (val == value.oldbankcode) {
                            moneysArr = value.bankLimit.split('/');
                            this.single_money = moneysArr[0];
                            this.day_money = moneysArr[1];
                        }
                    });
                }
            },
            submit() {
                if (this.bankform.bankCode == '') {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '请选择开户银行',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else if (this.bankform.bankcardNo == '') {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '请填写银行卡号',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else if (this.bankform.bankcardNo.length < 16 || this.bankform.bankcardNo.length > 19) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '请填写正确的银行卡号',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else if (!Util.isNumber(this.bankform.bankcardNo)) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '银行卡号为全数字',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else if (!Util.checkPhone(this.bankform.mobile)) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '请填写正确的手机号',
                        duration: 2000,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else {
                    this.disable_flag = false;
                    this.$store.dispatch({
                        type: 'rebindBankCard',
                        bankcardNo: this.bankform.bankcardNo,
                        bankCode: this.bankform.bankCode,
                        mobile: this.bankform.mobile
                    });
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .bank-open-account {
        background: #f5f5f5;
    }
</style>
