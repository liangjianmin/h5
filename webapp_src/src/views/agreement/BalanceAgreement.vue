<template>
    <section>
        <div class="agreement" :style="{ height: wrapperHeight + 'px' }">
            <dl class="balance-container">
                <dt class="balance-tit">余额自动投标排队规则说明：</dt>
                <dd class="balance-text">按照开启时间先后顺序进行排队，以下几种情况会导致重新排队：</dd>
                <dd class="balance-text">1、关闭余额自动复投后重新开启。</dd>
                <dd class="balance-text">2、修改余额自动复投设置。</dd>
            </dl>
            <dl class="balance-container">
                <dt class="balance-tit">自动投标与设置说明：</dt>
                <dd>
                    <dl>
                        <dt class="balance-text">【账户保留余额】</dt>
                        <dd class="balance-text">账户可用余额减去账户保留余额可用于自动投标；若账户保留余额为0时，则账户全部可用余额可用于自动投标；若账户可用余额减去账户保留余额小于起投金额100元，不会触发自动投标机制。</dd>
                        <dt class="balance-text">【投标期限】</dt>
                        <dd class="balance-text">出借人选择的期限范围，具体以每个实际匹配的项目期限为准。</dd>
                        <dt class="balance-text">【投资利率】</dt>
                        <dd class="balance-text">实际利率具体以每个匹配的项目往期参考利率为准。</dd>
                        <dt class="balance-text">【投标范围】</dt>
                        <dd class="balance-text">平台所有可投标的。</dd>
                        <dt class="balance-text">【回款方式】</dt>
                        <dd class="balance-text">等额本息。</dd>
                        <dt class="balance-text">【投资管理费说明】</dt>
                        <dd class="balance-text">具体以每个实际匹配的项目投资管理费为准。</dd>
                        <dt class="balance-text">【转让说明】</dt>
                        <dd class="balance-text">具体以每个实际匹配的项目转让方式为准。</dd>
                        <dt class="balance-text">【垫息说明】</dt>
                        <dd class="balance-text">投标项目为债转项目时，需将转让人本期持有天数所得收益垫付给转让人，垫付利息会在最近一次回款日返回至您的账户。</dd>
                    </dl>
                </dd>
            </dl>
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
            this.$on('agreementBalanceModel', (val) => {
                this.agreementLayer(val);
            });
        },
        methods: {
            agreementLayer(val) {
                MessageBox({
                    title: '余额自动复投规则说明',
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

    .agreement .balance-container {
        margin-bottom: 20px;
    }

    .agreement .balance-text {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 5px;
    }

    .agreement .balance-tit {
        font-weight: bold;
        font-size: 14px;
        line-height: 1.5;
    }

    .agreement .u {
        text-decoration: underline
    }

    .agreement .i {
        font-style: italic
    }

</style>
