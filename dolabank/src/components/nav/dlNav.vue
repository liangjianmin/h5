<template>
    <div class="bottom-nav border-1px">
        <router-link :to="{name: 'home'}" class="dola-nav nav-home">
            <i class="nav-img"></i>
            <p class="nav-text">首页</p>
        </router-link>
        <router-link :to="{name: 'product', query: {batchNo: 'standard', pro: '24'}, hash: '#standard'}" class="dola-nav nav-product">
            <i class="nav-img"></i>
            <p class="nav-text">投资</p>
        </router-link>
        <router-link :to="{name: 'user'}" class="dola-nav nav-user" v-if="isLogin">
            <i class="nav-img"></i>
            <p class="nav-text">我的</p>
        </router-link>
        <router-link :to="{name: 'login'}" class="dola-nav nav-user" v-else>
            <i class="nav-img"></i>
            <p class="nav-text">我的</p>
        </router-link>
        <router-link :to="{name: 'more'}" class="dola-nav nav-more">
            <i class="nav-img"></i>
            <p class="nav-text">更多</p>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "dlnav",
  data() {
    return {
      isLogin: true
    };
  }
};
</script>

<style lang="scss">
@import "../../common/sass/index.scss";

.dola-app {
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  background: #fafafa;
  .dola-content {
    height: 100%;
  }
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    height: 49px;
    display: flex;
    background: #f9f9f9;
    @include border-1px(#d4d4d4, "top", "fixed");
    .dola-nav {
      flex: 1;
      display: block;
      text-align: center;
      color: #555;
      .nav-img {
        display: block;
        width: 22px;
        height: 22px;
        margin: 0 auto;
        padding: 6px 0;
        background-position: center;
        background-repeat: no-repeat;
      }
      &.nav-home {
        .nav-img {
          background-image: url("../../common/images/nav/nav_item01.png");
          background-size: 22px 22px;
        }
      }
      &.nav-product {
        .nav-img {
          background-image: url("../../common/images/nav/nav_item02.png");
          background-size: 22px 22px;
        }
      }
      &.nav-user {
        .nav-img {
          background-image: url("../../common/images/nav/nav_item03.png");
          background-size: 22px 22px;
        }
      }
      &.nav-more {
        .nav-img {
          background-image: url("../../common/images/nav/nav_item04.png");
          background-size: 22px 22px;
        }
      }
      .nav-text {
        font-size: 11px;
      }
      &.active {
        color: #f63;
        &.nav-home {
          .nav-img {
            background-image: url("../../common/images/nav/nav_item01_active.png");
            background-size: 22px 22px;
          }
        }
        &.nav-product {
          .nav-img {
            background-image: url("../../common/images/nav/nav_item02_active.png");
            background-size: 22px 22px;
          }
        }
        &.nav-user {
          .nav-img {
            background-image: url("../../common/images/nav/nav_item03_active.png");
            background-size: 22px 22px;
          }
        }
        &.nav-more {
          .nav-img {
            background-image: url("../../common/images/nav/nav_item04_active.png");
            background-size: 22px 22px;
          }
        }
      }
    }
  }
}
</style>