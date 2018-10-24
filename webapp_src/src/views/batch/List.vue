<template>
    <section class="dola-automatic-list">
        <div class="dola-title">
            <a href="javascript:history.go(-1);" class="backer" v-if="!isApp"></a>
            <ul class="dola-title-tab">
                <li @click="handleTab(index)" :class="{'curr':titleDefaultIndex==index}" v-for="(item,index) in titleArr" :key="index">{{item}}</li>
            </ul>
        </div>
        <div class="list">
            <scroll ref="scrollStandard" class="scroll-content" @loadMore="loadMoreStandard" :pullup="pullup" :listen-scroll="listenScroll" :style="{'display':isAvisible}">
                <div>
                    <table border="0" cellspacing="0" cellpadding="0" v-if="batchLoanList">
                        <thead>
                        <tr>
                            <th>借款人</th>
                            <th>借款金额(元)</th>
                            <th>期限</th>
                            <th>往期年化收益率</th>
                            <th>融资进度</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="batchLoanList.length > 0">
                            <tr v-for="item in batchLoanList">
                                <td>{{item.debtor_first_name}}</td>
                                <td>{{item.loan_amount}}</td>
                                <td>{{item.loan_period}}个月</td>
                                <td>{{item.interest_rate}}%</td>
                                <td>{{parseInt(item.matched_amount / item.loan_amount * 100).toFixed(0) + '%'}}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr style="border-bottom: none">
                                <td colspan="5">
                                    <div class="no-data-box">
                                        <i class="no-data-dom"></i>
                                        <p>空空如也...</p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <p class="no-data" v-if="batchLoanListtData.maxPage > 1">{{standardLoadingtext}}</p>
                </div>
            </scroll>
            <scroll ref="scrollTransfer" class="scroll-content" @loadMore="loadMoreTransfer" :pullup="pullup" :listen-scroll="listenScroll" :style="{'display':isBvisible}">
                <div>
                    <table border="0" cellspacing="0" cellpadding="0" v-if="batchTransferList">
                        <thead>
                        <tr>
                            <th>转让人</th>
                            <th>转让本金(元)</th>
                            <th>剩余期限</th>
                            <th>往期年化收益率</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="batchTransferList.length > 0">
                            <tr v-for="item in batchTransferList">
                                <td>{{item.debtor_first_name}}</td>
                                <td>{{item.principal}}</td>
                                <td>{{item.left_period_text}}</td>
                                <td>{{item.interest_rate}}%</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr style="border-bottom: none">
                                <td colspan="4">
                                    <div class="no-data-box">
                                        <i class="no-data-dom"></i>
                                        <p>空空如也...</p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <p class="no-data" v-if="batchTransferListData.maxPage > 1">{{transferdLoadingtext}}</p>
                </div>
            </scroll>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import Util from '../../util/index'
    import Scroll from '../../components/scroll.vue'


    export default {
        name: 'batchlist',
        computed: mapState({
            batchLoanList: state => state.regular.batchLoanList,
            batchLoanListtData: state => state.regular.batchLoanListtData,
            batchTransferList: state => state.regular.batchTransferList,
            batchTransferListData: state => state.regular.batchTransferListData
        }),
        data() {
            return {
                title: '',
                isApp: false,
                type: 3,
                titleArr: ['散标列表可投', '债权转让可投'],
                titleDefaultIndex: 0,
                pullup: true,
                isAvisible: 'block',
                isBvisible: 'none',
                standardPage: 1,
                transferPage: 1,
                listenScroll: true,
                filter_period: '',
                standardLoadingtext: '上滑松开更新数据....',
                transferdLoadingtext: '上滑松开更新数据....'
            }
        },
        watch: {
            $route(to) {
                if (to.path == '/batch/list') {
                    window.location.reload();
                }
            }
        },
        created() {
            var platform = Util.getCookie('platform');
            var type = this.$route.query.type;
            var startPeriod = this.$route.query.start * 1;
            var endPeriod = this.$route.query.end * 1;
            this.init(type, startPeriod, endPeriod);

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }

        },
        mounted() {
            this.$refs.scrollStandard.refresh();
            this.$refs.scrollTransfer.refresh();
        },
        methods: {
            init(type, startPeriod, endPeriod) {
                this.filter_period = startPeriod;
                while (startPeriod < endPeriod) {
                    this.filter_period = this.filter_period + ',' + (startPeriod + 1);
                    startPeriod++;
                }
                if (type == 1) {
                    this.getLoanList(true, false);
                    this.titleArr = ['散标列表可投'];
                    this.type = 1;
                    this.isAvisible = 'block';
                    this.isBvisible = 'none';
                } else if (type == 2) {
                    this.getTransferList(true, false);
                    this.titleArr = ['债权转让可投'];
                    this.type = 2;
                    this.isAvisible = 'none';
                    this.isBvisible = 'block';
                } else if (type == 3) {
                    this.getLoanList(true, false);
                    this.titleArr = ['散标列表可投', '债权转让可投'];
                    this.type = 3;
                    this.isAvisible = 'block';
                    this.isBvisible = 'none';
                } else {
                    this.getLoanList(true, false);
                    this.titleArr = ['散标列表可投', '债权转让可投'];
                    this.type = 3;
                    this.isAvisible = 'block';
                    this.isBvisible = 'none';
                }
                this.listenScroll = true;
            },
            getLoanList(flag, condition) {
                this.$store.dispatch({
                    type: 'batchLoanList',
                    filter_status: 'FUNDRAISING',
                    filter_period: this.filter_period,
                    filter_unmatch_amount: '0,1000000000',
                    page: this.standardPage,
                    page_size: 10,
                    loading: flag,
                    condition: condition
                });
            },
            getTransferList(flag, condition) {
                this.$store.dispatch({
                    type: 'batchTransferList',
                    filter_status: 'QUEUE',
                    filter_period: this.filter_period,
                    filter_money: '0.01,10000000000',
                    page: this.transferPage,
                    page_size: 10,
                    loading: flag,
                    condition: condition
                });
            },
            loadMoreStandard() {
                this.standardPage++;
                if (this.standardPage <= this.batchLoanListtData.maxPage) {
                    this.getLoanList(false, false);
                    this.$refs.scrollStandard.refresh();
                } else {
                    this.$refs.scrollStandard.refresh();
                    this.standardLoadingtext = '已经没有数据了';
                }
            },
            loadMoreTransfer() {
                this.transferPage++;
                if (this.transferPage <= this.batchTransferListData.maxPage) {
                    this.getTransferList(false, false);
                    this.$refs.scrollTransfer.refresh();
                } else {
                    this.$refs.scrollTransfer.refresh();
                    this.transferdLoadingtext = '已经没有数据了';
                }
            },
            handleTab(index) {
                //导航条切换 重置
                this.titleDefaultIndex = index;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                this.standardPage = 1;
                this.transferPage = 1;

                if (index == 0) {
                    this.getLoanList(true, true);
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";
                    this.$refs.scrollStandard.refresh();
                } else if (index == 1) {
                    this.getTransferList(true, true);
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";
                    this.$refs.scrollTransfer.refresh();
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
    @import "../../assets/css/wap/automatic.css";

    .scroll-content {
        height: calc(100% - 44px);
        -webkit-overflow-scrolling: touch;
    }
</style>