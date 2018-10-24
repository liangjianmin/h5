layui.define(["utils","path","bank"],function(e){var s=layui.utils,n=layui.path,u=layui.bank;e("result",{init:function(){s.isPage("/result/user_register_success.html")&&this.registerResultPage(),s.isPage("/result/forget_pass_success.html")&&this.forgetPassResultPage(),s.isPage("/result/investor_trade_in_success.html")&&this.investorTradeInResultPage(),s.isPage("/result/user_trade_in_success.html")&&this.debtorTradeInResultPage(),s.isPage("/result/user_trade_out_success.html")&&this.tradeOutResultPage(),s.isPage("/result/open_bank_success.html")&&this.openBankResultPage()},registerResultPage:function(){if("BORROWERS"===s.getQueryString("user_type")){var t="BORROWERS";$("#userCenterUrl").attr("href",n.debtorUserCenterUrl)}else{t="INVESTOR";$("#userCenterUrl").attr("href",n.investUserCenterUrl)}function r(e){var t=n.openBankRedirectUrl+n.openBankSuccessUrl;u.openBank({redirectUrl:t,userRole:e})}$("#openBankBtn").on("click",function(e){e.preventDefault(),r(t)}),s.cuntDown("#cuntDownTime",10,function(e){e<=0?r(t):layui.$("#cuntDownTime").text(e)})},forgetPassResultPage:function(){"debtor"===s.getQueryString("user_type")?$("#loginUrl").attr("href",n.debtorLoginUrl):$("#loginUrl").attr("href",n.investLoginUrl)},investorTradeInResultPage:function(){var e=function(e){for(var t=e.split("?")[1].split("&"),r={},s=0;s<t.length;s++){var n=t[s].split("=");r[n[0]]=n[1]}return r}(window.location.href).requestNo;function t(e){$(e).show().siblings().hide()}u.checkChargeSuccess({requestNo:e,callback:function(e){console.log(e),0===e.code?t("#resultTradeInSuccess"):t("#resultTradeInError")}})},debtorTradeInResultPage:function(){var e=function(e){for(var t=e.split("?")[1].split("&"),r={},s=0;s<t.length;s++){var n=t[s].split("=");r[n[0]]=n[1]}return r}(window.location.href).requestNo;function t(e){$(e).show().siblings().hide()}u.checkChargeSuccess({requestNo:e,callback:function(e){0===e.code?t("#resultTradeInSuccess"):t("#resultTradeInError")}})},tradeOutResultPage:function(){"investor"===s.getQueryString("user_type")?$("#backUrl").attr("href",n.investUserCenterUrl):$("#backUrl").attr("href",n.debtorUserCenterUrl)},openBankResultPage:function(){"INVESTOR"===$.cookie("user_type")?$("#goHome").attr("href",n.investUserCenterUrl):$("#goHome").attr("href",n.debtorUserCenterUrl)}})});