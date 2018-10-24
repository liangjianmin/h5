<template>
    <section v-if="balanceInfo.balance_info">
        <!--<div class="dola-title">
            <a href="/#/batch/detail/?type=3" class="backer" v-if="!isApp"></a>
            <h2>投资确认</h2>
        </div>-->
        <section class="dola-invest_success boxsiz" :class="{isApp:isApp}">
            <div class="head-tit">
                <i class="icn"></i>
                <p class="t1">恭喜您，投资成功！</p>
            </div>
            <ul class="txt boxsiz">
                <li class="clr">
                    <p class="fl t1">投资本金</p>
                    <p class="fr t2"><span>{{principal}}</span>元</p>
                </li>
                <li class="clr">
                    <p class="fl t1">投资期限</p>
                    <p class="fr t2"><span>{{period}}</span>个月</p>
                </li>
                <li class="clr" v-if="transfer_interest > 0">
                    <p class="fl t1">垫付利息</p>
                    <p class="fr t2"><span>{{transfer_interest}}</span>元</p>
                </li>
                <li class="clr">
                    <p class="fl t1">实际支付</p>
                    <p class="fr t2"><span>{{real_pay}}</span>元</p>
                </li>
                <li class="clr">
                    <p class="fl t1">债权匹配</p>
                    <p class="fr t2"><span>{{transfer_count}}</span>个</p>
                </li>
            </ul>
            <p class="invest-text">详情可进入我的-投资明细中查看</p>
            <template v-if="balanceInfo.balance_info.status">
                <div class="dola-invest_success-btn">
                    <div class="btn btn-left">
                        <a @click="appInveset">继续投资</a>
                    </div>
                    <div class="btn btn-right">
                        <a @click="appUser">查看资产</a>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="tools--balance">
                    <div class="tools-balance__container">
                        <div class="balance-text">
                            <p class="balance-tit">余额自动复投</p>
                            <p class="balance-desc">避免资金站岗  提高投资效率</p>
                        </div>
                        <router-link to="/user/balance" class="link--banlance">去开启</router-link>
                    </div>
                    <a class="link--user" @click="appUser">查看我的资产</a>
                </div>
            </template>
        </section>
    </section>
</template>
<script>
    import {jsShowProductListCallBack, jsShowMineCallBack, jsCallNotification} from '../../util/appCallback'
    import TitleBar from '../common/TitleBar.vue'
    import Util from '../../util/index'
    import {MessageBox} from 'mint-ui'
    import { mapState } from 'vuex';

    export default {
        name: 'auto_invest_success',
        data() {
            return {
                title: '投资确认',
                isApp: false
            }
        },
        computed: {
            ...mapState({
                balanceInfo: state => state.balance.balanceInfo
            }),
            principal() {
                return this.$route.query.principal;
            },
            period() {
                return this.$route.query.period;
            },
            repay_money() {
                return this.$route.query.repay_money;
            },
            transfer_interest() {
                return this.$route.query.transfer_interest;
            },
            real_pay() {
                return this.$route.query.real_pay;
            },
            transfer_count() {
                return this.$route.query.transfer_count;
            }
        },
        created() {
            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }

            this.$store.dispatch({
                type: 'getBalanceInfo'
            });
        },
        methods: {
            appInveset() {
                var platform = Util.getCookie('platform');
                if (platform != '') {
                    jsShowProductListCallBack(platform);
                } else {
                    window.location.href = '/#/regular'
                }
            },
            appUser() {
                var platform = Util.getCookie('platform');
                if (platform != '') {
                    jsShowMineCallBack(platform);
                } else {
                    window.location.href = '/#/user/detail'
                }
            }
        },
        components: {
            TitleBar
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/wap/standard_powder.css";

    .invest-text {
        padding: 11px 20px 20px 20px;
        font-size: 12px;
        color: #757575;
    }
    .dola-invest_success {
        margin: 0;
        min-height: 100%;
        background-color: #fff;
    }
    .tools--balance {
        margin-top: 20px;
        padding: 0 16px;
        .tools-balance__container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 0 18px;
            border-radius: 3px;
            height: 2.4rem;
            background-image: linear-gradient(to right, #FCE4A9, #FCF3D7);
            border: 1px solid #f7e7b5;
        }
        .balance-tit {
            margin-bottom: 2px;
            line-height: 22px;
            font-size: 18px;
            color: #f60;
        }
        .balance-desc {
            line-height: 22px;
            font-size: 13px;
            color: #000;
        }
        .link--banlance {
            display: inline-block;
            padding: 8px 19px;
            border-radius: 24px;
            box-shadow: 0 3px 8px rgba(255, 200, 35, 0.2);
            background-color: #ffc823;
            font-size: 12px;
            color: #fff;
        }
        .link--user {
            display: block;
            border-radius: 3px;
            border: 1px solid #e5e5e5;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 17px;
            color: #464646;
        }
    }
</style>