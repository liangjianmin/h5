<template>
    <section class="dola-information-audit">
        <div class="title-wrapper">
            <h5 class="title">财务审计报告</h5>
        </div>
        <div class="wrap">
            <mt-swipe :auto="0" class="my-swipe clear" :speed="300" style="height: 5.43rem;">
                <mt-swipe-item class="slide-item">
                    <a class="boxsiz bg bg-1">
                        <div class="text-wrap">
                            <p class="t1">财务审计报告</p>
                            <p class="t2">2015年度</p>
                        </div>
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="title-wrapper">
            <h5 class="title">重点环节审计结果</h5>
        </div>
        <div class="wrap">
            <mt-swipe :auto="0" class="my-swipe clear" :speed="300" style="height: 5.43rem;">
                <mt-swipe-item class="slide-item">
                    <a class="boxsiz bg bg-2">
                        <div class="text-wrap">
                            <p class="t1">待披露</p>
                        </div>
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="title-wrapper">
            <h5 class="title">合规性审查报告</h5>
        </div>
        <div class="wrap">
            <mt-swipe :auto="0" class="my-swipe clear" :speed="300" style="height: 5.43rem;">
                <mt-swipe-item class="slide-item">
                    <a class="boxsiz bg bg-3">
                        <div class="text-wrap">
                            <p class="t1">合规性审查报告</p>
                            <p class="t2">2015年度</p>
                        </div>
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </section>
</template>
<script>

    import Vue from 'vue'
    import {Swipe, SwipeItem} from 'mint-ui';

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'information-audit',
        data() {
            return {}
        },
        methods: {},
        components: {}
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";
</style>