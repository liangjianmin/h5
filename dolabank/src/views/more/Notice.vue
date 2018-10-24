<template>
    <section class="dola-notice">
        <top-bar :topBarName="topBarName"></top-bar>
        <ul class="dola-notice-lists">
            <li class="dola-notice-list" v-for="(val, key) in 20" :key="key">
                <a href="javascript:;" class="dola-notice-link">
                    <h3 class="notice-tit">庆祝银行存管上线，本金最高1.5%返现活动开始啦</h3>
                    <p class="notice-text">
                        <span>来源:多啦聚财</span>
                        <span>时间:2018.05.03</span>
                    </p>
                </a>
            </li>
        </ul>
        <pre>{{ novice }}</pre>
    </section>
</template>

<script>
    import Vue from "vue";
    import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
    import TopBar from '../../components/TopBar.vue';

    export default {
        name: 'notice',
        data() {
            return {
                topBarName: '公告'
            };
        },
        computed: {
            ...mapState({
                novice: state => state.home2.novice
            })
        },
        components: {
            'top-bar': TopBar
        },
        mounted() {
            this.$store.dispatch({
                type: "home2/getHomeData"
            });
        }
    };
</script>

<style lang="scss">
    @import '../../common/sass/index.scss';

    .dola-notice-lists {
        padding-top: 44px;
        .dola-notice-list {
            padding: 15px;
            overflow: hidden;
            background-color: #fff;
            @include border-1px(#e5e5e5);
            .dola-notice-link {
                .notice-tit {
                    width: 75%;
                    color: #141414;
                    font-size: 15px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: normal;
                }
                .notice-text {
                    padding-top: 10px;
                    font-size: 0;
                    span {
                        display: inline-block;
                        margin-right: 8px;
                        font-size: 11px;
                        color: #888;
                    }
                }
            }
            &:last-of-type {
                @include border-none();
            }
        }
    }
</style>