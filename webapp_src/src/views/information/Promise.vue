<template>
    <section class="dola-information-promise"></section>
</template>
<script>
    import TitleBar from '../common/TitleBar.vue'

    export default {
        name: 'information-promise',
        data() {
            return {
                title:'承诺函'
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";
</style>