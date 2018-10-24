<template>
    <section class="invest-success-box" v-if="balanceInfo.balance_info">
        <!--<TitleBar :title="title" v-if="!isApp"></TitleBar>-->
        <section class="invest-success-box-wrap pro__success boxsiz">
            <div class="head-tit">
                <i class="icn"></i>
                <p class="t1">恭喜您，预约成功！</p>
            </div>
            <ul class="txt boxsiz">
                <li class="clr">
                    <p class="fl t1">已冻结账户金额</p>
                    <p class="fr t2"><span>{{invest_money}}</span>元</p>
                </li>
                <li class="clr">
                    <p class="fl t1">预约期限</p>
                    <div class="fr t2">
                        <span>{{periods}}</span>个月
                        <p class="ss" v-if="invest_rate !== '8.00'">新手专享投标，3个月期满系统免费自动债转</p>
                    </div>
                </li>
                <li class="clr">
                    <p class="fl t1">往期参考利率</p>
                    <p class="fr t2"><span>{{invest_rate}}</span>%</p>
                </li>
                <li class="clr" v-if="invest_rate === '8.00'">
                    <p class="fl t1">平台奖励年化</p>
                    <p class="fr t2"><span>1.00</span>%</p>
                </li>
            </ul>
            <template v-if="balanceInfo.balance_info.status">
                <div class="dola-invest_success-btn">
                    <div class="btn btn-left">
                        <a @click="appInveset">继续投资</a>
                    </div>
                    <div class="btn btn-right">
                        <a @click="appUser">我的预约</a>
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
    import {jsShowProductListCallBack, jsShowMineCallBack, jsCallNotification} from '../../util/appCallback';
    import TitleBar from '../common/TitleBar.vue';
    import Util from '../../util/index';
    import { mapState } from 'vuex';

    export default {
        name: 'invest_success',
        data() {
            return {
                title: '预约结果',
                isApp: false
            }
        },
        computed: {
            ...mapState({
                balanceInfo: state => state.balance.balanceInfo
            }),
            invest_money() {
                return this.$route.query.invest_money;
            },
            periods() {
                return this.$route.query.periods;
            },
            invest_rate() {
                return this.$route.query.invest_rate;
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
    .invest-success-box {
        background-color: #fff;
    }
    .pro__success {
        .head-tit i {
            width: 60px;
            height: 60px;
        }
        .head-tit p {
            font-size: 22px;
            color: #141414;
        }
        &.invest-success-box-wrap .dola-invest_success-btn .btn a {
            border: 1px solid #e5e5e5;
            height: auto;
            color: #f60;
            background-color: #fff;
        }
        &.invest-success-box-wrap .dola-invest_success-btn .btn-left a {
            color: #fff;
            background-color: #f60;
        }
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
