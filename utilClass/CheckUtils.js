(function(){
	
	window.CheckUtils = {
		/**
		 * 校验手机号
		 * @param {String} str
		 * @return true 正确，false 错误
		 */
		phone : function(str){ 
		    return /^1[3456789]\d{9}$/.test(str);
		},
		/**
		 * 校验标准字符串a-zA-Z0-9
		 * @param {String} str
		 * @return true 正确，false 错误
		 */
		standardStr : function(str){
			var pat=new RegExp("[^a-zA-Z0-9]","i");
			return !(pat.test(str));
		},
		/**
		 * 判断是否为null
		 * @param {Object} str
		 * @return true 是，false 否
		 */
		isBlank : function(str){
			if(str == null || str == ""){
				return true;
			}
			switch(typeof(str)){
				case "string":
					return str.replace(/\s*/g,'') == '';
				case "undefined":
					return true;
				case "object":
					var obj = JSON.stringify(str);
					return obj == "{}" || obj == "[]";
			}
			return false;
		},
		/**
		 * 手机验证码校验
		 * @param {String} str
		 */
		code : function(str){
			return /^\d{4}$/.test(str);
		},
		/**
		 * 金额格式判断
		 * @param {String} str 金额
		 * return true正确，false错误
		 */
		money : function(str){
			return /^\d+\.?\d{0,2}$/.test(str) && str[0].toString() != "0";
		},
		/**
		 * 银行卡判断
		 * @param {String} str
		 * return true正确，false错误
		 */
		bankCardNum : function(str){
			return /^6[\d]{18}$/.test(str);
		},
        /**
		 * 是否成年
         * @param str
         * @returns {boolean}
         */
        idCard: function (str) {
            var identificationCardid = str; //取得身份证号
            var year = identificationCardid.substring(6, 10);//截取身份证上的年
            var months = identificationCardid.substring(10, 12); //截取身份证上的月
            var days = identificationCardid.substring(12, 14); //截取身份证上的日
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - year - 1;
            if (months < month || months == month && days <= day) {
                age++;
            }
            console.log("客户年龄为："+age);
            if (age < 18) {
                return true;
            } else {
                return false;
            }
        }
	};
	
	
})();
