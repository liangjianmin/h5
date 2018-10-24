<template>
    <section class="dola-user-yuyue">
        <div class="dola-title" v-if="!isApp">
            <a href="javascript:history.go(-1);" class="backer"></a>
            <h2>我的预约</h2>
        </div>
        <ul class="dola-user-yuyue-tit" :class="{'dola-user-yuyue-tit-mt':isApp}">
            <li @click="tab(index)" :class="{'curr':active==index}" v-for="(item,index) in titleArr" :key="index">
                <template v-if="index == 0">
                    <span>{{item}}</span>
                    <i v-if="userBatchAutoListData.wait_num > 0">{{userBatchAutoListData.wait_num}}</i>
                </template>
                <template v-else>
                    <span>{{item}}</span>
                </template>
            </li>
        </ul>
        <div class="dola-user-yuyue-list">
            <!--等待中-->
            <scroll ref="reserveA" class="scroll-content dola-user-yuyue-list-content-a" @scrollEnd="scrollEnd" @loadMore="reserveWaitMore" :pullup="pullup" :probe-type="probeType" :listen-scroll="listenScroll" :style="{'display':isAvisible}">
                <div class="yuyue-mt">
                    <dl>
                        <template v-if="userBatchAutoList.length > 0">
                            <dd v-for="item in userBatchAutoList">
                                <div class="tit clr">
                                    <div class="fl l">
                                        <template v-if="item.is_novice == 1">
                                            <span class="t1 lineBlock va-m">新手专享</span>
                                        </template>
                                        <span class="t2 lineBlock va-m">预约时间：{{item.time_desc}}</span>
                                    </div>
                                    <template v-if="item.is_can_cancel == 1">
                                        <a class="fr r" @click="bespeakCanel(item.id)">取消预约</a>
                                    </template>
                                    <template v-else-if="item.is_can_cancel == 0 && item.is_novice == 1">
                                        <a class="fr r no">不可取消</a>
                                    </template>
                                    <template v-else>
                                        <a class="fr r">不可取消</a>
                                    </template>
                                </div>
                                <ul class="boxsiz">
                                    <li>
                                        <p class="t1">{{item.period_desc}}个月</p>
                                        <p class="t2">预约期限</p>
                                    </li>
                                    <li>
                                        <p class="t3">{{item.rate_desc}}%</p>
                                        <p class="t2">往期参考利率</p>
                                    </li>
                                    <li>
                                        <p class="t1">{{item.total_money}}元</p>
                                        <p class="t2">预约金额</p>
                                    </li>
                                </ul>
                                <template v-if="item.is_novice == 1">
                                    <p class="novice" v-if="item.novice_period_status">新手专享投标，享受平台1%年化奖励</p>
                                    <p class="novice" v-else>新手专享投标，期满3个月免费为您自动债转</p>
                                </template>
                            </dd>
                        </template>
                        <template v-else>
                            <dd>
                                <div class="no-data-box">
                                    <i class="no-data"></i>
                                    <p>空空如也...</p>
                                </div>
                            </dd>
                        </template>
                        <dd v-if="reserveWaittext != '' && userBatchAutoList.length >0">
                            <p class="no-data-text">{{reserveWaitText}}</p>
                        </dd>
                    </dl>
                </div>
            </scroll>
            <!--已完成-->
            <scroll ref="reserveB" class="scroll-content dola-user-yuyue-list-content-b" @scrollEnd="scrollEnd" @loadMore="reservDoneMore" :pullup="pullup" :probe-type="probeType" :listen-scroll="listenScroll" :style="{'display':isBvisible}">
                <div class="yuyue-mt">
                    <template v-if="userBatchAutoList.length > 0">
                        <dl v-for="item in userBatchAutoList">
                            <template v-if="item.is_novice == 1">
                                <dt>
                                    <p class="novice" v-if="item.novice_period_status">新手专享投标，享受平台1%年化奖励</p>
                                    <p class="novice" v-else>新手专享投标，期满3个月免费为您自动债转</p>
                                </dt>
                            </template>
                            <dd class="clr">
                                <p class="fl l">预约时间</p>
                                <p class="fr r">{{item.time_desc}}</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">预约期限</p>
                                <p class="fr r">{{item.period_desc}}个月</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">预约金额</p>
                                <p class="fr r">{{item.total_money}}元</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">投资成功金额</p>
                                <p class="fr r">{{item.use_money}}元</p>
                            </dd>
                            <dd class="clr" v-if="item.transfer_interest">
                                <p class="fl l">垫息金额</p>
                                <p class="fr r">{{item.transfer_interest}}元</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">完成时间</p>
                                <p class="fr r">{{item.end_time_desc}}</p>
                            </dd>
                        </dl>
                    </template>
                    <template v-else>
                        <dd>
                            <div class="no-data-box">
                                <i class="no-data"></i>
                                <p>空空如也...</p>
                            </div>
                        </dd>
                    </template>
                    <dd v-if="reservDoneText != '' && userBatchAutoList.length >0">
                        <p class="no-data-text">{{reservDoneText}}</p>
                    </dd>
                </div>
            </scroll>
            <!--已取消-->
            <scroll ref="reserveC" class="scroll-content dola-user-yuyue-list-content-c" @scrollEnd="scrollEnd" @loadMore="reservCanelMore" :pullup="pullup" :probe-type="probeType" :listen-scroll="listenScroll" :style="{'display':isCvisible}">
                <div class="yuyue-mt">
                    <template v-if="userBatchAutoList.length > 0">
                        <dl v-for="item in userBatchAutoList">
                            <dd class="clr">
                                <p class="fl l">预约时间</p>
                                <p class="fr r">{{item.time_desc}}</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">预约期限</p>
                                <p class="fr r">{{item.period_desc}}个月</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">预约金额</p>
                                <p class="fr r">{{item.total_money}}元</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">取消时间</p>
                                <p class="fr r">{{item.end_time_desc}}</p>
                            </dd>
                            <dd class="clr">
                                <p class="fl l">备注</p>
                                <p class="fr r">{{item.desc}}</p>
                            </dd>
                        </dl>
                    </template>
                    <template v-else>
                        <dd>
                            <div class="no-data-box">
                                <i class="no-data"></i>
                                <p>空空如也...</p>
                            </div>
                        </dd>
                    </template>
                    <dd v-if="reservCanelText != '' && userBatchAutoList.length >0">
                        <p class="no-data-text">{{reservCanelText}}</p>
                    </dd>
                </div>
            </scroll>
        </div>
    </section>
