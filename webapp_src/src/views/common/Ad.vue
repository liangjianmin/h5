<template>
    <section class="dola-ad-down boxsiz" v-if="flag">
        <div class="dola-ad-down-wrap clr">
            <div class="fl l">
                <i class="close lineBlock va-m" @click="close()"></i>
                <i class="logo lineBlock va-m"></i>
                <div class="text lineBlock va-m">
                    <p class="t1">下载多啦聚财APP</p>
                    <p class="t2">随时随地 畅享收益</p>
                </div>
            </div>
            <a class="fr down" @click="close()" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jyph.dolabank">下载</a>
        </div>
    </section>
</template>

<script>
    import Util from '../../util/index'

    export default {
        name: 'slide',
        data() {
            return {
                flag: true,
                userAgent: ''
            }
        },
        created() {
            if (Util.getCookie('dolaad')) {
                this.flag = false;
            }
        },
        methods: {
            close() {
                this.flag = false;
                if (Util.getCookie('dolaad') == '') {
                    Util.delCookie('dolaad');
                    Util.setCookie('dolaad', true, 1, 1);
                } else {
                    this.flag = false;
                }
            }
        }
    }
</script>
