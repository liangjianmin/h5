<template>
    <section :class="{'dola-scoll-prevent':invest_affirm==true}">
        <TitleBar :title="title" v-if="!app"></TitleBar>
        <section class="dola-regular-detail" v-if="regulardetail.plan" :class="{'dola-regular-detail-mt dola-app':app==true}">
            <!--is_novice==1  新手&不可投的状态  app=true  webview显示内容-->
            <template v-if="!app">
                <template v-if="regulardetail.plan.can_buy==true || regulardetail.plan.is_novice == 1">
                    <!--计划详情-->
                    <div class="product-detail">
                        <section class="dola-product-detail-wrapper">
                            <div class="dola-product-info">
                                <div class="dola-pro-detail clearfix">
                                    <div class="interest-wrapper">
                                        <p class="title">
                                            <span class="lineBlock va-m t1">往期年化收益率</span>
                                            <span class="icon lineBlock va-m" v-if="regulardetail.plan.for_app_badge_word !=''">{{regulardetail.plan.for_app_badge_word}}</span>
                                        </p>
                                        <p class="interest">
                                            <b>{{regulardetail.plan.re_interest_rate}}</b>%
                                            <template v-if="regulardetail.plan.for_app_increase_rate">
                                                {{regulardetail.plan.for_app_increase_rate}}%
                                            </template>
                                            <em class="ico-tip lineBlock va-m" @click="tip()"></em>
                                        </p>
                                    </div>
                                    <div class="date-wrapper">
                                        <p class="title">授权期限</p>
                                        <p class="interest"><b>{{regulardetail.plan.period}}</b>个月</p>
                                    </div>
                                    <template v-if="regulardetail.plan.for_app_label_word !=''">
                                        <template v-if="regulardetail.plan.for_app_label_word == '新手专享' ">
                                            <i class="icon-status-1">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                        <template v-else-if="regulardetail.plan.for_app_label_word == '私人订制' ">
                                            <i class="icon-status-2">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                        <template v-else-if="regulardetail.plan.for_app_label_word == 'VIP专享' ">
                                            <i class="icon-status-3">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                        <template v-else>
                                            <i class="icon01">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                    </template>
                                    <span class="icon02 lbBox" v-if="regulardetail.plan.hasInterestCouponTotal !=0 || regulardetail.plan.hasVoucherCouponTotal !=0">
                                  <i class="a lineBlock va-m" v-if="regulardetail.plan.hasInterestCouponTotal != 0"></i>
                                  <i class="b lineBlock va-m" v-if="regulardetail.plan.hasVoucherCouponTotal != 0"></i>
                                  <b class="lineBlock va-m fz">可使用</b>
                            </span>
                                </div>
                                <ul class="pro-info-lists clearfix">
                                    <li class="list">
                                        <p class="title">剩余可投(元)</p>
                                        <p class="content">{{regulardetail.plan.can_buy_amount_format}}</p>
                                    </li>
                                    <li class="list">
                                        <p class="title">生效日期</p>
                                        <p class="content">{{regulardetail.plan.plan_new_effective}}</p>
                                    </li>
                                    <li class="list">
                                        <p class="title">到期时间</p>
                                        <p class="content">{{regulardetail.plan.format_end_date}}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="dola-product-user">
                                <ul class="dola-product-user-lists">
                                    <li class="list">
                                        <template v-if="regulardetail.user">
                                            <span class="title">可用余额</span>
                                            <span class="content"><b>{{regulardetail.user.available_total_money}}</b>元</span>
                                            <a href="/user/verify_safe_password_with_url?forward_url=/user/recharge" class="recharge-btn">充值</a>
                                        </template>
                                        <template v-else>
                                            <span class="title">可用余额</span>
                                            <span class="content"><a @click="toUrl">登录后可查看</a></span>
                                        </template>
                                    </li>
                                    <li class="list">
                                        <span class="title">安全保障</span>
                                        <span class="content">{{regulardetail.plan.for_app_safe_word}}</span>
                                    </li>
                                    <li class="list">
                                        <span class="title">提前可退</span>
                                        <span class="content">{{regulardetail.plan.for_app_advance_exit}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="dola-product-join">
                                <div class="dola-product-from">
                                    <ul>
                                        <li class="list list1">
                                            <span class="desc">金额</span>
                                            <input type="number" class="invest-money" :placeholder="regulardetail.plan.for_app_money_input_placehold" v-model.number="invest_money" @blur="getRecommendDone(invest_money,regulardetail.plan.id)"/>
                                            <template v-if="regulardetail.user">
                                                <span class="max-product-invest-money" @click="maxInvest(regulardetail.plan.max_money,regulardetail.plan.can_buy_amount,regulardetail.user.available_total_money,regulardetail.plan.start_money,regulardetail.plan.increment)">最大金额</span>
                                            </template>
                                            <template v-else>
                                                <span class="max-product-invest-money" @click="maxInvest()">最大金额</span>
                                            </template>
                                        </li>
                                        <li class="list list2 clearfix" v-if="(regulardetail.plan.hasInterestCouponTotal !=0 || regulardetail.plan.hasVoucherCouponTotal != 0)">
                                            <span class="desc">使用优惠</span>
                                            <!--推荐优惠券和红包-->
                                            <template v-if="selectBestCoupon !='' && coupon_types==0 ">
                                                <template v-if="selectBestCoupon.coupon_type == 'interest'">
                                                    <span class="content" @click="selectInvest(invest_money,regulardetail.plan.product_id,regulardetail.plan.id,selectBestCoupon.user_coupon_data_id)">{{selectBestCoupon.user_coupon_data_title}}</span>
                                                </template>
                                                <template v-else-if="selectBestCoupon.coupon_type == 'voucher'">
                                                    <span class="content" @click="selectInvest(invest_money,regulardetail.plan.product_id,regulardetail.plan.id,selectBestCoupon.user_coupon_data_id)"><b>{{selectBestCoupon.voucher_money}}</b>元</span>
                                                </template>
                                            </template>
                                            <!--默认显示加息券和红包的个数-->
                                            <template v-if="selectBestCoupon == '' && !couponflag">
                                               <span @click="selectInvest(invest_money,regulardetail.plan.product_id,regulardetail.plan.id,0)" class="content"
                                                     v-if="regulardetail.plan.hasInterestCouponTotal != 0 || regulardetail.plan.hasVoucherCouponTotal != 0">
                                                   <template v-if="isUse">不使用</template>
                                                   <template v-else><b>{{regulardetail.plan.hasInterestCouponTotal + regulardetail.plan.hasVoucherCouponTotal}}</b>个可用</template>
                                               </span>
                                            </template>
                                            <!--用户点击选择加息券和红包-->
                                            <template v-if="couponflag">
                                                <span class="content" v-html="vouchertext" @click="selectInvest(invest_money,regulardetail.plan.product_id,regulardetail.plan.id,coupon_id)"></span>
                                            </template>
                                            <!--没有加息券和红包-->
                                            <span class="content no" v-if="regulardetail.plan.hasInterestCouponTotal == 0 && regulardetail.plan.hasVoucherCouponTotal == 0">无可用</span>
                                        </li>
                                        <li class="list list3 clearfix" v-if="regulardetail.user" @click="earnings_methods =true">
                                            <span class="desc">收益处理方式</span>
                                            <span class="content" v-if="earnings_methods_class == 0">收益复投 {{regulardetail.plan.re_interest_rate}}%</span>
                                            <span class="content" v-if="earnings_methods_class == 1">收益返还 {{regulardetail.plan.interest_rate}}%</span>
                                        </li>
                                        <li class="list list4" v-if="regulardetail.plan">
                                            <template v-if="regulardetail.plan.can_buy == true">
                                                <template v-if="regulardetail.check_novice==false && regulardetail.plan.is_novice==1">
                                                    <input type="submit" :value="regulardetail.plan.can_buy_text" class="join-pro-end"/>
                                                </template>
                                                <template v-else>
                                                    <input type="submit" :value="regulardetail.plan.can_buy_text" class="join-pro" @click="verifySubmit(regulardetail.plan.start_money,regulardetail.plan.max_money,invest_money,regulardetail.plan.increment,regulardetail.user)"/>
                                                </template>
                                            </template>
                                            <template v-else-if="regulardetail.plan.can_buy == false">
                                                <input type="submit" :value="regulardetail.plan.can_buy_text" class="join-pro-end"/>
                                            </template>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </template>
                <template v-else-if="regulardetail.plan.can_buy == false">
                    <!-- 计划详情已结束 -->
                    <div class="product-detail">
                        <section class="dola-product-detail-wrapper dola-product-detail2-wrapper">
                            <div class="dola-product-info">
                                <div class="dola-pro-detail clearfix">
                                    <div class="interest-wrapper">
                                        <p class="title">
                                            <span class="lineBlock va-m t1">往期年化收益率</span>
                                            <span class="icon lineBlock va-m" v-if="regulardetail.plan.for_app_badge_word !=''">{{regulardetail.plan.for_app_badge_word}}</span>
                                        </p>
                                        <p class="interest">
                                            <b>{{regulardetail.plan.re_interest_rate}}</b>%
                                            <template v-if="regulardetail.plan.for_app_increase_rate">
                                                {{regulardetail.plan.for_app_increase_rate}}%
                                            </template>
                                            <em class="ico-tip lineBlock va-m" @click="tip()"></em>
                                        </p>
                                    </div>
                                    <div class="date-wrapper">
                                        <p class="title">授权期限</p>
                                        <p class="interest"><b>{{regulardetail.plan.period}}</b>个月</p>
                                    </div>
                                    <template v-if="regulardetail.plan.for_app_label_word !=''">
                                        <template v-if="regulardetail.plan.for_app_label_word == '新手专享' ">
                                            <i class="icon-status-1">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                        <template v-else-if="regulardetail.plan.for_app_label_word == '私人订制' ">
                                            <i class="icon-status-2">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                        <template v-else-if="regulardetail.plan.for_app_label_word == 'VIP专享' ">
                                            <i class="icon-status-3">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                        <template v-else>
                                            <i class="icon01">{{regulardetail.plan.for_app_label_word}}</i>
                                        </template>
                                    </template>
                                </div>
                                <ul class="pro-info-lists2 clearfix">
                                    <li class="list list1">
                                        <p class="content">{{regulardetail.plan.invest_total}}人加入</p>
                                    </li>
                                    <li class="list list2">
                                        <p class="content">共计{{regulardetail.plan.invest_money_total}}元</p>
                                    </li>
                                    <li class="list list3">
                                        <p class="content">{{regulardetail.plan.format_end_date}}到期</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="check-pro-btn-wrapper">
                                <router-link to="/regular" tag="a" class="check-pro-btn">查看其他项目</router-link>
                            </div>
                        </section>
                    </div>
                </template>
            </template>
            <!--导航-->
            <nav class="dola-regular-nav" style="display: block" :class="{'dola-regular-nav-fix':app==true}">
                <ul class="nav-list">
                    <li class="item" @click="navTab(0)" :class="{'current':nav_list_current==0}"><span>项目介绍</span></li>
                    <li class="item" @click="navTab(1)" :class="{'current':nav_list_current==1}"><span>安全保障</span></li>
                    <li class="item" @click="navTab(2)" :class="{'current':nav_list_current==2}"><span>加入记录</span></li>
                    <li class="item" @click="navTab(3)" :class="{'current':nav_list_current==3}" v-if="lastHour.length > 0"><span>借款信息</span></li>
                </ul>
            </nav>
            <!--计划介绍-->
            <div class="dola-product" v-if="regulardetail.plan" :style="{'display':isAvisible}">
                <div>
                    <section class="dola-project boxsiz">
                        <h3 class="title boxsiz">项目概要</h3>
                        <ul class="lists">
                            <li class="list boxsiz">
                                <p class="desc l lineBlock">
                                    <span class="desc-title va-m">项目名称</span>
                                    <span class="lineBlock desc-content va-m desc-content-text" v-text="regulardetail.plan.name"></span>
                                </p>
                                <p class="desc lineBlock">
                                    <span class="desc-title desc-title2 va-m">往期年化收益率</span>
                                    <span class="lineBlock desc-content va-m" v-text="regulardetail.plan.plan_new_expected"></span>
                                </p>
                            </li>
                            <li class="list boxsiz">
                                <p class="desc l lineBlock">
                                    <span class="desc-title va-m">授权期限</span>
                                    <span class="desc-content va-m desc-content-text">{{regulardetail.plan.period}}个月</span>
                                </p>
                                <p class="desc lineBlock">
                                    <span class="desc-title desc-title2">加入条件</span>
                                    <span class="desc-content">{{regulardetail.plan.start_money}}元起</span>
                                </p>
                            </li>
                            <li class="list boxsiz">
                                <p class="desc l lineBlock">
                                    <span class="desc-title va-m">加入要求</span>
                                    <span class="desc-content va-m desc-content-text">{{regulardetail.plan.invest_claim}}</span>
                                </p>
                            </li>
                        </ul>
                    </section>
                    <section class="dola-project dola-project-explain">
                        <h3 class="title boxsiz">项目说明</h3>
                        <ul class="lists-ul">
                            <li class="lists-li">
                                <p class="desc">
                                    <span class="desc-title lineBlock va-m">项目介绍</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_description}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc">
                                    <span class="desc-title lineBlock va-m">收益处理方式<br>往期参考收益</span>
                                    <span class="desc-content desc-content-intent lineBlock va-m" v-html="regulardetail.plan.for_app_diff_interest_desc"></span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">募集期</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.plan_from_date}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">项目起息时间</span>
                                    <span class="desc-content lineBlock va-m">项目满标后起息，一般为当日</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">项目到期日期</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_plan_end_desc}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">到期退出方式</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_plan_end_exit_type}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">提前退出方式</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_plan_ahead_exit_type}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">管理费用</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_plan_manage_money}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">提前退出费用</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_plan_ahead_exit_money}}</span>
                                </p>
                            </li>
                            <li class="lists-li">
                                <p class="desc clearfix">
                                    <span class="desc-title lineBlock va-m">借款人推荐方</span>
                                    <span class="desc-content lineBlock va-m">{{regulardetail.plan.for_app_plan_from}}</span>
                                </p>
                            </li>
                        </ul>
                    </section>
                    <section class="dola-project dola-project-tips">
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
                        <h3 class="title boxsiz">
                            <template v-if="app">
                                <template v-if="platform == 'ios'">
                                    <a @click="appCallback(platform,'service','/about/regular/'+regulardetail.plan.id+'')">随心投服务说明</a>
                                </template>
                                <template v-else-if="platform == 'android'">
                                    <a @click="appCallback(platform,'service','/about/regular/'+regulardetail.plan.id+'')">随心投服务说明</a>
                                </template>
                            </template>
                            <template v-else>
                                <a :href='"/about/regular/"+regulardetail.plan.id'>随心投服务说明</a>
                            </template>
                        </h3>
                    </section>
                </div>
            </div>
            <!-- 安全保障 -->
            <div class="dola-about-safety-guarantee" v-if="regulardetail.plan" :style="{'display':isBvisible}">
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
                                <dd class="desc">天盾大数据风控体系+多重风控</dd>
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
                    </div>
                </div>
            </div>
            <!--投资记录-->
            <div class="dola-investment-records" :style="{'display':isCvisible}">
                <table>
                    <tbody>
                    <tr>
                        <td>出借人</td>
                        <td>出借金额（元）</td>
                        <td>操作平台</td>
                        <td>时间</td>
                    </tr>
                    <template v-if="planUser">
                        <tr v-for="(item, key) in planUserData" :key="key">
                            <td>{{item.user_name}}</td>
                            <td>{{item.money}}</td>
                            <td>{{item.platform_text}}</td>
                            <td>{{item.invest_time}}</td>
                        </tr>
                        <tr v-if="planUser.maxPage > 1">
                            <td colspan="4" @click="loadMorePlanUser()">
                                <span class="morelaod">{{planUserLoadingText}}</span>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="4" class="dola-investment-records-nodate">暂无记录</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!--借款信息-->
            <div class="borrow-info" v-if="lastHour.length > 0" :style="{'display':isDvisible}">
                <scroll ref="scroll" class="scroll-content" @loadMore="loadMore" :pullup="pullup" :listen-scroll="listenScroll" :probe-type="probeType" :style="{ height: wrapperHeight + 'px' }">
                    <div>
                        <section class="borrow-info-wrapper page-loadmore-wrapper">
                            <p class="description">随心投是多啦聚财为用户提供的智能化自动投标工具。经由用户授权后，通过系统自动投资以达到分散投资、节省投资时间、提高投资效率的目的。您出借的本金将会自动匹配给借款人，实际出借情况需投资后在个人账户查看，以下展示部分借款人信息。</p>
                            <div class="dola-info-wrapper" v-for="(item,index) in lastHour" :key="index">
                                <div class="dola-user-info clearfix">
                                    <span class="name">{{item.name}}</span>
                                    <span class="code">{{item.id_asterisk}}</span>
                                    <span class="address">{{cardAreadata[index]}}</span>
                                </div>
                                <ul class="dola-borrow-lists">
                                    <li class="dola-borrow-list">
                                        <span class="dola-borrow-title">借款金额</span><br/>
                                        <b class="dola-borrow-text">{{item.amount}}</b>
                                    </li>
                                    <li class="dola-borrow-list">
                                        <span class="dola-borrow-title">借款期限</span><br/>
                                        <b class="dola-borrow-text">{{item.period}}个月</b>
                                    </li>
                                    <li class="dola-borrow-list">
                                        <span class="dola-borrow-title">借款用途</span><br/>
                                        <b class="dola-borrow-text">{{item.source}}</b>
                                    </li>
                                </ul>
                            </div>
                            <p class="borrow-info-loading">{{loading}}</p>
                        </section>
                    </div>
                </scroll>
            </div>
            <!-- 确认投资 -->
            <div class="invest-affirm" v-if="invest_affirm && regulardetail.user">
                <section class="invest-affirm-wrapper">
                    <div class="title-wrapper">
                        <span class="close-wrapper" @click="invest_affirm = false"></span>
                        <h5 class="title">确认投资</h5>
                        <a href="/user/forget_safepass" class="forget-pass">忘记密码？</a>
                    </div>
                    <div class="invest-money">
                        <p class="text">￥{{invest_money}}<i class="icon">{{regulardetail.plan.period}}个月</i></p>
                    </div>
                    <div name="affirm-form" class="affrim-join-pro-from">
                        <ul class="form-lists">
                            <template v-if="!isUse">
                                <li class="list list1" v-if="coupon_types != 0">
                                    <template v-if="coupon_types == 1">
                                        <span class="desc">红包抵扣</span>
                                        <span class="content">{{coupon_money}}元</span>
                                    </template>
                                    <template v-if="coupon_types == 2">
                                        <span class="desc">加息奖励</span>
                                        <span class="content">{{interest_money}}元</span>
                                    </template>
                                </li>
                                <li class="list list1" v-else>
                                    <template v-if="selectBestCoupon.coupon_type == 'voucher'">
                                        <span class="desc">红包抵扣</span>
                                        <span class="content">{{selectBestCoupon.user_coupon_data_money}}元</span>
                                    </template>
                                    <template v-else-if="selectBestCoupon.coupon_type == 'interest'">
                                        <span class="desc">加息奖励</span>
                                        <span class="content">{{interest_money}}元</span>
                                    </template>
                                </li>
                            </template>
                            <li class="list list2">
                                <template v-if="earnings_methods_class == 0">
                                    <span class="desc">收益处理方式</span>
                                    <span class="content">收益复投 {{regulardetail.plan.re_interest_rate}}%</span>
                                </template>
                                <template v-if="earnings_methods_class == 1">
                                    <span class="desc">收益处理方式</span>
                                    <span class="content">收益返还 {{regulardetail.plan.interest_rate}}%</span>
                                </template>
                            </li>
                            <li class="list list3">
                                <span class="desc">往期参考收益</span>
                                <span class="content">{{expect_profit}}元</span>
                            </li>
                            <li class="list list4">
                                <input type="password" placeholder="请输入安全密码" class="affirm-pass" v-model="safe_password"/>
                            </li>
                        </ul>
                        <div class="agree-yx">
                            <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                            <div class="lineBlock agree-yx-text">
                                <span>同意</span>
                                <a href="javascript:;" @click="agreement(1)">《投资与咨询服务协议》</a>和
                                <a href="javascript:;" @click="agreement(2)">《随心投服务说明》</a>和
                                <a href="javascript:;" @click="agreement(3)">《风险提示》</a>
                            </div>
                        </div>
                        <div class="affirm-btn-wrapper">
                            <input type="button" :disabled="invest_money_confirm_disabled" :value="'确认支付'+invest_money_confirm+'元'" class="affirm-btn" @click="verifyJoinSubmit(regulardetail.plan.id)"/>
                        </div>
                    </div>
                </section>
            </div>
            <!-- 收益处理方式 -->
            <div class="earnings-methods" v-if="earnings_methods && regulardetail.user">
                <section class="earnings-methods-wrapper">
                    <div class="title-wrapper">
                        <h5 class="title">收益处理方式</h5>
                        <a href="javascript:;" class="method-agree" @click="earnings_methods =false">确认</a>
                    </div>
                    <ul class="earnings-methods-lists">
                        <li class="list clearfix" @click="earnings_methods_class = 0" :class="{'current':earnings_methods_class==0}">
                            <span class="method">收益复投</span>
                            <span class="content">{{regulardetail.plan.re_interest_rate}}%</span>
                        </li>
                        <li class="list clearfix" @click="earnings_methods_class = 1" :class="{'current':earnings_methods_class==1}">
                            <span class="method">收益返还</span>
                            <span class="content">{{regulardetail.plan.interest_rate}}%</span>
                        </li>
                    </ul>
                    <div class="earnings-methods-desc">
                        <p class="text">· 收益处理方式在投资后不可修改。</p>
                        <p class="text">· 收益复投：投资期间的收益继续投资，可以获得更多收益；</p>
                        <p class="text">· 收益返还：投资期间的收益返还至账户可用余额，可以用于投资其他项目或提现；</p>
                    </div>
                </section>
            </div>
        </section>
        <InvestmentAgreement ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
        <RiskAgreement ref="RiskAgreement" v-show="agreement_flag"></RiskAgreement>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import Footers from '../common/Footer.vue'
    import {Indicator} from 'mint-ui'
    import {Toast} from 'mint-ui'
    import {MessageBox} from 'mint-ui'
    import {services as Services} from '../../api/index'
    import Util from '../../util/index'
    import qs from 'qs'
    import {jsWebViewCallBack} from '../../util/appCallback'
    import Scroll from '../../components/scroll.vue'
    import ChannelFooter from '../common/ChannelFooter.vue'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'
    import RiskAgreement from '../agreement/RiskAgreement.vue'

    let Base64 = require('js-base64').Base64;

    export default {
        name: 'regulardetail',
        computed: mapState({
            regulardetail: state => state.regular.regulardetail,
            selectBestCoupon: state => state.regular.selectBestCoupon,
            planUser: state => state.regular.planUser,
            planUserData: state => state.regular.planUserData,
            lastHour: state => state.regular.lastHour,
            lastHourData: state => state.regular.lastHourData,
            cardAreadata: state => state.regular.cardAreadata,
            channel: state => state.regular.channel
        }),
        data() {
            return {
                title: '项目详情',
                invest_money: '',
                couponflag: false,
                vouchertext: '',
                coupon_types: 0,
                earnings_methods: false,
                earnings_methods_class: 0,
                invest_affirm: false,
                coupon_money: '',
                coupon_name: '',
                coupon_id: '',
                coupon_money_min: '',
                expect_profit: 0,
                invest_money_confirm: '',
                is_checked: true,
                nav_list_current: 0,
                isAvisible: 'block',
                isBvisible: 'none',
                isCvisible: 'none',
                isDvisible: 'none',
                allLoaded: false,
                loading: '正在加载数据.....',
                planUserLoadingText: '点击加载更多',
                wrapperHeight: 0,
                page: 1,
                planUserPage: 1,
                app: false,
                safe_password: '',
                invest_money_confirm_disabled: false,
                platform: '',
                isUse: false,
                tabstatus: false,
                interest_money: '',
                interest_days: '',
                interest_rate: '',
                pullup: true,
                agreement_flag: false
            }
        },
        watch: {
            $route(to) {
                var planId = to.params.id;
                if (planId != undefined) {
                    if (to.path == '/regular/detail/' + this.$route.params.id) {
                        window.scrollTo(0, 0);
                        this.getRegulardetail(planId);
                    }
                }
            }
        },
        created() {
            this.probeType = 1;
            this.listenScroll = true;
            var planId = this.$route.params.id;
            var app = this.$route.query.platform;
            var coupon_type = this.$route.query.coupon_type;
            var coupon_ids = this.$route.query.coupon_ids;
            var temp_money = this.$route.query.temp_money;

            if (planId != undefined) {
                this.getRegulardetail(planId);
                //用户填了金额
                if (temp_money != undefined) {
                    this.invest_money = temp_money;
                }
                //用户选择了优惠
                if (coupon_type != undefined) {
                    this.couponSubmit(coupon_type);
                }
                //用户点击了不使用优惠或不用优惠
                if (coupon_ids != undefined) {
                    if (coupon_ids == 0) {
                        this.isUse = true;
                    }
                }
                //判断app webview
                if (app != undefined) {
                    if (app == 'ios') {
                        this.app = true;
                        this.platform = 'ios';
                    } else if (app == 'android') {
                        this.app = true;
                        this.platform = 'android';
                    } else {
                        this.platform = '';
                    }
                }
            }
        },
        mounted() {
            if (app) {
                this.wrapperHeight = document.documentElement.clientHeight;
            } else {
                this.wrapperHeight = document.documentElement.clientHeight - 230;
            }
        },
        methods: {
            getRegulardetail(plan_id) {
                this.$store.dispatch({
                    type: 'regulardetail',
                    plan_id: plan_id
                });
                this.$store.dispatch({
                    type: 'lastHour',
                    plan_id: plan_id,
                    page: 1,
                    page_size: 10
                });
                this.$store.dispatch({
                    type: 'planUser',
                    plan_id: plan_id,
                    page: 1,
                    page_size: 10
                });
            },
            getRecommendDone(money, id) {
                var investmoney = parseInt(money) || 0;
                if (investmoney > 0 && this.coupon_types == 0) {
                    if (!this.isUse) {
                        this.$store.dispatch({
                            type: 'selectBestCoupon',
                            plan_id: id,
                            invest_money: money,
                        });
                    }
                }
            },
            selectInvest(invest_money, product_id, plan_id, coupon_id) {
                /**
                 * this.selectBestCoupon.coupon == 'interest' 系统推荐的加息券
                 * this.coupon_types == 2 用户主动选择加息券
                 */
                var url = '';
                if (this.selectBestCoupon.coupon_type == 'interest') {
                    url = '/active/voucher2?product_id=' + product_id + '&invest=0' + '&fromspa=spa&plan_id=' + plan_id + '&coupon_id=' + coupon_id + '&temp_money=' + invest_money + '&interest_days=' + this.selectBestCoupon.user_coupon_data_interest_days + '&interest_rate=' + this.selectBestCoupon.user_coupon_data_interest_rate;
                } else if (this.coupon_types == 2) {
                    if (this.interest_days != undefined || this.interest_rate != undefined) {
                        url = '/active/voucher2?product_id=' + product_id + '&invest=0' + '&fromspa=spa&plan_id=' + plan_id + '&coupon_id=' + coupon_id + '&temp_money=' + invest_money + '&interest_days=' + this.interest_days + '&interest_rate=' + this.interest_rate;
                    }
                } else {
                    url = '/active/voucher2?product_id=' + product_id + '&invest=0' + '&fromspa=spa&plan_id=' + plan_id + '&coupon_id=' + coupon_id + '&temp_money=' + invest_money;
                }
                window.location.href = url;
            },
            maxInvest(maxUseableMoney, restUseableMoney, personCanUseableMoney, startMoney, stepMoney) {
                if (maxUseableMoney != undefined) {
                    var maxUseableMoneys = parseInt(maxUseableMoney);
                    var restUseableMoneys = parseInt(restUseableMoney);
                    var personCanUseableMoneys = parseInt(personCanUseableMoney);
                    var minMoney = Math.min(maxUseableMoneys, restUseableMoneys, personCanUseableMoneys);

                    var startMoneys = parseInt(startMoney);
                    var stepMoneys = parseInt(stepMoney);
                    if (minMoney >= startMoneys) {
                        var multiple = parseInt((minMoney - startMoneys) / stepMoneys);
                        var resultMoney = (multiple * stepMoneys + startMoneys);
                        this.invest_money = parseInt(resultMoney);
                    } else {
                        this.invest_money = 0;
                    }
                } else {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 1500
                    });
                }
            },
            verifySubmit(start_money, max_money, invest_money, increment, status) {
                var startmoney = parseFloat(start_money);
                var maxmoney = parseFloat(max_money);
                var investmoney = parseInt(invest_money) || 0;
                if (status == undefined) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 2000
                    });
                } else {
                    //判断是否风险评测
                    if (this.regulardetail.whether_evaluation == 0) {
                        MessageBox.alert('您未进行风险评测，请先评测再进行投资').then(() => {
                            window.location.href = '/app/v1220/ucenter/risk_evaluation';
                        });
                        return false;
                    } else {
                        //判断银行卡是否实名制
                        let Codekey = Util.getRrandomStr();
                        let token = Util.getCookie('token');
                        let params = Util.getParams('wechat', token, '');
                        params = Util.encryption(Codekey, params, 'code');
                        Services.checkBankCard(Codekey, params).then((res) => {
                            var key = res.headers['x-dola-edoc'];
                            var data = res.data;
                            var str = Util.decrypt(key, data, 'code')
                            var data = JSON.parse(str);
                            if (data.code === 0) {
                                if (data.data) {
                                    if (investmoney == 0) {
                                        let instance = Toast({
                                            message: '请输入金额',
                                            duration: 2000
                                        });
                                    } else if (investmoney * 1 < startmoney) {
                                        let instance = Toast({
                                            message: '个人最小投资金额为' + startmoney + '元',
                                            duration: 2000
                                        });
                                    } else if (investmoney % increment != 0) {
                                        let instance = Toast({
                                            message: '您的投资金额必须为' + increment + '的整数倍',
                                            duration: 2000
                                        });
                                    } else if (investmoney > maxmoney) {
                                        let instance = Toast({
                                            message: '个人最大投资金额为' + maxmoney + '元',
                                            duration: 2000
                                        });
                                    } else if (status) {
                                        /**
                                         * earnings_methods_class  0 收益复投 1:收益返还
                                         * coupon_types  1：红包 2：加息券 0：没有选择红包或加息券
                                         * 用户选择了红包和加息券的操作
                                         */
                                        if (this.coupon_types == 1) {
                                            if (investmoney < this.coupon_money_min) {
                                                let instance = Toast({
                                                    message: '投资' + this.coupon_money_min + '元以上才能使用红包',
                                                    duration: 2000
                                                });
                                            } else if (investmoney > this.regulardetail.user.available_total_money) {
                                                this.toRecharge(0);
                                            } else {
                                                this.invest_money_confirm = parseInt(invest_money) - this.coupon_money;
                                                this.invest_affirm = true;
                                            }
                                        } else if (this.coupon_types == 2) {
                                            if (investmoney > this.regulardetail.user.available_total_money) {
                                                this.toRecharge(0);
                                            } else {
                                                this.invest_money_confirm = invest_money;
                                                this.invest_affirm = true;
                                                /**
                                                 * 本金 * 加息利率 * 加息天数 / 360
                                                 * interest_days=0 加息至到期（月*30）
                                                 */
                                                var addRateDayCount = 0;
                                                var temp_interest_money;
                                                if (this.interest_days == 0) {
                                                    addRateDayCount = parseInt(this.regulardetail.plan.period) * 30;
                                                } else {
                                                    addRateDayCount = this.interest_days;
                                                }
                                                temp_interest_money = this.invest_money * (parseFloat(this.interest_rate) / 100.0) * addRateDayCount / 360;
                                                temp_interest_money = parseInt(temp_interest_money * 100);
                                                this.interest_money = (temp_interest_money / 100.0).toFixed(2);
                                            }
                                        } else {
                                            if (investmoney > this.regulardetail.user.available_total_money) {
                                                this.toRecharge(0);
                                            } else {
                                                /**
                                                 *  推荐的红包和加息券的操作
                                                 *  interest 加息券
                                                 *  voucher  付款金额（减去红包）
                                                 */
                                                if (this.selectBestCoupon.coupon_type == "interest") {
                                                    this.invest_money_confirm = invest_money;
                                                    this.invest_affirm = true;
                                                    /**
                                                     * 本金 * 加息利率 * 加息天数 / 360
                                                     * interest_days=0 加息至到期（月*30）
                                                     */
                                                    var addRateDayCount = 0;
                                                    var temp_interest_money;
                                                    if (this.selectBestCoupon.user_coupon_data_interest_days == 0) {
                                                        addRateDayCount = parseInt(this.regulardetail.plan.period) * 30;
                                                    } else {
                                                        addRateDayCount = this.selectBestCoupon.user_coupon_data_interest_days;
                                                    }
                                                    temp_interest_money = this.invest_money * (parseFloat(this.selectBestCoupon.user_coupon_data_interest_rate) / 100.0) * addRateDayCount / 360;
                                                    temp_interest_money = parseInt(temp_interest_money * 100);
                                                    this.interest_money = (temp_interest_money / 100.0).toFixed(2);
                                                } else if (this.selectBestCoupon.coupon_type == "voucher") {
                                                    this.invest_money_confirm = parseInt(invest_money) - parseInt(this.selectBestCoupon.voucher_money);
                                                    this.invest_affirm = true;
                                                } else {
                                                    this.invest_money_confirm = invest_money;
                                                    this.invest_affirm = true;
                                                }
                                            }
                                        }
                                        //往期参考收益
                                        if (this.earnings_methods_class == 0) {
                                            this.expect_profit = (investmoney * (parseFloat(this.regulardetail.plan.re_interest_rate) / 100 / 360) * this.regulardetail.plan.period * 30).toFixed(2);
                                        } else if (this.earnings_methods_class == 1) {
                                            this.expect_profit = (investmoney * (parseFloat(this.regulardetail.plan.interest_rate) / 100 / 360) * this.regulardetail.plan.period * 30).toFixed(2);
                                        }
                                    }
                                } else {
                                    this.toRecharge(2);
                                }
                            }
                        }).catch(function (err) {
                            let instance = Toast({
                                message: '网络不通，请重试',
                                duration: 2000
                            });
                        })
                    }
                }

            },
            verifyJoinSubmit(plan_id) {
                if (!this.is_checked) {
                    let instance = Toast({
                        message: '请同意《投资与咨询服务协议》与《随心投服务说明》',
                        duration: 2000
                    });
                } else if (this.safe_password == '') {
                    let instance = Toast({
                        message: '输入安全密码',
                        duration: 2000
                    });
                } else {
                    Indicator.open({
                        text: '正在处理',
                        spinnerType: 'triple-bounce'
                    });
                    // 区别是推荐的还是用户自己选择的
                    // coupon_types ==0用户没有选择 1点击选择了红包 2：选择了加息券
                    var income_type, user_coupon_id;
                    income_type = parseInt(this.earnings_methods_class) + 1;
                    if (this.coupon_types == 0) {
                        if (this.selectBestCoupon.coupon_type == "interest") {
                            user_coupon_id = this.selectBestCoupon.user_coupon_data_id;
                        } else if (this.selectBestCoupon.coupon_type == "voucher") {
                            user_coupon_id = this.selectBestCoupon.user_coupon_data_id;
                        }
                    } else if (this.coupon_types == 1) {
                        user_coupon_id = this.coupon_id;
                    } else if (this.coupon_types == 2) {
                        user_coupon_id = this.coupon_id;
                    }

                    var params = qs.stringify({
                        safe_password: this.safe_password,
                        plan_id: plan_id,
                        income_type: income_type,
                        invest_money: this.invest_money,
                        user_coupon_id: user_coupon_id
                    });
                    this.invest_money_confirm_disabled = true;
                    //付款操作
                    Services.joinInvest(params).then((res) => {
                        if (res.data.status === 1) {
                            //付款成功
                            Indicator.open({
                                text: '正在处理',
                                spinnerType: 'triple-bounce'
                            });
                            setTimeout(() => {
                                Indicator.close();
                                this.invest_money_confirm_disabled = false;
                                // 活动投资判断是否有红包弹窗
                                var invset_event = res.data.data.event;
                                if (invset_event && invset_event.coupon_status === "1") {
                                    // 有分享红包
                                    var layerURL = invset_event.alert_url;
                                    layerURL = decodeURIComponent(layerURL);
                                    window.location.href = layerURL;
                                } else {
                                    this.$router.push({
                                        path: '/investsuccess', query: {
                                            invest_money: res.data.invest_money,
                                            period: this.regulardetail.plan.period,
                                            format_end_date: this.regulardetail.plan.format_end_date,
                                            expect_profit: this.expect_profit
                                        }
                                    });
                                }
                            }, 1000)
                        } else if (res.data.status === 0) {
                            Indicator.close();
                            if (res.data.data.safe_password_flag == 0) {
                                this.toRecharge(1);
                                this.invest_money_confirm_disabled = false;
                            } else {
                                let instance = Toast({
                                    message: res.data.message,
                                    duration: 2000
                                });
                                this.invest_money_confirm_disabled = false;
                            }
                        }
                    }, (error) => {
                        Indicator.close();
                        let instance = Toast({
                            message: '网络不通,请稍后再试',
                            duration: 2000
                        });
                        this.invest_money_confirm_disabled = false;
                    });
                }
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
                    this.$refs.scroll.refresh();
                }
            },
            couponSubmit(coupon_type) {
                /**
                 *coupon_type  voucher:红包   interest:加息券
                 *coupon_types 1：红包 2：加息券 0：没有选择加息将
                 */
                this.vouchertext = '';
                if (coupon_type == 'voucher') {
                    this.vouchertext = '<b>' + this.$route.query.coupon_money + '</b>元';
                    this.couponflag = true;
                    this.coupon_types = 1;
                    this.coupon_money = this.$route.query.coupon_money;
                    this.coupon_id = this.$route.query.coupon_id;
                    this.coupon_money_min = this.$route.query.coupon_money_min;
                } else if (coupon_type == 'interest') {
                    this.vouchertext = this.$route.query.coupon_name;
                    this.couponflag = true;
                    this.coupon_types = 2;
                    this.coupon_name = this.$route.query.coupon_name;
                    this.coupon_id = this.$route.query.coupon_id;
                    this.coupon_money_min = this.$route.query.coupon_money_min;
                    this.interest_days = this.$route.query.interest_days;
                    this.interest_rate = this.$route.query.interest_rate;
                } else {
                    this.coupon_types = 0;
                }
            },
            loadMore() {
                if (this.tabstatus) {
                    this.page++;
                    this.$refs.scroll.refresh();
                    if (this.page >= 2) {
                        if (this.page <= this.lastHourData.maxPage) {
                            this.$store.dispatch({
                                type: 'lastHour',
                                plan_id: this.regulardetail.plan.id,
                                page: this.page,
                                page_size: 10
                            });
                            this.$refs.scroll.refresh();
                        } else {
                            this.$refs.scroll.refresh();
                            this.loading = '已经没有数据了';
                        }
                    }
                }
            },
            loadMorePlanUser() {
                if (this.tabstatus) {
                    this.planUserPage++;
                    if (this.planUserPage > this.planUser.maxPage) {
                        this.planUserLoadingText = '已没有数据了';
                        this.$refs.scroll.refresh();
                        return false;
                    } else {
                        Indicator.open({
                            text: '拼命加载...',
                            spinnerType: 'triple-bounce'
                        });
                        setTimeout(() => {
                            this.$store.dispatch({
                                type: 'planUser',
                                plan_id: this.regulardetail.plan.id,
                                page: this.planUserPage,
                                page_size: 10
                            });
                            Indicator.close();
                        }, 800);
                    }
                }
            },
            appCallback(platform, type, href) {
                if (type == 'risk') {
                    if (platform == 'ios') {
                        jsWebViewCallBack(platform, href, '风险提示');
                    } else if (platform == 'android') {
                        jsWebViewCallBack(platform, href, '风险提示');
                    }
                } else {
                    if (platform == 'ios') {
                        jsWebViewCallBack(platform, href, '随心投服务说明');
                    } else if (platform == 'android') {
                        jsWebViewCallBack(platform, href, '随心投服务说明');
                    }
                }
            },
            toUrl() {
                var ids = this.$route.params.id;
                var platform = Util.getCookie('platform');
                if (ids != undefined) {
                    if (platform !== '') {
                        jsShowLoginCallBack(platform);
                    } else {
                        var decode = '/#/regular/detail/' + ids;
                        window.location.href = '/user/login?forward_url=' + Base64.encode(decode);
                    }
                }
            },
            toRecharge(type) {
                if (type == 0) {
                    //去充值
                    MessageBox({
                        title: '温馨提示',
                        message: '可用余额不足，请前往充值',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: '去充值',
                        cancelButtonText: '确定',
                    }).then(action => {
                        if (action == 'confirm') {
                            window.location.href = '/user/verify_safe_password_with_url?forward_url=/user/recharge';
                        }
                    });
                } else if (type == 1) {
                    //去设置安全密码
                    MessageBox({
                        title: '温馨提示',
                        message: '为了您的账户安全，请在投资前设置安全密码',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: '去设置',
                        cancelButtonText: '取消',
                    }).then(action => {
                        if (action == 'confirm') {
                            window.location.href = '/user/verify_safe_password_with_url';
                        }
                    });
                } else if (type == 2) {
                    //去设置银行卡
                    MessageBox({
                        title: '温馨提示',
                        message: '银行卡绑定成功的用户才能投资。现在需要您充值一笔资金，以便完成绑定',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: '去充值',
                        cancelButtonText: '取消',
                    }).then(action => {
                        if (action == 'confirm') {
                            window.location.href = '/user/verify_safe_password_with_url?forward_url=/user/recharge';
                        }
                    });
                }
            },
            tip() {
                MessageBox.alert('本平台所有项目年化利率是在参考同类型项目历史数据得出，实际收益请参考往期年化收益率。市场有风险，投资需谨慎。');
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
            Scroll,
            InvestmentAgreement,
            RiskAgreement
        }
    }
</script>
<style scoped>
    .islogin-status{
        position: absolute;
        left: 0;
        right: 0;
        top: 9%;
        display: block;
        width:193px;
        height:45px;
        line-height: 45px;
        margin: 0 auto;
        text-align: center;
        color: #ffffff;
        font-size: 17px;
        background:rgba(255,102,0,1);
        border-radius: 3px;
        box-shadow:14px 0px 50px rgba(253,123,95,0.5);
        z-index: 9999999999999;
    }
    .opacityFlag{
        position: relative;
        opacity:0.1;
    }
</style>