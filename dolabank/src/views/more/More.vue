<template>
    <section class="dola-more">
        <top-bar :topBarName="topBarName"></top-bar>
        <div class="about-content">
            <div class="about-banner">
                <img src="https://www.dolabank.club/static/images/wechat/about-login.png" alt="" />
            </div>
            <ul class="about-lists">
                <li class="list list01 border-1px">
                    <router-link :to="{ name: 'notice' }" class="item">公告</router-link>
                </li>
                <li class="list list02 border-1px">
                    <router-link :to="{ name: 'notice' }" class="item">媒体报道</router-link>
                </li>
                <li class="list list03 border-1px">
                    <router-link :to="{ name: 'notice' }" class="item">网贷课堂</router-link>
                </li>
            </ul>
            <ul class="about-lists">
                <li class="list list01 border-1px">
                    <router-link :to="{ name: 'notice' }" class="item">关于我们</router-link>
                </li>
                <li class="list list02 border-1px">
                    <a href="tel:4001799098" class="item">
                        <div class="layout">
                            <span class="name">联系客服</span>
                            <span class="desc">400 1799 438</span>
                        </div>
                    </a>
                </li>
                <li class="list list03 border-1px">
                    <router-link :to="{ name: 'notice' }" class="item">常见问题</router-link>
                </li>
            </ul>
            <div class="dola-tips-wrapper">
                <p class="dola-tips-text">投资有风险　入市需谨慎</p>
                <p class="dola-tips-text">Copyright © 2015-2018 dolabank.com All rughts reserved</p>
            </div>
        </div>
        <pre>
            {{ novice }}
        </pre>
        <dl-nav></dl-nav>
    </section>
</template>

<script>
    import Vue from "vue";
    import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
    import TopBar from '../../components/TopBar.vue';
    import dlNav from '../../components/nav/dlNav.vue';

    export default {
        name: 'more',
        data() {
            return {
                topBarName: '关于我们'
            };
        },
        computed: {
            ...mapState({
                homeData: state => state.home2.homeData,
                novice: state => state.home2.novice
            })
        },
        components: {
            'top-bar': TopBar,
            'dl-nav': dlNav
        },
        mounted() {
            this.$store.dispatch({
                type: "home2/getHomeData"
            });
        }
    }
</script>

<style lang="scss">
    @import '../../common/sass/index.scss';

    .dola-more {
        height: 100%;
        background-color: #f4f1ef;
        .about-content {
            padding-top: 44px;
            padding-bottom: 50px;
            .about-banner {
                height: 150px;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 110px;
                }
            }
            .about-lists {
                margin-top: 20px;
                padding-left: 15px;
                background-color: #fff;
                .list {
                    height: 50px;
                    line-height: 50px;
                    @include border-1px(#e5e5e5);
                    .item {
                        display: block;
                        font-size: 15px;
                        color: #333;
                        .layout {
                            display: flex;
                            justify-content: space-between;
                            .desc {
                                margin-right: 12px;
                                font-size: 12px;
                                color: #666;
                            }
                        }
                    }
                    &:last-of-type {
                        @include border-none();
                    }
                }
            }
            .dola-tips-wrapper {
                padding: 20px 0;
                background: #f4f1ef;
                .dola-tips-text {
                    text-align: center;
                    line-height: 14px;
                    font-size: 11px;
                    font-family: Arial;
                    color: #b0b0b0;
                }
            }
        }
    }
</style>