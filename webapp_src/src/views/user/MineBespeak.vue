<template>
    <section class="dola-user-yuyue">
        <div class="dola-title" v-if="!isApp">
            <a href="/#/user/detail" class="backer"></a>
            <h2>预约投标</h2>
        </div>
        <div class="dola-mine-yuyue" :class="{'dola-mine-yuyue-mt':isApp}">
            <div class="top clr" @click="toReserve(bespeak.batch_no)">
                <div class="l fl">
                    <p class="t1">往期年化收益率</p>
                    <p class="t2">{{bespeak.min_interest_rate}}<em>%-</em>{{bespeak.max_interest_rate}}<em>%</em></p>
                </div>
                <div class="r fr">
                    <p class="t1">期限</p>
                    <p class="t2">{{bespeak.form_invest_month}}~{{bespeak.to_invest_month}}<em>个月</em></p>
                </div>
            </div>
            <a class="tex clr" href="/#/user/bespeaklist">
                <div class="fl l">
                    <p class="t1">预约投标次数</p>
                </div>
                <div class="fr r">
                    <span class="t1 va-m">{{bespeak.total}}次</span>
                    <i class="lineBlock va-m ico"></i>
                </div>
            </a>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Util from '../../util/index'

    export default {
        name: 'mineBespeak',
        computed: mapState({
            bespeak: state => state.bespeak.bespeak
        }),
        data() {
            return {
                isApp:false
            }
        },
        created() {
            this.getBespeak();

            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            getBespeak() {
                this.$store.dispatch({
                    type: 'bespeak'
                });
            },
            toReserve(batchNo) {
                window.location.href = '/#/bespeak/detail?batchNo=' + batchNo;
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/yuyue.css";
    .dola-mine-yuyue-mt{
        padding-top: 0;
    }
</style>