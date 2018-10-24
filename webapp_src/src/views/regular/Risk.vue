<template>
    <section class="dola-tip-wrap boxsiz">
        <div class="tips-cont">
            <h1>风险提示书</h1>
            <p>鉴于网络借贷交易过程中,可能面临多种风险因素,作为多啦平台的注册用户，在您选择投资前，请仔细阅读以下重要内容，出现以下风险的责任由您自行承担：</p>
            <p><strong>宏观经济风险：</strong>因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失；</p>
            <p><strong>政策风险：</strong>因网络借贷是基于当前的国家宏观政策及相关法律法规所设计。如国家宏观政策（如财政政策、货币政策、行业政策、地区发展政策）以及市场相关法律法规发生变化，可能会导致网络借贷面临损失。</p>
            <p><strong>违约风险：</strong>因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失；</p>
            <p><strong>利率风险：</strong>市场利率变化可能对购买或持有产品的实际收益产生影响；</p>
            <p><strong>不可抗力风险：</strong>因战争、自然灾害、重大政治事件、电脑病毒爆发等不可抗力，以及其他不可预见的意外事件，或其他可能导致网络借贷面临损失的任何风险。</p>
            <p><strong>因投资人的过错导致的任何损失，该过错包括但不限于：</strong>决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</p>
            <p>用户在做出投资决定、签署各项协议之前应认真阅读本《风险提示书》内容，并认真阅读网站内各项协议以及公布的各项规则的全部内容；同时，用户需要了解相关投资项目的基本情况和投资风险与收益状况。如有任何疑问，用户应向多啦平台进行咨询。</p>
            <p>用户全面阅读该《风险提示书》内容，并仅在确认其具有识别及承担相关风险能力、确认已从多啦平台获得令其满意的咨询结果、确认拟进行的交易安全符合其本身从事该交易的目的以及接受该交易可能会出现风险之后，才进行通过多啦平台上进行网络借贷交易。</p>
        </div>
    </section>
</template>
<script>

    export default {
        name: 'risktip',
        data() {
            return {
                title: '风险提示书',
                app: false
            }
        },
        created() {
            window.scrollTo(0, 0);
        },
        watch: {
            $route(to) {
                if (to.path == '/about/risk') {
                    window.scrollTo(0, 0);
                }
            }
        }
    }
</script>
<style scoped>
    .dola-tip-wrap {
        width: 100%;
        height: auto;
        background-color: #EFEFEF;
    }

    .dola-tip-wrap .tips-cont {
        padding: 20px 15px;
    }

    .tips-cont-mt {
        margin-top: 0px !important;
    }

    .dola-tip-wrap .tips-cont h1 {
        font-size: 20px;
        line-height: 23px;
        margin-bottom: 10px;
        color: #555;
        width: 100%;
        text-align: center;
    }

    .dola-tip-wrap .tips-cont p {
        font-size: 14px;
        color: #333;
        margin-bottom: 20px;
        line-height: 20px;
        text-align: justify;
    }

    .dola-tip-wrap .tips-cont p strong {
        font-weight: bold;
        font-size: 14px;
    }

</style>
