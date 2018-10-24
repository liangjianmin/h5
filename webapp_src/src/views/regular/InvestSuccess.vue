<template>
  <section>
    <TitleBar :title="title"></TitleBar>
    <section class="dola-invest_success boxsiz">
      <div class="head-tit">
        <i class="icn"></i>
        <p class="t1">恭喜您，投资成功！</p>
      </div>
      <ul class="txt boxsiz">
        <li class="clr">
          <p class="fl t1">投资期限</p>
          <p class="fr t2"><span>{{period}}</span>个月</p>
        </li>
        <li class="clr">
          <p class="fl t1">金额</p>
          <p class="fr t2"><span>{{invest_money}}</span>元</p>
        </li>
        <li class="clr">
          <p class="fl t1">到期时间</p>
          <p class="fr t2">{{format_end_date}}</p>
        </li>
        <li class="clr">
          <p class="fl t1">往期参考收益</p>
          <p class="fr t2"><span>{{expect_profit}}</span>元</p>
        </li>
      </ul>
      <div class="dola-invest_success-btn">
        <div class="btn btn-left">
          <router-link to="/regular">继续投资</router-link>
        </div>
        <div class="btn btn-right">
          <a href="/user/detail">查看资产</a>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import TitleBar from '../common/TitleBar.vue'


  export default {
    name: 'invest_success',
    computed: mapState({}),
    data() {
      return {
        title: '投资确认',
        invest_money: '',
        period: '',
        format_end_date: '',
        expect_profit: ''
      }
    },
    created() {
      var invest_money = this.$route.query.invest_money;
      var period = this.$route.query.period;
      var format_end_date = this.$route.query.format_end_date;
      var expect_profit = this.$route.query.expect_profit;
      if (invest_money != undefined) {
        this.invest_money = invest_money;
        this.period = period;
        this.format_end_date = format_end_date;
        this.expect_profit = expect_profit;
      }
    },
    methods: {},
    components: {
      TitleBar
    }
  }
</script>
