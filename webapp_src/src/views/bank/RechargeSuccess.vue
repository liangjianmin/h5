<template>
    <section class="bank-status">
        <!--checkChargeSuccess充值状态-->
        <template v-if="checkChargeSuccess == true">
            <div class="bank-status-text">
                <i class="ico-1"></i>
                <p class="t1">充值成功！</p>
            </div>
            <p class="text tc"> 赶快去投资吧，让财富稳健增长。</p>
            <!--app用户-->
            <template v-if="isApp">
                <div class="btn">
                    <a @click="openWebview(1)" class="btn-t1 mt">去投资</a>
                    <a @click="openWebview(2)" class="btn-t2">查看账户</a>
                </div>
            </template>
            <!--h5用户-->
            <template v-else>
                <div class="btn">
                    <router-link to="/regular" class="btn-t1 mt">去投资</router-link>
                    <router-link to="/user/detail" class="btn-t2">查看账户</router-link>
                </div>
            </template>
        </template>
        <template v-else-if="checkChargeSuccess == false">
            <div class="bank-status-text">
                <i class="ico-2"></i>
                <p class="t1">等待充值结果返回！</p>
            </div>
            <p class="text">请在5分钟后查看账户余额。若银行卡扣款成功，账户余额未增加，请及时联系客服处理。</p>
            <!--app用户-->
            <template v-if="isApp">
                <div class="btn">
                    <a @click="openWebview(2)" class="btn-t2">查看账户</a>
                </div>
            </template>
            <!--h5用户-->
            <template v-else>
                <div class="btn">
                    <router-link to="/user/detail" class="btn-t2">查看账户</router-link>
                </div>
            </template>
        </template>
    </section>
</template>
<script>
  import { mapState } from 'vuex'
  import Util from '../../util/index'
  import { jsShowMineCallBack, jsCallNotification, jsCloseCallBack, jsShowProductListCallBack } from '../../util/appCallback'

  export default {
    name: 'RechargeSuccess',
    data () {
      return {
        isApp: false
      }
    },
    computed: mapState({
      checkChargeSuccess: state => state.bank.checkChargeSuccess
    }),
    created () {
      var requestNo = this.$route.query.requestNo
      var platform = Util.getCookie('platform')

      if (platform != '') {
        this.isApp = true
      } else {
        this.isApp = false
      }
      //查询订单号 检测充值状态
      if (requestNo != undefined) {
        this.getCheckChargeSuccess(requestNo)
      }
    },
    methods: {
      getCheckChargeSuccess (requestNo) {
        this.$store.dispatch({
          type: 'checkChargeSuccess',
          requestNo: requestNo
        })
      },
      openWebview (type) {
        var platform = Util.isUerAgent()
        if (type == 1) {
          jsShowProductListCallBack(platform)
        } else if (type == 2) {
          if (platform == 'ios') {
            jsCallNotification(platform)
            jsShowMineCallBack(platform)
          } else if (platform == 'android') {
            jsShowMineCallBack(platform)
          }
        }
      }
    }
  }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .bank-guide {
        overflow: hidden;
    }
</style>
