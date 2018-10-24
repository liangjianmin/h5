<template>
    <div id="app" class="dola-app">
        <div class="dola-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
            };
        },
        watch: {
            "$route"(to, from) {

            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @media only screen and (min-width: 640px) {
        body {
            background: #666;
        }
    }
</style>