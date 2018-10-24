<template>
    <section class="dola-investment-details">
        <div class="dola-title dola-title-zindex">
            <router-link to="/user/detail" class="backer" v-if="!isApp"></router-link>
            <ul class="dola-title-tab">
                <li @click="handleTab(index)" :class="{'curr':titleDefaultIndex==index}" v-for="(item,index) in titleArr" :key="index">{{item}}</li>
            </ul>
        </div>
        <!--搜索条件-->
        <div class="dola-investment-details-sebox">
            <ul class="search-condition boxsiz">
                <li>
                    <span class="t1" @click="resets()">全部</span>
                </li>
                <li @click="handleSelect(index)" :class="{'curr':searchDefaultIndex==index}" v-for="(item,index) in searchCondition" :key="index">
                    <span class="t1">{{item}}</span><i></i>
                </li>
            </ul>
        </div>
        <!--随心投-->
        <scroll ref="scroll" class="scroll-content boxsiz" @loadMore="loadMore" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isBvisible}">
            <div>
                <div class="dola-investment-details-con" v-if="userPlanDetail.userPlan">
                    <div class="txt clr boxsiz">
                        <div class="fl b l l-color boxsiz">
                            <div class="wrap">
                                <p class="txt-t1">累计收益(元）</p>
                                <p class="txt-t2">{{userPlanDetail.totalIncome_format}}</p>
                            </div>
                        </div>
                        <div class="fr b r boxsiz">
                            <div class="wrap">
                                <p class="txt-t1">随心投总资产(元）</p>
                                <p class="txt-t2">{{userPlanDetail.totalAsset_format}}</p>
                            </div>
                        </div>
                    </div>
                    <ul class="dola-investment-details-view boxsiz">
                        <template v-if="userPlanDetail.userPlan.list.length > 0">
                            <template v-for="(item,index) in userPlanDetaildata">
                                <!--收益中-->
                                <template v-if="type == 1">
                                    <li class="boxsiz" :key="index">
                                        <a :href=" '/regular/plan_detail?user_plan_id='+ item.id+'&is_new='+item.is_new_plan">
                                            <div class="top clr">
                                                <p class="fl view-t1">{{item.show_name}}</p>
                                                <div class="fr r">
                                                    <span :style="{'width':Math.ceil(item.exit_percent * 100)+'%'}"></span>
                                                    <em>{{item.exit_content}}</em>
                                                </div>
                                            </div>
                                            <div class="view-money">
                                                <dl>
                                                    <dt>{{item.money}}</dt>
                                                    <dd>加入本金（元）</dd>
                                                </dl>
                                                <dl>
                                                    <dt>{{item.earned_income}}</dt>
                                                    <dd>累计收益（元）</dd>
                                                </dl>
                                                <dl>
                                                    <dt>{{item.expect_income}}</dt>
                                                    <dd>往期参考收益（元）</dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>
                                </template>
                                <!--已退出-->
                                <template v-else-if="type == 2">
                                    <li class="boxsiz" :key="index">
                                        <a :href=" '/regular/plan_detail?user_plan_id='+ item.id+'&is_new='+item.is_new_plan">
                                            <div class="top clr">
                                                <p class="fl view-t1">{{item.show_name}}</p>
                                            </div>
                                            <div class="view-money">
                                                <dl>
                                                    <dt>{{item.money}}</dt>
                                                    <dd>加入本金（元）</dd>
                                                </dl>
                                                <dl>
                                                    <dt>{{item.earned_income}}</dt>
                                                    <dd>累计收益（元）</dd>
                                                </dl>
                                                <dl>
                                                    <dt>{{item.exit_time_format}}</dt>
                                                    <dd>退出时间</dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            <li class="boxsiz">
                                <div class="no-data-box">
                                    <i class="no-data"></i>
                                    <p>空空如也...</p>
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="investmentdetails-load-text" v-if="userPlanDetail.userPlan.maxPage > 1">{{loadingtext}}</div>
                </div>
            </div>
        </scroll>
        <!--散标-->
        <scroll ref="scrollStandard" class="scroll-content boxsiz" @loadMore="loadMoreStandard" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isAvisible}">
            <div>
                <div class="dola-investment-details-con">
                    <div class="txt clr boxsiz" v-if="investmentListdata">
                        <router-link class="fl b l boxsiz" tag="div" to="/repayments">
                            <div class="wrap">
                                <p class="txt-t1">本月应回本息(元)</p>
                                <p class="txt-t2">{{investmentListdata.need_payback_month}}</p>
                                <i></i>
                            </div>
                        </router-link>
                        <div class="fr b r boxsiz">
                            <div class="wrap">
                                <p class="txt-t1">散标总资产(元)</p>
                                <p class="txt-t2">{{investmentListdata.total_standard_money}}</p>
                            </div>
                        </div>
                    </div>
                    <ul class="dola-investment-details-view boxsiz">
                        <template v-if="investmentList.length > 0">
                            <li class="boxsiz" v-for="(item,index) in investmentList" :key="index">
                                <a :href="'/#/plandetail?id='+item.investment_id+'&is_novice='+item.is_novice">
                                    <div class="top clr">
                                        <p class="fl view-t1">{{item.loan_text}}</p>
                                        <div class="fr r" v-if="item.left_date > 0">
                                            <span :style="{'width':item.day_rate+'%'}"></span>
                                            <em>剩余{{item.left_date}}天</em>
                                        </div>
                                    </div>
                                    <div class="view-money">
                                        <dl>
                                            <dt>{{item.principal}}</dt>
                                            <dd>投入本金(元)</dd>
                                        </dl>
                                        <dl>
                                            <dt>{{item.payback_principal_interest}}</dt>
                                            <dd>累计已回本息(元)</dd>
                                        </dl>
                                        <dl>
                                            <dt>{{item.history_interest}}</dt>
                                            <dd>往期参考收益(元)</dd>
                                        </dl>
                                    </div>
                                </a>
                                <template v-if="item.can_transfer">
                                    <div class="status-text">
                                        <template v-if="item.is_payment_day">
                                            <a class="btn lineBlock va-m btn-end" @click="handleTransfer()">申请转让</a>
                                        </template>
                                        <template v-else>
                                            <router-link class="btn lineBlock va-m" :to="'/transfer/application?id='+item.investment_id">申请转让</router-link>
                                        </template>
                                        <router-link class="btn lineBlock va-m" :to="'/repaymentsplan?id='+item.investment_id">查看回款计划</router-link>
                                    </div>
                                </template>
                                <template v-else>
                                    <template v-if="item.loan_status == 3">
                                        <div class="status-text">
                                            <a class="btn lineBlock va-m btn-end" @click="handleTransfer()">申请转让</a>
                                            <router-link class="btn lineBlock va-m" :to="'/repaymentsplan?id='+item.investment_id">查看回款计划</router-link>
                                        </div>
                                    </template>
                                    <template v-else-if="item.loan_status == 2">
                                        <div class="status-text">
                                            <span class="t3 va-m">{{item.loan_status_text}}</span>
                                        </div>
                                    </template>
                                </template>
                                <template v-if="item.is_novice == 1">
                                    <p class="novice" v-if="item.interest_rate === 8">新手专享投标，享受平台1%年化奖励</p>
                                    <p class="novice" v-else>新手专享投标，期满3个月免费为您自动债转</p>
                                </template>
                            </li>
                        </template>
                        <template v-else>
                            <li class="boxsiz">
                                <div class="no-data-box">
                                    <i class="no-data"></i>
                                    <p>空空如也...</p>
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="investmentdetails-load-text" v-if="investmentListdata.maxPage > 1">{{standardLoadingtext}}</div>
                </div>
            </div>
        </scroll>
        <!--搜索弹出部分-->
        <div class="sanbiao-search" v-if="search_flag">
            <ul class="clr">
                <template v-if="searchType == 'peroid'">
                    <!--期限-->
                    <li @click="handleFilter(index)" :class="{'curr':peroidActive==index}" v-for="(item,index) in peroidArr" :key="index" class="lineBlock">{{item}}</li>
                </template>
                <template v-else-if="searchType == 'status'">
                    <!--状态-->
                    <li @click="handleFilter(index)" :class="{'curr':statusActive==index}" v-for="(item,index) in statusArr" :key="index" class="lineBlock">{{item}}</li>
                </template>
            </ul>
        </div>
        <div class="sanbiao-search-fade" @click="close()" v-if="search_flag"></div>
    </section>
</template>
<script>
    import TitleBar from '../common/TitleBar.vue'
    import Scroll from '../../components/scroll.vue'
    import {mapState} from 'vuex'
    import Util from '../../util/index'
    import {Toast} from 'mint-ui'

    export default {
        name: 'investmentdetails',
        data() {
            return {
                titleArr: ['散标', '随心投'],
                titleDefaultIndex: 0,
                searchCondition: ['期限', '状态'],
                searchDefaultIndex: -1,
                peroidArr: ['全部', '0-3个月', '3-6个月', '6-12个月', '12-24个月', '24个月以上'],
                statusArr: ['在投', '已退出'],
                peroidActive: 0,
                statusActive: 0,
                search_flag: false,
                searchType: 'peroid',
                isAvisible: 'block',
                isBvisible: 'none',
                pullup: true,
                page: 1,
                type: 1,
                period: 0,
                standardPage: 1,
                loadingtext: '上滑松开更新数据.....',
                standardLoadingtext: '上滑松开更新数据....',
                filter_from: 'STANDARD,TRANSFER',
                filter_period: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36',
                filter_status: 'FUNDRAISING,PAYBACK,FINISH,ADVAN_FINISH,FAILURE',
                isApp: false
            }
        },
        computed: mapState({
            userPlanDetail: state => state.user.userPlanDetail,
            userPlanDetaildata: state => state.user.userPlanDetaildata,
            investmentList: state => state.user.investmentList,
            investmentListdata: state => state.user.investmentListdata
        }),
        created() {
            this.listenScroll = true;
        },
        mounted() {
            //默认记载随心投&&初始化随心投scroll
            this.getInvestmentList(true, true);
            this.$refs.scroll.refresh();

            var platform = Util.getCookie('platform');

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            getUserPlan(loading, condition) {
                this.$store.dispatch({
                    type: 'userPlanDetail',
                    page: this.page,
                    status: this.type,
                    period: this.period,
                    page_size: 10,
                    loading: loading,
                    condition: condition
                });
            },
            getInvestmentList(loading, condition) {
                this.$store.dispatch({
                    type: 'investmentList',
                    filter_from: this.filter_from,
                    filter_period: this.filter_period,
                    filter_status: this.filter_status,
                    page: this.standardPage,
                    page_size: 10,
                    loading: loading,
                    condition: condition
                });
            },
            handleTab(index) {
                //导航条切换 重置
                this.titleDefaultIndex = index;
                this.page = 1;
                this.standardPage = 1;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                //搜索弹出框关闭
                this.search_flag = false;
                if (index == 0) {
                    this.peroidActive = 0;
                    this.statusActive = 0;
                    this.type = 1;
                    this.period = 0;
                    this.filter_period = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36';
                    this.filter_status = "FUNDRAISING,PAYBACK,FINISH,ADVAN_FINISH,FAILURE";
                    this.searchCondition[0] = '期限';
                    this.searchCondition[1] = '状态';
                    this.getInvestmentList(true, true);
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";
                    this.$refs.scrollStandard.refresh();
                } else if (index == 1) {
                    this.peroidActive = 0;
                    this.statusActive = 0;
                    this.type = 1;
                    this.period = 0;
                    this.searchCondition[0] = '期限';
                    this.searchCondition[1] = '状态';
                    this.getUserPlan(true, true);
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";
                    this.$refs.scroll.refresh();
                }
            },
            handleSelect(index) {
                //选择单一搜索条件
                this.searchDefaultIndex = index;
                this.search_flag = true;
                if (index == 0) {
                    // 期限筛选
                    this.searchType = 'peroid';
                    //重置分页数
                    this.page = 1;
                    this.standardPage = 1;
                } else if (index == 1) {
                    //状态筛选
                    this.searchType = 'status';
                    //重置分页数
                    this.page = 1;
                    this.standardPage = 1;
                }
                this.$refs.scroll.refresh();
                this.$refs.scrollStandard.refresh();
            },
            handleFilter(index) {
                //搜索条件切换
                this.search_flag = false;
                if (this.searchType == 'peroid') {
                    // 期限筛选
                    this.peroidActive = index;
                    //重置分页数
                    this.page = 1;
                    this.standardPage = 1;
                    if (this.titleDefaultIndex == 0) {
                        switch (index) {
                            case 0:
                                this.filter_period = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36";
                                break;
                            case 1:
                                this.filter_period = "1,2,3";
                                break;
                            case 2:
                                this.filter_period = "3,4,5,6";
                                break;
                            case 3:
                                this.filter_period = "6,7,8,9,10,11,12";
                                break;
                            case 4:
                                this.filter_period = "12,13,14,15,16,17,18,19,20,21,22,23,24";
                                break;
                            case 5:
                                this.filter_period = "24,25,26,27,28,29,30,31,32,33,34,35,36";
                                break;
                            default:
                                this.period = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36";
                        }
                    } else if (this.titleDefaultIndex == 1) {
                        switch (index) {
                            case 0:
                                this.period = 0;
                                break;
                            case 1:
                                this.period = 1;
                                break;
                            case 2:
                                this.period = 3;
                                break;
                            case 3:
                                this.period = 6;
                                break;
                            case 4:
                                this.period = 12;
                                break;
                            case 5:
                                this.period = 24;
                                break;
                            default:
                                this.period = 0;
                        }
                    }

                    if (this.peroidArr[index] == '全部') {
                        this.searchCondition[0] = '期限';
                    } else {
                        this.searchCondition[0] = this.peroidArr[index];
                    }
                    //期限搜索条件变化 重新调用数据 注意刷新scroll
                    if (this.titleDefaultIndex == 0) {
                        this.getInvestmentList(true, true);
                    } else if (this.titleDefaultIndex == 1) {
                        this.getUserPlan(true, true);
                    }
                } else if (this.searchType == 'status') {
                    //状态筛选
                    this.statusActive = index;
                    //重置分页数
                    this.page = 1;
                    this.standardPage = 1;
                    if (this.titleDefaultIndex == 0) {
                        switch (index) {
                            case 0:
                                this.filter_status = "FUNDRAISING,PAYBACK";
                                break;
                            case 1:
                                this.filter_status = "FINISH,ADVAN_FINISH,FAILURE";
                                break;
                            default:
                                this.filter_status = "FUNDRAISING,PAYBACK";
                        }

                    } else if (this.titleDefaultIndex == 1) {
                        switch (index) {
                            case 0:
                                this.type = 1;
                                break;
                            case 1:
                                this.type = 2;
                                break;
                            default:
                                this.type = 1;
                        }
                    }

                    if (this.statusArr[index] == '全部') {
                        this.searchCondition[1] = '状态';
                    } else {
                        this.searchCondition[1] = this.statusArr[index];
                    }
                    //状态搜索条件变化 重新调用数据 注意刷新scroll
                    if (this.titleDefaultIndex == 0) {
                        this.getInvestmentList(true, true);
                    } else if (this.titleDefaultIndex == 1) {
                        this.getUserPlan(true, true);
                    }
                }
                //全部刷新sroll组件
                this.$refs.scroll.refresh();
                this.$refs.scrollStandard.refresh();
            },
            handleTransfer() {
                let instance = Toast({
                    message: '不可转让',
                    duration: 1500
                });
            },
            close() {
                this.search_flag = false;
            },
            resets() {
                //重置所有搜索条件
                this.peroidActive = 0;
                this.statusActive = 0;
                this.standardPage = 1;
                this.page = 1;

                if (this.titleDefaultIndex == 0) {
                    this.filter_status = "FUNDRAISING,PAYBACK,FINISH,ADVAN_FINISH,FAILURE";
                    this.filter_period = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36'
                    this.getInvestmentList(true, true);
                } else if (this.titleDefaultIndex == 1) {
                    this.period = 0;
                    this.type = 1;
                    this.getUserPlan(true, true);
                }
                this.searchCondition = ['期限', '状态'];
                //全部刷新sroll组件
                this.$refs.scroll.refresh();
                this.$refs.scrollStandard.refresh();
            },
            loadMore() {
                //随心投加载更多
                this.page++;
                if (this.page <= this.userPlanDetail.userPlan.maxPage) {
                    this.getUserPlan(false, false);
                    this.$refs.scroll.refresh();
                } else {
                    this.$refs.scroll.refresh();
                    this.loadingtext = '已经没有数据了';
                }
            },
            loadMoreStandard() {
                //散标加载更多
                this.standardPage++;
                if (this.standardPage <= this.investmentListdata.maxPage) {
                    this.getInvestmentList(false, false);
                    this.$refs.scrollStandard.refresh();
                } else {
                    this.$refs.scrollStandard.refresh();
                    this.standardLoadingtext = '已经没有数据了';
                }
            }
        },
        components: {
            TitleBar,
            Scroll
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/investment_details.css";

    .scroll-content {
        height: 100%;
    }
    .sanbiao-search{
        top:85px;
    }

    .sanbiao-search-fade {
        height: 84%;
    }
</style>
