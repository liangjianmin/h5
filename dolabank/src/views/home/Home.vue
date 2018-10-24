<template>
    <section class="dola-home">
        <div class="pb50" style="padding-bottom: 50px;">
            <!-- 顶部 -->
            <header class="home-header">
                <img src="./logo.png" alt="logo" class="dola-logo" />
                <div class="dola-login-wrapper" v-if="!isLogin">
                    <span class="btn-wrapper">
                        <router-link :to="{ name: 'login' }" class="login-btn">登录</router-link>
                    </span>
                    <span class="btn-wrapper">
                        <router-link :to="{ name: 'register' }" class="register-btn">注册</router-link>
                    </span>
                </div>
            </header>

            <!-- 轮播广告 -->
            <section class="home-banner-wrapper">
                <div class="home-banner" v-if="appIndex.ad && appIndex.ad.length>0">
                    <mt-swipe :auto="4000" :prevent="true" :stopPropagation="true">
                        <mt-swipe-item v-for="(val, index) in appIndex.ad" :key="index">
                            <a :href="val.url">
                                <img :src="val.bg_image" alt="" width="100%" />
                            </a>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="home-banner" v-else></div>
            </section>

            <!-- 快捷导航 -->
            <nav class="home-info-nav" v-if="appIndex.recommendMenu">
                <ul class="info-nav-lists clearfix">
                    <li class="info-nav-list" v-for="(val, index) in appIndex.recommendMenu" :key="index">
                        <a :href="val.forwardUrl">
                            <img :src="val.imageUrl"/>
                            <em>{{ val.name }}</em>
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- 公告 -->
            <section class="broad-wrapper" v-if="appIndex.public_message">
                <i class="broad-icon"></i>
                <div class="broad-text-wrapper" style="position: relative;">
                    <div :style="{ top: -num + 'px'}" :class="{ marquee_top: num }">
                        <a :href="val.link" class="broad-text" v-for="(val, index) in broadList" :key="index">{{ val.text }}</a>
                    </div>
                </div>
                <a :href="appIndex.public_message.more_link" class="broad-more">更多<i class="icon"></i></a>
            </section>

            <!-- 预约投标 -->
            <section class="yuyue-wrapper" v-if="appIndex.batch_auto && appIndex.batch_auto.is_list_open > 0">
                <div class="yuyue">
                    <a :href="appIndex.batch_auto.batch_auto_link" class="yuyue-btn">
                        <div class="yuyue-layout">
                            <div class="left">
                                <p class="desc">往期年化利率</p>
                                <p class="text">{{ appIndex.batch_auto.batch_auto_rate_range }}</p>
                            </div>
                            <div class="center">
                                <p class="desc">期限</p>
                                <p class="text">{{ appIndex.batch_auto.batch_auto_period_range }}</p>
                            </div>
                            <div class="right">
                                <i class="icon"></i>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <!-- 一键投标 -->
            <section class="batch-wrapper" v-if="appIndex.investTool">
                <div class="tit-wrapper">
                    <h4 class="batch-tit">一键投标工具</h4>
                    <p class="batch-desc">自主投标&nbsp;期限多样</p>
                </div>
                <div class="batch-content">
                    <div class="batch-cont">
                        <ul class="batch-info-lists">
                            <li class="batch-info-item batch-info-item01">
                                <p class="desc">往期年化利率</p>
                                <p class="text"><b>{{ appIndex.investTool.min_interest_rate }}</b><em>%</em><i>~</i><b>{{ appIndex.investTool.max_interest_rate }}</b><em>%</em></p>
                            </li>
                            <li class="batch-info-item batch-info-item02">
                                <p class="desc">授权期限</p>
                                <p class="text"><b>{{ appIndex.investTool.min_loan_period }}</b><i>~</i><b>{{ appIndex.investTool.max_loan_period }}</b><em>个月</em></p>
                            </li>
                        </ul>
                        <p class="batch-total-info">
                            <span class="batch-total-no">可投项目{{ appIndex.investTool.can_buy_total }}个</span>
                            <span class="batch-total-money">最高可投金额{{ appIndex.investTool.can_buy_amount }}元</span>
                        </p>
                    </div>
                </div>
                <div class="batch-btn-wrapper">
                    <a :href="appIndex.investTool.invest_link" class="batch-btn"><i class="icon"></i>一键投标</a>
                </div>
            </section>

            <!-- 散标列表 -->
            <section class="pro-wrapper standard-wrapper" v-if="appIndex.loan_transfer_info && appIndex.loan_transfer_info.loan_info">
                <div class="standard-tit-wrapper pro-tit-wrapper">
                    <h4 class="standard-tit pro-tit">散标列表</h4>
                    <a :href="appIndex.loan_transfer_info.loan_info.forward_url" class="more">查看更多<i class="icon"></i></a>
                </div>
                <div class="standard-content pro-content">
                    <router-link class="standard-cont pro-cont pro-cont01" :class="'standard-cont0' + (index+1) + ' pro-cont0' + (index+1)"  :to="{name: 'product_detail', params: {proID: val.loan_id}}" v-for="(val, index) in appIndex.loan_transfer_info.loan_info.data" :key="index">
                        <div>
                            <div class="top">
                                <span class="user">{{ val.debtor_first_name }}</span>
                                <span class="desc">借款人</span>
                            </div>
                            <div class="center">
                                <p><b>{{ val.interest_rate }}</b><em>%</em><span>{{ val.loan_period }}个月</span></p>
                                <p class="desc">往期年化收益</p>
                            </div>
                            <div class="bottom">
                                <em class="progress" :style="{'width': parseInt(val.matched_amount/val.loan_amount*100).toFixed(0) + '%'}"></em>
                            </div>
                        </div>
                    </router-link>
                </div>
            </section>

            <!-- 转让列表 -->
            <section class="pro-wrapper transfer-wrapper layout" v-if="appIndex.loan_transfer_info && appIndex.loan_transfer_info.transfer_info">
                <div class="transfer-tit-wrapper pro-tit-wrapper">
                    <h4 class="transfer-tit pro-tit">转让列表</h4>
                    <a :href="appIndex.loan_transfer_info.transfer_info.forward_url" class="more">查看更多<i class="icon"></i></a>
                </div>
                <div class="transfer-content pro-content">
                    <router-link class="transfer-cont pro-cont" :class="'transfer-cont0' + (index + 1)" :to="{name: 'transfer_detail', params: {proID: val.transfer_id}}" v-for="(val, index) in appIndex.loan_transfer_info.transfer_info.data" :key="index">
                        <div>
                            <div class="top">
                                <span class="user">{{ val.debtor_first_name }}</span>
                                <span class="desc">转让人</span>
                            </div>
                            <div class="center">
                                <p><b>{{ val.interest_rate }}</b><em>%</em><span>{{ val.left_period_text }}</span></p>
                                <p class="desc">往期年化收益</p>
                            </div>
                            <div class="bottom">
                                <span>转让{{ val.transfer_money }}元</span>
                                <i class="icon" v-if="val.discount_text !== ''">折价</i>
                            </div>
                        </div>
                    </router-link>
                </div>
            </section>

            <!-- 媒体报道--网贷课堂 -->
            <section class="dola-information">
                <button @click="tab('tab-container1')">tabs01</button>
                <button @click="tab('tab-container2')">tabs02</button>
                <mt-tab-container v-model="actives" :swipeable="true">
                    <mt-tab-container-item id="tab-container1">
                        tab01
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container2">
                        tab02
                    </mt-tab-container-item>
                </mt-tab-container>
            </section>
            <!-- 联系我们--常见问题 -->
            <!-- 底部导航 -->
            <dl-nav></dl-nav>
        </div>
    </section>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import { Swipe, SwipeItem, TabContainer, TabContainerItem } from "mint-ui";

