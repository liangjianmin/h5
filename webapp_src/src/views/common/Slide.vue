<template>
    <mt-swipe :auto="6000" class="my-swipe clear" v-if="slidedata" :speed="200">
        <mt-swipe-item class="slide-item" v-for="(item, index) in slidedata" :key="index">
            <a :href="item.url" class="boxsiz">
                <div class="imgCover" :style="{'backgroundImage':'url('+item['bg_image']+')'}"></div>
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    import Vue from 'vue'
    import {Swipe, SwipeItem} from 'mint-ui';

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'slide',
        props: {
            slidedata: {}
        }
    }
</script>
<style scoped>
    .my-swipe {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .my-swipe img {
        width: 100%;
        height: 100%;
    }

    .my-swipe a {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 12px;
    }

    .my-swipe a .imgCover {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }
</style>
