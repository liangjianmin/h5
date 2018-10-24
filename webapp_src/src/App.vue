<template>
    <div id="app">
        <keep-alive exclude="regularindex,regulardetail,layer,userdetail,standardPowderDetail,transferDetail,applicationTransfer,batchcDetail,matchstatus,reserveindex,bespeakDetail,userReward,Balance">
            <router-view class="router-view"></router-view>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        name: 'app'
    }
</script>