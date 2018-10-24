<template>
    <section class="dola-user-reward">
        <div class="dola-title dola-title-zindex">
            <a href="#/user/detail" class="backer" v-if="!isApp"></a>
            <ul class="dola-title-tab">
                <li @click="handleTab(index)" :class="{'curr':titleDefaultIndex==index}" v-for="(item,index) in titleArr" :key="index">{{item}}</li>
            </ul>
        </div>
        <scroll ref="RewardA" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="cashBackMore" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isAvisible}">
            <div>
                <section class="dola-user-reward-list" v-if="userCouponRecordInfodata">
                    <div class="top boxsiz">
                        <p class="t1">待返现（元）</p>
                        <p class="t2">{{userCouponRecordInfodata.total_money}}</p>
                    </div>
                    <p class="txt-top">待发放返现</p>
                    <dl class="list">
                        <template v-if="userCouponRecordInfo.length > 0">
                            <dd class="boxsiz" v-for="item in userCouponRecordInfo">
                                <p class="l"><em class="va-m">{{item.money}}</em><span class="va-m">元</span></p>
                                <div class=" r">
                                    <p class="t1">{{item.coupon_name}}</p>
                                    <p class="t1">{{item.payment_date}}</p>
                                </div>
                            </dd>
                        </template>
                        <template v-else>
                            <dd class="boxsiz no-dl">
                                <div class="no-data-box">
                                    <i class="no-data"></i>
                                    <p>空空如也...</p>
                                </div>
                            </dd>
                        </template>
                    </dl>
                    <p class="txt-bottom">
                        <i class="ico va-m lineBlock"></i>
                        <span class="va-m">分期发放的奖励，可能因为提前退出等原因取消发放</span>
                    </p>
                </section>
            </div>
        </scroll>
        <scroll ref="RewardB" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="rebateMore" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{'display':isBvisible}">
            <div>
                <section class="dola-user-reward-list" v-if="userCouponRecordInfodata">
                    <div class="top boxsiz">
                        <p class="t1">待返佣（元）</p>
                        <p class="t2">{{userCouponRecordInfodata.total_money}}</p>
                    </div>
                    <p class="txt-top">待发放返佣</p>
                    <dl class="list">
                        <template v-if="userCouponRecordInfo.length > 0">
                            <dd class="boxsiz" v-for="item in userCouponRecordInfo">
                                <p class="l"><em class="va-m">{{item.money}}</em><span class="va-m">元</span></p>
                                <div class=" r">
                                    <p class="t1">{{item.coupon_name}}</p>
                                    <p class="t1">{{item.payment_date}}</p>
                                </div>
                            </dd>
                        </template>
                        <template v-else>
                            <dd class="boxsiz no-dl">
                                <div class="no-data-box">
                                    <i class="no-data"></i>
                                    <p>空空如也...</p>
                                </div>
                            </dd>
                        </template>
                    </dl>
                    <p class="txt-bottom">
                        <i class="ico va-m lineBlock"></i>
                        <span class="va-m">分期发放的奖励，可能因为好友提前退出等原因取消发放</span>
                    </p>
                </section>
            </div>
        </scroll>
    </section>
</template>
<script>
  import { mapState } from 'vuex'
  import Scroll from '../../components/scroll.vue'
  import Util from '../../util/index'

  export default {
    name: 'userReward',
    data () {
      return {
        titleArr: ['返现', '返佣'],
        titleDefaultIndex: 0,
        pullup: true,
        isAvisible: 'block',
        isBvisible: 'none',
        cashBackPage: 1,
        rebatePage: 1,
        page_size: 10,
        isApp: false
      }
    },
    computed: {
      pending_invest_id () {
        return this.$route.query.pending_invest_id
      },
      pending_invite_id () {
        return this.$route.query.pending_invite_id
      },
      ...mapState({
        userCouponRecordInfo: state => state.user.userCouponRecordInfo,
        userCouponRecordInfodata: state => state.user.userCouponRecordInfodata
      })
    },
    created () {
      this.listenScroll = true

      var platform = Util.getCookie('platform')
      if (platform != '') {
        this.isApp = true
      } else {
        this.isApp = false
      }
    },
    mounted () {
      // 默认初始化srcoll
      this.$refs.RewardA.refresh()
      this.$refs.RewardB.refresh()

      //默认选择返现1和返佣2
      if (this.$route.query.default_type == 2) {
        this.handleTab(1)
      } else {
        this.handleTab(0)
      }
    },
    methods: {
      getData (loading, condition, page, coupon_ids) {
        this.$store.dispatch({
          type: 'userCouponRecordInfo',
          coupon_ids: coupon_ids,
          page_size: this.page_size,
          page: page,
          loading: loading,
          condition: condition
        })
      },
      cashBackMore () {
        this.cashBackPage++
        console.log('cashBackPage：' + this.cashBackPage)
        if (this.cashBackPage <= this.userCouponRecordInfodata.page_total) {
          this.getData(false, false, this.cashBackPage, this.pending_invest_id)
        }

        this.$refs.RewardA.refresh()
        this.$refs.RewardB.refresh()
      },
      rebateMore () {
        this.rebatePage++
        console.log('rebatePage：' + this.rebatePage)
        if (this.rebatePage <= this.userCouponRecordInfodata.page_total) {
          this.getData(false, false, this.rebatePage, this.pending_invite_id)
        }

        this.$refs.RewardA.refresh()
        this.$refs.RewardB.refresh()
      },
      handleTab (index) {
        this.titleDefaultIndex = index
        this.isAvisible = 'none'
        this.isBvisible = 'none'

        if (index == 0) {
          index == 0 ? this.isAvisible = 'block' : this.isAvisible = 'none'
          this.getData(true, true, 1, this.pending_invest_id)
        } else if (index == 1) {
          index == 1 ? this.isBvisible = 'block' : this.isBvisible = 'none'
          this.getData(true, true, 1, this.pending_invite_id)
        }
        this.$refs.RewardA.refresh()
        this.$refs.RewardB.refresh()
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style scoped>
    @import "../../assets/css/wap/reward.css";

    .scroll-content {
        background: #f5f5f5;
        height: calc(100% - 44px);
        -webkit-overflow-scrolling: touch;
    }
</style>
