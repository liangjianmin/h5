<template>
    <nav class="dola-about-nav  dola-about-nav-more dola-about-nav-fix">
        <a @click="toUrl(index)" v-for="(item,index) in listtext" class="lineBlock" :class="{'curr':type==index}">{{item}}</a>
    </nav>
</template>
<script>
    import $ from 'jquery'
    import {jsAppPropertyFn} from '../../util/appCallback'

    export default {
        name: 'about-nav',
        data() {
            return {
                listtext: ['众安保险','智能风控','保障方式', '电子签章','业务介绍'],
                fixFlag: false,
            }
        },
        props: {
            type: ''
        },
        mounted() {
            var path = this.$route.path;
            if (path == '/about/signature' || path == '/about/securitybusinessintroduction') {
                $(".dola-about-nav-fix").scrollLeft(1300);
            }
        },
        watch: {
            $route(to) {
                if (to.path == '/about/signature' || to.path == '/about/securitybusinessintroduction') {
                    $(".dola-about-nav-fix").scrollLeft(1300);
                }
            }
        },
        methods: {
            toUrl(index) {
               if (index == 0) {
                    this.$router.replace({path: '/about/insurance'});
                    window.jsAppProperty = function () {
                        return jsAppPropertyFn('众安保险');
                    }
                    this.positioning();
                } else if (index == 1) {
                   this.$router.replace({path: '/about/securityriskprocess'});
                   window.jsAppProperty = function () {
                       return jsAppPropertyFn('智能风控');
                   }
                    this.positioning();
                } else if (index == 2) {
                   this.$router.replace({path: '/about/securityriskway'});
                   window.jsAppProperty = function () {
                       return jsAppPropertyFn('保障方式');
                   }
                   this.positioning();
                } else if (index == 3) {
                   this.$router.replace({path: '/about/signature'});
                   window.jsAppProperty = function () {
                       return jsAppPropertyFn('电子签章');
                   }
                }else if(index == 4){
                   this.$router.replace({path: '/about/securitybusinessintroduction'});
                   window.jsAppProperty = function () {
                       return jsAppPropertyFn('业务介绍');
                   }
               }
            },
            positioning() {
                $('html,body').animate({scrollTop: 0}, 1);
                return false;
            }
        }
    }
</script>
