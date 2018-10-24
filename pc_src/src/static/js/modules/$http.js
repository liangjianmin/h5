layui.define(['jquery', 'utils', 'path'], function(exports) {
    var $ = layui.jquery;
    var utils = layui.utils;
    var path = layui.path;

    /**
     * 获取域名
     * @param ''
     * @returns { object }
     * url: { string } 当前域名
     * urlApi: { string } api域名
     */
    function getDomain() {
        var url = '',
            urlApi = ''
        switch (window.location.hostname) {
            case 'www.dolabank.com':
                urlApi = 'https://www.dolabank.com/apigateway/';
                url = 'https://www.dolabank.com/';
                break
            case 'www.dolabank.top':
                urlApi = 'https://api.dolabank.top/';
                url = 'https://www.dolabank.top/';
                break
            case 'www.dolabank.club':
                urlApi = 'https://api.dolabank.club/';
                url = 'https://www.dolabank.club/';
                break
            case 'www.dola.dev':
                urlApi = 'https://api.dola.dev/';
                url = 'https://www.dola.dev/';
                urlApi = 'https://api.dolabank.club/';
                break
            default:
//              urlApi = 'https://www.dolabank.com/apigateway/';
//              url = 'https://www.dolabank.com/';
                urlApi = 'https://api.dolabank.club/';
        }
        return {
            url: url,
            urlApi: urlApi
        }
    }

    var domain = getDomain();

    exports('$http', {
        /**
         * 异步获取数据
         * @param options
         * url: 'v1/appindex'
         * platform: 'pc' 操作平台
         * type: 'get' 请求方式
         * async: 是否异步
         * data: {},
         * beforeSend(xhr): {Function} 请求发送之前的处理函数
         * success: function(data) {}
         */
        ajax: function (options) {
            var that = this;

            var url = options.url || '';
            var platform = options.platform || 'pc';
            var type = options.type || 'get';
            var token = utils.getCookie('token');
            var Codekey = utils.getRrandomStr();
            var paramsdata = options.data;
            var params = utils.getParams(platform, token, paramsdata);
            var noLoading = options.noLoading ? false : true;
            params = utils.encryption(Codekey, params, 'code');
            $.ajax({
                type: type,
                url: domain.urlApi + url,
                async: options.async,
                headers: {
                    "X-Dola-Time": utils.getSeconds(),
                    "X-Dola-ClientID": utils.getGuid(),
                    'X-Dola-Code': Codekey
                },
                data: {
                    data: params
                },
                beforeSend: function(xhr) {
                    if (noLoading) {
                    	layer.load(2);
                    }
                    if (options.beforeSend && typeof options.beforeSend === 'function') {
                        options.beforeSend(xhr);
                    }
                },
                success: function (res, status, xhr) {
                    var key = xhr.getResponseHeader("X-Dola-Edoc");
                    var data = res;
                    var str = utils.decrypt(key, data, 'code');
                    var data = JSON.parse(str);

                    if (options.success && typeof options.success === 'function') {
                        options.success(data);
                    }

                },
                error: function (data) {
                    if (options.error && typeof options.error === "function") {
                        options.error(data);
                    }
                },
                complete: function(xhr, type) {
                    layer.closeAll('loading');
                    if (options.complete && typeof options.complete === 'function') {
                        options.complete(xhr, type);
                    }
                }
            });
        },
        /*
         * 错误处理函数
         * data: data
         */
        errorMsg: function(data) {

            if (data.code === 990003) {
                layer.msg(data.msg, function() {
                    if ((window.location.href).indexOf('debtor_login.html') > 0 || (window.location.href).indexOf('invest_login.html') > 0) {
                    	return false;
                    } else {
                        var userType = $.cookie('user_type');

                        if (userType === 'BORROWERS') {
                            window.location.href = path.debtorLoginUrl + encodeURIComponent(window.location.href);
                        } else {
                            window.location.href = path.investLoginUrl + encodeURIComponent(window.location.href);
                        }

                    }
                });
            } else {
                layer.msg(data.msg);
            }
        }
    });
});