</template>
<script>
    import Scroll from '../../components/scroll.vue'
    import {MessageBox} from 'mint-ui'
    import {mapState} from 'vuex'
    import Util from '../../util/index'


    export default {
        name: 'bespeacklist',
        computed: mapState({
            userBatchAutoList: state => state.bespeak.userBatchAutoList,
            userBatchAutoListData: state => state.bespeak.userBatchAutoListData
        }),
        data() {
            return {
                active: 0,
                pullup: true,
                isApp: false,
                titleArr: ['等待中', '已完成', '已取消'],
                isAvisible: 'block',
                isBvisible: 'none',
                isCvisible: 'none',
                reserveWaitPage: 1,
                reservDonePage: 1,
                reservCanelPage: 1,
                type: 1,
                page_size: 10,
                reserveWaitText: '',
                reservDoneText: '',
                reservCanelText: ''
            }
        },
        watch: {
            $route(to) {
                if (to.path == '/user/bespeaklist') {
                    window.location.reload();
                }
            }
        },
        created() {
            this.listenScroll = true;
            this.getData(true, false, this.reserveWaitPage);

            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        mounted() {
            // 默认初始化srcoll
            this.$refs.reserveA.refresh();
            this.$refs.reserveB.refresh();
            this.$refs.reserveC.refresh();
        },
        methods: {
            bespeakCanel(id) {
                MessageBox({
                    title: '确认取消预约？',
                    message: '取消预约后系统将会对该笔预约金额进行资金解冻，该笔预约金额将不参与投资',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonClass: 'bank-btn-confirm',
                    cancelButtonClass: 'bank-btn-cancel',
                }).then(action => {
                    if (action == 'confirm') {
                        this.$store.dispatch({
                            type: 'userBatchAutoCancel',
                            batch_auto_id: id
                        });
                    }
                });
            },
            getData(loading, condition, page) {
                this.$store.dispatch({
                    type: 'userBatchAutoList',
                    types: this.type,
                    page: page,
                    page_size: this.page_size,
                    loading: loading,
                    condition: condition
                });
            },
            reserveWaitMore() {
                // 等待中加载更多
                this.reserveWaitPage++;
                console.log('reserveWaitPage：' + this.reserveWaitPage);
                if (this.reserveWaitPage <= this.userBatchAutoListData.maxPage) {
                    this.getData(false, false, this.reserveWaitPage);
                } else {
                    this.reserveWaitText = '已经没有数据了';
                }

                this.$refs.reserveA.refresh();
                this.$refs.reserveB.refresh();
                this.$refs.reserveC.refresh();
            },
            reservDoneMore() {
                // 已完成加载更多
                this.reservDonePage++;
                console.log('reservDonePage：' + this.reservDonePage);
                if (this.reservDonePage <= this.userBatchAutoListData.maxPage) {
                    this.getData(false, false, this.reservDonePage);
                } else {
                    this.reservDoneText = '已经没有数据了';
                }

                this.$refs.reserveA.refresh();
                this.$refs.reserveB.refresh();
                this.$refs.reserveC.refresh();
            },
            reservCanelMore() {
                // 已取消加载更多
                this.reservCanelPage++;
                console.log('reservCanelPage：' + this.reservCanelPage);
                if (this.reservCanelPage <= this.userBatchAutoListData.maxPage) {
                    this.getData(false, false, this.reservCanelPage);
                } else {
                    this.reservCanelText = '已经没有数据了';
                }

                this.$refs.reserveA.refresh();
                this.$refs.reserveB.refresh();
                this.$refs.reserveC.refresh();
            },
            tab(index) {
                this.active = index;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                this.isCvisible = 'none';

                if (index == 0) {
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";
                    this.type = 1;
                    this.getData(true, true, 1);
                } else if (index == 1) {
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";
                    this.type = 2;
                    this.getData(true, true, 1);
                } else if (index == 2) {
                    index == 2 ? this.isCvisible = 'block' : this.isCvisible = "none";
                    this.type = 3;
                    this.getData(true, true, 1);
                }

                this.reservDoneText = '';
                this.reserveWaitText = '';
                this.reservCanelText = '';

                this.$refs.reserveA.refresh();
                this.$refs.reserveB.refresh();
                this.$refs.reserveC.refresh();
            }
        },
        components: {
            Scroll
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/yuyue.css";
    .scroll-content {
        height: calc(100% - 44px);
        -webkit-overflow-scrolling: touch;
    }
    .dola-user-yuyue-tit-mt{
        padding-top: 0;
    }
</style>