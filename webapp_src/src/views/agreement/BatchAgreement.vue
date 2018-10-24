<template>
    <section>
        <div class="agreement" :style="{ height: wrapperHeight + 'px' }">
            <p class="text01"><span class="bcolor b">一键投标介绍：</span>一键投标工具是平台为了方便用户投资小额借款项目而推出的快捷投标工具，平台筛选出符合用户选择的期限范围的借款列表。用户输入投资金额后，系统自动将投资金额分散到匹配的标的上，以达到快捷投资，提高投标效率的目的。</p>
            <p class="text01"><span class="bcolor b">投标期限设置：</span>0-36个月，用户选择的期限范围内，具体以每个实际匹配的项目期限为准；</p>
            <p class="text01"><span class="bcolor b">投标范围说明：</span>平台所有可投标的；</p>
            <p class="text01"><span class="bcolor b">投资利率：</span>用户选择的期限范围对应的利率 ，具体以每个实际匹配的项目利率为准；</p>
            <p class="text01"><span class="bcolor b">计息方式：</span>每个实际匹配的项目满标计息，具体以每个实际匹配的项目计息方式为准；</p>
            <p class="text01"><span class="bcolor b">回款说明：</span>按照等额本息算法每月回款日回款本息，具体以每个实际匹配的项目回款方式为准；</p>
            <p class="text01"><span class="bcolor b">投资管理费说明：</span>每月回款日按照利息的一定比率收取，具体以每个实际匹配的项目回款方式为准；</p>
            <p class="text01"><span class="bcolor b">转让说明：</span>用户所投标的锁定期结束后，支持转让。具体以每个实际匹配的项目转让方式为准；</p>
            <p class="text01"><span class="bcolor b">投资金额部分投标成功说明：</span>用户输入投资金额后，系统自动将投资金额分散到当前可投的散标项目上，所以存在部分金额未匹配上标的情况，系统在自动匹配结束后将未匹配上标的的投资金额解除冻结，用户可将已解冻金额继续投资；</p>
            <p class="text01"><span class="bcolor b">垫息说明：</span>在选择投标类型中含有债权转让项目，系统自动匹配时匹配上债权转让项目情况下，需将转让人本期持有天数所得的收益垫付给转让人，垫付利息会在最近一次回款日返回至您的账户。</p>
        </div>
    </section>
</template>
<script>
    import {MessageBox} from 'mint-ui'

    export default {
        name: 'InvestmentAgreement',
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
                    title: '一键投标规则说明',
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
