<template>
    <section>
        <div class="dola-title">
            <h2>理财</h2>
        </div>
        <scroll ref="scroll" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadMore" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType">
            <div>
                <section class="dola-regular boxsiz" v-if="channelFanli.product">
                    <div class="dola-regular-list boxsiz" v-if="channelFanli.product">
                        <template v-for="(itemproduct,index) in channelFanli.product">
                            <div class="product-list boxsiz" :key="index">
                                <dl class="boxsiz" v-for="(item,index)  in itemproduct.data" :key="index" :class="{'regular-list-box':index==itemproduct.data.length-1}">
                                    <dt class="boxsiz headtit bg-1" v-if="index == 0" :style="{backgroundImage:'url('+itemproduct.pic_url+')'}">
                                        <p class="headtit-t1" :style="{color:itemproduct.key_color}">{{itemproduct.key}}</p>
                                        <p class="headtit-t2" :style="{color:itemproduct.sub_title_color}">{{itemproduct.sub_title}}</p>
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
                                                <p class="t1"><span>期限</span></p>
                                                <p class="t3"><span>{{item.period}}</span><em>个月</em></p>
                                            </li>
                                            <li class="c boxsiz">
                                                <template v-if="item.can_buy == true">
                                                    <template v-if="item.is_novice ==0">
                                                        <router-link :to="'/regular/detail/'+item.plan_id" class="dola-regular-btn">{{item.can_buy_text}}</router-link>
                                                    </template>
                                                    <template v-else-if="item.is_novice ==1">
                                                        <template v-if="channelFanli.check_novice == true">
                                                            <router-link :to="'/regular/detail/'+item.plan_id" class="dola-regular-btn">{{item.can_buy_text}}</router-link>
                                                        </template>
                                                        <template v-else-if="channelFanli.check_novice == false">
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
                    </div>
                </section>
            </div>
        </scroll>
        <ChannelFooter></ChannelFooter>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import ChannelFooter from '../common/ChannelFooter.vue'
    import Scroll from '../../components/scroll.vue'

    export default {
        name: 'fanli',
        computed: mapState({
            channelFanli: state => state.channel.channelFanli
        }),
        data() {
            return {
                title: '理财',
                page: 1,
                topFlag: false,
                pullup: true
            }
        },
        created() {
            this.getchannelFanli();
            this.probeType = 1;
            this.listenScroll = true;
        },
        methods: {
            getchannelFanli() {
                this.$store.dispatch({
                    type: 'channelFanli'
                });
            },
            scrollEnd(pos) {
                if (pos.y < -300) {
                    this.topFlag = true;
                } else {
                    this.topFlag = false;
                }
            },
            toTop() {
                this.$refs.scroll.scrollTo(0, 0);
            }
        },
        components: {
            ChannelFooter,
            Scroll
        }
    }
</script>
<style scoped>
    .scroll-content {
        height: calc(100% - 44px);
        -webkit-overflow-scrolling: touch;
    }
</style>
