<template>
    <section class="dola-information-record">
        <div class="title-wrapper">
            <h5 class="title">上饶银行存管</h5>
        </div>
        <div class="flow boxsiz">
            <dl class="clr">
                <dd class="curr">
                    <p>筛选银行</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>对接沟通</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>银行尽调</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>存管签约</p>
                    <i></i>
                    <b class="vertica"></b>
                </dd>
            </dl>
            <dl class="clr">
                <dd>
                </dd>
                <dd class="curr">
                    <p>正式上线</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>联调测试</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>系统开发</p>
                    <i></i>
                </dd>
            </dl>
        </div>
        <div class="title-wrapper">
            <h5 class="title">信息安全</h5>
        </div>
        <div class="flow boxsiz">
            <dl class="clr">
                <dd class="curr">
                    <p>SSL安全链接</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>电子合同</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>合同存证</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>信息加密</p>
                    <i></i>
                </dd>
            </dl>
            <dl class="clr">
                <dd>
                </dd>
                <dd class="curr">
                    <p>等保测评</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>软著证书</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd class="curr">
                    <p>异地灾备</p>
                    <i></i>
                </dd>
            </dl>
        </div>
        <div class="title-wrapper">
            <h5 class="title">备案进程</h5>
        </div>
        <div class="flow boxsiz">
            <dl class="clr">
                <dd class="curr">
                    <p>准备资料</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd>
                    <p>提交资料</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd>
                    <p>等待审核</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd>
                    <p>完成备案</p>
                    <i></i>
                </dd>
            </dl>
        </div>
        <div class="title-wrapper">
            <h5 class="title">电信许可证</h5>
        </div>
        <div class="flow boxsiz">
            <dl class="clr">
                <dd class="curr">
                    <p>准备资料</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd>
                    <p>提交资料</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd>
                    <p>等待审核</p>
                    <i></i>
                    <b class="line"></b>
                </dd>
                <dd>
                    <p>提交资料</p>
                    <i></i>
                </dd>
            </dl>
        </div>
        <div class="title-wrapper">
            <h5 class="title">网站信息</h5>
        </div>
        <div class="bottom clr">
            <dl class="wrap">
               <dd>
                   <label>网站名称</label>
                   <span>多啦聚财</span>
               </dd>
                <dd>
                    <label>网站域名</label>
                    <span>www.dolabank.com</span>
                </dd>
                <dd>
                    <label>开办主体</label>
                    <span>企业单位</span>
                </dd>
                <dd>
                    <label>网站类别</label>
                    <span>交互式</span>
                </dd>
                <dd>
                    <label style="margin-right: 25px">开办者名称</label>
                    <span>深圳嘉银普惠科技有限公司</span>
                </dd>
                <dd>
                    <label>公安机关核发的网站备案图标及编号----待披露</label>
                </dd>
            </dl>
            <div class="wrap" style="background: #fff;text-align: right">
                <img src="../../assets/images/app/promise.png">
            </div>
        </div>
    </section>
</template>
<script>

    import Vue from 'vue'
    import {Swipe, SwipeItem} from 'mint-ui';
    import TitleBar from '../common/TitleBar.vue'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'information-audit',
        data() {
            return {
                title:'备案信息'
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/information.css";
</style>