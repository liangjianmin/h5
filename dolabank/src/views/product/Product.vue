<template>
    <section class="dola-product">
        <div class="page-infinite">
            <h1 class="page-title">Infinite Scroll</h1>
            <p class="page-infinite-desc">当即将滚动至列表底部时, 自动加载更多数据</p>
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="true" infinite-scroll-listen-for-event="isLoad">
                <li v-for="(item, vlaue) in list" class="page-infinite-listitem" :key="vlaue">{{ item }}</li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
            </p>
            </div>
        </div>
        <!-- <dl-nav></dl-nav> -->
    </section>
</template>

<script type="text/javascript">
import Vue from "vue";
import dlVav from "../../components/nav/dlNav.vue";

import { InfiniteScroll } from "mint-ui";

import { Spinner } from "mint-ui";

Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);

export default {
  name: "project",
  components: {
    "dl-nav": dlVav
  },
  data() {
    return {
      list: [],
      loading: false,
      allLoaded: false,
      wrapperHeight: 0
    };
  },
  created() {},
  watch: {},
  computed: {},
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    isLoad() {
        console.log(44)
    }
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    for (let i = 1; i <= 10; i++) {
      this.list.push(i);
    }
  }
};
</script>

<style lang="scss">
.page-infinite {
//   padding-bottom: 44px;
}
.page-infinite-wrapper {
    // padding-bottom: 44px;
}
ul {
}
li {
  height: 40px;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
}
.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.page-infinite-loading div {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  width: 28px;
  height: 28px;
}
.mint-spinner-fading-circle {
  position: relative;
}
</style>