import dlNav from "../../components/nav/dlNav.vue";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
  name: "home",
  data() {
    return {
      isLogin: false,
      num: 0,
      actives: 'tab-container2'
    };
  },
  computed: {
    // ...mapGetters({
    //     broadList: 'broadList'
    // }),
    ...mapState({
      appIndex: state => state.home.appindex,
      broadList: state => state.home.broadList
    })
  },
  methods: {
    showMarquee(num) {
      this.$nextTick(function() {
        this.broadList.push(this.broadList[0]);
        var max = this.broadList.length;
        var that = this;
        var marqueetimer = setInterval(function() {
          num++;
          if (num >= max) {
            num = 0;
          }
          that.num = num * 54;
        }, 2000);
      });
    },
    tab(id) {
        this.actives = id;
    }
  },
  mounted() {
    this.$store.dispatch({
      type: "appIndex"
    });
  },
  created() {
    var that = this;
    setTimeout(function() {
      that.showMarquee(that.num);
    }, 2000);

    console.log(this.$route);
  },
  components: {
    "dl-nav": dlNav
  }
};
</script>

<style lang="scss">
/*@import '../../common/sass/index.scss';*/

.dola-home {
  min-height: 100%;
  background-color: #f5f5f5;
  .home-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
    background: linear-gradient(-48deg, #fc6621, #f79039);
    box-sizing: border-box;
    .dola-logo {
      width: 141px;
      height: 24px;
    }
    .dola-login-wrapper {
      position: absolute;
      right: 15px;
      top: 0;
      font-size: 0;
      .btn-wrapper {
        .login-btn,
        .register-btn {
          font-size: 17px;
          color: #fff;
          padding: 0 10px;
        }
        .login-btn {
          border-right: 1px solid #fff;
        }
      }
    }
  }
  .home-banner-wrapper {
    overflow: hidden;
    padding-top: 44px;
    .home-banner {
      height: 180px;
      width: 100%;
      background: url("./home-loading.png") no-repeat center;
      background-size: 100% 180px;
      .mint-swipe-indicator {
        background: #fff;
        opacity: 1;
        &.is-active {
          background: #f60;
        }
      }
    }
  }
  .home-info-nav {
    width: 100%;
    margin-bottom: 10px;
    background: #fff;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    .info-nav-lists {
      padding: 30px 0;
      display: flex;
      .info-nav-list {
        flex: 1;
        text-align: center;
        a {
          display: block;
          img {
            display: block;
            width: 42px;
            height: 42px;
            margin: 0 auto;
            border-radius: 50%;
          }
          em {
            display: block;
            margin-top: 9px;
            font-size: 13px;
            color: #666;
          }
        }
      }
    }
  }
  .broad-wrapper {
    position: relative;
    height: 54px;
    margin-bottom: 10px;
    background-color: #fff;
    .broad-icon {
      position: absolute;
      left: 15px;
      top: 18px;
      display: inline-block;
      width: 34px;
      height: 23px;
      background: url(./notice.png) no-repeat center;
      background-size: contain;
      vertical-align: middle;
    }
    .broad-text-wrapper {
      height: 54px;
      overflow: hidden;
      > div {
        position: absolute;
        top: 0;
        left: 60px;
        right: 60px;
      }
      .marquee_top {
        transition: top 0.5s;
      }
      .broad-text {
        display: block;
        font-size: 14px;
        color: #141414;
        line-height: 54px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .broad-more {
      display: block;
      position: absolute;
      top: 0;
      right: 16px;
      line-height: 54px;
      font-size: 13px;
      color: #999;
      vertical-align: middle;
      .icon {
        display: inline-block;
        margin-left: 11px;
        width: 7px;
        height: 12px;
        background: url(./arrows01.png) no-repeat center;
        background-size: contain;
      }
    }
  }
  .yuyue-wrapper {
    padding: 20px 0;
    margin-bottom: 10px;
    background-color: #fff;
    .yuyue-btn {
      display: block;
      margin: 0 10px;
      height: 100px;
      border-radius: 3px;
      background: url(./i1.png) no-repeat center;
      background-size: 100%;
      .yuyue-layout {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        height: 100%;
        > div {
          flex: 1;
        }
        .left {
          margin-left: 10px;
        }
        .right {
          text-align: right;
          .icon {
            display: inline-block;
            width: 90px;
            height: 30px;
            background: url(./i2.png) no-repeat center;
            background-size: contain;
          }
        }
        .desc {
          margin-bottom: 15px;
          font-size: 1px;
          color: hsla(0, 0%, 100%, 0.75);
          white-space: nowrap;
        }
        .text {
          font-size: 21px;
          color: #fff;
          white-space: nowrap;
        }
      }
    }
  }
  .batch-wrapper {
    background-color: #fff;
    .tit-wrapper {
      position: relative;
      height: 54px;
      line-height: 54px;
      padding: 0 20px;
      .batch-tit {
        font-size: 16px;
        color: #000;
        font-weight: 500;
      }
      .batch-desc {
        position: absolute;
        right: 20px;
        top: 0;
        font-size: 13px;
        color: #999;
      }
    }
    .batch-content {
      height: 106px;
      padding: 10px 10px 0;
      background-image: linear-gradient(-74deg, #fea621, #ffc823);
      .batch-cont {
        border-radius: 3px 3px 0 0;
        padding: 16px 0;
        height: 100%;
        background: #fff;
        border-bottom: 1px solid #f0f0f0;
        box-sizing: border-box;
        .batch-info-lists {
          display: flex;
          .batch-info-item {
            flex: 1;
            padding-left: 14px;
            .desc {
              margin-bottom: 10px;
              font-size: 11px;
              color: #999;
            }
            &.batch-info-item01 {
              .text {
                color: #f60;
                b {
                  font-size: 24px;
                }
                em {
                  font-size: 16px;
                }
                i {
                  font-size: 24px;
                }
              }
            }
            &.batch-info-item02 {
              .text {
                color: #141414;
                b {
                  font-size: 18px;
                }
                em {
                  font-size: 14px;
                }
                i {
                  font-size: 18px;
                }
              }
            }
          }
        }
        .batch-total-info {
          margin-top: 16px;
          margin-left: 14px;
          > span {
            font-size: 11px;
            color: #757575;
            &.batch-total-no {
              margin-right: 20px;
            }
          }
        }
      }
    }
    .batch-btn-wrapper {
      .batch-btn {
        display: block;
        margin: 0 10px;
        height: 44px;
        line-height: 44px;
        font-size: 15px;
        color: #000;
        text-align: center;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
        border-radius: 0 0 3px 3px;
        i {
          display: inline-block;
          width: 16px;
          height: 14px;
          margin-right: 10px;
          background: url(./auto.png) no-repeat center;
          background-size: contain;
        }
      }
    }
  }
  .pro-wrapper {
    padding: 30px 16px 0;
    background-color: #fff;
    .pro-tit-wrapper {
      position: relative;
      .pro-tit {
        font-size: 16px;
        color: #000000;
        font-weight: 500;
      }
      .more {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 16px;
        font-size: 13px;
        color: #999;
        .icon {
          display: inline-block;
          margin-left: 11px;
          width: 7px;
          height: 12px;
          background: url(./arrows01.png) no-repeat center;
          background-size: contain;
        }
      }
    }
    .pro-content {
      margin-top: 15px;
      display: flex;
      .pro-cont {
        padding: 15px 15px 19px;
        flex: 1;
        border: 1px solid #f0f0f0;
        border-radius: 3px;
        font-size: 0;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.03);
        &:first-child {
          margin-right: 5px;
        }
        &:last-child {
          margin-left: 5px;
        }
        .top {
          .user {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 11px;
            color: #fffefe;
            border-radius: 50%;
          }
          .desc {
            display: inline-block;
            vertical-align: middle;
            line-height: 20px;
            font-size: 13px;
            color: #414753;
          }
        }
        .center {
          margin-top: 12px;
          color: #ff6600;
          b {
            font-size: 24px;
          }
          em {
            font-size: 15px;
          }
          span {
            display: inline-block;
            vertical-align: bottom;
            margin-left: 13px;
            min-width: 43px;
            padding: 0 4px;
            box-sizing: border-box;
            height: 14px;
            line-height: 14px;
            text-align: center;
            border: 1px solid #fe7418;
            font-size: 11px;
            border-radius: 14px;
          }
          .desc {
            margin-top: 9px;
            margin-bottom: 15px;
            font-size: 11px;
            color: #999999;
          }
        }
        &.standard-cont {
          .top {
            .user {
              background-color: #fb8748;
            }
          }
          .bottom {
            position: relative;
            height: 3px;
            background-color: #eee;
            border-radius: 1px;
            .progress {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              background-color: #f60;
              border-radius: 1px;
            }
          }
        }
        &.transfer-cont {
            padding-bottom: 0;
          .top {
            .user {
              background-color: #6666cc;
            }
          }
          .bottom {
            // padding: 0 12px;
            border-top: 1px solid #f0f0f0;
            height: 34px;
            line-height: 34px;
            display: flex;
            justify-content: space-between;
            span {
              font-size: 13px;
              color: #000000;
            }
            .icon {
              vertical-align: top;
              display: inline-block;
              margin-top: 10px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              text-align: center;
              background-color: #fce37e;
              border-radius: 2px;
              font-size: 11px;
              color: #660000;
            }
          }
        }
      }
    }
    &.transfer-wrapper.layout {
        padding-bottom: 13px;
        margin-bottom: 12px;
    }
  }
  .dola-information {
      height: 308px;
  }
}
</style>