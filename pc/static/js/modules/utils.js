layui.define(["jquery","util"],function(e){layui.jquery;var r=layui.util;e("utils",{mathRandom:function(){return parseInt(10*Math.random())},getPrevDay:function(){var e=new Date;return e=+e-864e5,(e=new Date(e)).getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日"},formatDateTime:function(e,t){var n=new Date;n.setTime(1e3*e);var r=n.getFullYear(),a=n.getMonth()+1;a=a<10?"0"+a:a;var o=n.getDate();o=o<10?"0"+o:o;var i=n.getHours();i=i<10?"0"+i:i;var u=n.getMinutes(),c=n.getSeconds();return u=u<10?"0"+u:u,c=c<10?"0"+c:c,1==t?r+"-"+a:2==t?o+" ":r+"-"+a+"-"+o+" "},getCookie:function(e){for(var t=document.cookie.split("; "),n=0;n<t.length;n++){var r=t[n].split("=");if(e==r[0])return r[1]}return""},getSeconds:function(){return(new Date).getTime()},getRrandomTime:function(){for(var e=(new Date).getTime(),t="",n=0;n<5;n++)t+=Math.floor(10*Math.random());return e+"."+t},getRrandomStr:function(){for(var e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],t="",n=0;n<16;n++){t+=e[Math.floor(62*Math.random())]}return t},getGuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},encryption:function(e,t,n){if(e)return base64encode(des(e,utf16to8(t),1,0,hexToString(n),1))},decrypt:function(e,t,n){if(e)return Handle(utf8to16(des(e,base64decode(String(t)),0,0,hexToString(n),0)))},getParams:function(e,t,n){if(e){n={platform:"pc",proglang:"javascript",sn:this.getRrandomTime(),params:n,token:t};return JSON.stringify(n)}},toMoney:function(e){return new Number(e).toString().replace(/\d{1,4}(?=(\d{4})+$)/g,function(e){return e+","})},toMoneyNormal:function(e){return e=e.toFixed(2),e=(e=parseFloat(e)).toLocaleString()},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=new RegExp("(^|/)"+e+"/([^/]*)(/|$)","i"),r=window.location.search.substr(1).match(t),a=window.location.pathname.substr(1).match(n);return null!=r?unescape(r[2]):null!=a?unescape(a[2]):null},isCurrentPage:function(e){return window.location.pathname===e},isPage:function(e){return 0<window.location.href.indexOf(e)},addClassActive:function(e,t){e.addClass(t).siblings().removeClass(t)},toggleClass:function(e,t){e.data("checked")?(e.addClass(t),e.data("checked",!1)):(e.removeClass(t),e.data("checked",!0))},commafy:function(e){if(""!=(e=(e+="").replace(/[ ]/g,""))&&!isNaN(e)){var t=e.indexOf(".");if(-1==t)for(var n=/(-?\d+)(\d{3})/;n.test(e);)e=e.replace(n,"$1,$2");else{var r=e.substring(0,t),a=e.substring(t+1,e.length);for(n=/(-?\d+)(\d{3})/;n.test(r);)r=r.replace(n,"$1,$2");e=r+"."+a}return e}},delcommafy:function(e){return e=(e=e.replace(/[ ]/g,"")).replace(/,/gi,"")},commafyToggle:function(e){return-1<e.toString().indexOf(",")?delcommafy(e):commafy(e)},cuntDown:function(a,e,o){var t=(new Date).getTime(),n=t+1e3*(e-1);r.countdown(n,t,function(e,t,n){var r=e[3]<10?"0"+e[3]:e[3];if(o)o(r,e);else{if(r<=0)return void layui.$(a).text("获取验证码").attr("disabled",!1).removeClass("is-disabled");layui.$(a).text(r+"s后重新获取").attr("disabled",!0).addClass("is-disabled")}})}})});