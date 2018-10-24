<template>
    <section>
        <div class="agreement" :style="{ height: wrapperHeight + 'px' }">
            <p class="text01">鉴于网络借贷交易过程中,可能面临多种风险因素,作为多啦平台的注册用户，在您选择投资前，请仔细阅读以下重要内容，出现以下风险的责任由您自行承担：</p>
            <p class="text01"><span class="bcolor b">宏观经济风险：</span>因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失；</p>
            <p class="text01"><span class="bcolor b">政策风险：</span>因网络借贷是基于当前的国家宏观政策及相关法律法规所设计。如国家宏观政策（如财政政策、货币政策、行业政策、地区发展政策）以及市场相关法律法规发生变化，可能会导致网络借贷面临损失。</p>
            <p class="text01"><span class="bcolor b">违约风险：</span>因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失；</p>
            <p class="text01"><span class="bcolor b">利率风险：</span>市场利率变化可能对购买或持有产品的实际收益产生影响；</p>
            <p class="text01"><span class="bcolor b">不可抗力风险：</span>因战争、自然灾害、重大政治事件、电脑病毒爆发等不可抗力，以及其他不可预见的意外事件，或其他可能导致网络借贷面临损失的任何风险。</p>
            <p class="text01"><span class="bcolor b">因投资人的过错导致的任何损失，该过错包括但不限于：</span>决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</p>
            <p class="text01">用户在做出投资决定、签署各项协议之前应认真阅读本《风险提示书》内容，并认真阅读网站内各项协议以及公布的各项规则的全部内容；同时，用户需要了解相关投资项目的基本情况和投资风险与收益状况。如有任何疑问，用户应向多啦平台进行咨询。</p>
            <p class="text01">用户全面阅读该《风险提示书》内容，并仅在确认其具有识别及承担相关风险能力、确认已从多啦平台获得令其满意的咨询结果、确认拟进行的交易安全符合其本身从事该交易的目的以及接受该交易可能会出现风险之后，才进行通过多啦平台上进行网络借贷交易。</p>
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
            this.$on('agreementRiskModel', (val) => {
                this.agreementLayer(val);
            });
        },
        methods: {
            agreementLayer(val) {
                MessageBox({
                    title: '风险提示书',
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
