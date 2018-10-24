<template>
    <section class="dola-about-insurance">
        <div class="banner-wrapper">
            <div class="banner"></div>
        </div>
        <div class="description">
            <div class="dola-container-wrapper">
                <p class="text">2017年12月，多啦聚财与众安在线财产保险股份有限公司达成合作，多啦聚财将通过众安保险为平台的投资用户购买“非金融机构网络支付服务责任保险”（简称“账户安全险”），配合多啦聚财平台自身的强大风控体系与保障方式，以此为投资用户的资金安全再添一层保障。在多啦聚财投资的用户，其账户资金操作过程将得到保护，且无需支付任何费用即可享受该项服务。</p>
            </div>
        </div>
        <div class="content-wrapper content-wrapper01">
            <div class="title-wrapper">
                <i class="icon"></i>
                <h3 class="cont-title">众安介绍</h3><i class="icon icon02"></i>
            </div>
            <div class="za-js">
                <i class="za-logo"></i>
                <p class="text">众安在线财产保险股份有限公司，是国内首家互联网保险公司，由蚂蚁金服、腾讯、中国平安等国内知名企业，基于保障和促进整个互联网生态发展的初衷发起设立，并于2013年9月29日获中国保监会同意开业批复。众安保险业务流程全程在线，全国均不设任何分支机构，完全通过互联网进行承保和理赔服务截止至2016年12月31日，众安保险累计销售逾72亿份保单，服务约4.92亿名保单持有人及被保险人，根据Oliver Wyman报告，按此期间的该等指标计，众安保险于中国保险公司中排名第一。</p>
            </div>
            <ul class="js-lists">
                <li class="list list1">
                    <i class="icon"></i>
                    <p class="text">香港联合交易所主板上市，市值超千亿 </p>
                </li>
                <li class="list list2">
                    <i class="icon"></i>
                    <p class="text">累计销售逾72亿份保单,服务约4.92亿人</p>
                </li>
                <li class="list list3">
                    <i class="icon"></i>
                    <p class="text">保险科技第一股，国内首家互联网保险公司</p>
                </li>
            </ul>
        </div>
        <div class="content-wrapper content-wrapper02">
            <div class="title-wrapper">
                <i class="icon"></i>
                <h3 class="cont-title">理赔指引</h3><i class="icon icon02"></i>
            </div>
            <div class="zy-wrapper">
                <dl class="list list1">
                    <dt class="title">理赔申请</dt>
                    <dd class="text">用户在多啦聚财的账户发生保险合同所列理赔情况的，可通过多啦聚财客服或众安官方客服渠道提出理赔申请。（众安客服热线1010-9955或400-999-9595）</dd>
                </dl>
                <dl class="list list2">
                    <dt class="title">提交资料</dt>
                    <dd class="text">多啦聚财协助用户向众安保险提交理赔所需的相关信息及资料。</dd>
                </dl>
                <dl class="list list3">
                    <dt class="title">审核赔款</dt>
                    <dd class="text">众安保险收到理赔资料进行复核，且双方对结果无异议后，在5个工作日内发送赔款至多啦聚财，再由多啦聚财划款至用户的银行账户。</dd>
                </dl>
            </div>
        </div>
        <div class="content-wrapper content-wrapper03">
            <div class="title-wrapper">
                <i class="icon"></i>
                <h3 class="cont-title">保险合同</h3><i class="icon icon02"></i>
            </div>
            <div class="swiper-wrappers" id="insurance_loop">
                <swiper :options="swiperOption" ref="qualificationsSwiper">
                    <swiper-slide>
                        <img src="../../assets/images/app/insurance/za_s1.jpg" class="pro01"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/insurance/za_s2.jpg" class="pro02"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/insurance/za_s3.jpg" class="pro03"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/insurance/za_s4.jpg" class="pro03"/>
                    </swiper-slide>

                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue';
    import VueAwesomeSwiper from 'vue-awesome-swiper';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import TitleBar from '../common/TitleBar.vue'
    Vue.use(VueAwesomeSwiper);

    export default {
        name: 'signature',
        data() {
            return {
                title:'众安保险',
                certificateShow: false,
                stepShow: false,
                swiperOption: {
                    notNextTick: true,
                    watchSlidesProgress: true,
                    slidesPerView: '1',
                    centeredSlides: true,
                    loop: true,
                    speed: 400,
                    loopedSlides: 3,
                    autoplay: true,
                    grabCursor: true,
                    setWrapperSize: true,
                    autoHeight: true,
                    mousewheelControl: true,
                    observeParents: true,
                    navigation: {
                        nextEl: '#insurance_loop .swiper-button-next',
                        prevEl: '#insurance_loop .swiper-button-prev'
                    },
                    on: {
                        progress: function (progress) {
                            for (let i = 0; i < this.slides.length; i++) {
                                let slide = this.slides.eq(i);
                                let slideProgress = this.slides[i].progress;
                                let modify = 1;
                                if (Math.abs(slideProgress) > 1) {
                                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                                }
                                let translate = slideProgress * modify * 90 + 'px';
                                let scale = 1 - Math.abs(slideProgress) / 3;
                                let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                                slide.css('zIndex', zIndex);
                                slide.css('opacity', 1);
                                if (Math.abs(slideProgress) > 1) {
                                    slide.css('opacity', 0);
                                }
                            }
                        },
                        setTransition: function (transition) {
                            for (let i = 0; i < this.slides.length; i++) {
                                let slide = this.slides.eq(i)
                                slide.transition(transition);
                            }

                        }
                    }
                }
            };
        },
        components: {
            swiper,
            swiperSlide,
            TitleBar
        }
    };
</script>
<style scoped>
    @import '../../assets/css/swiper.min.css';

    .dola-about-insurance {
        margin-top: 0 !important;
    }
</style>