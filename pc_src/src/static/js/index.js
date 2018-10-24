
switch (window.location.hostname) {
    case 'www.dola.dev':
        var baseURL = 'https://' + window.location.hostname + '/pc/dev/static/js/modules/';
        var extendURL = '{/}/pc/static/js/';
        break;
    case 'localhost':
        var baseURL = '/static/js/modules/';
        var extendURL = '{/}/static/js/';
        break;
    default:
        var baseURL = 'https://' + window.location.hostname + '/pc/static/js/modules/';
        var extendURL = '{/}/pc/static/js/';
        break;
}

layui.config({
//  dir: 'https://www.dola.dev/pc/dev/libs/layui/',
    base: baseURL
}).extend({
    forms: extendURL + 'forms',
    debtor: extendURL + 'debtor',
    investor: extendURL + 'investor',
    result: extendURL + 'result',
//  home: '{/}./static/js/product/home'
});

layui.use(['jquery', 'layer', 'bank', '$http', 'popup', 'utils', 'path', 'user', 'forms', 'debtor', 'investor', 'result'], function() {
    var $ = layui.jquery;
    var layer = layui.layer;
    var bank = layui.bank;
    var $http = layui.$http;
    var popup = layui.popup;
    var utils = layui.utils;
    var path = layui.path;
    var user = layui.user;
    var forms = layui.forms;
    var debtor = layui.debtor;
    var investor = layui.investor;
    var result = layui.result;

    forms.init(); // 表单
    debtor.init(); // 借款人
    investor.init(); // 出借人
    result.init(); // 结果页

    // 初始化
    init({
        $webNavs: $("#web_navs"),
        $noLogin: $('.js-no-login'), // 未登录
        $isLogin: $('.js-login'), // 已登录
        // 侧边栏导航
        $asideHoverEles: $('.js-aside_hover'),
        asideHoverClass: 'aside-item-hover',
        asideHoverTextEle: '.aside-text',
        asideHoverLeftWidth: '34px',
        asideHoverWidth: '-60px',
        $scrollTopEle: $('#back_top'),
        $onlineServer: $('.js-online_server')
    });

    function init(options) {

        // 是否登录判断
        console.log($.cookie('mobile'));
        var userMobile = $.cookie('mobile');
        var userType = $.cookie('user_type');

        if (userMobile) {
            $("#userLoginMobile").text(userMobile);
        	options.$noLogin.remove();
        	options.$isLogin.show();

        	if (userType === 'BORROWERS') { // 借款人
        		$("#userLoginMobile").attr('href', path.debtorUserCenterUrl);
        	} else {
                $("#userLoginMobile").attr('href', path.investUserCenterUrl);
        	}
        } else {
            options.$isLogin.remove();
            options.$noLogin.show();
        }

        // 退出
        $("#userLoginOut").on('click', function(e) {
            e.preventDefault();

            user.unionLogout({
                mobile: userMobile,
                callback: function(data) {
                    // 清除cookie信息
                    $.cookie('token', null,{ expires: 0, path: '/' });
                    $.cookie('mobile', '',{ expires: 0, path: '/' });
                    $.cookie('user_type', '',{ expires: 0, path: '/' });
                    if (userType === 'BORROWERS') {
                    	window.location.href = path.debtorLoginUrl + encodeURIComponent(window.location.href);
                    } else {
                        window.location.href = path.investLoginUrl + encodeURIComponent(window.location.href);
                    }
                }
            });
        });

        // 我的账户
        var userType = $.cookie('user_type');
        var token = $.cookie('token');
        $("#myHome").on('click', function(e) {
            e.preventDefault();

            if (!token) {
                if (userType === 'BORROWERS') {
                    window.location.href = path.debtorLoginUrl;
                } else {
                    window.location.href = path.investLoginUrl;
                }
            } else {
                if (userType === 'BORROWERS') {
                    $(this).attr('href', path.debtorUserCenterUrl);
                } else {
                    $(this).attr('href', path.investUserCenterUrl);
                }
            }
        });

        // 侧边导航栏hover效果
        options.$asideHoverEles.hover(function() {
            asideAnimate($(this), options.asideHoverClass, options.asideHoverTextEle, options.asideHoverWidth);
        }, function() {
            asideAnimate($(this), options.asideHoverClass, options.asideHoverTextEle, options.asideHoverLeftWidth);
        });

        // 返回顶部按钮显示
        $(window).scroll(function() {
            if ($(window).scrollTop() > 250) {
                options.$scrollTopEle.fadeIn(300);
            } else {
                options.$scrollTopEle.fadeOut(300);
            }
        });

        // 返回底部
        options.$scrollTopEle.on('click', function(e) {
            e.preventDefault();

            scrollTop(1000);
        });

        // 在线客服
        options.$onlineServer.on('click', function(e) {
            e.preventDefault();

            onlineServer();
        });

        // 推荐
        $("#recommend").on('click', function(e) {
            e.preventDefault();

            isLoginPlay('/user/ucenter/invite');
        });

        // 反馈
        $("#feedback").on('click', function(e) {
            e.preventDefault();

            isLoginPlay('/feedback');
        });
    };

    /*
     * 主导航状态
     */
    function webNavStatus(navEle, index, className) {
        navEle.children("li").eq(index).addClass(className).siblings('li').removeClass(className);
    }

    /*
     * 侧边栏弹出效果
     * @param {object} hoverEle: 需要移动的元素
     * @param {string} addHoverClass: 添加的样式
     * @param {string} hoverEleClass: 移动的元素
     * @param {string} hoverLeft: 移动的距离
     */
    function asideAnimate(hoverEle, addHoverClass, hoverEleClass, hoverLeft) {
        if (!hoverEle.hasClass(addHoverClass)) {
            hoverEle.addClass(addHoverClass).find(hoverEleClass).animate({
                'left': hoverLeft
            });
        } else {
            hoverEle.removeClass(addHoverClass).find(hoverEleClass).animate({
                'left': hoverLeft
            });
        }
    }

    /*
     * 回到顶部
     * @param {string} scrollTime: 回到顶部所需的时间
     */
    function scrollTop(scrollTime) {
        $('body, html').animate({
            scrollTop: 0
        }, scrollTime);
    }

    /*
     * 在线客服弹窗
     */
    function onlineServer() {
        window.open('/about/online_service', '_bank', 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400,left=500px,top=200px');
//      layer.open({
//          type: 2,
//          content: ['/about/online_service', 'no'],
//          title: '在线客服',
//          area: ['400px', '400px'],
//          maxmin: true
//      });
    }

    /*
     * 未登录: 弹窗提示登录
     * 已登录: 跳转对应页面
     */
    function isLoginPlay(redirectUrl) {
        if (utils.getCookie('token')) {
            // 打开反馈页面
            window.location.href = redirectUrl;
        } else {
            // 提示
            layer.open({
                type: 1,
                skin: "dl-login-tip-layer",
                content: "<p class='text'>请登录之后操作!</p>",
                title: "温馨提示",
                offset: "20%",
                area: ['400px'],
                resize: false,
                move: false
            });
        }
    };



    // wating
    if (utils.isPage('/result/wating.html')) {
        layui.use(['util', 'path', 'utils'], function() {
            var util = layui.util;
            var path = layui.path;
            var utils = layui.utils;

            var time = utils.getQueryString('time') * 1;
            time = time ? time : 10;
            var locationURL = window.location.href;
            var callbackURL = locationURL.split('callback')[1].substr(1);

            utils.cuntDown('#cuntTime', time, function(times) {
                if (times <= 0 ) {
                    window.location.href = callbackURL;
                    return;
                }
                layui.$("#cuntTime").text(times);
            });
        });
    }

});
