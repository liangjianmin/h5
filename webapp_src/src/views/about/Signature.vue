<template>
    <section class="dola-about-signature">
        <AboutNav :type="3"></AboutNav>
        <div class="banner-wrapper">
            <div class="banner"></div>
        </div>
        <div class="content-wrapper content-wrapper01">
            <div class="title-wrapper">
                <h3 class="cont-title"><img src="../../assets/images/app/signature/t01.png" class="t1"/></h3>
            </div>
            <p class="text">为推进平台的安全合规进程，多啦聚财与深圳法大大网络科技有限公司（以下简称“法大大”）达成合作，为多啦聚财及其用户提供电子合同签章及合同托管服务。</p>
            <div class="sz-zs"><span @click="showCertificate">数字证书</span></div>
        </div>
        <div class="content-wrapper content-wrapper02">
            <div class="title-wrapper">
                <h3 class="cont-title"><img src="../../assets/images/app/signature/t02.png" class="t1"/></h3>
            </div>
            <ul class="lists">
                <li class="list list1">
                    <i class="icon"></i>
                    <dl>
                        <dt>便捷高效</dt>
                        <dd>云端储存技术，随时调用、查验、管理已签署的电子文件，实现证据托管</dd>
                    </dl>
                </li>
                <li class="list list2">
                    <i class="icon"></i>
                    <dl>
                        <dt>合法合规</dt>
                        <dd>实名认证技术、电子数字签名技术、时间戳、防篡改技术电子合同法律效力获得仲裁/司法机构认可</dd>
                    </dl>
                </li>
                <li class="list list3">
                    <i class="icon"></i>
                    <dl>
                        <dt>安全稳定</dt>
                        <dd>领先的信息运维机制严守数据安全；数据传输军用级别加密防止信息泄露</dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="content-wrapper content-wrapper03">
            <img src="../../assets/images/app/signature/f-logo.png" alt="" class="f-logo"/>
            <div class="title-wrapper">
                <h3 class="cont-title"><img src="../../assets/images/app/signature/t03.png" class="t1"/></h3>
            </div>
            <p class="text">法大大是国内首个获得司法/仲裁机构认可的第三方电子合同平台。</p>
            <p class="text">主要为金融、保险、第三方支付、线上交易平台等行业及政府机构提供电子合同、电子文件签署及存证服务，同时整合提供司法鉴定、网络仲裁和律师服务。</p>
            <p class="text">目前已通过ISO27001安全认证并获得众安保险承保。</p>
        </div>
        <div class="content-wrapper content-wrapper04">
            <div class="title-wrapper">
                <h3 class="cont-title"><img src="../../assets/images/app/signature/t04.png" class="t1"/></h3>
            </div>
            <div class="swiper-wrappers" id="introduce_loop">
                <swiper :options="swiperOption" ref="qualificationsSwiper">
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature21.png" class="pro01"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature22.png" class="pro02"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature23.png" class="pro03"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature24.png" class="pro03"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature25.png" class="pro03"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature26.png" class="pro03"/>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../assets/images/app/signature/signature27.png" class="pro03"/>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
                <div class="swiper-pagination" slot="pagination"></div>
            </div>
        </div>
        <div class="content-wrapper content-wrapper05">
            <div class="title-wrapper">
                <h3 class="cont-title"><img src="../../assets/images/app/signature/t05.png" class="t1"/></h3>
            </div>
            <div class="check">
                <a href="javascript:;" @click="showStep">查看步骤</a>
            </div>
            <p class="desc">温馨提示：若您需要查验电子合同，请登录PC端下载查验，步骤见详情链接：）</p>
            <a href="/#/about/securitybusinessintroduction" class="more-safe-btn">更多安全</a>
        </div>
        <div class="certificate-layer" v-show="certificateShow">
            <div class="content-wrppaer">
                <h5 class="certificate-title">数字证书</h5>
                <p class="text">数字证书是一种权威性的电子文档，它提供了一种在 Internet 上验证身份的方式。 其作用类似于司机的驾驶执照或日常生活中的身份证。 它是由一个由权威机构----CA证书授权(Certificate Authority)中心发行的，人们可以在互联网交往中用它来识别对方的身份. 当然在数字证书认证的过程中，数字证书认证中心（CA）作为权威的、公正的、 可信赖的第三方，其作用是至关重要的。 数字证书也必须具有唯一性和可靠性。</p>
                <a href="javascript:;" @click="showCertificate">确认</a>
            </div>
        </div>
        <div class="step-layer" v-show="stepShow">
            <div class="content-wrapper">
                <p class="text">请按照下图的步骤操作</p>
                <div id="bz_swiper">
                    <swiper :options="swiperBzOption" ref="bzSwiper">
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature21.png" class="pro01"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature22.png" class="pro02"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature23.png" class="pro02"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature24.png" class="pro02"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature25.png" class="pro02"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature26.png" class="pro02"/>
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../assets/images/app/signature/signature27.png" class="pro02"/>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
                <i class="close" @click="showStep"></i>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue';
    import VueAwesomeSwiper from 'vue-awesome-swiper';
    import AboutNav from '../about/AboutNav.vue'

    Vue.use(VueAwesomeSwiper);
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    export default {
        name: 'signature',
        data() {
            return {
                certificateShow: false,
                stepShow: false,
                swiperOption: {
                    notNextTick: true,
                    watchSlidesProgress: true,
                    slidesPerView: 'auto',
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
            };
        },
        computed: {
            swiper() {
                return this.$refs.qualificationsSwiper.swiper
            }
        },
        methods: {
            showCertificate() {
                if (!this.certificateShow) {
                    this.certificateShow = true;
                } else {
                    this.certificateShow = false;
                }
            },
            showStep() {
                if (!this.stepShow) {
                    this.stepShow = true;
                } else {
                    this.stepShow = false;
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            AboutNav
        }
    }
</script>
<style scoped>
    @import '../../assets/css/swiper.min.css';
</style>