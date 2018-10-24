<template>
    <section class="dd-reular">
        <!--搜索条件-->
        <div class="search-condition-box" v-if="conditioFlag">
            <!--系统维护期间-->
            <template v-if="loanListdata.notice_msg">
                <div class="time-txt" v-if="loanListdata.notice_msg !='' || transferListdata.notice_msg != ''">
                    <i class="lineBlock va-m"></i>
                    <em class="lineBlock va-m">
                        <marquee direction="left" scrollamount="3" hspace=10>{{loanListdata.notice_msg || transferListdata.notice_msg}}</marquee>
                    </em>
                    <b class="lineBlock emptys"></b>
                </div>
            </template>
            <ul class="search-condition boxsiz" style="display: none">
                <li>
                    <span class="t1" @click="reset()">全部</span>
                </li>
                <li @click="handleSelect(index)" :class="{'curr':searchDefaultIndex==index}" v-for="(item,index) in searchCondition" :key="index">
                    <span class="t1">{{item}}</span><i></i>
                </li>
            </ul>
        </div>
        <!--工具 -->
        <div class="dola-home-tools-regular boxsiz">
            <template v-if="loanListdata.batch_novice">
                <div class="newcomer boxsiz" v-if="loanListdata.batch_novice.is_show">
                    <p class="tit"><i class="icn lineBlock va-m"></i><span class="va-m">新手专享</span></p>
                    <ul class="boxsiz">
                        <i class="ico" v-if="loanListdata.batch_novice.novice_zone_interest_rate_three"></i>
                        <li class="boxsiz">
                            <p class="t1">
                                <template v-if="loanListdata.batch_novice.novice_zone_interest_rate_three">
                                    {{loanListdata.batch_novice.novice_zone_interest_rate_one}}<em>%+{{loanListdata.batch_novice.novice_zone_interest_rate_three}}%</em>
                                </template>
                                <template v-else>
                                    {{loanListdata.batch_novice.novice_zone_interest_rate_one}}<em>%</em>
                                </template>
                            </p>
                            <p class="t2">往期年化收益率</p>
                        </li>
                        <li class="boxsiz">
                            <p class="t3"><em>{{loanListdata.batch_novice.period}}</em>个月</p>
                            <p class="t2" v-if="loanListdata.batch_novice.novice_zone_interest_rate_three">期限</p>
                            <p class="t2" v-else>期满免费自动债转</p>
                        </li>
                        <li class="boxsiz tr">
                            <a :href="loanListdata.batch_novice.batch_novice_link" class="btn">去投资</a>
                            <p class="t4">最高可投<em>{{loanListdata.batch_novice.surplus_money}}</em>元</p>
                        </li>
                    </ul>
                </div>
            </template>
            <div class="dola-trading boxsiz">
                <p class="tit">投标工具</p>
                <dl>
                    <template v-if="loanListdata.batch_auto">
                        <dd class="boxsiz a" v-if="loanListdata.batch_auto.is_list_open == 1">
                            <a :href="'/#/bespeak/detail?batchNo=' + loanListdata.batch_auto.batch_no">
                                <p class="t1">预约投标</p>
                                <p class="t2">提前预约 无需抢标</p>
                                <p class="t3">
                                    <span class="va-m">去预约</span>
                                    <i class="icn lineBlock va-m"></i>
                                </p>
                            </a>
                        </dd>
                    </template>
                    <template v-if="loanListdata.investTool">
                        <dd class="boxsiz b">
                            <a href="/#/batch/detail/?type=3">
                                <p class="t1">一键投标</p>
                                <p class="t2">当前可投{{loanListdata.investTool.can_buy_amount}}元</p>
                                <p class="t3">
                                    <span class="va-m">去投资</span>
                                    <i class="icn lineBlock va-m"></i>
                                </p>
                            </a>
                        </dd>
                    </template>
                </dl>
            </div>
        </div>
        <!--title-->
        <div class="dola-title-reluar" v-if="loanListdata.investTool">
            <ul class="dola-title-tab">
                <li @click="handleTab(index)" :class="{'curr':titleDefaultIndex==index}" v-for="(item,index) in titleArr" :key="index">{{item}}</li>
            </ul>
        </div>
        <!--随心投-->
        <scroll ref="scroll" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadMore" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isAvisible}">
            <div>
                <section class="dola-regular boxsiz" v-if="regularindex.product">
                    <!--系统维护期间-->
                    <div class="time-txt" v-if="regularindex.notice_msg != ''">
                        <i class="lineBlock va-m"></i>
                        <em class="lineBlock va-m">
                            <marquee direction="left" scrollamount="3" hspace=10>{{regularindex.notice_msg}}</marquee>
                        </em>
                        <b class="lineBlock emptys"></b>
                    </div>
                    <div class="dola-regular-list boxsiz" v-if="regularindex.product">
                        <template v-for="(itemproduct,index) in regularindex.product">
                            <div class="product-list boxsiz" :key="index">
                                <dl class="boxsiz" v-for="(item,index)  in itemproduct.data" :key="index" :class="{'regular-list-box':index==itemproduct.data.length-1}">
                                    <dt class="boxsiz headtit bg-1" v-if="index == 0" :style="{backgroundImage:'url('+itemproduct.pic_url+')'}">
                                        <p class="headtit-t1" :style="{color:itemproduct.key_color}">{{itemproduct.key}}</p>
                                        <template v-if="itemproduct.introduce_url != ''">
                                            <p class="headtit-t2" @click="toUrl()" :style="{color:itemproduct.sub_title_color}">{{itemproduct.sub_title}}</p>
                                        </template>
                                        <template v-else>
                                            <p class="headtit-t2" :style="{color:itemproduct.sub_title_color}">{{itemproduct.sub_title}}</p>
                                        </template>
                                    </dt>
                                    <dd class="boxsiz">
                                        <div class="tit lbBox clr boxsiz">
                                            <div class="fl l lbBox">
                                                <span class="lineBlock t2 va-m">{{item.app_show_name}}</span>
                                            </div>
                                            <div class="fr r" v-if="item.free_content">
                                                <p class="t1">{{item.free_content}}</p>
                                            </div>
                                        </div>
                                        <ul class="txt clr">
                                            <li class="a boxsiz">
                                                <p class="t1">
                                                    <span>往期年化收益率</span>
                                                </p>
                                                <p class="t2">
                                                    <span>{{item.re_interest_rate}}</span><em>%</em>
                                                    <template v-if="item.add_interest_rate !='' &&  item.add_interest_rate!=0">
                                                        <em class="i5 add">+</em>
                                                        <span class="i5 add">{{item.add_interest_rate}}</span>
                                                        <em class="i5 add">%</em>
                                                    </template>
                                                </p>
                                            </li>
                                            <li class="b boxsiz">
                                                <p class="t1"><span>授权期限</span></p>
                                                <p class="t3"><span>{{item.period}}</span><em>个月</em></p>
                                            </li>
                                            <li class="c boxsiz">
                                                <template v-if="item.can_buy == true">
                                                    <template v-if="item.is_novice ==0">
                                                        <router-link :to="'/regular/detail/'+item.plan_id" class="dola-regular-btn">{{item.can_buy_text}}</router-link>
                                                    </template>
                                                    <template v-else-if="item.is_novice ==1">
                                                        <template v-if="regularindex.check_novice == true">
                                                            <router-link :to="'/regular/detail/'+item.plan_id" class="dola-regular-btn">{{item.can_buy_text}}</router-link>
                                                        </template>
                                                        <template v-else-if="regularindex.check_novice == false">
                                                            <router-link :to="'/regular/detail/'+item.plan_id" class="dola-regular-btn-c">{{item.can_buy_text}}</router-link>
                                                        </template>
                                                    </template>
                                                </template>
                                                <template v-else-if="item.can_buy == false">
                                                    <router-link :to="'/regular/detail/'+item.plan_id" class="dola-regular-btn-c">{{item.can_buy_text}}</router-link>
                                                </template>
                                            </li>
                                        </ul>
                                        <div class="clr dola-regular-status">
                                            <div class="fl l lbBox">
                                                <span class="lineBlock va-m" v-for="(conditiontext, index) in item.plan_condition" :key="index">{{conditiontext}}</span>
                                            </div>
                                            <div class="fr r lbBox">
                                                <p class="lineBlock va-m" v-if="item.hasInterestCoupon || item.hasVoucherCoupon">
                                                    <i class="ico-1 va-m" v-if="item.hasVoucherCoupon"></i>
                                                    <i v-if="item.hasInterestCoupon" class="ico-2 va-m"></i>
                                                    <em class="va-m" v-if="item.hasInterestCoupon || item.hasVoucherCoupon">可使用</em>
                                                </p>
                                            </div>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </template>
                        <div class="more-regular" @click="viewplan()" v-if="morestate">
                            <i class="top-arrow lineBlock va-m"></i>
                            <span class="lineBlock va-m">查看近期结束项目</span>
                        </div>
                        <template v-if="!morestate">
                            <div class="product-list boxsiz">
                                <dl class="boxsiz" v-for="(itemhistroy,index) in histroyplan" :key="index" v-if="regularindex.history_plan">
                                    <dt class="tits boxsiz" v-if="index == 0">近期结束项目</dt>
                                    <dd class="boxsiz">
                                        <div class="tit lbBox clr boxsiz">
                                            <div class="fl l lbBox">
                                                <span class="lineBlock t1-d va-m">定期</span>
                                                <span class="lineBlock t2 va-m">{{itemhistroy.app_show_name}}</span>
                                            </div>
                                        </div>
                                        <ul class="txt clr">
                                            <li class="a boxsiz">
                                                <p class="t1 lbBox">
                                                    <span class="lineBlock va-m">往期年化收益率</span>
                                                </p>
                                                <p class="t2"><span>{{itemhistroy.re_interest_rate}}</span><em>%</em></p>
                                            </li>
                                            <li class="b boxsiz">
                                                <p class="t1"><span>授权期限</span></p>
                                                <p class="t3"><span>{{itemhistroy.plan_period}}</span><em>个月</em></p>
                                            </li>
                                            <li class="c boxsiz">
                                                <template v-if="itemhistroy.app_plan_status == 1">
                                                    <a href="javascript:;" class="dola-regular-btn-end-a"></a>
                                                </template>
                                                <template v-if="itemhistroy.app_plan_status == 0">
                                                    <a href="javascript:;" class="dola-regular-btn-end-b"></a>
                                                </template>
                                            </li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <div class="morelaod" @click="loadMore()">{{loadingtext}}</div>
                        </template>
                    </div>
                </section>
            </div>
        </scroll>
        <!--散标列表-->
        <scroll ref="scrollStandard" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadMoreStandard" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isBvisible}">
            <div>
                <section class="sanbiao boxsiz">
                    <div class="sanbiao-list boxsiz" v-if="loanListdata.list && loanListHistory.list">
                        <!--筹集中-->
                        <template v-if="loanListdata.list.length > 0">
                            <dl class="boxsiz sanbiao-lists">
                                <dt class="tits boxsiz">可投散标列表</dt>
                                <template v-for="(item,index)  in loanList">
                                    <router-link class="boxsiz" tag="dd" :to="'/standard/detail/'+item.loan_id">
                                        <div class="top clr">
                                            <p class="fl l">{{item.loan_text}}</p>
                                        </div>
                                        <div class="center">
                                            <div class="item">
                                                <p class="t1"><span class="t1-a">{{item.interest_rate}}</span><span class="t1-b">%</span></p>
                                                <p class="t2">往期年化收益率</p>
                                            </div>
                                            <div class="item tc-mt">
                                                <p class="t3">等额本息</p>
                                                <p class="t2">回款方式</p>
                                            </div>
                                            <div class="item tc-mt">
                                                <p class="t3">{{item.loan_period}}个月</p>
                                                <p class="t2">期限</p>
                                            </div>
                                        </div>
                                        <div class="bottom">
                                            <div class="line">
                                                <span :style="{'width':parseInt(item.matched_amount / item.loan_amount * 100).toFixed(0)+'%'}"></span>
                                            </div>
                                            <div class="txt clr">
                                                <p class="t1 fl">进度：{{parseInt(item.matched_amount / item.loan_amount * 100).toFixed(0)}}%</p>
                                                <p class="t2 fr">剩余可投金额：{{item.unmatched_amount}}元</p>
                                            </div>
                                        </div>
                                    </router-link>
                                </template>
                            </dl>
                        </template>
                        <!--满标-->
                        <template v-if="loanListdata.currPage >= loanListdata.maxPage">
                            <template v-if="loanListHistory.list.length > 0">
                                <dl class="boxsiz recent-lists">
                                    <dt class="tits boxsiz">以下为近期已满标项目</dt>
                                    <template v-for="(item,index)  in loanListHistory.list">
                                        <router-link class="boxsiz" tag="dd" :to="'/standard/detail/'+item.loan_id">
                                            <div class="top clr">
                                                <p class="fl l">{{item.loan_text}}</p>
                                                <div class="fr r">
                                                    <span class="btns">{{item.status_text}}</span>
                                                </div>
                                            </div>
                                            <div class="center">
                                                <div class="item">
                                                    <p class="t1"><span class="t1-a">{{item.interest_rate}}</span><span class="t1-b">%</span></p>
                                                    <p class="t2">往期年化收益率</p>
                                                </div>
                                                <div class="item tc-mt">
                                                    <p class="t3">{{item.loan_period}}个月</p>
                                                    <p class="t2">期限</p>
                                                </div>
                                                <div class="item tc-mt">
                                                    <p class="t3">{{item.loan_amount}}</p>
                                                    <p class="t2">项目总额(元)</p>
                                                </div>
                                            </div>
                                        </router-link>
                                    </template>
                                </dl>
                            </template>
                            <template v-else>
                                <dl class="boxsiz">
                                    <dd class="boxsiz clearboxshadow">
                                        <div class="no-data-box">
                                            <i class="no-data"></i>
                                            <p>空空如也...</p>
                                        </div>
                                    </dd>
                                </dl>
                            </template>
                        </template>
                    </div>
                    <template v-if="loanListHistory.list">
                        <div v-if="loanListHistory.list.length > 0" class="morelaod" @click="loadMoreStandard()">{{standardLoadingtext}}</div>
                    </template>
                </section>
            </div>
        </scroll>
        <!--转让专区-->
        <scroll ref="scrollTransfer" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadTransfer" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isCvisible}">
            <div>
                <section class="sanbiao boxsiz">
                    <div class="sanbiao-list boxsiz" v-if="transferListdata.list && transferListHistory.list">
                        <template v-if="transferListdata.list.length > 0">
                            <template v-for="(item,index)  in transferList">
                                <!--QUEUE申请中-->
                                <template v-if="item.transfer_status_text_en == 'QUEUE'">
                                    <router-link class="boxsiz sanbiao-lists" tag="dl" :to="'/transfer/detail/'+item.transfer_id">
                                        <dt class="tits boxsiz" v-if="index == 0">可投转让列表</dt>
                                        <dd class="boxsiz">
                                            <div class="top clr">
                                                <p class="fl l"><span class="l-a va-m">{{item.loan_text}}</span><span class="lineBlock va-m l-b" v-if="item.discount_text != ''">{{item.discount_text}}</span></p>
                                                <div class="fr r lbBox">
                                                    <span class="btn">{{item.payback_mode}}</span>
                                                </div>
                                            </div>
                                            <div class="center">
                                                <div class="item">
                                                    <p class="t1"><span class="t1-a">{{item.interest_rate}}</span><span class="t1-b">%</span></p>
                                                    <p class="t2">往期年化收益率</p>
                                                </div>
                                                <div class="item tc-mt">
                                                    <p class="t3">{{item.left_period_text}}</p>
                                                    <p class="t2">剩余期限</p>
                                                </div>
                                                <div class="item tc-mt">
                                                    <p class="t3">{{item.transfer_money}}</p>
                                                    <p class="t2">转让本金(元)</p>
                                                </div>
                                            </div>
                                        </dd>
                                    </router-link>
                                </template>
                            </template>
                        </template>
                        <!--FINISH已转让-->
                        <template v-if="transferListdata.currPage >= transferListdata.maxPage">
                            <template v-if="transferListHistory.list.length > 0">
                                <template v-for="(items,index) in transferListHistory.list">
                                    <router-link class="recent-lists boxsiz" tag="dl" :to="'/transfer/detail/'+items.transfer_id">
                                        <dt class="tits boxsiz" v-if="index == 0">以下为近期结束项目</dt>
                                        <dd class="boxsiz">
                                            <div class="top clr">
                                                <p class="fl l">{{items.loan_text}}</p>
                                                <div class="fr r">
                                                    <span class="btns">{{items.loan_status_text}}</span>
                                                </div>
                                            </div>
                                            <div class="center">
                                                <div class="item">
                                                    <p class="t1"><span class="t1-a">{{items.interest_rate}}</span><span class="t1-b">%</span></p>
                                                    <p class="t2">往期年化收益率</p>
                                                </div>
                                                <div class="item tc-mt">
                                                    <p class="t3">{{items.left_period_text}}</p>
                                                    <p class="t2">剩余期限</p>
                                                </div>
                                                <div class="item tc-mt">
                                                    <p class="t3">{{items.transfer_money}}</p>
                                                    <p class="t2">转让本金(元)</p>
                                                </div>
                                            </div>
                                        </dd>
                                    </router-link>
                                </template>
                                <div class="morelaod">&nbsp;</div>
                            </template>
                            <template v-else>
                                <dl class="boxsiz">
                                    <dd class="boxsiz clearboxshadow">
                                        <div class="no-data-box">
                                            <i class="no-data"></i>
                                            <p>空空如也...</p>
                                        </div>
                                    </dd>
                                </dl>
                            </template>
                        </template>
                    </div>
                </section>
            </div>
        </scroll>
        <div class="dola-fixtop" v-if="topFlag" @click="toTop()"></div>
        <!--搜索弹出部分-->
        <div class="sanbiao-search" v-if="search_flag" :class="{'sanbiao-search-mt':loanListdata.notice_msg !='' || transferListdata.notice_msg != ''}">
            <ul class="clr">
                <template v-if="searchType == 'peroid'">
                    <!--期限-->
                    <li @click="handleFilter(index)" :class="{'curr':peroidActive==index}" v-for="(item,index) in peroidArr" :key="index" class="lineBlock">{{item}}</li>
                </template>
                <template v-else-if="searchType == 'amounts'">
                    <!--剩余可投金额-->
                    <li @click="handleFilter(index)" :class="{'curr':amountsActive==index}" v-for="(item,index) in amountsArr" :key="index" class="lineBlock">{{item}}</li>
                </template>
            </ul>
        </div>
        <div class="sanbiao-search-fade" @click="close()" v-if="search_flag"></div>
        <Footers></Footers>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Footers from '../common/Footer.vue'
    import Scroll from '../../components/scroll.vue'

    export default {
        name: 'regularindex',
        computed: {
            ...mapState({
                regularindex: state => state.regular.regularindex,
                histroyplan: state => state.regular.histroyplan,
                loanList: state => state.regular.loanList,
                loanListdata: state => state.regular.loanListdata,
                loanListHistory: state => state.regular.loanListHistory,
                transferList: state => state.regular.transferList,
                transferListdata: state => state.regular.transferListdata,
                transferListHistory: state => state.regular.transferListHistory
            }),
            listName() {
                return this.$route.query.list;
            }
        },
        data() {
            return {
                conditioFlag: false,
                titleArr: ['散标列表', '转让专区'],
                titleDefaultIndex: 0,
                searchCondition: ['期限', '剩余可投金额'],
                searchDefaultIndex: -1,
                peroidArr: ['全部', '0-3个月', '3-6个月', '6-12个月', '12-24个月', '24个月以上'],
                amountsArr: ['全部', '0-500元', '500-2k元', '2k-5k元', '5k-10k元', '10k以上元'],
                peroidActive: 0,
                amountsActive: 0,
                search_flag: false,
                searchType: 'peroid',
                page: 1,
                morestate: true,
                topFlag: false,
                loadingtext: '上滑松开更新数据.....',
                hasMore: true,
                pullup: true,
                isAvisible: 'none',
                isBvisible: 'block',
                isCvisible: 'none',
                standardPage: 1,
                standardLoadingtext: '上滑松开更新数据....',
                transferPage: 1,
                transferdLoadingtext: '上滑松开更新数据....',
                filter_period: '',
                filter_unmatch_amount: '',
                filter_money: '',
                filter_status: 'QUEUE',
                frequency: true
            }
        },
        created() {
            this.listenScroll = true;

            if (this.listName === 'standard') {
                this.handleTab(0);
            } else if (this.listName === 'transfer') {
                this.handleTab(1);
            } else {
                this.handleTab(0);
            }
        },
        mounted() {
            // 默认初始化srcoll
            this.$refs.scroll.refresh();
            this.$refs.scrollStandard.refresh();
            this.$refs.scrollTransfer.refresh();
        },
        methods: {
            viewplan() {
                this.morestate = false;
                this.topFlag = true;
            },
            getRegularindex() {
                this.$store.dispatch({
                    type: 'regularindex',
                    page: this.page,
                    pageSize: 10,
                    loading: true
                });
            },
            getLoanList(flag, condition) {
                //flag 是否启用loading提示  搜索条件变化是否重置数据
                this.$store.dispatch({
                    type: 'loanList',
                    filter_status: 'FUNDRAISING',
                    filter_period: this.filter_period,
                    filter_unmatch_amount: this.filter_unmatch_amount,
                    page: this.standardPage,
                    page_size: 10,
                    loading: flag,
                    condition: condition
                });
            },
            getLoanListHistory() {
                setTimeout(() => {
                    this.$store.dispatch({
                        type: 'loanListHistory',
                        filter_status: 'PAYBACK,FINISH,ADVAN_FINISH',
                        filter_period: this.filter_period,
                        filter_unmatch_amount: this.filter_unmatch_amount,
                        page: this.standardPage,
                        page_size: 200
                    });
                }, 10)
            },
            getTransferListHistory() {
                setTimeout(() => {
                    this.$store.dispatch({
                        type: 'transferListHistory',
                        filter_status: 'FINISH',
                        filter_period: this.filter_period,
                        filter_money: this.filter_money,
                        page: this.transferPage,
                        page_size: 200
                    });
                }, 10)
            },
            getTransferList(flag, condition) {
                //flag 是否启用loading提示  搜索条件变化是否重置数据
                this.$store.dispatch({
                    type: 'transferList',
                    filter_status: this.filter_status,
                    filter_period: this.filter_period,
                    filter_money: this.filter_money,
                    page: this.transferPage,
                    page_size: 10,
                    loading: flag,
                    condition: condition
                });
            },
            scrollEnd(pos) {
                if (pos.y < -300) {
                    this.topFlag = true;
                } else {
                    this.topFlag = false;
                }
            },
            loadMore() {
                //随心投加载更多
                if (!this.morestate) {
                    this.page++;
                    if (this.page >= 2) {
                        if (this.regularindex.history_plan.data.length > 0) {
                            this.$store.dispatch({
                                type: 'regularindex',
                                page: this.page,
                                pageSize: 20,
                                loading: false
                            });
                            this.$refs.scroll.refresh();
                        } else {
                            this.$refs.scroll.refresh();
                            this.loadingtext = '已经没有数据了';
                        }
                    }
                }
            },
            loadMoreStandard() {
                //散标加载更多
                this.standardPage++;
                if (this.standardPage <= this.loanListdata.maxPage) {
                    this.getLoanList(false, false);
                    this.$refs.scrollStandard.refresh();
                } else {
                    this.$refs.scrollStandard.refresh();
                    this.standardLoadingtext = '已经没有数据了';
                }
            },
            loadTransfer() {
                //转让加载更多
                this.transferPage++;
                if (this.transferPage <= this.transferListdata.maxPage) {
                    this.getTransferList(false, false);
                    this.getTransferListHistory();
                    this.$refs.scrollTransfer.refresh();
                } else {
                    this.$refs.scrollTransfer.refresh();
                    this.transferdLoadingtext = '已经没有数据了';
                }
            },
            toUrl() {
                this.$router.push({path: '/regular/introduction'});
            },
            handleTab(index) {
                //导航条切换 重置
                this.titleDefaultIndex = index;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                this.isCvisible = 'none';

                this.page = 1;
                this.standardPage = 1;
                this.transferPage = 1;

                //搜索弹出框关闭
                this.search_flag = false;
                if (index == 0) {
                    //散标列表
                    this.conditioFlag = true;

                    //重置条件
                    this.filter_period = '';
                    this.filter_unmatch_amount = '0,10000000000000000000000000';
                    this.peroidActive = 0;
                    this.amountsActive = 0;
                    this.searchCondition[0] = '期限';
                    this.searchCondition[1] = '剩余可投金额';
                    this.filter_status = 'QUEUE';
                    this.filter_money = '';

                    index == 0 ? this.isBvisible = 'block' : this.isBvisible = "none";
                    this.getLoanList(true, true);
                    this.getLoanListHistory();

                    if (this.$refs.scrollStandard) {
                        this.$refs.scrollStandard.refresh();
                    }

                } else if (index == 1) {
                    //转让专区
                    this.conditioFlag = true;

                    //重置条件
                    this.filter_period = '';
                    this.filter_unmatch_amount = '0,10000000000000000000000000';
                    this.peroidActive = 0;
                    this.amountsActive = 0;
                    this.searchCondition[0] = '期限';
                    this.searchCondition[1] = '转让本金';
                    this.filter_status = 'QUEUE';
                    this.filter_money = '';

                    index == 1 ? this.isCvisible = 'block' : this.isCvisible = "none";
                    this.getTransferList(true, true);
                    this.getTransferListHistory();

                    if (this.$refs.scrollTransfer) {
                        this.$refs.scrollTransfer.refresh();
                    }
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
                    this.transferPage = 1;
                    //重置转让的状态
                    this.filter_status = 'QUEUE';

                } else if (index == 1) {
                    //金额筛选
                    this.searchType = 'amounts';
                    //重置分页数
                    this.page = 1;
                    this.standardPage = 1;
                    this.transferPage = 1;
                    //重置转让的状态
                    this.filter_status = 'QUEUE';
                }
                this.$refs.scroll.refresh();
                this.$refs.scrollStandard.refresh();
                this.$refs.scrollTransfer.refresh();
            },
            handleFilter(index) {
                //搜索条件切换
                this.$refs.scroll.refresh();
                this.search_flag = false;
                if (this.searchType == 'peroid') {
                    // 期限筛选
                    this.peroidActive = index;
                    //重置分页数
                    this.standardPage = 1;
                    switch (index) {
                        case 0:
                            this.filter_period = '';
                            break;
                        case 1:
                            this.filter_period = '1,2,3';
                            break;
                        case 2:
                            this.filter_period = '3,4,5,6';
                            break;
                        case 3:
                            this.filter_period = '6,7,8,9,10,11,12';
                            break;
                        case 4:
                            this.filter_period = '12,13,14,15,16,17,18,19,20,21,22,23,24';
                            break;
                        case 5:
                            this.filter_period = '24,25,26,27,28,29,30,31,32,33,34,35,36,37,38';
                            break;
                        default:
                            this.filter_period = '';
                    }
                    if (this.peroidArr[index] == '全部') {
                        this.searchCondition[0] = '期限';
                    } else {
                        this.searchCondition[0] = this.peroidArr[index];
                    }
                    //期限搜索条件变化 重新调用数据 注意刷新scroll
                    if (this.titleDefaultIndex == 1) {
                        this.getLoanList(true, true);
                    } else if (this.titleDefaultIndex == 2) {
                        this.getTransferList(true, true);
                        this.getTransferListHistory();
                    }
                } else if (this.searchType == 'amounts') {
                    //剩余可投金额
                    this.amountsActive = index;
                    //重置分页数
                    this.standardPage = 1;
                    switch (index) {
                        case 0:
                            this.filter_unmatch_amount = '0,10000000000000000000000000';
                            this.filter_money = '';
                            break;
                        case 1:
                            this.filter_unmatch_amount = '0,500';
                            this.filter_money = '0,500';
                            break;
                        case 2:
                            this.filter_unmatch_amount = '500,2000';
                            this.filter_money = '500,2000';
                            break;
                        case 3:
                            this.filter_unmatch_amount = '2000,5000';
                            this.filter_money = '2000,5000';
                            break;
                        case 4:
                            this.filter_unmatch_amount = '5000,10000';
                            this.filter_money = '5000,10000';
                            break;
                        case 5:
                            this.filter_unmatch_amount = '10000,1000000000000000000000000000';
                            this.filter_money = '10000,1000000000000000000000000000';
                            break;
                        default:
                            this.filter_unmatch_amount = '0,10000000000000000000000000';
                            this.filter_money = '';
                    }
                    if (this.amountsArr[index] == '全部') {
                        if (this.titleDefaultIndex == 1) {
                            this.searchCondition[1] = '剩余可投金额';
                        } else if (this.titleDefaultIndex == 2) {
                            this.searchCondition[1] = '转让本金';
                        }
                    } else {
                        this.searchCondition[1] = this.amountsArr[index];
                    }
                    //金额搜索条件变化 重新调用数据 注意刷新scroll
                    if (this.titleDefaultIndex == 1) {
                        this.getLoanList(true, true);
                    } else if (this.titleDefaultIndex == 2) {
                        this.getTransferList(true, true);
                        this.getTransferListHistory();
                    }
                }

                //全部刷新sroll组件
                this.$refs.scroll.refresh();
                this.$refs.scrollStandard.refresh();
                this.$refs.scrollTransfer.refresh();
            },
            close() {
                this.search_flag = false;
            },
            reset() {
                //重置所有搜索条件
                this.filter_period = '';
                this.filter_unmatch_amount = '0,10000000000000000000000000';
                this.filter_money = '';
                this.filter_status = 'QUEUE';

                this.peroidActive = 0;
                this.amountsActive = 0;

                this.page = 1;
                this.standardPage = 1;
                this.transferPage = 1;

                if (this.titleDefaultIndex == 1) {
                    this.searchCondition[0] = '期限';
                    this.searchCondition[1] = '剩余可投金额';
                    this.getLoanList(true, true);
                } else if (this.titleDefaultIndex == 2) {
                    this.searchCondition[0] = '期限';
                    this.searchCondition[1] = '转让本金';
                    this.getTransferList(true, true);
                    this.getTransferListHistory();
                }
                //全部刷新sroll组件
                this.$refs.scroll.refresh();
                this.$refs.scrollStandard.refresh();
                this.$refs.scrollTransfer.refresh();
            },
            toReserve(batchNo) {
                window.location.href = '/#/bespeak/detail?batchNo=' + batchNo;
            },
            toTop() {
                this.$refs.scroll.scrollTo(0, 0);
                this.$refs.scrollStandard.scrollTo(0, 0);
                this.$refs.scrollTransfer.scrollTo(0, 0);
                this.topFlag = false;
            }
        },
        components: {
            Footers,
            Scroll
        }
    }
</script>
<style scoped>
    .scroll-content {
        height: calc(100% - 60px);
        -webkit-overflow-scrolling: touch;
    }

    .scroll-transfer-mt {
        padding-bottom: 4rem;
    }
</style>

