<template>
    <section class="dola-assets-details">
        <TitleBar :title="title" v-if="!isApp"></TitleBar>
        <div class="dola-assets-details-view boxsiz" v-if="assetDetail.reportList">
            <ve-ring :data="chartData" :colors="chartColors" :settings="chartSettings" :height="chartHeight" legend-position="bottom" class="ringbox">
                <div class="chat-text" :class="{'chat-texts':chartNull==false}">
                    <p class="chat-text-t1">总资产</p>
                    <p class="chat-text-t2" :class="{'chat-text-t2-more':assetDetail.totalAsset_format.length > 10}">{{assetDetail.totalAsset_format}}</p>
                </div>
            </ve-ring>
            <div class="dola-assets-record clr boxsiz">
                <div class="b  fl boxsiz">
                    <div class="wrap">
                        <p class="t1">注册天数</p>
                        <p class="t2">{{assetDetail.registerDay}}天</p>
                    </div>
                </div>
                <div class="b  fr boxsiz">
                    <div class="wrap">
                        <p class="t1">投资笔数</p>
                        <p class="t2">{{assetDetail.userPlanTotal}}笔</p>
                    </div>
                </div>
            </div>
            <p class="txt">若对资产情况有疑惑可去交易记录
                <template v-if="isApp">
                    <a @click="toUrl">查看详情 >></a>
                </template>
                <template v-else>
                    <a :href="'/user/record_detail?usr_available_money='+assetDetail.availableMoney">查看详情 >></a>
                </template>
            </p>
            <ul class="dola-assets-details-menu">
                <template v-for="(item,index) in assetDetail.reportList">
                    <li :key="index">
                        <a class="boxsiz">
                            <div class="color lineBlock va-m boxsiz">
                                <em class="color-1" :style="{backgroundColor:item.color}"></em>
                            </div>
                            <div class="view clr lineBlock va-m boxsiz">
                                <span class="t1 fl">{{item.key}}</span>
                                <span class="t2 fr">{{item.total_format}}元</span>
                            </div>
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue'
    import TitleBar from '../common/TitleBar.vue'
    import VeRing from 'v-charts/lib/ring'
    import {mapState} from 'vuex'
    import Util from '../../util/index'
    import {jsShowMoneyChangeListCallBack} from '../../util/appCallback'

    Vue.component(VeRing.name, VeRing);

    export default {
        name: 'assets-details',
        data() {
            return {
                title: "资产明细",
                isApp: false
            }
        },
        computed: mapState({
            assetDetail: state => state.user.assetDetail,
            chartData: state => state.user.chartData,
            chartSettings: state => state.user.chartSettings,
            chartColors: state => state.user.chartColors,
            chartHeight: state => state.user.chartHeight,
            chartNull: state => state.user.chartNull
        }),
        created() {
            this.getAssetsData();
            var platform = Util.getCookie('platform');

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            getAssetsData() {
                this.$store.dispatch({
                    type: 'assetDetail'
                });
            },
            toUrl() {
                var platform = Util.getCookie('platform');
                jsShowMoneyChangeListCallBack(platform);
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/assets_details.css";
</style>
