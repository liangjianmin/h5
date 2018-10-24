<template>
    <section>
        <div class="agreement" :style="{ height: wrapperHeight + 'px' }">
            <p class="text01"><span class="bcolor b">预约投标介绍：</span>预约投标是平台为解决出借人没有时间或精力抢标而推出的约标工具。出借人在平台上选择期限范围，输入预约金额，并授权平台在出借人设置的条件范围内自动投标，以此达到提高资金利用率的目的。</p>
            <p class="text01"><span class="bcolor b">投标期限设置：</span>出借人选择的期限范围，具体以每个实际匹配的项目期限为准；</p>
            <p class="text01"><span class="bcolor b">预约投标范围：</span>个人消费贷、渠道消费贷、仟姿贷等散标项目或债转项目；</p>
            <p class="text01"><span class="bcolor b">投资利率：</span>实际利率具体以每个匹配的项目往期参考利率为准；</p>
            <p class="text01"><span class="bcolor b">计息方式：</span>每个实际匹配的项目满标计息；</p>
            <p class="text01"><span class="bcolor b">回款方式：</span>等额本息；</p>
            <p class="text01"><span class="bcolor b">投资管理费说明：</span>每月回款日按照利息的一定比率收取，具体以每个实际匹配的项目投资管理费为准；</p>
            <p class="text01"><span class="bcolor b">转让说明：</span>所匹配标的锁定期结束后，支持转让。具体以每个实际匹配的项目转让方式为准；</p>
            <p class="text01"><span class="bcolor b">预约有效期说明：</span>在预约有效期内，系统自动匹配标的；在超过预约有效期时，系统将未匹配的金额返回账户余额；</p>
            <p class="text01"><span class="bcolor b">预约金额部分投标成功说明：</span>在超过预约有效期时，可能会存在部分金额未匹配，系统会将未匹配的金额返回账户余额，可继续投资。</p>
            <p class="text01"><span class="bcolor b">垫息说明：</span>投标项目为债转项目时，需将转让人本期持有天数所得收益垫付给转让人，垫付利息会在最近一次回款日返回至您的账户。</p>
        </div>
    </section>
</template>
<script>
    import {MessageBox} from 'mint-ui'

    export default {
        name: 'bespeackAgreement',
        data() {
            return {
                wrapperHeight: ''
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - 300;
            this.$on('agreementBatchModel', (val) => {
                this.agreementLayer(val);
            });
        },
        methods: {
            agreementLayer(val) {
                MessageBox({
                    title: '预约投标规则说明',
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
