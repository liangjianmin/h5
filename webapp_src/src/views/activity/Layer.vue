<template>
    <section class="dola-layer-ad" v-if="flag">
        <div class="dola-layer-ad-wrap">
            <a :href="url">
                <img src="../../assets/images/app/ll.png">
            </a>
        </div>
    </section>
</template>
<script>
    import Util from '../../util/index'

    export default {
        name: 'layer',
        data() {
            return {
                flag: true
            }
        },
        props: {
            close: {
                type: Boolean,
                default: true
            },
            imgSrc: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: ''
            },
        },
        created() {

        },
        methods: {

        }
    }
</script>
<style scoped>
    .dola-layer-ad {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999999999999;
        background-color: rgba(0, 0, 0, 0.7);
        display: table;
        opacity: 0;
        -webkit-animation: fadeLayer 0.1s linear 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .dola-layer-ad .dola-layer-ad-wrap {
        position: relative;
        margin: 0 auto;
        display: table-cell;
        vertical-align: middle;
    }

    .dola-layer-ad a {
        margin: 0 auto;
        display: block;
    }

    .dola-layer-ad a img {
        width: 284px;
        height: 348px;
        margin: 0 auto;
        display: block;
        -webkit-animation: bounceIn 0.2s linear 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .dola-layer-ad .dola-layer-ad-wrap i {
        position: fixed;
        top: 7%;
        right: 11%;
        width: 26px;
        height: 26px;
        background: url("../../assets/images/app/close-layer.png") no-repeat;
        background-size: contain;
        z-index:9999999999999999999;
    }
    @-webkit-keyframes fadeLayer {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>
