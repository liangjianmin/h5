<template>
    <section class="dola-standard-powder dola-tranfer-detail" :class="{'dola-scoll-prevent':invest_affirm==true}" v-if="transferdetail.transfer_info">
        <TitleBar :title="title" v-if="!isApp"></TitleBar>
        <section class="dola-standard-powder-detail" :class="{isApp:isApp}" v-if="transferdetail.transfer_info.can_buy > 0">
            <div class="detail-wrapper">
                <div class="detail-container" v-if="transferdetail.loan_detail && transferdetail.transfer_info">
                    <div class="top clr">
                        <div class="left clr">
                            <div class="cont cont01">
                                <h5 class="tit">往期年化收益率</h5>
                                <p class="text"><b>{{ transferdetail.loan_detail.interest_rate }}</b>%<em style="margin-left: 4px;" class="ico-tips lineBlock va-m" @click="tip()"></em></p>
                            </div>
                            <div class="cont cont02">
                                <h5 class="tit">剩余期限</h5>
                                <p class="text"><span v-if="transferdetail.transfer_info.left_investment_month"><b>{{ transferdetail.transfer_info.left_investment_month }}</b>个月</span><span v-if="transferdetail.transfer_info.left_investment_day">{{ transferdetail.transfer_info.left_investment_day }}天</span></p>
                            </div>
                        </div>
                        <div class="right">
                            <p class="text">转让本金 {{ transferdetail.transfer_info.transfer_money }}元</p>
                            <p class="text text02">垫付利息 {{ transferdetail.transfer_info.wait_pay_interest }}元</p>
                        </div>
                    </div>
                    <div class="bottom clr">
                        <div class="l">
                            <h5 class="tit">回款日</h5>
                            <p class="text">{{ transferdetail.transfer_info.next_payment_date_format }}</p>
                        </div>
                        <div class="c">
                            <h5 class="tit">回款方式</h5>
                            <p class="text">{{ transferdetail.transfer_info.pay_model }}</p>
                        </div>
                        <div class="r">
                            <h5 class="tit">到期时间</h5>
                            <p class="text">{{ transferdetail.transfer_info.due_day }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-lists-wrapper" v-if="transferdetail.transfer_info">
                <ul class="detail-lists">
                    <li class="list list01">
                        <template v-if="transferdetail.user">
                            <span class="tit">可用余额</span>
                            <span class="cont"><b>{{transferdetail.user.available_total_money}}</b>元</span>
                            <a href="javascript:;" class="trade-in-btn" @click.prevent="tradeIn">充值</a>
                        </template>
                        <template v-else>
                            <span class="tit">可用余额</span>
                            <span class="cont"><a style="color: #f2843a;" @click="userLogin">登录后可查看</a></span>
                        </template>
                    </li>
                    <li class="list list03">
                        <span class="tit">计息方式</span>
                        <span class="cont">加入当天计息</span>
                    </li>
                    <li class="list list04">
                        <span class="tit">月回款本息<em style="margin-left: 4px;" class="ico-tip lineBlock va-m" @click="tip3()"></em></span>
                        <span class="cont" v-if="transferdetail.schedule_info.length>0">{{ transferdetail.schedule_info[0].principal_interest }}元</span>
                    </li>
                    <li class="list list05">
                        <span class="tit">债权转让</span>
                        <span class="cont">投资满30天，可申请转让</span>
                    </li>
                </ul>
            </div>
            <div class="detail-input-wrapper" v-if="transferdetail.transfer_info">
                <form class="inveset-form">
                   <!-- <div class="list clr">
                        <span class="tit">转让价格<em style="margin-left: 4px;" class="ico-tip lineBlock va-m" @click="tip2()"></em></span>
                        <span class="cont"><b>{{ transferdetail.transfer_info.accept_money }}</b>&nbsp;元</span>
                    </div>-->
                    <div class="list clr">
                        <span class="tit">实际支付<em style="margin-left: 4px;" class="ico-tip lineBlock va-m" @click="tip4()"></em></span>
                        <span class="cont"><b>{{ transferdetail.transfer_info.accepter_monay }}</b>&nbsp;元</span>
                    </div>
                    <div class="list clr">
                        <span class="tit" style="color: #ccc;">往期参考收益<em style="margin-left: 4px;" class="ico-tip lineBlock va-m" @click="tip5()"></em></span>
                        <span class="cont" style="color: #ccc;">{{ transferdetail.transfer_info.history_interest }}&nbsp;元</span>
                    </div>
                    <a class="join-btn" @click.prevent="join_transfer">立即加入</a>
                </form>
            </div>
        </section>
        <!-- 确认投资 -->
        <div class="invest-affirm" v-if="invest_affirm && transferdetail.user && transferdetail.transfer_info">
            <section class="invest-affirm-wrapper">
                <div class="title-wrapper">
                    <span class="close-wrapper" @click="invest_affirm = false"></span>
                    <h5 class="title">确认投资</h5>
                </div>
                <div class="invest-money">
                    <p class="text"><span class="pay-text">支付金额:</span>￥{{ transferdetail.transfer_info.accepter_monay }}</p>
                </div>
                <div name="affirm-form" class="affrim-join-pro-from">
                    <ul class="form-lists">
                        <!--<li class="list list2">
                            <span class="desc">转让本金</span>
                            <span class="content">{{ transferdetail.transfer_info.transfer_money }}元(折后{{ transferdetail.transfer_info.accept_money }}元)</span>
                        </li>-->
                        <li class="list list2">
                            <span class="desc">垫付利息<em style="margin-left: 4px;" class="ico-tip lineBlock va-m" @click="tip6()"></em></span>
                            <span class="content">{{ transferdetail.transfer_info.wait_pay_interest }}元</span>
                        </li>
                        <li class="list list2">
                            <span class="desc">剩余期限</span>
                            <span class="content"><template v-if="transferdetail.transfer_info.left_investment_month"><b>{{ transferdetail.transfer_info.left_investment_month }}</b>个月</template><template v-if="transferdetail.transfer_info.left_investment_day"><b>{{ transferdetail.transfer_info.left_investment_day }}</b>天</template></span>
                        </li>
                        <li class="list list3">
                            <span class="desc">往期参考收益</span>
                            <span class="content">{{ transferdetail.transfer_info.history_interest }}元</span>
                        </li>
                    </ul>
                    <div class="agree-yx">
                        <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                        <div class="lineBlock agree-yx-text">
                            <span>同意</span>
                            <a href="javascript:;" @click="agreement(1)">《投资与咨询服务协议》</a>和
                            <a href="javascript:;" @click="agreement(3)">《风险提示》</a>
                        </div>
                    </div>
                    <div class="affirm-btn-wrapper">
                        <input type="button" :disabled="invest_money_confirm_disabled" :class="{'disabale-active':invest_money_confirm_disabled}" :value="'确认支付'+transferdetail.transfer_info.accepter_monay+'元'" class="affirm-btn" @click.prevent="verifyJoinSubmit()"/>
                    </div>
                </div>
            </section>
        </div>
        <!--导航-->
        <nav class="dola-regular-nav" style="display: block" :class="{nocanby: transferdetail.transfer_info.can_buy===0&&!isApp}">
            <ul class="nav-list">
                <li class="item" @click="navTab(0)" :class="{'current':nav_list_current==0}"><span>项目介绍</span></li>
                <li class="item" @click="navTab(1)" :class="{'current':nav_list_current==1}"><span>安全保障</span></li>
                <li class="item" @click="navTab(2)" :class="{'current':nav_list_current==2}"><span>投资记录</span></li>
                <li class="item" @click="navTab(3)" :class="{'current':nav_list_current==3}"><span>还款计划</span></li>
            </ul>
        </nav>
        <!--项目信息-->
        <div class="dola-product dola-pro-jieshao" v-if="transferdetail.loan_detail!=null" :style="{'display':isAvisible}">
            <a class="islogin-status" @click="userLogin" v-if="transferdetail.user == ''">登录 查看详情</a>
            <div :class="{'opacityFlag':transferdetail.user == ''}">
                <section class="dola-project boxsiz" v-if="transferdetail.transfer_info">
                    <h3 class="title boxsiz">项目介绍</h3>
                    <ul class="lists">
                        <li class="list boxsiz">
                            <span class="desc-title va-m">项目名称</span>
                            <span class="lineBlock desc-content va-m">{{transferdetail.loan_detail.loan_text}}</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">往期年化收益率</span>
                            <span class="desc-content va-m desc-content-text">{{transferdetail.loan_detail.interest_rate}}%</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">剩余期限</span>
                            <span class="desc-content va-m desc-content-text"><span v-if="transferdetail.transfer_info.left_investment_month">{{ transferdetail.transfer_info.left_investment_month }}个月</span><span v-if="transferdetail.transfer_info.left_investment_day">{{ transferdetail.transfer_info.left_investment_day }}天</span></span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">项目总额</span>
                            <span class="desc-content va-m desc-content-text">{{transferdetail.transfer_info.transfer_money}}元</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">到期时间</span>
                            <span class="desc-content va-m desc-content-text">{{transferdetail.transfer_info.due_day}}</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">加入条件</span>
                            <span class="desc-content va-m desc-content-text">按转让本金全部承接</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">计息方式</span>
                            <span class="desc-content va-m desc-content-text">加入当天计息</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">回款方式</span>
                            <span class="desc-content va-m desc-content-text">{{ transferdetail.transfer_info.pay_model }}</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title va-m">转让方式</span>
                            <span class="desc-content va-m desc-content-text">投资满30天可转让</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">转让手续费</span>
                            <span class="desc-content lineBlock va-m desc-content-text">转让手续费=转让本金*0.2%*未持有的月份；未持有月份=项目实际月份-已持有月份(不满一个月，该月份不计算入内)</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">管理费说明</span>
                            <span class="desc-content lineBlock va-m desc-content-text">投资管理费每月回款日收取，投资管理费=当月回款利息*10%（2018.05.01~2018.12.31期间投资可享受投资管理费五折优惠）</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">投资要求</span>
                            <span class="desc-content va-m desc-content-text">风险评测级别“保守”以上</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">借款人推荐方</span>
                            <span class="desc-content lineBlock va-m desc-content-text" v-if="(transferdetail.loan_detail.source).indexOf('mmt_') >= 0 ">买买提：公司成立于2016年2月，以打造“年轻人的信用钱包”为发展理念，致力于为广大用户提供安全高效的金融服务。买买提依托并利用强大的资源，将传统金融业务与互联网技术相结合，充分发挥整合和协同效应的优势，探索全新的互联网金融发展模式。https://www.maimaiti.cn</span>
                            <span class="desc-content lineBlock va-m desc-content-text" v-if="(transferdetail.loan_detail.source).indexOf('bq_') >= 0 "> 佰仟金融：公司成立于2013年12月，致力于为普通消费者提供优质的消费分期服务，涵盖手机、电脑、家电、电动车、摩托车、汽车、医美、时尚消费品等领域，成功服务了来自全国各地的1800万用户。www.billionsfinance.cn</span>
                            <span class="desc-content lineBlock va-m desc-content-text" v-if="(transferdetail.loan_detail.source).indexOf('xyzj_') >= 0 ">信用之家：公司成立于2015年，是一家以大数据风控和金融科技技术为核心，提供多产品、多渠道综合贷款服务的互联网金融服务公司。公司通过技术和风控手段打通线上平台与线下渠道的联系，打造从线上到线下的全流程金融服务，从而实现新型的普惠金融服务体系。</span>
                        </li>
                    </ul>
                </section>
                <section class="dola-project dola-project-explain" v-if="transferdetail.transfer_info">
                    <h3 class="title boxsiz">债权转让信息</h3>
                    <ul class="lists-ul">
                        <li class="lists-li" v-if="transferdetail.transfer_info.transfer_user_name">
                            <span class="desc-title lineBlock va-m">债权转让人</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{transferdetail.transfer_info.transfer_user_name}}</span>
                        </li>
                        <li class="lists-li" v-if="transferdetail.transfer_info.create_time_format">
                            <span class="desc-title lineBlock va-m">转让时间</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{transferdetail.transfer_info.create_time_format}}</span>
                        </li>
                        <li class="lists-li" v-if="transferdetail.transfer_info.transfer_money">
                            <span class="desc-title lineBlock va-m">转让本金</span>
                            <span class="desc-content desc-content-intent lineBlock va-m">{{transferdetail.transfer_info.transfer_money}}元</span>
                        </li>
                       <!-- <li class="lists-li" v-if="transferdetail.transfer_info.accepter_monay">
                            <span class="desc-title lineBlock va-m rule-tit">转让价格</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{transferdetail.transfer_info.accepter_monay}}元</span>
                        </li>-->
                        <li class="lists-li" v-if="transferdetail.transfer_info.reason">
                            <span class="desc-title lineBlock va-m rule-tit">转让原因</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{ transferdetail.transfer_info.reason }}</span>
                        </li>
                        <!--<template v-if="transferdetail.transfer_info.can_buy===0">
                            <li class="lists-li" v-if="transferdetail.transfer_info.accept_user_name">
                                <span class="desc-title lineBlock va-m rule-tit">受让人</span>
                                <span class="desc-content lineBlock va-m desc-content-text">{{ transferdetail.transfer_info.accept_user_name }}</span>
                            </li>
                            <li class="lists-li" v-if="transferdetail.transfer_info.transfer_time_format">
                                <span class="desc-title lineBlock va-m rule-tit">转让完成时间</span>
                                <span class="desc-content lineBlock va-m desc-content-text">{{ transferdetail.transfer_info.transfer_time_format }}</span>
                            </li>
                        </template>-->
                    </ul>
                </section>
                <section class="dola-project dola-project-tips">
                    <h3 class="title boxsiz" v-if="transferdetail.transfer_info">
                        <a :href="'/#/standard/detail/'+transferdetail.loan_detail.loan_id">原标信息</a>
                    </h3>
                    <h3 class="title boxsiz">
                        <template v-if="app">
                            <template v-if="platform == 'ios'">
                                <a @click="appCallback(platform,'risk','/spa#/about/risk?platform=ios')">风险提示</a>
                            </template>
                            <template v-else-if="platform == 'android'">
                                <a @click="appCallback(platform,'risk','/spa#/about/risk?platform=android')">风险提示</a>
                            </template>
                        </template>
                        <template v-else>
                            <router-link to="/about/risk">风险提示</router-link>
                        </template>
                    </h3>
                </section>
            </div>
        </div>
        <!-- 安全保障 -->
        <div class="dola-about-safety-guarantee" :style="{'display':isBvisible}">
            <div class="content content1">
                <h3 class="safety-guarantee-title">消费金融的资产优势</h3>
                <ul class="consumer-finance-lists clearfix">
                    <li class="list list1">
                        <dl>
                            <dt class="img"><i class="icon"></i></dt>
                            <dt class="h5">小额分散</dt>
                            <dd class="desc">投资款项分散出借给若干借款人，降低风险</dd>
                        </dl>
                    </li>
                    <li class="list list2">
                        <dl>
                            <dt class="img"><i class="icon"></i></dt>
                            <dt class="h5">风险可控</dt>
                            <dd class="desc">天盾大数据风控体系+多重风控，合作机构担保垫付</dd>
                        </dl>
                    </li>
                    <li class="list list3">
                        <dl>
                            <dt class="img"><i class="icon"></i></dt>
                            <dt class="h5">真实消费</dt>
                            <dd class="desc">真实消费场景，用途明确，还款来源可靠</dd>
                        </dl>
                    </li>
                    <li class="list list4">
                        <dl>
                            <dt class="img"><i class="icon"></i></dt>
                            <dt class="h5">用户优质</dt>
                            <dd class="desc">借款用户收入稳定，还款能力强</dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="content content2">
                <h3 class="safety-guarantee-title">天盾大数据风控系统</h3>
                <div class="cont">
                    <dl>
                        <dt>信用黑名单</dt>
                        <dd>全行业共享黑名单，强力狙击信用不良用户，防止其在多家平台重复借款</dd>
                    </dl>
                    <dl>
                        <dt>智能数据采集</dt>
                        <dd>覆盖全国23个省份亿万人口，用户全行业历史借款数据，用户属性、行为实时采集录入系统</dd>
                    </dl>
                    <dl>
                        <dt>OCR人脸识别技术</dt>
                        <dd>身份证信息、图像智能核验识别用户真实性，防止证件作假伪造挪用他人等欺诈行为</dd>
                    </dl>
                    <dl>
                        <dt>信用评核系统</dt>
                        <dd>建立信用评分模型，按用户资质分列排布，不同分数对应不同借款金额权限，智能筛选优质用户，拦截信用不良用户</dd>
                    </dl>
                    <dl>
                        <dt>智能数据分析</dt>
                        <dd>覆借款行为分析，社交网络分析，消费行为分析，用户属性分析</dd>
                    </dl>
                    <dl>
                        <dt>反欺诈拦截</dt>
                        <dd>电话回访，信息再确认，人工抽查确认用户信息准确无误，设置系统用户信息异常提醒、拦截功能</dd>
                    </dl>
                </div>
            </div>
            <div class="content content3">
                <h3 class="safety-guarantee-title">全方位保障</h3>
                <div class="cont">
                    <dl>
                        <dt class="h5">资金透明，去向可追踪</dt>
                        <dd class="desc">投资记录可查，借款人信息可见，合同一目了然</dd>
                    </dl>
                    <dl>
                        <dt class="h5">法律保障，合规经营</dt>
                        <dd class="desc">聘请北京盈科（深圳）律师事务所为平台合规备案进行指导，确保平台合规经营。</dd>
                    </dl>
                    <dl>
                        <dt class="h5">资金同卡进出</dt>
                        <dd class="desc">用户资金充值与提现，只能同一张银卡，且银行卡必须与您注册实名一致</dd>
                    </dl>
                    <dl>
                        <dt class="h5">电子签章，合同可查</dt>
                        <dd class="desc">引进第三方平台法大大，采用电子签章技术对平台合同进行自动签名，保证合同法律有效性，防止合同被篡改</dd>
                    </dl>
                    <dl>
                        <dt class="h5">技术保障，信息安全</dt>
                        <dd class="desc">引入权威的VeriSign SSL数据传输加密以及阿里云Web应用防火墙、DDOS高防IP，网站安全级别同天猫等大型主流网站</dd>
                    </dl>
                    <dl>
                        <dt class="h5">众安保险，账户安全</dt>
                        <dd class="desc">众安保险为平台的用户提供账户安全险，账户资金在操作过程中将得到全程保护，用户无需支付任何费用即可享受该项服务</dd>
                    </dl>
                </div>
            </div>
        </div>
        <!--购买计划-->
        <div class="borrow-info back-money-pro" :style="{'display':isCvisible}">
            <table border="0" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                    <th>出借人</th>
                    <th>出借金额(元)</th>
                    <th>操作平台</th>
                    <th>时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="!transferdetail.transfer_info.can_buy">
                    <td>{{transferdetail.transfer_info.accept_user_name}}</td>
                    <td>{{transferdetail.transfer_info.transfer_money}}</td>
                    <td>{{transferdetail.transfer_info.platform}}</td>
                    <td>{{transferdetail.transfer_info.transfer_time_format}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--还款计划-->
        <div class="borrow-info back-money-pro" :style="{'display':isDvisible}">
            <div>
                <section class="borrow-info-wrapper page-loadmore-wrapper">
                    <template v-if="transferdetail.schedule_info">
                        <table border="0" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr>
                                <th>期次</th>
                                <th>还款日期</th>
                                <th>还款本金(元)</th>
                                <th>还款利息(元)</th>
                                <th>还款状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-if="transferdetail.schedule_info.length > 0">
                                <tr v-for="(item, key) in transferdetail.schedule_info" :key="key">
                                    <td>{{item.sequence}}</td>
                                    <td>{{item.payment_date_format}}</td>
                                    <td>{{item.principal}}</td>
                                    <td>{{item.interest}}</td>
                                    <td>{{item.payment_status_format}}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td>暂无记录</td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </template>
                </section>
            </div>
            <p class="tips" style="font-size: 14px;margin: 20px;color: #ccc;">说明:因计算方式为四舍五入，最后一期还款金额与之前期数稍有不同 </p>
        </div>
        <InvestmentAgreement :agreement-type="agreementtype" ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
        <RiskAgreement ref="RiskAgreement" v-show="agreement_flag"></RiskAgreement>
        <!--老用户弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="olduser">
                <i class="icn error"></i>
                <div class="text">
                    <p class="t1">为保障资金安全，投资前请先设置银行存管账户交易密码</p>
                    <p class="t3 tl">平台已为您开通银行存管账户。银行存管账户用于对您的资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import {Indicator, Toast, MessageBox} from 'mint-ui'
    import {services as Services} from '../../api/index'
    import Util from '../../util/index'
    import {jsWebViewCallBack, jsShowLoginCallBack, jsShowRechargeCallBack, jsSettingSafePwdCallBack} from '../../util/appCallback'
    import ChannelFooter from '../common/ChannelFooter.vue'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'
    import RiskAgreement from '../agreement/RiskAgreement.vue'

    let Base64 = require('js-base64').Base64;

    export default {
        name: 'transferDetail',
        computed: {
            ...mapState({
                transferdetail: state => state.transfer.transferdetail
            })
        },
        data() {
            return {
                title: '债转详情',
                invest_affirm: false,
                is_checked: true,
                safe_password: '',
                invest_money_confirm_disabled: false,
                app: false,
                nav_list_current: 0,
                isAvisible: 'block',
                isBvisible: 'none',
                isCvisible: 'none',
                isDvisible: 'none',
                isApp: false,
                agreement_flag: false,
                agreementtype: 'standard'
            }
        },
        created() {
            var transfer_id = this.$route.params.id * 1;

            if (transfer_id != undefined) {
                this.getTransferdetail(transfer_id);
            }

            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        },
        methods: {
            getTransferdetail(transfer_id) {
                this.$store.dispatch({
                    type: 'transferdetail',
                    transfer_id: transfer_id
                });
            },
            userLogin() {
                var transfer_id = this.$route.params.id;
                var platform = Util.getCookie('platform');
                if (transfer_id != undefined) {
                    if (platform != '') {
                        jsShowLoginCallBack(platform);
                    } else {
                        var decode = '/#/transfer/detail/' + transfer_id;
                        window.location.href = '/user/login?forward_url=' + Base64.encode(decode);
                    }
                }
            },
            tradeIn() {
                //判断app来源
                var platform = Util.getCookie('platform');
                //判断存管状态
                var userBindCardStatus = this.standardPowderDetail.user.bankcard_status;  // 绑卡状态
                var isSRBankUser = this.standardPowderDetail.user.srbank.is_srbank_user;  // 是否是存管用户
                var isNeedResetPass = this.standardPowderDetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                var isSRBindCardStatus = this.standardPowderDetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态

                if (!isSRBankUser) {
                    // 非存管用户提醒开户
                    this.tipFn(0);
                    return false;
                } else if (!isSRBindCardStatus || userBindCardStatus === "UNBIND") {
                    // 非绑卡状态提示绑卡
                    this.tipFn(1);
                    return false;
                } else {
                    // 已开通存管
                    if (isNeedResetPass) {
                        // 老用户重置密码
                        this.tipFn(4);
                        return false;
                    } else {
                        //区分app
                        if (platform != '') {
                            window.location.href = '/#/bank/recharge';
                            //jsShowRechargeCallBack(platform);
                        } else {
                            window.location.href = '/#/bank/recharge';
                        }
                    }
                }
            },
            join_transfer() {
                var isLogin = this.transferdetail.user;
                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 2000
                    });
                } else {
                    // 判断是否风险评测
                    var isWhetherEvaluation = this.transferdetail.user.whether_evaluation;
                    //判断存管状态
                    var userBindCardStatus = this.transferdetail.user.bankcard_status;  // 绑卡状态
                    var isSRBankUser = this.transferdetail.user.srbank.is_srbank_user;  // 是否是存管用户
                    var isNeedResetPass = this.transferdetail.user.srbank.need_reset_pwd_first; // 老用户重置密码
                    var isSRBindCardStatus = this.transferdetail.user.srbank.is_srbank_user_bindcard;   // 存管绑卡状态
                    var SRBankSignStatus = this.transferdetail.user.srbank.is_srbank_user_sign_auto_bid; // 自动投标签约
                    var SRBankSignStatusTr = this.transferdetail.user.srbank.is_srbank_user_sign_credit_transfer; // 自动债权转让签约
                    if (!isSRBankUser) {
                        // 非存管用户提醒开户
                        this.tipFn(0);
                        return false;
                    } else if (!isSRBindCardStatus || userBindCardStatus === "UNBIND") {
                        // 非绑卡状态提示绑卡
                        this.tipFn(1);
                        return false;
                    } else {
                        // 已开通存管
                        if (isNeedResetPass) {
                            // 老用户重置密码
                            this.tipFn(4);
                            return false;
                        } else {
                            if (!SRBankSignStatus) {
                                // 自动投标签约
                                this.tipFn(2);
                                return false;
                            } else if (!SRBankSignStatusTr) {
                                // 自动债权转让签约
                                this.tipFn(5);
                                return false;
                            } else if (!isWhetherEvaluation) {
                                MessageBox.alert('您未进行风险评测，请先评测再进行投资').then(() => {
                                    window.location.href = '/app/v1220/ucenter/risk_evaluation';
                                    return false;
                                });
                            } else {
                                //条件
                                this.invest_affirm = true;
                            }
                        }
                    }
                }
            },
            tipFn(type) {
                //区分app来源
                var platform = Util.getCookie('platform');
                if (type == 0) {
                    //开通存管
                    MessageBox({
                        title: '温馨提示',
                        message: '银行存管账户用于对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即开通',
                        cancelButtonText: '暂不开通'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'personalRegister',
                                redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?'
                            });
                        }
                    });
                } else if (type == 1) {
                    MessageBox({
                        title: '温馨提示',
                        message: '您还未绑定银行卡，请先绑定银行卡后再进行投资。',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即绑卡',
                        cancelButtonText: '暂不绑卡'
                    }).then(action => {
                        if (action == 'confirm') {
                            //已经解绑的用户  跳转上饶银行换绑
                            //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                            this.$store.dispatch({
                                type: 'rebindBankcardPage',
                                redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?from=rebind'
                            });
                        }
                    });
                } else if (type == 2) {
                    // 自动投标签约
                    MessageBox({
                        title: '开启投资授权协议签约',
                        message: '您还未开启《投资授权协议》中的"自动投标签约"，请先进行签约再进行投资',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '开启签约',
                        cancelButtonText: '暂不签约'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'srbankSignPage',
                                sign_type: 'sign_auto_bid',
                                redirectUrl: window.location.origin + '/#/bank/sign_page_success?',
                            });
                        }
                    });
                } else if (type == 3) {
                    //去充值
                    MessageBox({
                        title: '温馨提示',
                        message: '可用余额不足，请前往充值',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '去充值',
                        cancelButtonText: '确定'
                    }).then(action => {
                        if (action == 'confirm') {
                            if (platform === 'android') {
                                jsShowRechargeCallBack(platform);
                            } else {
                                window.location.href = '/#/bank/recharge';
                            }
                        }
                    });
                } else if (type == 4) {
                    //老用户重置密码
                    MessageBox({
                        title: '',
                        message: this.$refs.olduser.outerHTML,
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonClass: 'bank-btn-confirm'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'resetPassword',
                                redirectUrl: window.location.origin + '/#/user/detail?',
                                needCheck: false
                            });
                        }
                    });
                } else if (type == 5) {
                    // 自动债权转让签约
                    MessageBox({
                        title: '开启投资授权协议签约',
                        message: '您还未开启《投资授权协议》中的"自动购买债权签约"，请先进行签约再进行投资',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '开启签约',
                        cancelButtonText: '暂不签约'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'srbankSignPage',
                                sign_type: 'sign_credit_transfer',
                                redirectUrl: window.location.origin + '/#/bank/sign_page_success?',
                            });
                        }
                    });
                }
            },
            verifyJoinSubmit() {
                this.invest_money_confirm_disabled = true;
                var payMoney = this.transferdetail.transfer_info.accepter_monay * 1;
                var userMoney = this.transferdetail.user.available_total_money * 1;

                if (!this.is_checked) {
                    let instance = Toast({
                        message: '请同意《投资与咨询服务协议》',
                        duration: 2000
                    });
                    this.invest_money_confirm_disabled = false;
                    return;
                }
                // 余额是否充足
                if (payMoney > userMoney) {
                    let instance = Toast({
                        message: '余额不足，请先充值!',
                        duration: 2000
                    });
                    this.invest_money_confirm_disabled = false;
                    return;
                }

                // 验证通过后购买转让
                let paramsData = {
                    transfer_id: this.$route.params.id,
                    accept_money: payMoney
                }
                let Codekey = Util.getRrandomStr();
                let token = Util.getCookie('token');
                let params = Util.getParams('wechat', token, paramsData);
                params = Util.encryption(Codekey, params, 'code');
                Services.acceptTransfer(Codekey, params).then((res) => {

                    var key = res.headers['x-dola-edoc'];
                    var data = res.data;
                    var str = Util.decrypt(key, data, 'code')
                    var data = JSON.parse(str);
                    if (data.code === 0) {
                        var transferMonth = "";
                        var transferDay = "";

                        if (this.transferdetail.transfer_info.left_investment_month > 0) {
                            transferMonth = this.transferdetail.transfer_info.left_investment_month + '个月';
                        } else {
                            transferMonth = "";
                        }

                        if (this.transferdetail.transfer_info.left_investment_day > 0) {
                            transferDay = this.transferdetail.transfer_info.left_investment_day + '天';
                        } else {
                            transferDay = "";
                        }

                        setTimeout(() => {
                            Indicator.close();
                            this.invest_money_confirm_disabled = false;

                            if (this.transferdetail.schedule_info.length > 0) {
                                var principal_interest = this.transferdetail.schedule_info[0].principal_interest
                            } else {
                                var principal_interest = 0;
                            }

                            this.$router.push({
                                path: '/transfersuccess', query: {
                                    transfer_money: this.transferdetail.transfer_info.transfer_money,
                                    invest_date: transferMonth + '' + transferDay,
                                    accept_money: this.transferdetail.transfer_info.accept_money,
                                    wait_pay_interest: this.transferdetail.transfer_info.wait_pay_interest,
                                    history_interest: this.transferdetail.transfer_info.history_interest,
                                    principal_interest: principal_interest,
                                    due_day: this.transferdetail.transfer_info.due_day,
                                    invest_rate: this.transferdetail.loan_detail.interest_rate
                                }
                            });

                        }, 1000)
                    } else if (data.code === 910068) {
                        Indicator.close();
                        var str_1 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，个人出借金额上限' + data.data.amountset + '万，剩余可投金额' + data.data.remain_money + '元，若需调整出借上限金额，请重新评测';
                        var str_2 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，个人出借金额上限' + data.data.amountset + '万，剩余可投金额' + data.data.remain_money + '元，若有疑问，请联系客服400-9300-986';
                        var str_3 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，不满足当前项目投资人条件若需调整类型，请重新评测';

                        if (payMoney * 1 + data.data.all_principal * 1 > data.data.amountset * 1) {
                            if (data.data.risk_appraisal_type == '激进型') {
                                MessageBox({
                                    title: '提示',
                                    message: str_2,
                                    showConfirmButton: false,
                                    showCancelButton: true,
                                    cancelButtonClass: 'bank-btn-cancel',
                                    cancelButtonText: '关闭'
                                }).then(action => {
                                    if (action === 'cancel') {
                                        this.invest_money_confirm_disabled = false;
                                    }
                                });
                            } else {
                                MessageBox({
                                    title: '提示',
                                    message: str_1,
                                    showConfirmButton: true,
                                    showCancelButton: true,
                                    confirmButtonClass: 'bank-btn-confirm',
                                    cancelButtonClass: 'bank-btn-cancel',
                                    confirmButtonText: '重新评测',
                                    cancelButtonText: '关闭'
                                }).then(action => {
                                    if (action == 'confirm') {
                                        window.location.href = '/app/v1220/ucenter/risk_evaluation'
                                    } else if (action === 'cancel') {
                                        this.invest_money_confirm_disabled = false;
                                    }
                                });
                            }
                        } else if (data.data.risk_appraisal_type == '激进型') {
                            MessageBox({
                                title: '提示',
                                message: str_2,
                                showConfirmButton: false,
                                showCancelButton: true,
                                cancelButtonClass: 'bank-btn-cancel',
                                cancelButtonText: '关闭'
                            }).then(action => {
                                if (action === 'cancel') {
                                    this.invest_money_confirm_disabled = false;
                                }
                            });
                        } else {
                            MessageBox({
                                title: '提示',
                                message: str_3,
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonClass: 'bank-btn-confirm',
                                cancelButtonClass: 'bank-btn-cancel',
                                confirmButtonText: '重新评测',
                                cancelButtonText: '关闭'
                            }).then(action => {
                                if (action == 'confirm') {
                                    window.location.href = '/app/v1220/ucenter/risk_evaluation'
                                } else if (action === 'cancel') {
                                    this.invest_money_confirm_disabled = false;
                                }
                            });
                        }
                    } else {
                        Indicator.close();
                        let instance = Toast({
                            message: data.msg,
                            duration: 2000
                        });
                        this.invest_money_confirm_disabled = false;
                    }

                }).catch(function (err) {
                    let instance = Toast({
                        message: '网络不通，请重试',
                        duration: 2000
                    });
                });

            },
            navTab(index) {
                this.nav_list_current = index;
                this.tabstatus = true;
                this.isAvisible = 'none';
                this.isBvisible = 'none';
                this.isCvisible = 'none';
                this.isDvisible = 'none';
                if (index == 0) {
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = "none";
                } else if (index == 1) {
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = "none";
                } else if (index == 2) {
                    index == 2 ? this.isCvisible = 'block' : this.isCvisible = "none";
                } else if (index == 3) {
                    index == 3 ? this.isDvisible = 'block' : this.isDvisible = "none";
                }
            },
            tip() {
                MessageBox.alert('本平台所有项目年化利率是在参考同类项目历史数据得出，实际收益请参考往期年化收益率。市场有风险，投资需谨慎。');
            },
            tip2() {
                MessageBox.alert('转让价格指转让人根据转让本金按照个人意愿设置的折价之后的价格，转让价格一般在转让本金*0.9~转让本金之间。');
            },
            tip3() {
                MessageBox.alert('按等额本息每月回款本金和利息，未扣除投资管理费。');
            },
            tip4() {
                MessageBox.alert('实际支付金额=转让价格+垫付利息，其中垫付利息=转让人本月已持有天数所得收益（不包括当天），垫付利息会在本期回款日返回给您。');
            },
            tip5() {
                MessageBox.alert('按等额本息算法得出的每个月回款利息之和，未扣除投资管理费。');
            },
            tip6() {
                MessageBox.alert('垫付利息=转让人本月已持有天数所得收益，垫付利息会在本期回款日返回给您。');
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.InvestmentAgreement.$emit('agreementInvestModel', this.$refs.InvestmentAgreement.$el.innerHTML);
                } else if (type == 2) {
                    window.location.href = '/about/regular/' + this.regulardetail.plan.id;
                } else if (type == 3) {
                    this.$refs.RiskAgreement.$emit('agreementRiskModel', this.$refs.RiskAgreement.$el.innerHTML);
                }
            }
        },
        components: {
            TitleBar,
            InvestmentAgreement,
            RiskAgreement
        }
    }
</script>

<style scoped>
    @import "../../assets/css/wap/standard_powder.css";

    .invest-affirm .invest-affirm-wrapper .invest-money .text .icon {
        width: auto;
        padding: 0 3px;
        background-size: cover;
        right: -1.8rem;
    }

    .dola-standard-powder .dola-standard-powder-detail.isApp {
        padding-top: 0;
    }

    .islogin-status {
        position: absolute;
        left: 0;
        right: 0;
        top: 9%;
        display: block;
        width: 193px;
        height: 45px;
        line-height: 45px;
        margin: 0 auto;
        text-align: center;
        color: #ffffff;
        font-size: 17px;
        background: rgba(255, 102, 0, 1);
        border-radius: 3px;
        box-shadow: 14px 0px 50px rgba(253, 123, 95, 0.5);
        z-index: 9999999999999;
    }

    .opacityFlag {
        position: relative;
        opacity: 0;
    }

    .dola-regular-nav.nocanby {
        margin-top: 44px;
    }

    .invest-affirm .invest-affirm-wrapper .invest-money .text .icon {
        right: -2.7rem;
    }

    .pay-text {
        font-size: 14px;
        display: inline-block;
        line-height: 45px;
        vertical-align: bottom;
    }
</style>