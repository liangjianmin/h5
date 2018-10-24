<template>
    <section class="dola-transferList">
        <div class="dola-title dola-title-zindex">
            <router-link to="/user/detail" class="backer" v-if="!isApp"></router-link>
            <ul class="dola-title-tab">
                <li @click="handleTab(index)" :class="{'curr':titleDefaultIndex==index}" v-for="(item,index) in titleArr" :key="index">{{item}}</li>
            </ul>
        </div>
        <!--转让中-->
        <scroll ref="scrollStandard" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadTransferDoing" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isAvisible}">
            <div>
                <section class="sanbiao boxsiz transfer-box">
                    <div class="sanbiao-list boxsiz" v-if="usertransferList && usertransferListdata.list">
                        <template v-if="usertransferList && usertransferListdata.list.length > 0">
                            <ul class="transfer-lists">
                                <li class="transfer-list transfer-list01" v-for="(item, index) in usertransferList" :key="index">
                                    <a :href="'/#/plandetail?id='+item.investment_id">
                                        <div class="top">
                                            <span class="tit">{{item.loan_text}}({{item.interest_rate}}%|{{item.loan_period}}个月)</span>
                                        </div>
                                        <div class="cont">
                                            <div class="l">
                                                <p class="t">{{item.amount}}元</p>
                                                <p class="text">出借本金</p>
                                            </div>
                                            <div class="c" style="text-align: center;">
                                                <p class="t">{{item.amount}}元</p>
                                                <p class="text">转让本金</p>
                                            </div>
                                            <div class="r" style="text-align: right;">
                                                <p class="t">{{item.history_interest}}元</p>
                                                <p class="text">往期待回参考收益</p>
                                            </div>
                                        </div>
                                        <div class="cont">
                                            <div class="l">
                                                <p class="t">{{item.nearly_payment_date}}</p>
                                                <p class="text">下一回款日</p>
                                            </div>
                                            <div class="c" style="text-align: center;">
                                                <p class="t">{{ item.create_time_text }}</p>
                                                <p class="text">转让时间</p>
                                            </div>
                                            <!--<div class="c" style="text-align: center;">
                                                <p class="t">{{ item.accept_money }}元</p>
                                                <p class="text">转让价格</p>
                                            </div>-->
                                            <div class="r" style="text-align: right;">
                                                <p class="t">{{ item.transfer_fee }}</p>
                                                <p class="text">预计转让费用</p>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="bottom">
                                        <a href="javascript:;" style="font-size: 12px; color: #A5A5A5;">{{ item.expire_text }}</a>
                                    </div>
                                </li>
                            </ul>
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
                    </div>
                </section>
            </div>
        </scroll>
        <!--可转让-->
        <scroll ref="scroll" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadTransferNo" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isBvisible}">
            <div>
                <section class="sanbiao dola-regular boxsiz transfer-box">
                    <div class="dola-regular-list boxsiz" v-if="usertransferList && usertransferListdata.list">
                        <template v-if="usertransferList && usertransferListdata.list.length > 0">
                            <ul class="transfer-lists">
                                <li class="transfer-list transfer-list01" v-for="(item, index) in usertransferList" :key="index">
                                    <a :href="'/#/plandetail?id='+item.investment_id">
                                        <div class="top clr">
                                            <span class="tit">{{item.loan_text}}({{item.interest_rate}}%|{{item.loan_period}}个月)</span>
                                        </div>
                                        <div class="cont">
                                            <div class="l">
                                                <p class="t">{{item.amount}}元</p>
                                                <p class="text">出借本金</p>
                                            </div>
                                            <div class="c" style="text-align: center;">
                                                <p class="t">{{item.nearly_payment_date}}</p>
                                                <p class="text">下一回款日</p>
                                            </div>
                                            <div class="r" style="text-align: right;">
                                                <p class="t">{{item.left_day}}天</p>
                                                <p class="text">剩余天数</p>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="bottom">
                                        <a @click.prevent="applicationTransfer(item.investment_id)">申请转让</a>
                                    </div>
                                </li>
                            </ul>
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
                    </div>
                </section>
            </div>
        </scroll>
        <!--转让完成-->
        <scroll ref="scrollTransfer" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadTransferDone" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isCvisible}">
            <div>
                <section class="sanbiao boxsiz transfer-box">
                    <div class="sanbiao-list boxsiz" v-if="usertransferList && usertransferListdata.list">
                        <template v-if="usertransferListdata.list.length > 0">
                            <ul class="transfer-lists">
                                <li class="transfer-list transfer-list01" v-for="(value, index) in usertransferList" :key="index">
                                    <a :href="'/#/plandetail?id='+value.investment_id">
                                        <div class="top">
                                            <span class="tit">{{ value.loan_text }}({{ value.interest_rate }}%|{{ value.loan_period }}个月)</span>
                                        </div>
                                        <div class="cont">
                                            <div class="l">
                                                <p class="t">{{ value.amount }}元</p>
                                                <p class="text">出借本金</p>
                                            </div>
                                            <div class="c" style="text-align: center;">
                                                <p class="t">{{ value.amount }}元</p>
                                                <p class="text">转让本金</p>
                                            </div>
                                            <div class="r" style="text-align: right;">
                                                <p class="t">{{ value.transfer_fee }}元</p>
                                                <p class="text">转让费用</p>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="bottom">
                                        <a href="javascript:;" style="font-size: 12px; color: #A5A5A5;">{{ value.transfer_time_text }} 转让完成</a>
                                    </div>
                                </li>
                            </ul>
                            <p v-if="isLoading" style="text-align: center;padding: 10px 0;">{{transferdLoadingtext}}</p>
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
                    </div>
                </section>
            </div>
        </scroll>
        <div class="dola-fixtop" v-if="topFlag" @click="toTop()"></div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Scroll from '../../components/scroll.vue'
    import Util from '../../util/index'
    import { MessageBox } from 'mint-ui';

    export default {
        name: 'transferList',
        computed: mapState({
            usertransferList: state => state.user.usertransferList,
            usertransferListdata: state => state.user.usertransferListdata
        }),
        data() {
            return {
                titleArr: ['转让中', '可转让', '转让完成'],
                titleDefaultIndex: 0,
                transferNoPage: 1,
                topFlag: false,
                loadingtext: '上滑松开更新数据.....',
                pullup: true,
                isAvisible: 'block',
                isBvisible: 'none',
                isCvisible: 'none',
                transferDoingPage: 1,
                standardLoadingtext: '上滑松开更新数据....',
                transferDonePage: 1,
                transferdLoadingtext: '上滑松开更新数据....',
                filter_status: 'QUEUE',
                isLoading: true,
                isApp: false
            }
        },
        created() {
            this.getuserTransferList(true, true);
            this.listenScroll = true;

            var platform = Util.getCookie('platform');

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        mounted() {
            // 默认初始化随心投scroll
            this.$refs.scroll.refresh();
        },
        methods: {
            getuserTransferList(flag, condition) {
                this.$store.dispatch({
                    type: 'usertransferList',
                    filter_status: this.filter_status,
                    page: this.transferDonePage,
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
            loadTransferNo() {
                // 未转让加载更多
                this.transferNoPage++;
                if (this.transferNoPage <= this.usertransferListdata.maxPage) {
                    this.getuserTransferList(false, false);
                    this.$refs.scrollStandard.refresh();
                } else {
                    this.$refs.scrollStandard.refresh();
                    this.standardLoadingtext = '已经没有数据了';
                }
            },
            loadTransferDoing() {
                // 转让中加载更多
                this.transferDoingPage++;
                if (this.transferDoingPage <= this.usertransferListdata.maxPage) {
                    this.getuserTransferList(false, false);
                    this.$refs.scrollStandard.refresh();
                } else {
                    this.$refs.scrollStandard.refresh();
                    this.standardLoadingtext = '已经没有数据了';
                }
            },
            loadTransferDone() {
                // 转让完成加载更多
                this.transferDonePage++;
                if (this.transferDonePage <= this.usertransferListdata.maxPage) {
                    this.getuserTransferList(false, false);
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
                this.isCvisible = 'none';

                if (index == 0) {
                    // 转让中

                    //重置条件
                    this.transferDoingPage = 1;
                    this.transferdLoadingtext = '上滑松开更新数据.....';
                    this.filter_status = 'QUEUE';

                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";

                    this.getuserTransferList(true, true);
                    this.$refs.scrollStandard.refresh();

                } else if (index == 1) {
                    // 未转让
                    this.transferNoPage = 1;
                    this.transferdLoadingtext = '上滑松开更新数据.....';
                    this.filter_status = 'NO';

                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";

                    this.getuserTransferList(true, true);
                    this.$refs.scroll.refresh();

                } else if (index == 2) {
                    // 转让完成

                    //重置条件
                    this.transferDonePage = 1;
                    this.transferdLoadingtext = '上滑松开更新数据.....';
                    this.filter_status = 'FINISH';

                    index == 2 ? this.isCvisible = 'block' : this.isCvisible = "none";
                    this.getuserTransferList(true, true);
                    this.$refs.scrollTransfer.refresh();
                }
            },
            toTop() {
                this.$refs.scroll.scrollTo(0, 0);
                this.$refs.scrollStandard.scrollTo(0, 0);
                this.$refs.scrollTransfer.scrollTo(0, 0);
                this.topFlag = false;
            },
            applicationTransfer(transferID) {
                var isOpenBalance = this.usertransferListdata.user.balance_auto_status;

                if (isOpenBalance) { // 已开启
                    MessageBox({
                        title: '提示',
                        message: '您当前【余额自动复投】为开启状态，开启状态下平台会按您设置的条件将账户余额自动投资。',
                        showCancelButton: true,
                        confirmButtonText: '继续转让',
                        cancelButtonText: '现在去关闭'
                    }).then(action => {
                        if (action === 'cancel') {
                            window.location.href = '/#/user/balance';
                        } else if (action === 'confirm') {
                            window.location.href = '/#/transfer/application?id=' + transferID;
                        }
                    });
                } else { // 未开启
                    window.location.href = '/#/transfer/application?id=' + transferID;
                }
            }
        },
        components: {
            Scroll
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/standard_powder.css";

    .dola-transferList .dola-regular .dola-regular-list dl {
        border-bottom: none;
        background: none;
    }

    .sanbiao {
        margin-top: 44px;
        height: 100%;
    }

    .scroll-content {
        height: 100%;
        background: #f9f9f9;
        -webkit-overflow-scrolling: touch;
    }

    .sanbiao .sanbiao-list {
        background: #f9f9f9;
    }

    .sanbiao.sanbiao-mt {
        margin-top: 44px;
    }
    .sanbiao .sanbiao-list .transfer-lists {
        margin-bottom: 44px;
    }
</style>