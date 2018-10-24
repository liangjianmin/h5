<template>
    <section class="dola-standard-powder" :class="{'dola-scoll-prevent':invest_affirm==true}" v-if="standardPowderDetail.loan">
        <TitleBar :title="title" v-if="!isApp"></TitleBar>
        <section class="dola-standard-powder-detail" :class="{isApp:isApp}" v-if="standardPowderDetail.loan != null && standardPowderDetail.loan.detail.unmatched_amount">
            <div class="detail-wrapper">
                <div class="detail-container">
                    <div class="top clr">
                        <div class="left">
                            <h5 class="tit">往期年化收益率<em style="margin-left: 10px;" class="ico-tips lineBlock va-m" @click="tip()"></em></h5>
                            <p class="text"><b>{{standardPowderDetail.loan.detail.interest_rate}}</b>%</p>
                        </div>
                        <div class="right">
                            <h5 class="tit">期限</h5>
                            <p class="text"><b>{{standardPowderDetail.loan.detail.loan_period}}</b>个月</p>
                        </div>
                    </div>
                    <div class="bottom clr">
                        <div class="l">
                            <h5 class="tit">剩余可投</h5>
                            <p class="text">{{(standardPowderDetail.loan.detail.loan_amount - standardPowderDetail.loan.detail.matched_amount).toFixed(2)}}元</p>
                        </div>
                        <div class="c">
                            <h5 class="tit">回款方式</h5>
                            <p class="text">等额本息</p>
                        </div>
                        <div class="r">
                            <h5 class="tit">项目总额</h5>
                            <p class="text">{{standardPowderDetail.loan.detail.loan_amount}}元</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-lists-wrapper">
                <ul class="detail-lists">
                    <li class="list list01">
                        <template v-if="standardPowderDetail.user">
                            <span class="tit">可用余额</span>
                            <span class="cont"><b>{{standardPowderDetail.user.available_total_money}}</b>元</span>
                            <a href="javascript:;" class="trade-in-btn" @click.prevent="tradeIn">充值</a>
                        </template>
                        <template v-else>
                            <span class="tit">可用余额</span>
                            <span class="cont"><a style="color: #f2843a;" @click="userLogin">登录后可查看</a></span>
                        </template>
                    </li>
                    <li class="list list03">
                        <span class="tit">计息方式</span>
                        <span class="cont">满标计息</span>
                    </li>
                    <li class="list list05">
                        <span class="tit">债权转让</span>
                        <span class="cont">投资满30天，可申请转让</span>
                    </li>
                </ul>
            </div>

            <div class="detail-input-wrapper">
                <form class="inveset-form">
                    <div class="input" v-if="standardPowderDetail.loan">
                        <span class="desc">金额</span>
                        <input class="inveset-money" type="number" name="money" id="" :placeholder="standardPowderDetail.loan.detail.min_money + '元起投'" v-model.number="investMoney"/>
                        <span class="all-inveset" @click="allIn">全投</span>
                    </div>
                    <input class="join-btn" type="button" value="立即加入" @click.prevent="join"/>
                    <div class="time-txt" v-if="standardPowderDetail.loan">募集时间剩余：
                        <countdown :endTime="standardPowderDetail.loan.detail.c_time" :callback="callback" :endText="已经结束了"></countdown>
                    </div>
                </form>
            </div>
        </section>
        <!--导航-->
        <nav class="dola-regular-nav" style="display: block;" :class="{nocanby: standardPowderDetail.loan.detail.unmatched_amount===0&&!isApp}">
            <ul class="nav-list">
                <li class="item" @click="navTab(0)" :class="{'current':nav_list_current==0}"><span>项目介绍</span></li>
                <li class="item" @click="navTab(1)" :class="{'current':nav_list_current==1}"><span>安全保障</span></li>
                <li class="item" @click="navTab(2)" :class="{'current':nav_list_current==2}"><span>投资记录</span></li>
                <li class="item" @click="navTab(3)" :class="{'current':nav_list_current==3}"><span>还款计划</span></li>
            </ul>
        </nav>
        <!--项目介绍-->
        <div class="dola-product dola-pro-jieshao" v-if="standardPowderDetail.loan!=null" :style="{'display':isAvisible}">
            <a class="islogin-status" @click="userLogin" v-if="standardPowderDetail.user == null">登录 查看详情</a>
            <div :class="{'opacityFlag':standardPowderDetail.user == null}">
                <section class="dola-project boxsiz">
                    <h3 class="title boxsiz">项目介绍</h3>
                    <ul class="lists">
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">项目名称</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.loan_text}}</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">往期年化收益率</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.interest_rate}}%</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">投资期限</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.loan_period}}个月</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">项目总额</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.loan_amount}}元</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">加入条件</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.join_condition}}</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">计息方式</span>
                            <span class="desc-content lineBlock va-m desc-content-text">满标计息</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">回款方式</span>
                            <span class="desc-content lineBlock va-m desc-content-text">等额本息</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">转让方式</span>
                            <span class="desc-content lineBlock va-m desc-content-text">投资满30天可转让</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">转让手续费</span>
                            <span class="desc-content lineBlock va-m desc-content-text">转让手续费=转让本金*0.2%*未持有的月份；未持有月份=项目实际月份-已持有月份(不满一个月，该月份不计算入内)</span>
                        </li>
                        <!--  <li class="list boxsiz">
                              <span class="desc-title lineBlock va-m">投资要求</span>
                              <span class="desc-content lineBlock va-m desc-content-text">风险评测级别“保守”以上</span>
                          </li>-->
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">投资管理费</span>
                            <span class="desc-content lineBlock va-m desc-content-text">投资管理费每月回款日收取，投资管理费=当月回款利息*10%（2018.05.01~2018.12.31期间投资可享受投资管理费五折优惠）</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">借款人推荐方</span>
                            <span class="desc-content lineBlock va-m desc-content-text" v-if="(standardPowderDetail.loan.detail.source).indexOf('mmt_') >= 0">买买提：公司成立于2016年2月，以打造“年轻人的信用钱包”为发展理念，致力于为广大用户提供安全高效的金融服务。买买提依托并利用强大的资源，将传统金融业务与互联网技术相结合，充分发挥整合和协同效应的优势，探索全新的互联网金融发展模式。https://www.maimaiti.cn</span>
                            <span class="desc-content lineBlock va-m desc-content-text" v-if="(standardPowderDetail.loan.detail.source).indexOf('bq_') >= 0"> 佰仟金融：公司成立于2013年12月，致力于为普通消费者提供优质的消费分期服务，涵盖手机、电脑、家电、电动车、摩托车、汽车、医美、时尚消费品等领域，成功服务了来自全国各地的1800万用户。<a href="http://www.billionsfinance.cn" target="_blank">www.billionsfinance.cn</a></span>
                            <span class="desc-content lineBlock va-m desc-content-text" v-if="(standardPowderDetail.loan.detail.source).indexOf('xyzj_') >= 0">信用之家：公司成立于2015年，是一家以大数据风控和金融科技技术为核心，提供多产品、多渠道综合贷款服务的互联网金融服务公司。公司通过技术和风控手段打通线上平台与线下渠道的联系，打造从线上到线下的全流程金融服务，从而实现新型的普惠金融服务体系。</span>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">项目安全等级</span>
                            <div class="desc-content lineBlock va-t desc-content-text">
                                <p>
                                    <span class="ico-star lineBlock"></span>
                                    <span class="ico-star lineBlock"></span>
                                    <span class="ico-star lineBlock"></span>
                                    <span class="ico-star lineBlock"></span>
                                    <span class="ico-star lineBlock"></span>
                                </p>
                                <p class="desc-content lineBlock va-m desc-content-text">本金、收益稳定（内部评级，仅供参考）</p>
                            </div>
                        </li>
                        <li class="list boxsiz">
                            <span class="desc-title lineBlock va-m">投资人条件</span>
                            <span class="desc-content lineBlock va-m desc-content-text" @click="tipFns()">风险评测“保守型”及以上 <em style="color: #f2843a">查看规则>></em></span>
                        </li>
                    </ul>
                </section>
                <section class="dola-project dola-project-explain" v-if="standardPowderDetail.loan.detail">
                    <h3 class="title boxsiz">借款人基本信息</h3>
                    <ul class="lists-ul">
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.debtor_name">
                            <span class="desc-title lineBlock va-m">姓名</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.debtor_name}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.debtor_gender_format">
                            <span class="desc-title lineBlock va-m">性别</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{ standardPowderDetail.loan.detail.debtor_gender_format }}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.debtor_age">
                            <span class="desc-title lineBlock va-m">年龄</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.debtor_age}}岁</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.debtor_ID_num">
                            <span class="desc-title lineBlock va-m">证件号码</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.debtor_ID_num}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.eduExperience">
                            <span class="desc-title lineBlock va-m">学历</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.eduExperience}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.mobileTelephone">
                            <span class="desc-title lineBlock va-m">手机</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.mobileTelephone}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.marriage">
                            <span class="desc-title lineBlock va-m">婚姻状况</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.marriage}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.nativeplace">
                            <span class="desc-title lineBlock va-m">户籍地址</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.nativeplace}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.house">
                            <span class="desc-title lineBlock va-m">住房状况</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.house}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.remark">
                            <span class="desc-title lineBlock va-m">借款用途</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.remark}}</span>
                        </li>
                    </ul>
                </section>
                <section class="dola-project dola-project-explain" v-if="standardPowderDetail.loan.detail">
                    <h3 class="title boxsiz">借款人其他信息</h3>
                    <ul class="lists-ul">
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.unitKind">
                            <span class="desc-title lineBlock va-m">行业类型</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.unitKind}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.cellProperty">
                            <span class="desc-title lineBlock va-m">单位性质</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.cellProperty}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.jobTotal">
                            <span class="desc-title lineBlock va-m">总工作经验</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.jobTotal}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.jobTime">
                            <span class="desc-title lineBlock va-m">现单位工作/个体营业时间(月)</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.jobTime}}</span>
                        </li>
                        <li class="lists-li boxsiz" v-if="standardPowderDetail.loan.detail.c_time">
                            <span class="desc-title lineBlock va-m">审核通过时间</span>
                            <span class="desc-content lineBlock va-m desc-content-text">{{standardPowderDetail.loan.detail.c_time}}</span>
                        </li>
                    </ul>
                </section>
                <section class="dola-project dola-project-tips">
                    <h3 class="title boxsiz">
                        <template v-if="app">
                            <template v-if="platform == 'ios'">
                                <a @click="appCallback(platform,'risk','/spa#/about/risk?platform=ios')">风险提示书</a>
                            </template>
                            <template v-else-if="platform == 'android'">
                                <a @click="appCallback(platform,'risk','/spa#/about/risk?platform=android')">风险提示书</a>
                            </template>
                        </template>
                        <template v-else>
                            <router-link to="/about/risk">风险提示书</router-link>
                        </template>
                    </h3>
                </section>
            </div>
        </div>
        <!-- 安全保障 -->
        <div class="dola-about-safety-guarantee" v-if="standardPowderDetail.loan" :style="{'display':isBvisible}">
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
                        <dd class="desc">聘请北京盈科（深圳）律师事务所为平台合规备案进行指导，确保平台合规经营</dd>
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
        <!--投资记录-->
        <div class="dola-investment-records" :style="{'display':isCvisible}">
            <table v-if="getInvestmentList.total">
                <tbody>
                <tr>
                    <td>出借人</td>
                    <td>出借金额（元）</td>
                    <td>操作平台</td>
                    <td>时间</td>
                </tr>
                <template v-if="getInvestmentList.data.length > 0">
                    <tr v-for="(item, key) in getInvestmentListData" :key="key">
                        <td>{{item.nickname}}</td>
                        <td>{{item.amount}}</td>
                        <td>{{item.platform}}</td>
                        <td>{{item.format_time}}</td>
                    </tr>
                    <tr v-if="getInvestmentList.max_page > 1">
                        <td colspan="4" @click="loadMorePlanUser()">
                            <span class="morelaod" style="padding-bottom:0;">{{planUserLoadingText}}</span>
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
        <!--还款计划-->
        <div class="borrow-info back-money-pro" :style="{'display':isDvisible}">
            <div v-if="schedule">
                <section class="borrow-info-wrapper page-loadmore-wrapper">
                    <template v-if="schedule.type == 0">
                        <table border="0" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr>
                                <th>期次</th>
                                <th>本期还款额(元)</th>
                                <th>还款本金(元)</th>
                                <th>还款利息(元)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-if="schedule.list.length > 0">
                                <tr v-for="(item, key) in schedule.list" :key="key">
                                    <td>{{item.sequence}}</td>
                                    <td>{{item.payment}}</td>
                                    <td>{{item.principal}}</td>
                                    <td>{{item.interest}}</td>
                                </tr>
                            </template>
                            <template v-else></template>
                            </tbody>
                        </table>
                    </template>
                    <template v-else-if="schedule.type == 1">
                        <table border="0" cellspacing="0" cellpadding="0" class="back_pro">
                            <thead>
                            <tr>
                                <th>期次</th>
                                <th>本期还款额(元)</th>
                                <th>还款本金(元)</th>
                                <th>还款利息(元)</th>
                                <th style="width: 70px;">还款日期</th>
                                <th>还款状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, key) in schedule.list" :key="key">
                                <td>{{item.sequence}}</td>
                                <td>{{item.payment}}</td>
                                <td>{{item.principal}}</td>
                                <td>{{item.interest}}</td>
                                <td>{{item.payment_date_format}}</td>
                                <td>{{item.payment_status_text}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </template>
                </section>
            </div>
            <p class="tipss">说明:因计算方式为四舍五入，最后一期还款金额与之前期数稍有不同 </p>
        </div>
        <!-- 确认投资 -->
        <div class="invest-affirm" v-if="invest_affirm && standardPowderDetail.user && standardPowderDetail.loan">
            <section class="invest-affirm-wrapper">
                <div class="title-wrapper">
                    <span class="close-wrapper" @click="invest_affirm = false"></span>
                    <h5 class="title">确认投资</h5>
                </div>
                <div class="invest-money">
                    <p class="text">￥{{investMoney}}<i class="icon">{{standardPowderDetail.loan.detail.loan_period}}个月</i></p>
                </div>
                <div name="affirm-form" class="affrim-join-pro-from">
                    <ul class="form-lists">
                        <li class="list list2">
                            <span class="desc">每月本息回款<em style="margin-left: 10px;" class="ico-tip lineBlock va-m" @click="tip3()"></em></span>
                            <span class="content">{{month_repayment}}元</span>
                        </li>
                        <li class="list list3">
                            <span class="desc">往期参考收益<em style="margin-left: 10px;" class="ico-tip lineBlock va-m" @click="tip2()"></em></span>
                            <span class="content">{{total_interest}}元</span>
                        </li>
                    </ul>
                    <div class="agree-yx">
                        <div>
                            <i class="is-checked" @click="is_checked =!is_checked" :class="{'checked-right':is_checked==true}"></i>
                            <div class="lineBlock agree-yx-text">
                                <span>同意并签署</span>
                                <a href="javascript:;" @click="agreement(1)">《多啦聚财咨询服务协议》</a>和
                                <a href="javascript:;" @click="agreement(3)">《风险提示书》</a>
                                <p class="waring">请仔细阅读以上协议文本并勾选同意签署！ </p>
                            </div>
                        </div>
                    </div>
                    <div class="affirm-btn-wrapper">
                        <template v-if="is_checked">
                            <input type="button" :disabled="invest_money_confirm_disabled" :class="{'disabale-active':invest_money_confirm_disabled}" :value="'确认支付'+investMoney+'元'" class="affirm-btn" @click.prevent="verifyJoinSubmit()"/>
                        </template>
                        <template v-else>
                            <input type="button" :disabled="invest_money_confirm_disabled" :class="{'disabale-active-end':!is_checked}" :value="'确认支付'+investMoney+'元'" class="affirm-btn" @click.prevent="verifyJoinSubmit()"/>
                        </template>
                    </div>
                    <p class="affirm-btn-wrapper-txt">市场有风险，投资需谨慎</p>
                </div>
            </section>
        </div>
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
        <InvestmentAgreement :agreement-type="agreementtype" ref="InvestmentAgreement" v-show="agreement_flag"></InvestmentAgreement>
        <RiskAgreement ref="RiskAgreement" v-show="agreement_flag"></RiskAgreement>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import TitleBar from '../common/TitleBar.vue'
    import Footers from '../common/Footer.vue'
    import {Indicator, Toast, MessageBox} from 'mint-ui'
    import {services as Services} from '../../api/index'
    import Util from '../../util/index'
    import countdown from '../../components/countdown.vue'
    import qs from 'qs'
    import {jsWebViewCallBack, jsShowLoginCallBack, jsShowRechargeCallBack, jsSettingSafePwdCallBack} from '../../util/appCallback'
    import ChannelFooter from '../common/ChannelFooter.vue'
    import InvestmentAgreement from '../agreement/InvestmentAgreement.vue'
    import RiskAgreement from '../agreement/RiskAgreement.vue'


    let Base64 = require('js-base64').Base64

    export default {
        name: 'standardPowderDetail',
        computed: mapState({
            standardPowderDetail: state => state.standard.standardPowderDetail,
            schedule: state => state.standard.schedule,
            getInvestmentList: state => state.standard.getInvestmentList,
            getInvestmentListData: state => state.standard.getInvestmentListData
        }),
        data() {
            return {
                title: '项目详情',
                condition_layer: false,
                investMoney: '',
                invest_affirm: false,
                coupon_types: 0,
                invest_money_confirm: '',
                invest_money_confirm_disabled: false,
                is_checked: false,
                safe_password: '',
                app: false,
                month_repayment: '',
                total_interest: '',
                nav_list_current: 0,
                isAvisible: 'block',
                isBvisible: 'none',
                isCvisible: 'none',
                isDvisible: 'none',
                planUserLoadingText: '点击查看更多投资记录',
                rapperHeight: 0,
                page: 1,
                isApp: false,
                platform: '',
                agreement_flag: false,
                agreementtype: 'standard'
            }
        },
        created() {
            var loanId = this.$route.params.id
            var platform = Util.getCookie('platform')

            if (platform != '') {
                this.isApp = true
            } else {
                this.isApp = false
            }

            if (loanId != undefined) {
                this.getRegularStandardDetail(loanId)
                this.getInvestmentLists(loanId)
            }
        },
        mounted() {
            var platform = Util.getCookie('platform')
            this.platform = platform

            if (app) {
                this.wrapperHeight = document.documentElement.clientHeight
            } else {
                this.wrapperHeight = document.documentElement.clientHeight - 230
            }
        },
        methods: {
            getRegularStandardDetail(loan_id) {
                this.$store.dispatch({
                    type: 'standardPowderDetail',
                    loan_id: loan_id
                })
                this.$store.dispatch({
                    type: 'schedule',
                    loan_id: loan_id
                })
            },
            getInvestmentLists(loan_id) {
                this.$store.dispatch({
                    type: 'getInvestmentList',
                    loan_id: loan_id,
                    page: this.page,
                    page_size: 10
                })
            },
            userLogin() {
                var loanId = this.$route.params.id
                var platform = Util.getCookie('platform')

                if (loanId != undefined) {
                    if (platform != '') {
                        jsShowLoginCallBack(platform)
                    } else {
                        var decode = '/#/standard/detail/' + loanId
                        window.location.href = '/user/login?forward_url=' + Base64.encode(decode)
                    }
                }
            },
            tradeIn() {
                //判断app来源
                var platform = Util.getCookie('platform')
                //判断存管状态
                var userBindCardStatus = this.standardPowderDetail.user.bankcard_status  // 绑卡状态
                var isSRBankUser = this.standardPowderDetail.user.srbank.is_srbank_user  // 是否是存管用户
                var isNeedResetPass = this.standardPowderDetail.user.srbank.need_reset_pwd_first // 老用户重置密码
                var isSRBindCardStatus = this.standardPowderDetail.user.srbank.is_srbank_user_bindcard   // 存管绑卡状态

                if (!isSRBankUser) {
                    // 非存管用户提醒开户
                    this.tipFn(0)
                    return false
                } else if (!isSRBindCardStatus || userBindCardStatus === 'UNBIND') {
                    // 非绑卡状态提示绑卡
                    this.tipFn(1)
                    return false
                } else {
                    // 已开通存管
                    if (isNeedResetPass) {
                        // 老用户重置密码
                        this.tipFn(4)
                        return false
                    } else {
                        //区分app
                        if (platform != '') {
                            window.location.href = '/#/bank/recharge';
                            // jsShowRechargeCallBack(platform)
                        } else {
                            window.location.href = '/#/bank/recharge';
                        }
                    }
                }
            },
            tipFns() {
                var html = ' <section class="condition-layer" v-show="condition_layer" ref="condition_layer">\n' +
                    '            <dl class="clr">\n' +
                    '               <dt class="clr">\n' +
                    '                   <span class="fl">风险评测类型</span>\n' +
                    '                   <span class="fr">可投项目安全等级</span>\n' +
                    '               </dt>\n' +
                    '                <dd class="clr">\n' +
                    '                    <span class="fl">保守型</span>\n' +
                    '                    <span class="fr">五星</span>\n' +
                    '                </dd>\n' +
                    '                <dd class="clr">\n' +
                    '                    <span class="fl">稳健型</span>\n' +
                    '                    <span class="fr">五星和四星半、四星</span>\n' +
                    '                </dd>\n' +
                    '                <dd class="clr">\n' +
                    '                    <span class="fl">成长型</span>\n' +
                    '                    <span class="fr">五星、四星半和四星、三星半</span>\n' +
                    '                </dd>\n' +
                    '                <dd class="clr">\n' +
                    '                    <span class="fl">激进型</span>\n' +
                    '                    <span class="fr">五星、四星半、四星和三星半、三星</span>\n' +
                    '                </dd>\n' +
                    '            </dl>\n' +
                    '        </section>';
                this.condition_layer = true;
                MessageBox({
                    title: '投资人条件',
                    message: html,
                    showConfirmButton: true,
                    confirmButtonText: '关闭',
                    confirmButtonClass: 'confirmButtonClass'
                });
            },
            allIn() {
                var isLogin = this.standardPowderDetail.user

                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 1500
                    })
                } else {
                    var unmatched_amount = this.standardPowderDetail.loan.detail.unmatched_amount * 1
                    var available_total_money = this.standardPowderDetail.user.available_total_money * 1
                    var minInvesetMoney = this.standardPowderDetail.loan.detail.min_money * 1
                    var maxInvesetMoney = this.standardPowderDetail.loan.detail.max_money * 1

                    if (available_total_money > maxInvesetMoney) {
                        if (unmatched_amount > maxInvesetMoney) {
                            this.investMoney = maxInvesetMoney
                        } else {
                            this.investMoney = unmatched_amount
                        }

                    } else {
                        if (available_total_money > unmatched_amount) {
                            this.investMoney = unmatched_amount
                        } else {
                            this.investMoney = available_total_money
                        }
                    }
                }
            },
            join() {
                var isLogin = this.standardPowderDetail.user
                if (!isLogin) {
                    let instance = Toast({
                        message: '您还没有登录，请先登录后在进行操作',
                        duration: 2000
                    })
                } else {
                    // 判断是否风险评测
                    var isWhetherEvaluation = this.standardPowderDetail.user.whether_evaluation

                    //判断存管状态
                    var userBindCardStatus = this.standardPowderDetail.user.bankcard_status  // 绑卡状态
                    var isSRBankUser = this.standardPowderDetail.user.srbank.is_srbank_user  // 是否是存管用户
                    var isNeedResetPass = this.standardPowderDetail.user.srbank.need_reset_pwd_first // 老用户重置密码
                    var isSRBindCardStatus = this.standardPowderDetail.user.srbank.is_srbank_user_bindcard   // 存管绑卡状态
                    var SRBankSignStatus = this.standardPowderDetail.user.srbank.is_srbank_user_sign_auto_bid // 是否转让签约

                    if (!isSRBankUser) {
                        // 非存管用户提醒开户
                        this.tipFn(0)
                        return false
                    } else if (!isSRBindCardStatus || userBindCardStatus === 'UNBIND') {
                        // 非绑卡状态提示绑卡
                        this.tipFn(1)
                        return false
                    } else {
                        // 已开通存管
                        if (isNeedResetPass) {
                            // 老用户重置密码
                            this.tipFn(4)
                            return false
                        } else {
                            if (!SRBankSignStatus) {
                                // 未签约状态
                                this.tipFn(2)
                                return false
                            } else if (!isWhetherEvaluation) {
                                MessageBox.alert('您未进行风险评测，请先评测再进行投资').then(() => {
                                    window.location.href = '/app/v1220/ucenter/risk_evaluation'
                                    return false
                                })
                            } else {
                                // 已完成评测，也是绑卡用户
                                var invesetMoney = this.investMoney    // 投资金额
                                var unmatched_amount = this.standardPowderDetail.loan.detail.unmatched_amount * 1  // 未匹配金额
                                var available_total_money = this.standardPowderDetail.user.available_total_money * 1   // 可用余额
                                var minInvesetMoney = this.standardPowderDetail.loan.detail.min_money * 1
                                var maxInvesetMoney = this.standardPowderDetail.loan.detail.max_money * 1

                                if (!invesetMoney || invesetMoney === '0.00') {
                                    let instance = Toast({
                                        message: '请输入金额',
                                        duration: 2000
                                    })
                                    return false
                                } else {
                                    // 投资金额 超出 可投金额
                                    if (invesetMoney > unmatched_amount) {
                                        let instance = Toast({
                                            message: '投资金额超出可投金额',
                                            duration: 2000
                                        })
                                        return false
                                    } else {
                                        if (unmatched_amount < minInvesetMoney) {
                                            if (invesetMoney != unmatched_amount) {
                                                let instance = Toast({
                                                    message: '剩余可投金额小于可投金额时，需全额加入',
                                                    duration: 2000
                                                })
                                                return false
                                            } else {
                                                if (invesetMoney > available_total_money) {
                                                    this.tipFn(3)
                                                    return false
                                                }
                                            }
                                        } else if (unmatched_amount < maxInvesetMoney) {
                                            if ((unmatched_amount - invesetMoney) < minInvesetMoney && (unmatched_amount - invesetMoney) > 0) {
                                                let instance = Toast({
                                                    message: '加入金额需在100~' + (unmatched_amount - 100) + '元之间，或加入金额等于' + unmatched_amount,
                                                    duration: 2000
                                                })
                                                return false
                                            } else if (invesetMoney < minInvesetMoney) {
                                                let instance = Toast({
                                                    message: '投资金额需大于起投金额',
                                                    duration: 2000
                                                })
                                                return false
                                            } else {
                                                if (invesetMoney > available_total_money) {
                                                    this.tipFn(3)
                                                    return false
                                                }
                                            }
                                        } else {
                                            if ((unmatched_amount - invesetMoney) < minInvesetMoney && (unmatched_amount - invesetMoney) > 0) {
                                                let instance = Toast({
                                                    message: '加入金额需在100~' + (unmatched_amount - 100) + '元之间，或加入金额等于' + unmatched_amount,
                                                    duration: 2000
                                                })
                                                return false
                                            } else if (invesetMoney > maxInvesetMoney) {
                                                let instance = Toast({
                                                    message: '投资金额超出单笔最高可投金额',
                                                    duration: 2000
                                                })
                                                return false
                                            } else if (invesetMoney < minInvesetMoney) {
                                                let instance = Toast({
                                                    message: '投资金额低于单笔最低可投金额',
                                                    duration: 2000
                                                })
                                                return false
                                            } else if (invesetMoney > available_total_money) {
                                                this.tipFn(3)
                                                return false
                                            }
                                        }
                                    }
                                }
                                // 金额验证通过
                                this.invest_affirm = true
                            }
                        }
                    }

                    // 计算收益
                    if (this.investMoney * 1) {
                        let paramsData = {
                            invest_money: this.investMoney * 1,
                            loan_period: this.standardPowderDetail.loan.detail.loan_period,
                            interest_rate: this.standardPowderDetail.loan.detail.interest_rate
                        }
                        let Codekey = Util.getRrandomStr()
                        let token = Util.getCookie('token')
                        let parames = Util.getParams('wechat', token, paramsData)
                        parames = Util.encryption(Codekey, parames, 'code')
                        Services.investInterestRepay(Codekey, parames).then((res) => {
                            var key = res.headers['x-dola-edoc']
                            var data = res.data
                            var str = Util.decrypt(key, data, 'code')
                            var data = JSON.parse(str)
                            console.log(data)
                            if (data.code === 0) {
                                this.month_repayment = data.data.month_repayment
                                this.total_interest = data.data.total_interest
                            } else {
                                let instance = Toast({
                                    message: data.msg,
                                    duration: 2000
                                })
                            }
                        }).catch(function (err) {
                            let instance = Toast({
                                message: '网络不通，请重试',
                                duration: 2000
                            })
                        })
                    }
                }
            },
            tipFn(type) {
                //区分app来源
                var platform = Util.getCookie('platform')
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
                        cancelButtonText: '暂不开通',
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'personalRegister',
                                redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?'
                            })
                        }
                    })
                } else if (type == 1) {
                    MessageBox({
                        title: '温馨提示',
                        message: '您还未绑定银行卡，请先绑定银行卡后再进行投资。',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '立即绑卡',
                        cancelButtonText: '暂不绑卡',
                    }).then(action => {
                        if (action == 'confirm') {
                            //已经解绑的用户  跳转上饶银行换绑
                            //this.$router.push({path: '/bank/open_account'}); ******这段代码有可能解封
                            this.$store.dispatch({
                                type: 'rebindBankcardPage',
                                redirectUrl: window.location.origin + '/#/bank/waiting?callback=' + window.location.origin + '/#/bank/open_account_success?from=rebind'
                            })
                        }
                    })
                } else if (type == 2) {
                    MessageBox({
                        title: '温馨提示',
                        message: '您还未开启《投资授权协议》,请先开启《投资授权协议》后再进行投资',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonClass: 'bank-btn-confirm',
                        cancelButtonClass: 'bank-btn-cancel',
                        confirmButtonText: '开启授权',
                        cancelButtonText: '暂不授权',
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$store.dispatch({
                                type: 'srbankSignPage',
                                sign_type: 'sign_auto_bid',
                                redirectUrl: window.location.origin + '/#/bank/sign_page_success?',
                            })
                        }
                    })
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
                        cancelButtonText: '确定',
                    }).then(action => {
                        if (action == 'confirm') {
                            if (platform === 'android') {
                                jsShowRechargeCallBack(platform)
                            } else {
                                window.location.href = '/#/bank/recharge'
                            }
                        }
                    })
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
                            })
                        }
                    })
                }
            },
            verifyJoinSubmit() {
                if (!this.is_checked) {
                    let instance = Toast({
                        message: '请仔细阅读以上协议文本并勾选同意签署！',
                        duration: 2000
                    });
                } else {
                    Indicator.open({
                        text: '正在处理...',
                        spinnerType: 'triple-bounce'
                    });
                    var loanId = this.$route.params.id;
                    var paramsData = {
                        loan_id: loanId,
                        invest_money: this.investMoney * 1
                    };
                    this.invest_money_confirm_disabled = true;
                    let Codekey = Util.getRrandomStr();
                    let token = Util.getCookie('token');
                    let params = Util.getParams('wechat', token, paramsData);
                    params = Util.encryption(Codekey, params, 'code');
                    Services.joinStandard(Codekey, params).then((res) => {
                        var key = res.headers['x-dola-edoc']
                        var data = res.data
                        var str = Util.decrypt(key, data, 'code')
                        var data = JSON.parse(str)
                        console.log(data);
                        if (data.code === 0) {
                            setTimeout(() => {
                                Indicator.close()
                                this.invest_money_confirm_disabled = false
                                this.$router.push({
                                    path: '/standardsuccess', query: {
                                        invest_money: this.investMoney,
                                        invest_date: this.standardPowderDetail.loan.detail.loan_period,
                                        total_interest: this.total_interest,
                                        month_repayment: this.month_repayment
                                    }
                                })
                            }, 1000)
                        } else if (data.code === 910068) {
                            Indicator.close();
                            var str_1 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，个人出借金额上限' + data.data.amountset + '万，剩余可投金额' + data.data.remain_money + '元，若需调整出借上限金额，请重新评测';
                            var str_2 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，个人出借金额上限' + data.data.amountset + '万，剩余可投金额' + data.data.remain_money + '元，若有疑问，请联系客服400-9300-986';
                            var str_3 = '您的风险评测为“' + data.data.risk_appraisal_type + '”，不满足当前项目投资人条件若需调整类型，请重新评测';

                            if (this.investMoney * 1 + data.data.all_principal * 1 > data.data.amountset * 1) {
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
                            this.invest_money_confirm_disabled = false;
                            let instance = Toast({
                                message: data.msg,
                                duration: 2000
                            })
                        }
                    }).catch(function (err) {
                        Indicator.close();
                        let instance = Toast({
                            message: '网络不通，请重试',
                            duration: 2000
                        })
                    })
                }
            },
            appCallback(platform, type, href) {
                if (type == 'risk') {
                    if (platform == 'ios') {
                        jsWebViewCallBack(platform, href, '风险提示书')
                    } else if (platform == 'android') {
                        jsWebViewCallBack(platform, href, '风险提示书')
                    }
                } else {
                    if (platform == 'ios') {
                        jsWebViewCallBack(platform, href, '随心投服务说明')
                    } else if (platform == 'android') {
                        jsWebViewCallBack(platform, href, '随心投服务说明')
                    }
                }
            },
            tip() {
                MessageBox.alert('本平台所有项目年化利率是在参考同类型项目历史数据得出，实际收益请参考往期年化收益率。市场有风险，投资需谨慎。')
            },
            tip2() {
                MessageBox.alert('按等额本息算法得出的每个月回款利息之和，未扣除投资管理费。')
            },
            tip3() {
                MessageBox.alert('按等额本息算得每月回款本金和利息，未扣除投资管理费。')
            },
            agreement(type) {
                if (type == 1) {
                    this.$refs.InvestmentAgreement.$emit('agreementInvestModel', this.$refs.InvestmentAgreement.$el.innerHTML)
                } else if (type == 2) {
                    window.location.href = '/about/regular/' + this.$route.params.id
                } else if (type == 3) {
                    this.$refs.RiskAgreement.$emit('agreementRiskModel', this.$refs.RiskAgreement.$el.innerHTML)
                }
            },
            navTab(index) {
                this.nav_list_current = index
                this.tabstatus = true
                this.isAvisible = 'none'
                this.isBvisible = 'none'
                this.isCvisible = 'none'
                this.isDvisible = 'none'
                if (index == 0) {
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = 'none'
                } else if (index == 1) {
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = 'none'
                } else if (index == 2) {
                    index == 2 ? this.isCvisible = 'block' : this.isCvisible = 'none'
                } else if (index == 3) {
                    index == 3 ? this.isDvisible = 'block' : this.isDvisible = 'none'
                }
            },
            loadMorePlanUser() {
                if (this.tabstatus) {
                    this.page++
                    if (this.page <= this.getInvestmentList.max_page) {
                        this.getInvestmentLists(this.$route.params.id)
                    } else {
                        this.planUserLoadingText = '已经没有数据了'
                    }
                }
            },
            tip() {
                MessageBox.alert('本平台所有项目年化利率是在参考同类型项目历史数据得出，实际收益请参考往期年化收益率。市场有风险，投资需谨慎。')
            }
        },
        components: {
            TitleBar,
            InvestmentAgreement,
            RiskAgreement,
            countdown
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/standard_powder.css";

    .dola-standard-powder .dola-standard-powder-detail .detail-input-wrapper .inveset-form .input .inveset-money {
        background: #fff;
        line-height: 36px;
    }

    .dola-standard-powder .dola-standard-powder-detail .detail-input-wrapper .inveset-form .join-btn {
        background-image: linear-gradient(90deg, orange, #ff503c);
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

    .tipss {
        font-size: 14px;
        margin: 20px;
        color: rgb(204, 204, 204);
    }

    .opacityFlag {
        position: relative;
        opacity: 0;
    }

    .dola-regular-nav.nocanby {
        margin-top: 44px;
    }

    .back_pro th, .back_pro td {
        line-height: 1;
    }

    .disabale-active-end {
        background: #d1d1d1 !important;
        
    }
</style>