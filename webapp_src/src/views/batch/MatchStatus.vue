<template>
    <section class="dola-match-status">
        <div class="dola-title">
            <a @click="back()" class="backer" v-if="!isApp"></a>
            <h2></h2>
        </div>
        <i class="icn-1"></i>
        <div class="text">
            <p class="t1">操作成功，匹配债权中！</p>
            <p class="t2">您也可稍后在&nbsp;&nbsp;<em>我的 - 投资明细</em>&nbsp;&nbsp;中查看投资结果</p>
        </div>
        <div class="status">
            <a class="btn" @click="appInveset">继续投资</a>
            <a class="btn-wait">等待匹配结果 {{num}}S</a>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import {MessageBox} from 'mint-ui'
    import Util from '../../util/index'
    import {jsShowProductListCallBack} from '../../util/appCallback'

    var fn;

    export default {
        name: 'matchstatus',
        data() {
            return {
                isApp: false,
                title: '',
                num: 30
            }
        },
        created() {
            var batch_id = this.$route.query.batch_id;
            var platform = Util.getCookie('platform');
            if (batch_id != undefined) {
                this.getBatchResult(batch_id);
            }

            if (platform !== "") {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        mounted() {
            this.countdown();
        },
        methods: {
            appInveset() {
                var platform = Util.getCookie('platform');
                if(platform){
                    jsShowProductListCallBack(platform);
                }else {
                    window.location.href='/#/regular'
                }
            },
            getBatchResult(batch_id) {
                this.$store.dispatch({
                    type: 'batchResult',
                    batch_id: batch_id,
                });
            },
            countdown() {
                fn = setInterval(() => {
                    this.num--;
                    if (this.num > 0 && this.num % 2 === 0) {
                        this.$store.dispatch({
                            type: 'batchResult',
                            batch_id: this.$route.query.batch_id
                        });
                    }
                    if (this.num <= 0) {
                        clearInterval(fn);
                        MessageBox({
                            title: '系统匹配债权中，是否继续等待投资结果？',
                            message: '若返回投资，系统仍为您继续匹配本次投资，可稍后在投资明细中查看结果',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: '返回投资',
                            cancelButtonText: '继续等待',
                        }).then(action => {
                            if (action == 'confirm') {
                                window.location.href = '/#/batch/detail?type=3';
                                window.location.reload();
                            } else if (action == 'cancel') {
                                window.location.reload();
                            }
                        });
                    }
                }, 1000)
            },
            back(){
                window.history.go(-1);
                clearInterval(fn);
            }
        },
        components: {
            TitleBar
        }
    }
</script>

<style scoped>
    @import "../../assets/css/wap/automatic.css";
</style>