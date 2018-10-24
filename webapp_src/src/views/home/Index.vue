<template>
    <section>
        <div class="dola-head-bar dola-head-bar-show boxsiz">
            <div class="dola-head boxsiz clr">
                <div href="javascript:;" class="logo fl"></div>
                <div href="javascript:;" class="loginbar fr" v-if="tokencheck == false">
                    <a href="/user/login">登录</a>
                    <a href="/register/">注册</a>
                </div>
            </div>
        </div>
        <div class="dola-banner">
            <Slider :slidedata="appindex.ad" v-if="appindex.ad"></Slider>
        </div>
        <section class="dola-home" v-if="appindex.recommendMenu">
            <nav class="dola-home-head boxsiz dola-mt" :class="{'dola-home-head-more':appindex.recommendMenu.length > 4}">
                <template v-for="item in appindex.recommendMenu">
                    <a :href="item.forwardUrl">
                        <img :src="item.imageUrl" class="im">
                        <p>{{item.name}}</p>
                    </a>
                </template>
            </nav>
            <!--未登录状态下推荐的活动-->
            <div class="dola-regactivity boxsiz" style="display: none">
                <i class="lineBlock va-m ico1"></i>
                <div class="lineBlock va-m text">
                    <p>18888元体验金</p>
                    <p>680元新人红包</p>
                </div>
                <a class="lineBlock va-m btn" href="/user/activity/novice_1711">注册即送</a>
            </div>
            <div class="dola-home-cen dola-mt boxsiz" style="display: none">
                <!--未登录状态下 新用户专享-->
                <template v-if="appindex.appShowProduct.style == 1">
                    <p class="tit">{{appindex.product.mark}}</p>
                    <div class="txt-bg boxsiz clr">
                        <ul class="txt">
                            <li>
                                <p class="t3"><span>{{appindex.product.re_interest_rate}}</span><em>%</em></p>
                                <p class="t1">往期年化收益率</p>
                            </li>
                            <li>
                                <p class="t3"><span>{{appindex.product.period}}</span><em>个月</em></p>
                                <p class="t1">授权期限</p>
                            </li>
                        </ul>
                        <router-link :to="'/regular/detail/'+appindex.product.id" class="dola-home-btn">授权加入</router-link>
                    </div>
                </template>
                <!--登录状态下 热门 || 新用户专享-->
                <template v-else>
                    <div class="dola-islogin-recommend">
                        <dl>
                            <template v-if="appindex.appShowProduct.style == 2">
                                <template v-for="(item,index) in appindex.appShowProduct.data">
                                    <dt>
                                        <p class="tit">{{item.mark}}</p>
                                    </dt>
                                    <dd class="boxsiz" :class="[item.bg_tag=='1' ? 'bg-1':'bg-3'] ">
                                        <div class="box lineBlock va-m left">
                                            <p class="t1">往期年化收益率</p>
                                            <p class="t3">{{item.re_interest_rate}}<em>%</em></p>
                                        </div>
                                        <div class="box lineBlock va-m cen">
                                            <p class="t1">授权期限</p>
                                            <p class="t2">{{item.period}}<em>个月</em></p>
                                        </div>
                                        <div class="box lineBlock va-m">
                                            <template v-if="item.can_buy">
                                                <router-link :to="'/regular/detail/'+item.id" class="btn">授权加入</router-link>
                                            </template>
                                            <template v-else>
                                                <router-link :to="'/regular/detail/'+item.id" class="btn-end">已售罄</router-link>
                                            </template>
                                        </div>
                                        <b class="lineBlock emptys"></b>
                                    </dd>
                                </template>
                            </template>
                            <template v-else-if="appindex.appShowProduct.style == 3">
                                <dt>
                                    <p class="tit">热门项目</p>
                                </dt>
                                <dd class="bg-2 boxsiz" v-for="(item,index) in appindex.appShowProduct.data" :key="index">
                                    <div class="box lineBlock va-m left">
                                        <p class="t1">往期年化收益率</p>
                                        <p class="t2">{{item.re_interest_rate}}<em>%</em></p>
                                    </div>
                                    <div class="box lineBlock va-m cen">
                                        <p class="t1">授权期限</p>
                                        <p class="t2">{{item.period}}<em>个月</em></p>
                                    </div>
                                    <div class="box lineBlock va-m">
                                        <template v-if="item.can_buy">
                                            <router-link :to="'/regular/detail/'+item.id" class="btn">授权加入</router-link>
                                        </template>
                                        <template v-else>
                                            <router-link :to="'/regular/detail/'+item.id" class="btn-end">已售罄</router-link>
                                        </template>
                                    </div>
                                    <b class="lineBlock emptys"></b>
                                </dd>
                            </template>
                        </dl>
                    </div>
                </template>
            </div>
            <!--公告-->
            <div class="dola-home-notice dola-mt boxsiz" v-if="appindex.public_message" id="news">
                <dl class="boxsiz">
                    <dd class="clr" v-for="item in appindex.public_message.data">
                        <a class="fl l" :href="item.link">
                            <i class="icn"></i>
                            <span class="lineBlock va-m">{{item.text}}</span>
                        </a>
                        <a class="fr r" :href="appindex.public_message.more_link">
                            <span>更多</span>
                            <i></i>
                        </a>
                    </dd>
                </dl>
            </div>
            <!--工具 -->
            <div class="dola-home-tools dola-mt boxsiz">
                <template v-if="appindex.batch_novice">
                    <div class="newcomer boxsiz" v-if="appindex.batch_novice.is_show">
                        <p class="tit"><i class="icn lineBlock va-m"></i><span class="va-m">新手专享</span></p>
                        <ul class="boxsiz">
                            <i class="ico" v-if="appindex.batch_novice.novice_zone_interest_rate_three"></i>
                            <li class="boxsiz">
                                <p class="t1">
                                    <template v-if="appindex.batch_novice.novice_zone_interest_rate_three">
                                        {{appindex.batch_novice.novice_zone_interest_rate_one}}<em>%+{{appindex.batch_novice.novice_zone_interest_rate_three}}%</em>
                                    </template>
                                    <template v-else>
                                        {{appindex.batch_novice.novice_zone_interest_rate_one}}<em>%</em>
                                    </template>
                                </p>
                                <p class="t2">往期年化收益率</p>
                            </li>
                            <li class="boxsiz">
                                <p class="t3"><em>{{appindex.batch_novice.period}}</em>个月</p>
                                <p class="t2" v-if="appindex.batch_novice.novice_zone_interest_rate_three">期限</p>
                                <p class="t2" v-else>期满免费自动债转</p>
                            </li>
                            <li class="boxsiz tr">
                                <a :href="appindex.batch_novice.batch_novice_link" class="btn">去投资</a>
                                <p class="t4">最高可投<em>{{appindex.batch_novice.surplus_money}}</em>元</p>
                            </li>
                        </ul>
                    </div>
                </template>
                <div class="dola-trading boxsiz">
                    <p class="tit">投标工具</p>
                    <dl>
                        <template v-if="appindex.batch_auto">
                            <dd class="boxsiz a" v-if="appindex.batch_auto.is_list_open == 1">
                                <a :href="'/#/bespeak/detail?batchNo=' + appindex.batch_auto.batch_no">
                                    <p class="t1">预约投标</p>
                                    <p class="t2">提前预约 无需抢标</p>
                                    <p class="t3">
                                        <span class="va-m">去预约</span>
                                        <i class="icn lineBlock va-m"></i>
                                    </p>
                                </a>
                            </dd>
                        </template>
                        <template v-if="appindex.investTool">
                            <dd class="boxsiz b">
                                <a href="/#/batch/detail/?type=3">
                                    <p class="t1">一键投标</p>
                                    <p class="t2">当前可投{{appindex.investTool.can_buy_amount}}元</p>
                                    <p class="t3">
                                        <span class="va-m">去投资</span>
                                        <i class="icn lineBlock va-m"></i>
                                    </p>
                                </a>
                            </dd>
                        </template>
                    </dl>
                </div>
                <div class="dola-home-tools-recommend">
                    <dl class="a" v-if="appindex.loan_transfer_info.loan_info.data.length > 0">
                        <dt class="clr">
                            <p class="fl l">散标列表</p>
                            <a class="fr r" href="/#/regular?list=standard">
                                <span>查看更多</span>
                                <i></i>
                            </a>
                        </dt>
                        <dd>
                            <ul class="clr" v-if="appindex.loan_transfer_info">
                                <li class="boxsiz" v-for="item in appindex.loan_transfer_info.loan_info.data">
                                    <a :href="'/#/standard/detail/'+item.loan_id">
                                        <div class="top">
                                            <span class="t1 lineBlock va-m">{{item.debtor_first_name}}</span>
                                            <span class="t2 lineBlock va-m">借款人</span>
                                        </div>
                                        <div class="center">
                                            <p class="t1 lineBlock va-m">
                                                <span>{{item.interest_rate}}</span>
                                                <em>%</em>
                                            </p>
                                            <p class="t2 lineBlock va-m">{{item.loan_period}}个月</p>
                                        </div>
                                        <div class="bottom">
                                            <p class="t1">往期年化收益率</p>
                                            <div class="progress">
                                                <em :style="{'width':parseInt(item.matched_amount / item.loan_amount * 100).toFixed(0)+'%'}"></em>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="b" v-if="appindex.loan_transfer_info.transfer_info.data.length > 0">
                        <dt class="clr">
                            <p class="fl l">债权转让</p>
                            <a class="fr r" href="/#/regular?list=transfer">
                                <span>查看更多</span>
                                <i></i>
                            </a>
                        </dt>
                        <dd>
                            <ul class="clr" v-if="appindex.loan_transfer_info">
                                <li class="boxsiz" v-for="item in appindex.loan_transfer_info.transfer_info.data">
                                    <a :href="'/#/transfer/detail/'+item.transfer_id">
                                        <div class="top clr">
                                            <div class="fl l">
                                                <span class="t1 lineBlock va-m">{{item.debtor_first_name}}</span>
                                                <span class="t2 lineBlock va-m">转让人</span>
                                            </div>
                                            <div class="fr r" v-if="item.transfer_status == 0">
                                                <span class="btn-end">已转让</span>
                                            </div>
                                        </div>
                                        <div class="center">
                                            <p class="t1 lineBlock va-m">
                                                <span>{{item.interest_rate}}</span>
                                                <em>%</em>
                                            </p>
                                            <p class="t2 lineBlock va-m">{{item.left_period_text}}</p>
                                        </div>
                                        <div class="bottom">
                                            <p class="t1">往期年化收益率</p>
                                            <div class="text clr">
                                                <span class="fl l">转让{{item.transfer_money}}元</span>
                                                <span class="fr r" v-if="item.discount_text != ''">{{item.discount_text}}</span>
                                            </div>
                                        </div>
                                        <b class="line"></b>
                                    </a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="dola-home-news dola-mt boxsiz" v-if="appindex.product">
                <ul class="dola-home-news-tit lbBox">
                    <li @click="tab(index)" :class="{'curr':active==index}" v-for="(item,index) in itemtext" :key="index" class="lineBlock">{{item}}</li>
                </ul>
                <div class="dola-home-news-content" :style="{'display':isAvisible}" v-if="appindex.report">
                    <div class="dola-home-news-content-top lbBox boxsiz">
                        <div class="lineBlock va-m l">
                            <img :src="appindex.report.data[0].image" alt="多啦聚财">
                        </div>
                        <a class="lineBlock va-m r" :href="'/about/notice_detail_h5/'+appindex.report.data[0].id">
                            <p class="t1" v-html="appindex.report.data[0].title"></p>
                            <p class="t2" v-html="appindex.report.data[0].content"></p>
                        </a>
                    </div>
                    <ul class="dola-home-news-content-list">
                        <li class="clr">
                            <a :href="'/about/notice_detail_h5/'+appindex.report.data[1].id" class="clr">
                                <p class="fl t1" v-html="appindex.report.data[1].title"></p>
                                <p class="fr t2" v-html="appindex.report.data[1].date"></p>
                            </a>
                        </li>
                        <li class="clr">
                            <a :href="'/about/notice_detail_h5/'+appindex.report.data[2].id" class="clr">
                                <p class="fl t1" v-html="appindex.report.data[2].title"></p>
                                <p class="fr t2" v-html="appindex.report.data[2].date"></p>
                            </a>
                        </li>
                    </ul>
                    <a :href="appindex.report.morelink" class="dola-news-more"><span class="va-m">查看更多</span><i class="dola-lt va-m"></i></a>
                </div>
                <div class="dola-home-news-content" :style="{'display':isBvisible}" v-if="appindex.classroom">
                    <div class="dola-home-news-content-top lbBox boxsiz">
                        <div class="lineBlock va-m l">
                            <img :src="appindex.classroom.data[0].image" alt="多啦聚财">
                        </div>
                        <a class="lineBlock va-m r" :href="'/about/notice_detail_h5/'+appindex.classroom.data[0].id">
                            <p class="t1" v-html="appindex.classroom.data[0].title"></p>
                            <p class="t2" v-html="appindex.classroom.data[0].content"></p>
                        </a>
                    </div>
                    <ul class="dola-home-news-content-list">
                        <li class="clr">
                            <a :href="'/about/notice_detail_h5/'+appindex.classroom.data[1].id" class="clr">
                                <p class="fl t1" v-html="appindex.classroom.data[1].title"></p>
                                <p class="fr t2" v-html="appindex.classroom.data[1].date"></p>
                            </a>
                        </li>
                        <li class="clr">
                            <a :href="'/about/notice_detail_h5/'+appindex.classroom.data[2].id" class="clr">
                                <p class="fl t1" v-html="appindex.classroom.data[2].title"></p>
                                <p class="fr t2" v-html="appindex.classroom.data[2].date"></p>
                            </a>
                        </li>
                    </ul>
                    <a :href="appindex.classroom.morelink" class="dola-news-more"><span class="va-m">查看更多</span><i class="dola-lt va-m"></i></a>
                </div>
            </div>
            <div class="dola-home-footer" v-if="appindex.index_count_data">
                <div class="dola-home-footer-top">
                    <router-link to="/about/contactus" class="t1 boxsiz">
                        <i class="va-m"></i>
                        <span class="va-m">联系我们</span>
                    </router-link>
                    <a href="/app/v1220/home/question" class="t2 boxsiz">
                        <i class="va-m"></i>
                        <span class="va-m">常见问题</span>
                    </a>
                </div>
                <p class="t3">市场有风险，投资需谨慎！</p>
            </div>
        </section>
        <Footers></Footers>
        <Ad></Ad>
        <template v-if="appindex.as_for_is_alert == 1">
            <Layer :url="'/user/activity/notice'"></Layer>
        </template>
        <!--小程序-->
        <div class="wx-box" v-if="wx_isShow" @click="switchTab()">
            <i class="lineBlock va-m"></i>
            <span class="va-m">返回小程序</span>
            <b class="lineBlock va-m emptys"></b>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import Slider from '../common/Slide.vue'
    import Footers from '../common/Footer.vue'
    import Ad from '../common/Ad.vue'
    import Layer from '../activity/Layer.vue'
    import Scroll from '../../components/scroll.vue'

    export default {
        name: 'home',
        data() {
            return {
                active: 0,
                isAvisible: 'block',
                isBvisible: 'none',
                itemtext: ['媒体报道', '出借人教育'],
                close: false,
                wx_isShow: false
            }
        },
        computed: mapState({
            appindex: state => state.home.appindex,
            tokencheck: state => state.home.tokencheck
        }),
        created() {
            this.getAppindex()
            setTimeout(() => {
                var newWrap = document.getElementById('news')
                this.slideoneNews(newWrap)
            }, 2000)
        },
        mounted() {
            //判断小程序环境入口打开
            var self = this
            try {
                if (wx && wx.miniProgram && wx.miniProgram.getEnv) {
                    wx.miniProgram.getEnv(function (res) {
                        if (res.miniprogram) {
                            self.wx_isShow = true
                        }
                    })
                }
            } catch (e) {

            }
        },
        methods: {
            slideoneNews(newWrap) {
                try {
                    var newsMain = newWrap.getElementsByTagName('dl')[0]
                    var newsItem = newsMain.getElementsByTagName('dd')
                    var newsItemH = newsItem[0].offsetHeight
                    var newsTimer = null
                    newsTimer = setInterval(function () {
                        moveNews(newsItem[0], newsItemH)
                    }, 3000)

                    function moveNews(obj, target) {
                        var moveTimter = null
                        var num = 0
                        var temp = null
                        moveTimter = setInterval(function () {
                            if (num != target || num > target) {
                                num = num + 0.5
                                newsItem[0].style.marginTop = -num + 'px'
                            } else {
                                for (var i = 0; i < newsItem.length; i++) {
                                    newsItem[i].style.marginTop = ''
                                }
                                clearInterval(moveTimter)
                                newsMain.appendChild(newsItem[0])
                            }
                        }, 10)
                    }

                    newWrap.onmouseover = function () {
                        clearInterval(newsTimer)
                    }
                    newWrap.onmouseout = function () {
                        newsTimer = setInterval(function () {
                            moveNews(newsItem[0], newsItemH)
                        }, 3000)
                    }
                } catch (e) {

                }
            },
            toReserve(batchNo) {
                window.location.href = '/#/bespeak/detail?batchNo=' + batchNo
            },
            tab(index) {
                this.active = index
                this.isAvisible = 'none'
                this.isBvisible = 'none'
                if (index == 0) {
                    index == 0 ? this.isAvisible = 'block' : this.isAvisible = 'none'
                } else if (index == 1) {
                    index == 1 ? this.isBvisible = 'block' : this.isBvisible = 'none'
                }
            },
            getAppindex() {
                this.$store.dispatch({
                    type: 'appindex'
                })
            },
            switchTab() {
                //返回小程序主页
                wx.miniProgram.switchTab({
                    url: '/pages/home/home'
                })
            }
        },
        components: {
            Footers,
            Slider,
            Ad,
            Layer
        }
    }
</script>
