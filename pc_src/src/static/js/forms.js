layui.define(['form', 'util', 'user', 'path', 'utils', 'bank', 'popup', 'validate'], function(exports) {
    var form = layui.form;
    var util = layui.util;
    var user = layui.user;
    var path = layui.path;
    var utils = layui.utils;
    var bank = layui.bank;
    var popup = layui.popup;
    var validate = layui.validate;

    /*
     * 登录
     * userTel { string } 手机号
     * userPass { string } 密码
     * userType { number } 用户类型  1--出借人  2--借款人
     * userTypeStr { string } 存储登录角色类型
     * userCenterPath { string } 用户跳转
     */
    function dl_login(options) {
        var forwardurl = utils.getQueryString('forwardurl');

        user.unionLogin({
            mobile: options.userTel,
            password: options.userPass,
            userType: options.userType,
            callback: function(data) {
                $.cookie('token', data.token, {path: '/'});
                $.cookie('mobile', data.mobile, {path: '/'});
                $.cookie('user_type', options.userTypeStr, {path: '/'});

                if (forwardurl) {
                    window.location.href = decodeURIComponent(forwardurl);
                } else {
                    window.location.href = options.userCenterPath;
                }

            }
        });
    };

    /*
     * 获取图形验证码
     * $imgEl { object } 图形验证码dom
     * $codeEl { object } 图形验证码密码dom
     */
    function getImgCode($imgEl, $codeEl) {
        user.unionGetPictureCode({
            callback: function(data) {

                $imgEl.empty().append(data.image);
                $codeEl.val(data.time);
            }
        });
    };

    /*
     * 获取手机验证码
     * $tipEl { object } 错误提示dom
     * userTel { string } 手机号
     * imgCode { string } 图形验证码
     * imgCodeName { number } 图形验证码名称
     * transactionType { string } 用途
     */
    function getTelCode(options) {
        if (!options.userTel) {
        	options.$tipEl.show().text('请填写手机号!');
        	return false;
        } else if (options.userTel.length < 11 || !/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(options.userTel)) {
        	options.$tipEl.show().text('手机号输入错误，请重新输入!');
        	return false;
        } else if (!options.imgCode) {
        	options.$tipEl.show().text('请填写图形验证码!');
        } else {
            options.$tipEl.hide();

            user.getUnionSendAuthCode({
                mobile: options.userTel,
                transactionType: options.transactionType,
                captchaMode: options.imgCode,
                captchaName: options.imgCodeName,
                callback: function(data) {
                    layer.msg('发送成功！');

                    // 倒计时
                    utils.cuntDown(options.cuntdownSelect, 60);
                }
            });
        }
    };

    /*
     * 注册
     * protocol { string } 协议
     * userPass { string } 密码
     * $tipEl { object } 提示dom
     * userTel { string } 手机号
     * msgCode { string } 验证码
     * transactionType { string } 场景类型
     * userType { number } 注册类型 1--投资人 2--借款人
     * mechanismCode { string } 机构代码 为2时必填
     * channelKeyword { string } 渠道代码
     * inviteCode { number } 邀请码
     * userTypeStr { string } 注册用户类型
     */
    function dl_register(options) {
        var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

        if (!options.protocol) {
        	options.$tipEl.show().text('请认真阅读并同意协议!');
        	return false;
        } else if (!passReg.test(options.userPass)) {
        	options.$tipEl.show().text('密码为8-16位字母与数字的组合!');
            return false;
        } else {
            options.$tipEl.hide();

            user.unionRegister({
                mobile: options.userTel,
                password: options.userPass,
                authCode: options.msgCode,
                transactionType: options.transactionType,
                userType: options.userType,
                organizationCode: options.mechanismCode,
                channelKeyword: options.channelKeyword,
                actKeyword: options.actKeyword,
                inviteCode: options.inviteCode,
                inviteMobile: options.inviteMobile,
                callback: function(data) {
                    console.log(data);
                    // token和mobile写入token
                    $.cookie('token', data.token, {path: '/'});
                    $.cookie('mobile', data.mobile, {path: '/'});
                    $.cookie('user_type', options.userTypeStr, {path: '/'});
                    window.location.href = path.registerSuccessUrl + '?user_type=' + options.userTypeStr;
                }
            });
        }

    };

    exports('forms', {
        init: function() {

            if (utils.isPage('/form/investor_register.html')) { // 投资人--注册
                this.investorRegisterPage();
            }

            if (utils.isPage('/form/investor_login.html')) { // 投资人--登录
                this.investorLoginPage();
            }

            if (utils.isPage('/form/debtor_register.html')) { // 借款人--注册
                this.debtorRegisterPage();
            }

            if (utils.isPage('/form/debtor_login.html')) { // 借款人--登录
                this.debtorLoginPage();
            }

            if (utils.isPage('/form/forget_pass.html')) { // 找回密码
                this.forgetPassPage();
            }



            if (utils.isPage('/form/open_bank.html')) { // 开通银行存管
                this.openBankPage();
            }

        },
        investorRegisterPage: function() {
            // 是否邀请
            var inviteCode = utils.getQueryString('invite_code');
            var inviteMobile = utils.getQueryString('invite_mobile');
            var channel = utils.getQueryString('channel');

            if (inviteCode) {
                $.cookie('inviteCode', inviteCode, {path: '/'});
            }
            if (inviteMobile) {
                $.cookie('inviteMobile', inviteMobile, {path: '/'});
            }
            if (channel) {
                $.cookie('channel', channel, {path: '/'});
            }

            if (inviteMobile || $.cookie('inviteMobile')) {
                $("#invetFriendInput").val($.cookie('inviteMobile')).attr('disabled', true);
            }

            // 获取图形验证码
            var $imgCodeSrc = $("#imgCodeSrc");
            var $imgCodeName = $("#imgCodeName");
            getImgCode($imgCodeSrc, $imgCodeName);

            $imgCodeSrc.on('click', function(e) {
                e.preventDefault();

                getImgCode($(this), $imgCodeName);
            });

            // 获取手机验证码
            $("#getCode").on('click', function(e) {
                e.preventDefault();

                getTelCode({
                    $tipEl: $("#formTip"),
                    userTel: $("#userMobile").val(),
                    imgCode: $("#imgCode").val(),
                    imgCodeName: $imgCodeName.val(),
                    transactionType: 'register',
                    cuntdownSelect: '#getCode'
                });

            });

            // 邀请人切换
            $("#invetFriend").on('click', function(e) {
                e.preventDefault();

                $("#invetFriendInput").slideToggle();
            });

            // 注册
            form.on('submit(registerForm)', function(data) {
                var inputParams = data.field;

                dl_register({
                    $tipEl: $("#formTip"),
                    protocol: inputParams.proprotol,
                    userPass: inputParams.user_pass,
                    userTel: inputParams.user_tel,
                    msgCode: inputParams.msg_code,
                    transactionType: 'register',
                    userType: 1,
                    channelKeyword: $.cookie('channel'),
                    invetCode: $.cookie('inviteCode'),
                    userTypeStr: 'INVESTOR'
                });

                return false;
            });
        },
        investorLoginPage: function() {
            // 登录
            form.on('submit(registerLogin)', function(data) {
                var inputParams = data.field;

                dl_login({
                    userTel: inputParams.user_tel,
                    userPass: inputParams.user_pass,
                    userType: 1,
                    userTypeStr: 'INVESTOR',
                    userCenterPath: path.investUserCenterUrl
                });

                return false;
            });
        },
        debtorRegisterPage: function() {
            // 获取图形验证码
            var $imgCodeSrc = $("#imgCodeSrc");
            var $imgCodeName = $("#imgCodeName");
            getImgCode($imgCodeSrc, $imgCodeName);

            $imgCodeSrc.on('click', function(e) {
                e.preventDefault();

                getImgCode($(this), $imgCodeName);
            });

            // 获取手机验证码
            $("#getCode").on('click', function(e) {
                e.preventDefault();

                getTelCode({
                    $tipEl: $("#formTip"),
                    userTel: $("#userMobile").val(),
                    imgCode: $("#imgCode").val(),
                    imgCodeName: $imgCodeName.val(),
                    transactionType: 'register',
                    cuntdownSelect: '#getCode'
                });

            });

            // 注册
            form.on('submit(registerForm)', function(data) {
                var inputParams = data.field;

                dl_register({
                    $tipEl: $("#formTip"),
                    protocol: inputParams.proprotol,
                    userPass: inputParams.user_pass,
                    userTel: inputParams.user_tel,
                    msgCode: inputParams.msg_code,
                    transactionType: 'register',
                    userType: 2,
                    mechanismCode: inputParams.mechanism_code,
                    userTypeStr: 'BORROWERS'
                });

                return false;
            });
        },
        debtorLoginPage: function() {
            form.on('submit(registerLogin)', function(data) {
                var inputParams = data.field;

                dl_login({
                    userTel: inputParams.user_tel,
                    userPass: inputParams.user_pass,
                    userType: 2,
                    userTypeStr: 'BORROWERS',
                    userCenterPath: path.debtorUserCenterUrl
                });

                return false;
            });
        },
        forgetPassPage: function() {
            // 获取图形验证码
            var $imgCodeSrc = $("#imgCodeSrc");
            var $imgCodeName = $("#imgCodeName");
            getImgCode($imgCodeSrc, $imgCodeName);

            $imgCodeSrc.on('click', function(e) {
                e.preventDefault();

                getImgCode($(this), $imgCodeName);
            });

            // 获取手机验证码
            $("#getCode").on('click', function(e) {
                e.preventDefault();

                getTelCode({
                    $tipEl: $("#formTip"),
                    userTel: $("#userMobile").val(),
                    imgCode: $("#imgCode").val(),
                    imgCodeName: $imgCodeName.val(),
                    transactionType: 'find_password'
                });

            });

            // 找回新密码
            form.on('submit(forgetpassForm)', function(data) {
                var inputData = data.field;
                var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

                if (!passReg.test(inputData.user_new_pass)) {
                    layer.msg('密码为8-16位字母与数字的组合!');
                    return false;
                } else {
                    var userType = utils.getQueryString('user_type');

                    user.unionFindPassword({
                        mobile: inputData.user_tel,
                        authCode: inputData.user_tel_code,
                        newPassword: inputData.user_new_pass,
                        newPasswordRe: inputData.user_new_pass_re,
                        callback: function(data) {
                            window.location.href = path.forgetPassSuccess + '?user_type=' + userType;
                        }
                    });
                }


                return false;
            });
        },
        openBankPage: function() {
            // 查看充值限额
            $("#checkBankLimit").on('click', function(e) {
                e.preventDefault();
                popup.bankListLayer();
            });

            // 银行选择
            bank.getBankList({
                callback: function(data) {

                    if (data.length > 0) {
                        var bankSelectListHtml = '<option value="">请选择开户银行</option>';

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].order > 0) {
                                bankSelectListHtml += '<option value="' + data[i].name + '" data-limit="' + data[i].bankLimit + '">' + data[i].name + '</option>';

                            }
                        }

                        $('#selectBank').empty().append(bankSelectListHtml);

                        form.render('select');
                    }
                }
            });

            var $formTip = $("#formTip");
            var $userName = $("#userName");
            var $userID = $("#userID");
            var $selectBank = $("#selectBank");
            var $userCardNo = $("#userCardNo");
            var $userBankTel = $("#userBankTel");
            var $openBankBtn = $("#openBankBtn");

            // 验证姓名
            $userName.on('blur', function(e) {
                e.preventDefault();

                var userName = $(this).val();

                if (!userName) {
                    errorTip($formTip, '请输入真实姓名！');

                    return false;
                } else if (!validate.isChinaName(userName)) {
                    errorTip($formTip, '输入的姓名有误！');

                    return false;
                } else {
                    $formTip.hide();
                }
            });

            // 验证身份证号
            $userID.on('blur', function(e) {
                e.preventDefault();

                var userID = $(this).val();

                if (!userID) {
                    errorTip($formTip, '请输入身份证号！');

                    return false;
                } else if (!validate.isIdCard(userID)) {
                    errorTip($formTip, '输入的身份证号有误！');

                    return false;
                } else {
                    $formTip.hide();
                }
            });

            // 验证银行卡号
            $userCardNo.on('blur', function(e) {
                e.preventDefault();

                var userCardNo = $(this).val();

                if (!userCardNo) {
                    errorTip($formTip, '请输入银行卡号！');

                    return false;
                } else if (!validate.isBankCard(userCardNo)) {
                    errorTip($formTip, '输入的银行卡号有误！');

                    return false;
                } else {
                    $formTip.hide();
                }
            });

            // 验证手机号
            $userBankTel.on('blur', function(e) {
                e.preventDefault();

                var userBankTel = $(this).val();

                if (!userBankTel) {
                    errorTip($formTip, '请输入银行预留手机号！');

                    return false;
                } else if (!validate.isTel(userBankTel)) {
                    errorTip($formTip, '输入的银行预留手机号有误！');

                    return false;
                } else {
                    $formTip.hide();
                }
            });

            $userName.on('input', function(e) {
                e.preventDefault();
                isValidateSuceess();
            });
            $userID.on('input', function(e) {
                e.preventDefault();
                isValidateSuceess();
            });
            $userCardNo.on('input', function(e) {
                e.preventDefault();
                isValidateSuceess();
            });
            $userBankTel.on('input', function(e) {
                e.preventDefault();
                isValidateSuceess();
            });
            form.on('select(bankSelect)', function(data){
                var selectBankName = data.value;
                var selectDom = data.elem;
                var limitArr = [];

                if (selectBankName) {
                    for (var i = 0; i< selectDom.length; i++) {

                        if ($(selectDom[i]).val() === selectBankName) {
                            limitArr = $(selectDom[i]).data('limit').split('/');
                        }

                    }

                    if (limitArr.length>1) {
                        $("#bankLimitInfo").show().text('快捷支付限额：单笔'+limitArr[0]+'，单日'+limitArr[1]);
                    } else {
                        $("#bankLimitInfo").show().text('快捷支付限额：单笔'+limitArr[0]+'，单日'+limitArr[0]);
                    }


                    isValidateSuceess();
                } else {
                    $("#bankLimitInfo").hide()
                }
            });

            // 提交
            form.on('submit(openBnak)', function(data) {
                console.log(data);
                var inputData = data.field;
                var userName = inputData.user_name;
                var userID = inputData.user_id;
                var userCardNo = inputData.user_bank_card_no;
                var userBankTel = inputData.user_bank_tel;
                var selectBank = inputData.bank_name;

                if (!userName) {
                    errorTip($formTip, '请输入真实姓名！');

                    return false;
                } else if (!validate.isChinaName(userName)) {
                    errorTip($formTip, '输入的姓名有误！');

                    return false;
                } else if (!userID) {
                    errorTip($formTip, '请输入身份证号！');

                    return false;
                } else if (!validate.isIdCard(userID)) {
                    errorTip($formTip, '输入的身份证号有误！');

                    return false;
                } else if (!selectBank) {
                    errorTip($formTip, '请选择开户银行！');

                    return false;
                } else if (!userCardNo) {
                    errorTip($formTip, '请输入银行卡号！');

                    return false;
                } else if (!validate.isBankCard(userCardNo)) {
                    errorTip($formTip, '输入的银行卡号有误！');

                    return false;
                } else if (!userBankTel) {
                    errorTip($formTip, '请输入银行预留手机号！');

                    return false;
                } else if (!validate.isTel(userBankTel)) {
                    errorTip($formTip, '输入的银行预留手机号有误！');

                    return false;
                } else {
                    var redirectUrl = path.openBankRedirectUrl + path.openBankSuccessUrl;
                    userRole = $.cookie('user_type');
                    // 验证通过
                    bank.openBank({
                        redirectUrl: redirectUrl,
                        userRole: userRole,
                        realName: userName,
                        idCardNo: userID,
                        bankcardNo: userCardNo,
                        mobile: userBankTel
                    });
                }

                return false;
            });


            function errorTip($el, msg) {
                $el.show().text(msg);
            };

            function isValidateSuceess(){
                var userName = $userName.val();
                var userID = $userID.val();
                var userCardNo = $userCardNo.val();
                var userBankTel = $userBankTel.val();
                var selectBank = $selectBank.val();

                if (userName && userID && userCardNo && userBankTel && selectBank) {
                    $openBankBtn.removeClass('disabled').attr('disabled', false);
                } else {
                    $openBankBtn.addClass('disabled').attr('disabled', true);
                }
            }
        },
    });
});
