<template>
    <section class="dola-activityt-center">
        <TitleBar :title="title"></TitleBar>
        <scroll ref="scroll" class="scroll-content" @scrollEnd="scrollEnd" @loadMore="loadMore" pullup="true" :listen-scroll="listenScroll" :probe-type="probeType">
            <div>
                <ul class="dola-activityt-box" v-if="activity.list">
                    <li v-for="(item,index) in activitydata" :key="index">
                        <a :href="item.forward_url+'&activity_status='+item.activity_status">
                            <div class="pic" :class="{'gray':item.activity_status == 0}">
                                <img :src="item.img_url" alt="">
                            </div>
                            <div class="text clr">
                                <div class="fl l">
                                    <p class="t1">{{item.name}}</p>
                                    <p class="t2">{{item.time_description}}</p>
                                </div>
                                <template v-if="item.activity_status == 0">
                                    <a class="fr btn-end">{{item.activity_text}}</a>
                                </template>
                                <template v-else-if="item.activity_status == 1">
                                    <a class="fr btn">{{item.activity_text}}</a>
                                </template>
                            </div>
                        </a>
                    </li>
                    <li class="nodata" v-if="activity.maxPage > 1">
                        <p class="no-data">{{loadingtext}}</p>
                    </li>
                </ul>
            </div>
        </scroll>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Scroll from '../../components/scroll.vue'
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'activity-center',
        data() {
            return {
                title:'活动中心',
                page: 1,
                loadingtext: '正在加载数据.....',
            }
        },
        computed: mapState({
            activity: state => state.activity.activity,
            activitydata: state => state.activity.activitydata
        }),
        created() {
            this.getActivity();
            this.probeType = 1;
            this.listenScroll = true;
        },
        mounted() {
            this.$refs.scroll.refresh();
        },
        methods: {
            getActivity() {
                this.$store.dispatch({
                    type: 'getActivitylist',
                    page: this.page,
                    loading: true
                });
            },
            loadMore() {
                this.page++;
                if (this.page >= 2) {
                    if (this.page <= this.activity.maxPage) {
                        this.$store.dispatch({
                            type: 'getActivitylist',
                            page: this.page,
                            loading: false
                        });
                        this.$refs.scroll.refresh();
                    } else {
                        this.$refs.scroll.refresh();
                        this.loadingtext = '已经没有数据了';
                    }
                }
            }
        },
        components: {
            Scroll,
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/activity_center.css";

    .scroll-content {
        -webkit-overflow-scrolling: touch;
        background: #f5f5f5;
        height: 100%;
    }
</style>