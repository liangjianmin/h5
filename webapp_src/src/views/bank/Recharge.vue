<template>
    <section class="bank-operate" :style="{ height: wrapperHeight + 'px' }" :class="{'mt':app}">
        <div class="dola-title" v-if="!app">
            <a href="/#/user/detail" class="backer"></a>
            <h2>充值</h2>
        </div>
        <template v-if="rechargePage.user">
            <ul class="bank-operate-head-tab" :class="{'bank-operate-head-tab-color':titleDefaultIndex==1}">
                <li @click="handleTab(index)" :class="{'curr':titleDefaultIndex==index}" v-for="(item,index) in titleArr" :key="index">{{item}}</li>
            </ul>
            <div :style="{'display':isAvisible}">
                <div class="bank-operate-head boxsiz">
                    <div class="bank-operate-head-l">
                        <template v-if="rechargePage.user.srbank.bankcard.status_order">
                            <img :src="rechargePage.user.srbank.bankcard.img_logo_url" width="27" height="27" class="lineBlock va-m im">
                        </template>
                        <template v-else>
                            <img :src="rechargePage.user.srbank.bankcard.img_logo_url" width="27" height="27" class="lineBlock va-m im gray">
                        </template>
                        <div class="text lineBlock va-m">
                            <p class="text-t1">{{rechargePage.user.srbank.bankcard.bankName}}</p>
                            <p class="text-t2">尾号{{rechargePage.user.srbank.bankcard.bankcardNo | bank}}</p>
                        </div>
                    </div>
                    <div class="bank-operate-head-r">
                        <template v-if="rechargePage.user.srbank.bankcard.status_order">
                            <p class="text-t1">限额:单笔{{rechargePage.user.srbank.bankcard.bankLimit | bankLimit(1)}}元/单日{{rechargePage.user.srbank.bankcard.bankLimit | bankLimit(2)}}元</p>
                        </template>
                        <template v-else>
                            <p class="text-t1">{{rechargePage.user.srbank.bankcard.bankName}}快捷充值维护中，推荐使用"转账充值 </p>
                        </template>
                    </div>
                </div>
                <div class="bank-operate-recharge boxsiz">
                    <p class="t1">充值金额</p>
                    <div class="input-text" v-if="rechargePage.system">
                        <input type="number" :placeholder="'请输入充值金额，单笔最低'+rechargePage.system.recharge_lowest+'元'" v-model="rechargeForm.amount" v-on:input="inputFun(rechargeForm.amount)">
                    </div>
                    <p class="t2">可用余额：{{rechargePage.user.available_total_money}}元</p>
                </div>
                <div class="bank-operate-form boxsiz">
                    <button href="javascript:;" class="btn" :disabled="rechargeStatus" :class="{'btn-end':disabled && !rechargeStatus}" @click="submit(rechargeForm.amount)">下一步</button>
                </div>
                <div class="bank-operate-tx">
                    <p class="t1">充值说明</p>
                    <p class="t2">1、单笔充值金额不能低于100元，最高不可超过银行限额<a href="/#/bank/recharge_limit">查看银行限额>></a></p>
                    <p class="t2">2、充值免费且充值次数不限，充值手续费已由多啦承担； </p>
                    <p class="t2">3、充值需在银行页面校验密码，请在跳转后的银行页面完成操作；</p>
                    <p class="t2">4、如快捷充值维护中，请使用“转账充值”或登录官网www.dolabank.com使用“网银支付”充值。</p>
                </div>
            </div>
            <div :style="{'display':isBvisible}" class="white">
                <div class="bank-operat-prompt-tx boxsiz">
                    <p class="t1">根据监管政策(<b @click="flag=!flag">查看详情</b>)，转账充值要求以下事项：</p>
                    <p class="t2">1、仅支持存管账户绑定银行卡（<em>{{rechargePage.user.srbank.bankcard.bankName}}{{rechargePage.user.srbank.bankcard.bankcardNo_e}}</em>）进行手机银行或网上银行转账。</p>
                    <p class="t2">2、转入账户必须为多啦聚财在上饶银行开立的存管专用账户（此户仅用于银行存管系统资金中转）。转账时填写的收款方信息如下：</p>
                </div>
                <dl class="bank-operate-recharge-show">
                    <dd class="bank-operate-recharge-show-label">
                        <label class="lb">收款方户名：</label>
                        <span class="t2" id="copy_cont_a">深圳嘉银普惠科技有限公司</span>
                        <a href="javascript:;" @click="copyFn(1)">复制</a>
                    </dd>
                    <dd class="bank-operate-recharge-show-label">
                        <label class="lb">收款方账号：</label>
                        <span class="t2" id="copy_cont_b">207803020000012168</span>
                        <a href="javascript:;" @click="copyFn(2)">复制</a>
                    </dd>
                    <dd class="bank-operate-recharge-show-label">
                        <label class="lb">收款方开户行：</label>
                        <span class="t2" id="copy_cont_c">上饶银行滨江支行</span>
                        <a href="javascript:;" @click="copyFn(3)">复制</a>
                    </dd>
                </dl>
                <a class="view-btn" href="/#/bank/recharge/guide">
                    <span class="fl l">查看操作指引</span>
                    <i class="fr r"></i>
                </a>
                <div class="bank-operate-tx bank-operate-tx-bg">
                    <p class="t1">充值说明</p>
                    <p class="t2">1、转账充值资金会在0~2小时内充值到您的存管账户，请耐心等待并及时关注到账短信；</p>
                    <p class="t2">2、单笔充值大于5万时，请务必在工作日17点前进行转账充值； </p>
                    <p class="t2">3、为了避免转账充值出现异常，请勿在当天的22:00~24:00进行转账充值。此时间段为银行日结时间段。若有充值问题，请咨询客服<em>400-9300-986</em>处理。</p>
                </div>
            </div>
        </template>
        <div class="bank-layer" v-if="flag">
            <div class="wrap">
                <p class="tit">存管银行通知</p>
                <div class="content">
                    <img src="../../assets/images/app/bank/notice.png" alt="">
                </div>
                <i class="close" @click="flag=!flag"></i>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import {Toast} from 'mint-ui'
    import Util from '../../util/index'

    export default {
        name: 'recharge',
        data() {
            return {
                titleArr: ['快捷充值', '转账充值'],
                titleDefaultIndex: 0,
                wrapperHeight: '',
                disabled: false,
                isAvisible: 'block',
                isBvisible: 'none',
                flag: false,
                app:false,
                rechargeForm: {
                    amount: '',
                    rechargeWay: 'SWIFT'
                }
            }
        },
        computed: mapState({
            rechargePage: state => state.bank.rechargePage,
            rechargeStatus: state => state.bank.rechargeStatus
        }),
        watch: {
            $route(to) {
                var path = to.path.substring(1);
                if (path == 'bank/recharge') {
                    this.$store.dispatch({
                        type: 'rechargePage',
                        loading: false
                    });
                }
            }
        },
        created() {
            var path = this.$route.path.substring(1);
            var app = Util.getCookie('platform');
            if (app != '') {
                this.app = true;
            } else {
                this.app = false;
            }
            if (path == 'bank/recharge') {
                this.getRecharge();
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight;
        },
        methods: {
            getRecharge() {
                this.$store.dispatch({
                    type: 'rechargePage',
                    loading: true
                });
            },
            handleTab(index) {
                this.titleDefaultIndex = index;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                if (index == 0) {
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";
                } else if (index == 1) {
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";
                }
            },
            inputFun(val) {
                //判断下一步的条件是最低充值
                var recharge_lowest = parseInt(this.rechargePage.system.recharge_lowest);
                if (val != '' && val >= recharge_lowest) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
            },
            submit(val) {
                var recharge_lowest = parseInt(this.rechargePage.system.recharge_lowest);
                if (val == '' || val < recharge_lowest) {
                    let instance = Toast({
                        className: 'sh-bank-layer',
                        message: '单笔充值金额不能低于' + recharge_lowest + '元',
                        duration: 1500,
                        iconClass: 'sh-bank-layer-ico'
                    });
                } else {
                    this.$store.dispatch({
                        type: 'recharge',
                        amount: parseFloat(this.rechargeForm.amount).toFixed(2),
                        rechargeWay: this.rechargeForm.rechargeWay,
                        bankcode: this.rechargePage.user.srbank.bankcard.bankcode,
                        redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/recharge_success?'
                    });
                }
            },
            copy(el, fn) {
                var range = document.createRange();
                var end = el.childNodes.length;
                range.setStart(el, 0);
                range.setEnd(el, end);

                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy", false, null);
                selection.removeRange(range);

                if (fn !== 'undefined' && typeof fn === 'function') {
                    fn();
                }
            },
            copyFn(type) {
                var copyContentA = document.querySelector('#copy_cont_a');
                var copyContentB = document.querySelector('#copy_cont_b');
                var copyContentC = document.querySelector('#copy_cont_c');

                if (type == 1) {
                    let instance = Toast({
                        message: '复制成功，去粘贴',
                        duration: 1500
                    });
                    this.copy(copyContentA, function () {

                    });

                } else if (type == 2) {
                    let instance = Toast({
                        message: '复制成功，去粘贴',
                        duration: 1500
                    });
                    this.copy(copyContentB, function () {

                    });
                } else if (type == 3) {
                    let instance = Toast({
                        message: '复制成功，去粘贴',
                        duration: 1500
                    });
                    this.copy(copyContentC, function () {

                    });
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .mt{
        padding-top: 0;
    }

    .bank-operate {
        background: #F8F8F8;
    }

    .bank-operate .bank-operate-form .btn {
        width: 100%;
    }
    .gray{
        filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        -webkit-filter: grayscale(1);
    }
</style>
