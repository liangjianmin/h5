<template>
    <section class="dola-repayments-detail">
        <TitleBar :title="title" v-if="!isApp"></TitleBar>
        <scroll ref="scroll" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadMore" :pullup="pullup" :listen-scroll="listenScroll">
            <div>
                <div class="dola-repayments-detail-con" :class="{'dola-repayments-detail-con-mt':isApp}">
                    <template v-if="paybackCalendarForDayData.total >0">
                        <p class="head-t1">{{paybackCalendarForDayData.key}}</p>
                        <div class="txt clr boxsiz" v-if="paybackCalendarForDay">
                            <div class="fl b l boxsiz">
                                <div class="wrap">
                                    <p class="txt-t1">当日应回本息(元）</p>
                                    <p class="txt-t2">{{paybackCalendarForDayData.total_need_payback_interest}}</p>
                                </div>
                            </div>
                            <div class="fr b r boxsiz">
                                <div class="wrap">
                                    <p class="txt-t1">当日已回本息(元）</p>
                                    <p class="txt-t2">{{paybackCalendarForDayData.total_has_payback_money}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="list">
                            <dl class="boxsiz">
                                <dd class="boxsiz" v-for="(item,index) in paybackCalendarForDay" :key="index">
                                    <p class="tit">{{item.show_name}}</p>
                                    <ul>
                                        <li>
                                            <p class="t1">{{item.need_payback_money}}</p>
                                            <p class="t2">应回本金(元）</p>
                                        </li>
                                        <li>
                                            <p class="t1">{{item.has_payback_money}}</p>
                                            <p class="t2">已回本金(元）</p>
                                        </li>
                                        <li>
                                            <p class="t3">应回利息(元）：<span>{{item.need_payback_interest}}</span>元</p>
                                            <p class="t3">已回利息(元）：<span>{{item.has_payback_interest}}</span>元</p>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <div class="morelaod" v-if="paybackCalendarForDayData.max_page > 1">{{loadingtext}}</div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="no-data-box">
                            <i class="no-data"></i>
                            <p>空空如也...</p>
                        </div>
                    </template>
                </div>
            </div>
        </scroll>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import Scroll from '../../components/scroll.vue'
    import Util from '../../util/index'

    export default {
        name: 'repaymentsDetails',
        data() {
            return {
                title: '回款明细',
                start_date: '',
                page: 1,
                pullup: true,
                loadingtext: '上滑松开更新数据.....',
                isApp: false
            }
        },
        computed: mapState({
            paybackCalendarForDayData: state => state.payback.paybackCalendarForDayData,
            paybackCalendarForDay: state => state.payback.paybackCalendarForDay
        }),
        watch: {
            $route(to) {
                var startDate = to.query.startDate;
                if (startDate != undefined) {
                    this.start_date = startDate;
                    this.page = 1;
                    this.getPaybackCalendarForDay(startDate, true, true);
                }
            }
        },
        created() {
            var startDate = this.$route.query.startDate;
            var platform = Util.getCookie('platform');
            this.listenScroll = true;
            if (startDate != undefined) {
                this.start_date = startDate;
                this.getPaybackCalendarForDay(startDate, true, false);
            }

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            getPaybackCalendarForDay(time, loading, condition) {
                this.$store.dispatch({
                    type: 'paybackCalendarForDay',
                    start_date: time,
                    page: this.page,
                    page_size: 10,
                    loading: loading,
                    condition: condition
                });
            },
            loadMore() {
                this.page++;
                if (this.page <= this.paybackCalendarForDayData.max_page) {
                    this.getPaybackCalendarForDay(this.start_date, false, false);
                    this.$refs.scroll.refresh();
                } else {
                    this.$refs.scroll.refresh();
                    this.loadingtext = '已经没有数据了';
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
    @import "../../assets/css/wap/repayments.css";
    .dola-repayments-detail-con-mt{
        padding-top: 0;
    }
    .scroll-content {
        height: 100%;
        -webkit-overflow-scrolling: touch;
    }
</style>
