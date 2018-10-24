<template>
    <section class="dola-information-page dola-info-risk">
        <div class="infomation-page-banner infomation-page-banner-im1"></div>
        <div class="info-risk-content-wrapper">
            <div class="info-risk-cont info-risk-cont0">
                <p class="info-risk-text">引入权威的VeriSign SSL数据传输加密技术技术以及阿里云Web应用防火墙、DDOS高防IP、态势感知等技术全方位多终端的对平台数据及用户信息进行保护，网站安全级别同天猫、淘宝等大型电商、信息交流网站。自平台运营 至今，未发生过一起用户信息与资金泄露等问题。</p>
            </div>
            <div class="info-risk-cont info-risk-cont01">
                <div class="img">
                    <img src="../../assets/images/app/information/sa-2.png" class="im"/>
                </div>
                <h3 class="info-risk-tit">信息安全</h3>
                <p class="info-risk-text">采用阿里云服务，具备低成本、高弹性、高可用、安全合规的特性。</p><br/>
                <p class="info-risk-text">(1) 物理集群、容器集群并用，不同服务不同方式，动态提高并发访问，稳定核心操作；</p><br/>
                <p class="info-risk-text">(2) 300GB 抗 DDos；</p><br/>
                <p class="info-risk-text">(3) 接入阿里云WAF服务，拒绝恶意访问，保证用户数据安全。</p><br/>
                <p class="info-risk-text">(4) 对外端口限制：仅开放2个WEB端口用户常规访问，拒绝恶意漏洞扫描。</p>
            </div>
            <div class="info-risk-cont info-risk-cont02">
                <div class="img">
                    <img src="../../assets/images/app/information/sa-3.png" class="im"/>
                </div>
                <h3 class="info-risk-tit">权限管理</h3>
                <p class="info-risk-text">(1) 多啦聚财严格遵守国家相关法律法规，对用户的隐私信息进行严格的保护。</p>
                <p class="info-risk-text">(2) 由技术工程师采用大型电子商务平台最先进加密技术对用户的注册信息、账户收支信息进行加密处理，防止被不法分子窃取信息。</p>
                <p class="info-risk-text">(3) 多啦聚财设有严格的安全管理系统，未经允许任何人不可获取您的相关信息，否则按照国家相关法规执行。</p>
                <p class="info-risk-text">(4) 多啦聚财不会将您的账户信息、银行信息以任何形式透露给第三方。在此声明 ： 在任何情况下，不会使用邮件、短信、QQ、电话等任何方式套取客户多啦聚财账号、密码和身份证等相关信息。如果您需更改您的账户信息，请通过登陆多啦聚财平台用户中心来更改您的账户信息和个人相关资料。</p>
            </div>
            <div class="info-risk-cont info-risk-cont03">
                <div class="img">
                    <img src="../../assets/images/app/information/sa-4.png" class="im"/>
                </div>
                <h3 class="info-risk-tit">权限管理</h3>
                <p class="info-risk-text">SSL(Secure Socket Layer)，为Netscape所研发，用以保障在Internet上数据传输之安全，利用数据加密(Encryption)技术，可确保数据在网络上之传输过程中不会被截取及窃听。服务内容</p>
                <p class="info-risk-text">(1) 认证用户和服务器，确保数据发送到正确的客户机和服务器；</p>
                <p class="info-risk-text">(2) 加密数据以防止数据中途被窃取；</p>
                <p class="info-risk-text">(3) 维护数据的完整性，确保数据在传输过程中不被改变。</p>
            </div>
            <div class="info-risk-cont info-risk-cont02">
                <h3 class="info-risk-tit">信息安全认证</h3>
                <p class="info-risk-text">为更好的保护用户的信息安全及根据监管要求，多啦聚财聘请具有专业资质的外部测试认证机构：深圳市网安计算机安全监测技术有限公司，对平台的信息安全实施测评认证，以充分保障出借人的交易及信息安全。</p>
                <div class="swiper-wrappers" id="introduce_loop">
                    <swiper :options="swiperOption" ref="qualificationsSwiper">
                        <swiper-slide>
                            <img src="../../assets/images/app/xin-1.jpg" class="pro01 imgss"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/xin-2.jpg" class="pro02 imgss"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/xin-3.jpg" class="pro02 imgss"/>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                    <div class="swiper-pagination" slot="pagination"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue';
    import VueAwesomeSwiper from 'vue-awesome-swiper';
    import TitleBar from '../common/TitleBar.vue'
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    Vue.use(VueAwesomeSwiper);

    export default {
        name: 'information-risk-manage',
        data() {
            return {
                title: "信息安全",
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
                        nextEl: '#introduce_loop .swiper-button-next',
                        prevEl: '#introduce_loop .swiper-button-prev'
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
                },
                swiperBzOption: {
                    speed: 400,
                    pagination: {
                        el: '#bz_swiper .swiper-pagination'
                    },
                    navigation: {
                        nextEl: '#bz_swiper .swiper-button-next',
                        prevEl: '#bz_swiper .swiper-button-prev'
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.qualificationsSwiper.swiper
            }
        },
        components: {
            swiper,
            swiperSlide,
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";
    @import '../../assets/css/swiper.min.css';
    .im {
        width: 3.3rem !important;
        height: 3.3rem !important;
    }
    .imgss{
        display: block;
        width: 4.773rem;
        margin: 0 auto;
    }
</style>