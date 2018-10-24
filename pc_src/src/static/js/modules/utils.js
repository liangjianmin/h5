layui.define(['jquery', 'util'], function (exports) {
	var $ = layui.jquery;
	var util = layui.util;

	exports('utils', {
		/**
		 * 0-10的随机数
		 * @returns {Number}
		 */
		mathRandom: function () {
			return parseInt(10 * Math.random());
		},
		/**
		 * 后退一天
		 * @param data
		 * @returns {string}
		 */
		getPrevDay: function () {
			var d = new Date();
			d = +d - 1000 * 60 * 60 * 24;
			d = new Date(d);
			return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
		},
		/**
		 * 时间戳转换
		 * @param timeStamp
		 * @param type
		 * @returns {string}
		 */
		formatDateTime: function (timeStamp, type) {
			var date = new Date();
			date.setTime(timeStamp * 1000);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			if (type == 1) {
				return y + '-' + m;
			} else if (type == 2) {
				return d + ' ';
			} else {
				return y + '-' + m + '-' + d + ' ';
			}
		},
		/**
		 * 获取cookie
		 * @param name
		 * @returns {*}
		 */
		getCookie: function (name) {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if (name == arr[0]) {
					return arr[1];
				}
			}
			return "";
		},
		/**
		 * 获取时间戳
		 * @returns {number}
		 */
		getSeconds: function () {
			return new Date().getTime();
		},
		/**
		 * 毫秒时间戳.随机数
		 */
		getRrandomTime: function () {
			var d = new Date().getTime();
			var num = "";
			for (var i = 0; i < 5; i++) {
				num += Math.floor(Math.random() * 10);
			}
			return d + '.' + num;
		},
		/**
		 * 随机的16为字符串 X-Dola-Code
		 * @returns {string}
		 */
		getRrandomStr: function () {
			var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			var result = "";
			for (var i = 0; i < 16; i++) {
				var r = Math.floor(Math.random() * 62);
				result += data[r];
			}
			return result;
		},
		/**
		 * 生成36位的uuid
		 * @returns {string}
		 */
		getGuid: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},
		/**
		 *
		 * @param Codekey 加密的key
		 * @param str  加密的str
		 * @param name
		 * @returns {*}
		 */
		encryption: function (Codekey, str, name) {
			if (Codekey) {
				return base64encode(des(Codekey, utf16to8(str), 1, 0, hexToString(name), 1))
			}
		},
		/**
		 *
		 * @param key 解密的key
		 * @param str 解密的str
		 * @param name
		 * @returns {*}
		 */
		decrypt: function (key, str, name) {
			if (key) {
				return Handle(utf8to16(des(key, base64decode(String(str)), 0, 0, hexToString(name), 0)))
			}
		},
		/**
		 *
		 * @param platform 平台标志
		 * @param token 身份验证
		 * @returns {*}
		 */
		getParams: function (platform, token, params) {
			if (platform) {
				var params = {
					platform: 'pc',
					proglang: 'javascript',
					sn: this.getRrandomTime(),
					params: params,
					token: token
				}
				return JSON.stringify(params);
			}
		},
		/**
		 * 金额格式化 4位分割
		 * @param num
		 * @returns {string}
		 */
		toMoney: function (num) {
			var number = new Number(num);
			var str = number.toString();
			var newstr = str.replace(/\d{1,4}(?=(\d{4})+$)/g, function (s) {
				return s + ','
			})
			return newstr;
		},
		/**
		 * 金额正常格式
		 * @param num
		 * @returns {string|*}
		 */
		toMoneyNormal: function (num) {
			num = num.toFixed(2);
			num = parseFloat(num)
			num = num.toLocaleString();
			return num;
		},
		/**
		 * 获取链接参数
		 * @param name
		 * @returns { string }
		 */
		getQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			var q = window.location.pathname.substr(1).match(reg_rewrite);
			if (r != null) {
				return unescape(r[2]);
			} else if (q != null) {
				return unescape(q[2]);
			} else {
				return null;
			}
		},
		/*
		 * 判断是否展示的当前页面
		 * @param { string } url参数
		 * @returns { blooen }
		 */
		isCurrentPage: function (urlString) {
			var pathnameStr = window.location.pathname;

			if (pathnameStr === urlString) {
				return true;
			} else {
				return false;
			}
		},
		/*
         * 判断是否展示的当前页面
         * @param { string } url参数
         * @returns { blooen }
         */
        isPage: function (urlString) {
            var pathnameStr = window.location.href;

            if (pathnameStr.indexOf(urlString) > 0) {
                return true;
            } else {
                return false;
            }
        },
		/*
		 * 选择添加class
		 * @param { object } 当前元素
		 * @param { string } 添加的class
		 * @returns { * }
		 */
		addClassActive: function (ele, className) {
			ele.addClass(className).siblings().removeClass(className);
		},
		/*
		 * 切换class
		 * @param { object } 当前元素
		 * @param { string } 添加的class
		 * @returns { * }
		 */
		toggleClass: function (ele, className) {
			if (!ele.data('checked')) {
				ele.removeClass(className);
				ele.data('checked', true);
			} else {
				ele.addClass(className);
				ele.data('checked', false);
			}
		},
		/**
		 * 数字格式转换成千分位
		 * @param { Object } num
		 */
		commafy: function (num) {
			//1.先去除空格,判断是否空值和非数
			num = num + "";
			num = num.replace(/[ ]/g, ""); //去除空格
			if (num == "") {
				return;
			}
			if (isNaN(num)) {
				return;
			}
			//2.针对是否有小数点，分情况处理
			var index = num.indexOf(".");
			if (index == -1) { //无小数点
				var reg = /(-?\d+)(\d{3})/;
				while (reg.test(num)) {
					num = num.replace(reg, "$1,$2");
				}
			} else {
				var intPart = num.substring(0, index);
				var pointPart = num.substring(index + 1, num.length);
				var reg = /(-?\d+)(\d{3})/;
				while (reg.test(intPart)) {
					intPart = intPart.replace(reg, "$1,$2");
				}
				num = intPart + "." + pointPart;
			}
			return num;
		},
		/**
		 * 去除千分位
		 * @param{Object}num
		 */
		delcommafy: function (num) {
			num = num.replace(/[ ]/g, ""); //去除空格
			num = num.replace(/,/gi, '');
			return num;
		},
		/*
		 * 千分位相互转换
		 * @param {} val
		 */
		commafyToggle: function (val) {
			if (val.toString().indexOf(",") > -1) {
				return delcommafy(val);
			} else {
				return commafy(val);
			}
		},
		/*
		 * 倒计时
		 * select { string } 选择器
		 * time { number } 倒计时时间
		 * callback { function } 计时回调
		 */
		cuntDown: function(select, time, callback) {
		    var serverTime = new Date().getTime();
            var endTime = serverTime + (time - 1) * 1000;

            util.countdown(endTime, serverTime, function(date, serverTime, timer) {

                var miao = date[3] < 10 ? '0' + date[3] : date[3];

                if (callback) {
                	callback(miao, date);
                } else {

                    if (miao <= 0 ) {
                        layui.$(select).text('获取验证码').attr('disabled', false).removeClass('is-disabled');
                        return;
                    }
                    layui.$(select).text(miao + 's后重新获取').attr('disabled', true).addClass('is-disabled');
                }

            });
		}
	});
})
