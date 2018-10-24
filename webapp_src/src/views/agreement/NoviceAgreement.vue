<template>
    <section>
        <div class="agreement" :style="{ height: wrapperHeight + 'px' }">
            <p class="text01"><span class="bcolor b">新手专享适用人群：</span>2018年7月10号前已注册未投资过的多啦账户、2018年7月10号后新注册的多啦用户，可参加投新手专享投资；</p>
            <p class="text01" v-if="novice_rate"><span class="bcolor b">新手专享投标期限设置：</span>三个月</p>
            <p class="text01" v-else><span class="bcolor b">新手专享投标期限设置：</span>7-12个月期限范围，具体以每个实际匹配的项目期限为准；</p>
            <p class="text01"><span class="bcolor b">新手专享投标范围：</span>个人消费贷、渠道消费贷、仟姿贷等散标项目；</p>
            <p class="text01" v-if="novice_rate"><span class="bcolor b">投资利率：</span>往期年化参考利率8%+平台奖励年化1%，其中平台1%年化奖励按月随息发放，若提前提出，则退出项目所对应的后续1%年化奖励将不再发放</p>
            <p class="text01" v-else><span class="bcolor b">投资利率：</span>往期年化参考利率：9%；</p>
            <p class="text01"><span class="bcolor b">新手专享投资次数限制：</span>最多可投5次；</p>
            <p class="text01"><span class="bcolor b">新手专享最大投资金额：</span>新手专享适用用户最高可投2万元；</p>
            <p class="text01"><span class="bcolor b">计息方式：</span>每个实际匹配的项目满标计息；</p>
            <p class="text01"><span class="bcolor b">回款方式：</span>等额本息；</p>
            <p class="text01"><span class="bcolor b">投资管理费说明：</span>每月回款日按照利息的一定比率收取，具体以每个实际匹配的项目投资管理费为准；</p>
            <p class="text01">
                <span class="bcolor b">债权转让说明：</span>
                新手专享所匹配标的锁定期期内不可转让；锁定期结束但未满3个月，支持转让，按照平台转让收费；<template v-if="!novice_rate">已满3个月平台免费自动转让；</template>
            </p>
            <p class="text01"><span class="bcolor b">新手专享预约有效期说明：</span>在预约有效期内，系统自动匹配标的；在超过预约有效期时，系统将未匹配的金额返回账户余额；</p>
            <p class="text01"><span class="bcolor b">新手专享预约金额部分投标成功说明：</span>在超过预约有效期时，可能会存在部分金额未匹配，系统会将未匹配的金额返回账户余额，可继续投资。</p>
        </div>
    </section>
</template>
<script>
    import {MessageBox} from 'mint-ui'

    export default {
        name: 'noviceAgreement',
        data() {
            return {
                wrapperHeight: ''
            }
        },
        props: {
            novice_rate: {
                type: String
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - 300;
            this.$on('agreementNoviceModel', (val) => {
                this.agreementLayer(val);
            });
        },
        methods: {
            agreementLayer(val) {
                MessageBox({
                    title: '新手专享规则说明',
                    message: val,
                    showConfirmButton: true,
                    confirmButtonText: '关闭'
                })
            }
        }
    }
</script>
<style>
    .agreement {
        padding: 0 20px;
        color: #000000;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: left;
    }

    .agreement h1 {
        font-size: 20px;
        line-height: 23px;
        margin-top: 15px;
        margin-bottom: 10px;
        width: 100%;
        text-align: center;
    }

    .agreement h2 {
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 5px;
        margin-top: 15px;
    }

    .agreement p.text01 {
        font-size: 14px;
        text-indent: 2em;
        line-height: 1.5;
        margin-bottom: 5px;
    }

    .agreement .b {
        font-weight: bold;
        font-size: 14px;
        font-size: 14px;
        text-indent: 2em;
        line-height: 1.5;
    }

    .agreement .u {
        text-decoration: underline
    }

    .agreement .i {
        font-style: italic
    }

</style>
