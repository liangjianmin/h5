<template>
    <section class="banklist">
        <div class="banklist-box" :style="{ height: wrapperHeight + 'px' }">
            <ul class="boxsiz" v-if="bankinfo">
                <li class="lbBox" v-for="item in bankinfo" v-if="item.order > 0">
                    <div class="lineBlock va-m">
                        <img :src="item.img_logo_url" alt="" width="36" height="36">
                    </div>
                    <div class="lineBlock va-m r">
                        <p class="t1">{{item.name}}</p>
                        <p class="t2">限额（单笔/单日/单月）：{{item.bankLimit}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import {MessageBox} from 'mint-ui'

    export default {
        name: 'banklist',
        computed: mapState({
            bankinfo: state => state.bank.bankinfo
        }),
        data() {
            return {
                wrapperHeight: ''
            }
        },
        created() {
            this.getBankinfo();
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - 300;
            this.$on('bankIistModel', (val) => {
                this.agreementLayer(val);
            });
        },
        methods: {
            getBankinfo() {
                this.$store.dispatch({
                    type: 'bankinfo',
                    bankcode: ''
                });
            },
            agreementLayer(val) {
                MessageBox({
                    title: '支持银行限额说明',
                    message: val,
                    showConfirmButton: true,
                    confirmButtonText: '关闭'
                })
            }
        }
    }
</script>
<style>
    .banklist-box ul {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 0 20px 0;
    }

    .banklist-box ul li {
        width: 100%;
        margin: 0 auto;
        padding: 0.4rem 0;
        white-space: nowrap;
        border-bottom: 1px dashed #999999;
    }

    .banklist-box ul li:last-child {
        border-bottom: none;
    }

    .banklist-box ul li .r {
        width: 78%;
        text-align: left;
        margin-left: 0.2rem;
        white-space: normal;
    }

    .banklist-box ul li .r .t1 {
        font-size: 15px;
        color: #141414;
    }

    .banklist-box ul li .r .t2 {
        font-size: 12px;
        color: #999999;
    }

</style>
