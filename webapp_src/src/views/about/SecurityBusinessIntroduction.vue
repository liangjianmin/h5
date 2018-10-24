<template>
    <section class="dola-about-security_business_introduction">
        <AboutNav :type="4"></AboutNav>
        <div class="dola-security-banner">
            <h3 class="dola-security-title">业务介绍</h3>
            <p class="desc">小额分散&nbsp;&nbsp;真实消费&nbsp;&nbsp;用户优质&nbsp;&nbsp;风险可控 </p>
        </div>
        <div class="dola-security-content dola-security-content1">
            <h5 class="dola-security-cont-title">业务简介</h5>
            <p class="text text-mt">消费金融是指面向各阶层消费者提供消费贷款的现代金融服务。在真实消费场景下（购买3C、家电、教育培训、医疗美容等产品／服务），消费者由于自身财务安排需要向特定机构或个人借款，先提前享用产品／服务，然后按月分期还本付息给资金出借人，从而形成特定的债权债务关系。类似的金融产品有淘宝花呗与京东白条。</p>
        </div>
        <div class="dola-security-content dola-security-content2">
            <h5 class="dola-security-cont-title">业务流程</h5>
            <img src="../../assets/images/app/liucheng01.png" alt="" class="liuchengtu"/>
        </div>
        <div class="dola-security-content dola-security-content3">
            <h5 class="dola-security-cont-title">资产优势</h5>
            <ul class="property-lists clearfix">
                <li class="list list1">
                    <i class="icon"></i>
                    <dl>
                        <dt>小额分散</dt>
                        <dd>人均借款金额较小，借款人来自全国各地的各行各业，有效分散单一借款人带来的违约风险。</dd>
                    </dl>
                </li>
                <li class="list list2">
                    <i class="icon"></i>
                    <dl>
                        <dt>真实消费</dt>
                        <dd>借款人来源于真实消费场景，用途明确，还款来源可靠，违约成本高，贷后管理有据可查，方便追踪。</dd>
                    </dl>
                </li>
                <li class="list list3">
                    <i class="icon"></i>
                    <dl>
                        <dt>用户优质</dt>
                        <dd>借款用户消费理念强且收入稳定，还款能力强。</dd>
                    </dl>
                </li>
                <li class="list list4">
                    <i class="icon"></i>
                    <dl>
                        <dt>风险可控</dt>
                        <dd>多重风控手段，密切的跟踪管理，将逾期违约风险大大降低。</dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="dola-security-content dola-security-content4">
            <h5 class="dola-security-cont-title">项目来源全国分布图</h5>
            <div class="dola-security-area">
                <img src="../../assets/images/app/map.png" alt="" class="dola-security-area-img">
                <p class="t1">TOP：10</p>
                <div class="dola-security-area-list clr boxsiz" v-if="loanarea">
                    <dl class="fl">
                        <template v-for="(item,index) in loanarea">
                            <template v-if="index <=4">
                                <dd :key="index">
                                    <span class="t1 lineBlock va-m">{{index + 1}}.&nbsp;&nbsp;</span>
                                    <span class="t2 lineBlock va-m">{{item.name}}</span>
                                    <span class="t3 lineBlock va-m"><em :style="{ width: item.value + '%' }"></em></span>
                                </dd>
                            </template>
                        </template>
                    </dl>
                    <dl class="fr">
                        <template v-for="(item,index) in loanarea">
                            <template v-if="index >4">
                                <dd :key="index">
                                    <span class="t1 lineBlock va-m">{{index + 1}}.&nbsp;&nbsp;</span>
                                    <span class="t2 lineBlock va-m">{{item.name}}</span>
                                    <span class="t3 lineBlock va-m"><em :style="{ width: item.value + '%' }"></em></span>
                                </dd>
                            </template>
                        </template>
                    </dl>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import AboutNav from '../about/AboutNav.vue'
    import {jsAppPropertyFn} from '../../util/appCallback'

    export default {
        name: 'security_business_introduction',
        data() {
            return {}
        },
        computed: mapState({
            loanarea: state => state.report.loanarea
        }),
        created() {
            this.getOperationReports();
            window.jsAppProperty = function () {
                return jsAppPropertyFn('业务介绍');
            }
        },
        methods: {
            getOperationReports() {
                this.$store.dispatch({
                    type: 'loanarea'
                });
            }
        },
        components: {
            AboutNav
        }
    }
</script>

