<template>
    <section class="dola-waiting">
        <p class="text"><em>{{timenum}}s</em>&nbsp;&nbsp;后返回多啦聚财平台 </p>
    </section>
</template>
<script>

    import {MessageBox, Toast} from 'mint-ui'
    import Util from '../../util/index'

    export default {
        name: 'waiting',
        data() {
            return {
                timenum: ''
            }
        },
        created() {
            var time = this.$route.query.time || 5;
            var str = this.$route.fullPath;
            var href = decodeURIComponent(str.slice(str.indexOf('callback=') + 9, -1));
            console.log(this.$route)
            
            Util.countDown(time, (index) => {
                this.timenum = index
                if (index == 0) {
                    this.bankcallback(href)
                }
            })
        },
        methods: {
            bankcallback(url) {
                if (url) {
                    window.location.href = url;
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";

    .dola-waiting {
        margin-top: 50%;
    }

    .dola-waiting .im {
        width: 90%;
        margin: 0 auto;
        display: block;
    }

    .dola-waiting .text {
        margin-top: 0.5rem;
        font-size: 13px;
        color: #333333;
        text-align: center;
    }

    .dola-waiting .text em {
        font-weight: bold;
    }
</style>
