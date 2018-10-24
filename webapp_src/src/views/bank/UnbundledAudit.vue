<template>
    <section class="unbundling">
        <TitleBar :title="title"></TitleBar>
        <div class="head-tip boxsiz">为保障您的资金安全，请在验证身份后进行下一步操作。</div>
        <div class="unbundling-content boxsiz">
            <template v-if="imgSrc == ''">
                <div class="unbundling-upload">
                    <div class="unbundling-upload-wrap">
                        <input accept="image/*" name="upimage" type="file" v-on:change="upload(1)" id="upload_file"/>
                        <div class="circle">
                            <i class="lineBlock"></i>
                        </div>
                        <p class="t1">请上传手持身份证及银行卡照片</p>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="unbundling-upload-pic">
                    <img :src="imgSrc" alt="">
                    <div class="modify">修改<input type="file" name="modify-upload" v-on:change="upload(2)" id="upload_file_modify"></div>
                </div>
            </template>
        </div>
        <div class="unbundling-text boxsiz lbBox clr">
            <div class="l lineBlock boxsiz">
                <p class="t1">照片要求：</p>
                <p class="t2">1. 请正面手持身份证及银行卡拍照；</p>
                <p class="t2">2. 照片上人脸、身份证头像及号码、银行卡卡号需清晰可见，请勿使用软件涂抹；</p>
                <p class="t2">3. 支持jpg/jpeg/bmp/png格式，最大不超过5M。</p>
            </div>
            <div class="r lineBlock boxsiz">
                <img src="../../assets/images/app/bank/bank-1.jpg" alt="">
                <p>查看示例</p>
            </div>
        </div>
        <div class="unbundling-form boxsiz">
            <a href="javascript:;" class="btn btn-end" @click="submit()">提交</a>
        </div>
        <!--审核弹出框-->
        <div v-show="layer_flag">
            <div class="bank-layer-content" ref="audit">
                <i class="icn success"></i>
                <div class="text">
                    <p class="t1">提交成功，平台将在1-2个工作日内审核</p>
                    <p class="t2">（审核期间，不可申请提现）</p>
                    <p class="t3">审核通过：您可以绑定新的银行卡<br/>审核失败：您需要重新提交审核，或保留原银行卡</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Util from '../../util/index'
    import {Indicator, MessageBox, Toast} from 'mint-ui';
    import {services as Services} from '../../api/index'
    import TitleBar from '../common/TitleBar.vue'


    export default {
        name: 'UnbundledAudit',
        data() {
            return {
                title: '审核银行卡',
                imgSrc: '',
                layer_flag: false
            }
        },
        methods: {
            upload(type) {
                var me = this;
                var fileReader = new FileReader();
                if (type == 1) {
                    var file = document.querySelector('#upload_file').files[0];
                } else if (type == 2) {
                    var file = document.querySelector('#upload_file_modify').files[0];
                }
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    var url = fileReader.result;
                    me.imgSrc = url;
                }
            },
            submit() {
                if (this.imgSrc == '') {
                    let instance = Toast({
                        message: '请上传图片',
                        duration: 2000
                    });
                } else {
                    var url = this.imgSrc.split(',');
                    let Codekey = Util.getRrandomStr();
                    let token = Util.getCookie('token');
                    var paramsdata = {
                        imgbase64: url[1],
                        type: 'jpg'
                    };
                    Indicator.open({
                        text: '处理中...',
                        spinnerType: 'triple-bounce'
                    });
                    let params = Util.getParams('wechat', token, paramsdata);
                    params = Util.encryption(Codekey, params, 'code');
                    Services.unbindBankcardApply(Codekey, params).then((res) => {
                        var key = res.headers['x-dola-edoc'];
                        var data = res.data;
                        var str = Util.decrypt(key, data, 'code')
                        var data = JSON.parse(str);
                        console.log(data)
                        if (data.code == 0) {
                            Indicator.close();
                            MessageBox({
                                title: '',
                                message: this.$refs.audit.outerHTML,
                                showConfirmButton: true,
                                showCancelButton: false,
                                confirmButtonClass: 'bank-btn-confirm'
                            }).then(action => {
                                if (action == 'confirm') {
                                    this.$router.push({path: '/bank/info'});
                                }
                            });
                        } else {
                            Indicator.close();
                            let instance = Toast({
                                message: data.msg,
                                duration: 1500
                            });
                        }
                    }).catch(function (err) {
                        Indicator.close();
                        Toast({
                            message: '网络出现问题，请重试',
                            duration: 1500
                        });
                    })
                }
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/bank.css";
    .unbundling{
        padding-top: 44px;
    }
</style>
