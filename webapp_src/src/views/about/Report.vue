<template>
    <section class="dola-report" :class="{'dola-report-mt':app==true}">
        <TitleBar :title="title" v-if="!app"></TitleBar>
        <div class="dola-report-box">
            <mt-swipe :auto="0" class="my-swipe clear" :speed="200" style="height: 17.5rem">
                <p class="tip-num">数据截止2018年3月31日</p>
                <mt-swipe-item class="slide-item" ref>
                    <div class="dola-report-wrap boxsiz" v-if="report.accumulate">
                        <div class="dola-report-showdata boxsiz">
                            <div class="dola-report-showdata-wrap">
                                <i class="t1"></i>
                                <p class="t2">{{report.accumulate.investMoney | moneyFormate(1)}}</p>
                            </div>
                        </div>
                        <ul class="dola-report-list boxsiz clr">
                            <li class="boxsiz">
                                <p class="t1">累计注册</p>
                                <p class="t2">{{report.accumulate.userTotal | moneyFormate(2)}}</p>
                            </li>
                            <li class="boxsiz">
                                <p class="t1">赚取收益</p>
                                <p class="t2">{{report.accumulate.incomeMoney | moneyFormate(2)}}</p>
                            </li>
                            <li class="boxsiz">
                                <p class="t1">待收余额</p>
                                <p class="t2">{{report.accumulate.waitIncomeMoney | moneyFormate(1)}}</p>
                            </li>
                            <li class="boxsiz">
                                <p class="t1">用户投资</p>
                                <p class="t2">{{report.accumulate.userPlanTotal | moneyFormate(3)}}</p>
                            </li>
                            <li class="boxsiz a">
                                <p class="t1">历史本息兑付率</p>
                                <p class="t2">{{report.accumulate.exchangeRate}}%</p>
                            </li>
                            <li class="boxsiz b">
                                <p class="t1">安全运营时间</p>
                                <p class="t2">{{report.accumulate.time_start | reportTimeFormate}}</p>
                            </li>
                        </ul>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item class="slide-item">
                    <div class="dola-report-wrap boxsiz" v-if="report.accumulate">
                        <div class="dola-report-showdata dola-report-showdata-a boxsiz">
                            <div class="dola-report-showdata-wrap">
                                <i class="t1"></i>
                                <p class="t2">{{report.accumulate.loanTotal | moneyFormate(3)}}</p>
                            </div>
                        </div>
                        <ul class="dola-report-list boxsiz clr">
                            <li class="boxsiz">
                                <p class="t1">平均单笔借款</p>
                                <p class="t3">{{report.accumulate.perLoanAmount | moneyFormate(1)}}</p>
                            </li>
                            <li class="boxsiz">
                                <p class="t1">平均借款期限</p>
                                <p class="t3">{{report.accumulate.averagePlanLoanPeriod}}月</p>
                            </li>
                            <li class="boxsiz a">
                                <p class="t1">人均投资金额</p>
                                <p class="t3">{{report.accumulate.perInvestmentAmount | moneyFormate(1)}}</p>
                            </li>
                            <li class="boxsiz b">
                                <p class="t1">往期平均年化收益</p>
                                <p class="t3">{{report.accumulate.planInterestRate}}%</p>
                            </li>
                        </ul>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item class="slide-item">
                    <div class="dola-report-wrap boxsiz">
                        <div class="dola-report-invest">
                            <ul class="dola-report-invest-tit boxsiz">
                                <li class="boxsiz lbBox" @click="tab(index)" v-for="(item,index) in listtext" :class="{'curr':active==index}" :key="index">
                                    <a>{{item}}</a>
                                </li>
                            </ul>
                            <dl class="dola-report-invest-list" :style="{'display':isAvisible}" v-if="report.userPortrait">
                                <dt>
                                    <span class="t1">排名</span>
                                    <span class="t1">用户名</span>
                                    <span class="t1">待收本金</span>
                                </dt>
                                <dd v-for="(item,index) in report.userPortrait.topPlanUser" :key="index">
                                    <template v-if="index == 0">
                                        <span class="t2-a">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 1">
                                        <span class="t2-b">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 2">
                                        <span class="t2-c">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span class="t2">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <span class="t1">{{item.name}}</span>
                                    <span class="t1">{{item.need_money}}</span>
                                </dd>
                            </dl>
                            <dl class="dola-report-invest-list" :style="{'display':isBvisible}" v-if="report.userPortrait">
                                <dt>
                                    <span class="t1">排名</span>
                                    <span class="t1">用户名</span>
                                    <span class="t1">待还金额</span>
                                </dt>
                                <dd v-for="(item,index) in report.userPortrait.topLoanUser" :key="index">
                                    <template v-if="index == 0">
                                        <span class="t2-a">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 1">
                                        <span class="t2-b">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 2">
                                        <span class="t2-c">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span class="t2">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <span class="t1">{{item.name}}</span>
                                    <span class="t1">{{item.need_money}}</span>
                                </dd>
                            </dl>
                            <dl class="dola-report-invest-list" :style="{'display':isCvisible}" v-if="loanarea">
                                <dt>
                                    <span class="t1">排名</span>
                                    <span class="t1">省份</span>
                                    <span class="t1">占比</span>
                                </dt>
                                <dd v-for="(item,index) in loanarea" :key="index">
                                    <template v-if="index == 0">
                                        <span class="t2-a">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 1">
                                        <span class="t2-b">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 2">
                                        <span class="t2-c">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else>
                                            <span class="t2">
                                                <em class="lineBlock va-m">{{index + 1}}</em>
                                                <b class="lineBlock va-m emptys"></b>
                                            </span>
                                    </template>
                                    <span class="t1">{{item.name}}</span>
                                    <span class="t1">{{item.value}}%</span>
                                </dd>
                            </dl>
                            <dl class="dola-report-invest-list" :style="{'display':isDvisible}" v-if="report.userPortrait">
                                <dt>
                                    <span class="t1">排名</span>
                                    <span class="t1">用户名</span>
                                    <span class="t1">推荐人数</span>
                                </dt>
                                <dd v-for="(item,index) in report.userPortrait.topInviteUser" :key="index">
                                    <template v-if="index == 0">
                                        <span class="t2-a">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 1">
                                        <span class="t2-b">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 2">
                                        <span class="t2-c">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span class="t2">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <span class="t1">{{item.name}}</span>
                                    <span class="t1">{{item.count}}</span>
                                </dd>
                            </dl>
                            <dl class="dola-report-invest-list" :style="{'display':isEvisible}" v-if="report.userPortrait">
                                <dt>
                                    <span class="t1">排名</span>
                                    <span class="t1">用户名</span>
                                    <span class="t1">已获佣金</span>
                                </dt>
                                <dd v-for="(item,index) in report.userPortrait.topCashUser" :key="index">
                                    <template v-if="index == 0">
                                        <span class="t2-a">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 1">
                                        <span class="t2-b">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else-if="index == 2">
                                        <span class="t2-c">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span class="t2">
                                            <em class="lineBlock va-m">{{index + 1}}</em>
                                            <b class="lineBlock va-m emptys"></b>
                                        </span>
                                    </template>
                                    <span class="t1">{{item.name}}</span>
                                    <span class="t1">{{item.total_money}}</span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import {Swipe, SwipeItem} from 'mint-ui';
    import TitleBar from '../common/TitleBar.vue'
    import Util from '../../util/index'
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'report',
        data() {
            return {
                title: '运营数据',
                wrapperHeight: 0,
                active: 0,
                listtext: ['投资大户', '借款大户', '借款人分布', '推荐达人', '推荐奖励'],
                app: false,
                isAvisible: 'block',
                isBvisible: 'none',
                isCvisible: 'none',
                isDvisible: 'none',
                isEvisible: 'none'
            }
        },
        computed: mapState({
            report: state => state.report.reportdata,
            loanarea: state => state.report.loanarea
        }),
        created() {
            var app = this.$route.query.platform;
            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.app = true;
            } else {
                this.app = false;
            }
            this.getOperationReports();
        },
        watch: {
            $route(to) {
                if (to.path == '/about/report') {
                    window.scrollTo(0, 0);
                }
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - 0;
        },
        methods: {
            getOperationReports() {
                this.$store.dispatch({
                    type: 'report'
                });
                this.$store.dispatch({
                    type: 'loanarea'
                });
            },
            tab(index) {
                this.active = index;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                this.isCvisible = 'none';
                this.isDvisible = 'none';
                this.isEvisible = 'none';
                if (index == 0) {
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";
                } else if (index == 1) {
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";
                } else if (index == 2) {
                    index == 2 ? this.isCvisible = 'block' : this.isCvisible = "none";
                } else if (index == 3) {
                    index == 3 ? this.isDvisible = 'block' : this.isDvisible = "none";
                } else if (index == 4) {
                    index == 4 ? this.isEvisible = 'block' : this.isEvisible = "none";
                }
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/report.css";

    .mint-swipe-items-wrap > div.is-active {
        z-index: 99;
    }

    .mint-swipe-items-wrap > div {
        overflow: hidden;
        background: #fff;
        z-index: 98;
    }
    .dola-report-box .tip-num{
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        color:#999999;
    }
</style>
