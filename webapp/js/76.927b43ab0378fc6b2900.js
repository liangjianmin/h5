webpackJsonp([76],{1152:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"dola-pwd-manage"},[e("TitleBar",{attrs:{title:t.title}}),t._v(" "),t.userDetail.user?e("dl",{staticClass:"dola-pwd-manage-list"},[t._m(0),t._v(" "),e("dd",[t.userDetail.user.srbank.is_srbank_user?["UNBINDING"==t.userDetail.user.bankcard_status?[e("a",{staticClass:"clr",on:{click:function(a){t.tipFn(1)}}},[e("span",{staticClass:"fl"},[t._v("交易密码")]),t._v(" "),e("span",{staticClass:"fr"},[t._v("重置       ")]),t._v(" "),e("i",{staticClass:"fr"})])]:"BIND"==t.userDetail.user.bankcard_status?[t.userDetail.user.srbank.need_reset_pwd_first?[e("a",{staticClass:"clr",on:{click:function(a){t.tipFn(2)}}},[e("span",{staticClass:"fl"},[t._v("交易密码")]),t._v(" "),e("span",{staticClass:"fr"},[t._v("重置       ")]),t._v(" "),e("i",{staticClass:"fr"})])]:[e("a",{staticClass:"clr",on:{click:function(a){t.modify()}}},[e("span",{staticClass:"fl"},[t._v("交易密码")]),t._v(" "),e("span",{staticClass:"fr"},[t._v("重置       ")]),t._v(" "),e("i",{staticClass:"fr"})])]]:"UNBIND"==t.userDetail.user.bankcard_status?[e("a",{staticClass:"clr",on:{click:function(a){t.tipFn(0,"UNBIND")}}},[e("span",{staticClass:"fl"},[t._v("交易密码")]),t._v(" "),e("span",{staticClass:"fr"},[t._v("重置       ")]),t._v(" "),e("i",{staticClass:"fr"})])]:t._e()]:[e("a",{staticClass:"clr",on:{click:function(a){t.tipFn(0)}}},[e("span",{staticClass:"fl"},[t._v("交易密码")]),t._v(" "),e("span",{staticClass:"fr"},[t._v("未设置       ")]),t._v(" "),e("i",{staticClass:"fr"})])]],2)]):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.layer_flag,expression:"layer_flag"}]},[e("div",{ref:"audit",staticClass:"bank-layer-content"},[e("i",{staticClass:"icn error"}),t._v(" "),t._m(1)])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.layer_flag,expression:"layer_flag"}]},[e("div",{ref:"layerRechage",staticClass:"bank-layer-content"},[e("i",{staticClass:"icn error"}),t._v(" "),t._m(2)])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.layer_flag,expression:"layer_flag"}]},[e("div",{ref:"olduser",staticClass:"bank-layer-content"},[e("i",{staticClass:"icn error"}),t._v(" "),t._m(3)])])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("dd",[e("a",{staticClass:"clr",attrs:{href:"/user/modify_loginpass"}},[e("span",{staticClass:"fl"},[t._v("登录密码")]),t._v(" "),e("span",{staticClass:"fr"},[t._v("修改       ")]),t._v(" "),e("i",{staticClass:"fr"})])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"text"},[e("p",{staticClass:"t1"},[t._v("您正在申请解绑银行卡，请在审核结束后操作")]),t._v(" "),e("p",{staticClass:"t3 tl"},[t._v("审核通过：您可以绑定新的银行卡"),e("br"),t._v("审核失败：您需要重新提交审核，或保留原银行卡")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"text"},[e("p",{staticClass:"t1"},[t._v("请开通银行存管账户 ")]),t._v(" "),e("p",{staticClass:"t2"},[t._v("银行存管账户用于对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"text"},[e("p",{staticClass:"t1"},[t._v("为保障资金安全，投资前请先设置银行存管账户交易密码")]),t._v(" "),e("p",{staticClass:"t3 tl"},[t._v("平台已为您开通银行存管账户。银行存管账户用于对您的资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。")])])}]}},1253:function(t,a,e){var i=e(928);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(480)("fb6d7bd8",i,!0,{})},1444:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(182),s=e(585),r=e.n(s),n=e(12);e.n(n);a.default={name:"pwd-manage",data:function(){return{title:"密码管理"}},computed:e.i(i.b)({userDetail:function(t){return t.user.userDetail}}),created:function(){this.getUserData()},methods:{getUserData:function(){this.$store.dispatch({type:"userDetail"})},modify:function(){this.$store.dispatch({type:"resetPassword",redirectUrl:window.location.origin+"/user/setting?",needCheck:!1})},tipFn:function(t,a){var i=this;0==t?e.i(n.MessageBox)({title:"",message:this.$refs.layerRechage.outerHTML,showConfirmButton:!0,showCancelButton:!0,confirmButtonClass:"bank-btn-confirm",cancelButtonClass:"bank-btn-cancel",confirmButtonText:"立即开通",cancelButtonText:"暂不开通"}).then(function(t){"confirm"==t&&("UNBIND"==a?i.$store.dispatch({type:"rebindBankcardPage",redirectUrl:window.location.origin+"/#/bank/waiting?callback="+window.location.origin+"/#/user/detail?"}):i.$store.dispatch({type:"personalRegister",redirectUrl:window.location.origin+"/#/bank/waiting?callback="+window.location.origin+"/#/bank/open_account_success?"}))}):1==t?e.i(n.MessageBox)({title:"",message:this.$refs.audit.outerHTML,showConfirmButton:!0,showCancelButton:!1,confirmButtonClass:"bank-btn-confirm"}).then(function(t){}):2==t&&e.i(n.MessageBox)({title:"",message:this.$refs.olduser.outerHTML,showConfirmButton:!0,showCancelButton:!1,confirmButtonClass:"bank-btn-confirm"}).then(function(t){"confirm"==t&&i.$store.dispatch({type:"resetPassword",redirectUrl:window.location.origin+"/#/user/detail",needCheck:!1})})}},components:{TitleBar:r.a}}},575:function(t,a,e){function i(t){e(1253)}var s=e(181)(e(1444),e(1152),i,"data-v-1e039f89",null);t.exports=s.exports},585:function(t,a,e){var i=e(181)(e(587),e(586),null,null,null);t.exports=i.exports},586:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dola-title"},[t.isApp?t._e():e("a",{staticClass:"backer",attrs:{href:"javascript:history.go(-1);"}}),t._v(" "),e("h2",[t._v(t._s(t.title))]),t._v(" "),t.searchBar?e("div",{staticClass:"dola-investment-details-search-bar",on:{click:t.searchFn}},[e("p",[t._v(t._s(t.searchText))]),t._v(" "),e("i",{staticClass:"ico"})]):t._e()])},staticRenderFns:[]}},587:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(10);a.default={name:"titlebar",data:function(){return{isApp:!1}},props:{title:{type:String,default:""},searchText:{type:String,default:""},searchBar:{type:Boolean,default:!1}},methods:{searchFn:function(){this.$emit("search")}},created:function(){var t=i.a.getCookie("platform");this.isApp=""!=t}}},671:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYzE3MzBiYy1lYmZlLWE5NGItOTE5Yi1jNDhiM2VkODRhODMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDFDOEI5QzEzRUIxMTFFNjlDQTE4NUU5QjE2RjI3ODAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDFDOEI5QzAzRUIxMTFFNjlDQTE4NUU5QjE2RjI3ODAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY1MGIyOTA1LWI0ZjMtZWY0Mi05OGM1LTQ2ZTlmZTBlYTkzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozYzE3MzBiYy1lYmZlLWE5NGItOTE5Yi1jNDhiM2VkODRhODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GRDyNAAABvklEQVR42ryWTShEQRzAH/tSJMrHQVw5OXDRFsqKtByItAf5uLr4uBAHcnIVpSgc5EBKHJCL1OZtTg5ue91y8FEoQqzf1BymV7vvw5ud+vV/+2/f/OY/OzszRjqdNjJhWdY6hLJ9xyv5RvY2CHuJRKLACKg5CZ8gBkdIi3IhfJaxG86RluoW3ivPrXCJtFKncBLulM+NEEdao0UYDodThAjcKOk6sJDW6qhQSB8JHWI6lbSo8BppQ+BCKX0jROFESVfAFdKWwIVS+knoh10lXQIXSKOBC6X0hzAKa0q6EI6Rxtz0kSe2Gz8NwRJhQUn9wjiD2gysQlu1i4RpW18bDGRGS4VKpWOELdvglxnQfKAVOv1UgU+prG6KsGPrZ5bq5jK9Y/5D5mvRmD5EYrpWYEJJf8Mwsn2n902PshBhG0aU9AcMIDtz04fpQSZO/QPoVdKv0IMs7rYf06WsWO6jESUtNvVOZLdeZsl0ISsnnEKTkhbHVjuypNc1YDrIqsXVAuqVdFLKUjrOw1WbTExfs1+ZG2GV8iwWRhuyB513mjIZxZLvQvai+9YmhOLP3IfsPRf30kMYQvYV1K7+J8AAdeLZNQAezZYAAAAASUVORK5CYII="},681:function(t,a,e){var i=e(481);a=t.exports=e(479)(!1),a.push([t.i,'html{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none!important;-webkit-tap-highlight-color:transparent!important}body,html{font-family:sans-serif}article,aside,blockquote,body,button,code,dd,details,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}button,input,select,textarea{font-size:100%;border:none;-webkit-appearance:none}input[type=button],input[type=file],input[type=submit]{cursor:pointer}table{border-collapse:collapse;border-spacing:0}dl,ol,ul{list-style:none}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}b,em,i{font-style:normal}a{text-decoration:none}img{border:none}.clr{*zoom:1;clear:both}.clr:after{content:".";clear:both;height:0;visibility:hidden;display:block}.fl{float:left}.fl,.fr{_display:inline}.fr{float:right}.va-t{vertical-align:top}.va-m{vertical-align:middle}.va-b{vertical-align:bottom}.i-hide{display:none}.i-show{display:block}.lineBlock{display:inline-block;*display:inline;zoom:1;letter-spacing:normal;word-spacing:normal}.lbBox{font-size:0!important;*word-spacing:-1px!important}.boxsiz{-webkit-box-sizing:border-box;box-sizing:border-box}body,html{width:100%;height:100%}body{overflow-x:hidden}.emptys{margin-left:-1px;width:1px;height:100%;font-size:0;vertical-align:middle}@media (min-width:750px){html{background:#666}body{max-width:480px;margin:0 auto;background:#fff}}.dola-user{margin-top:44px}.dola-user .dola-user-wrap{padding:1.2rem 0}.dola-user .dola-user-wrap .dola-user-logo{width:2.213rem;height:2.213rem;background:url('+i(e(682))+") no-repeat 50%;background-size:cover;box-shadow:0 3px 13px 0 rgba(0,0,0,.07);display:block;margin:0 auto}.dola-user .dola-user-wrap .dola-user-wrap-form{padding:0 .45rem;margin-top:1rem}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-wrap-form-input{position:relative}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-wrap-form-input .tx{width:100%;height:53px;line-height:53px;border-bottom:1px solid #e5e5e5;text-indent:1em;font-size:15px;background:none}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-wrap-form-input .tx::-webkit-input-placeholder{color:#ccc}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-wrap-form-input .code{position:absolute;right:0;top:50%;margin-top:-16px;width:84px;height:30px;line-height:30px;text-align:center;border-radius:5px;border:1px solid #f60;color:#f60;font-size:15px;background:none}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-wrap-form-input .code-curr{color:#a2a2a2;border:1px solid #a2a2a2}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-btn{margin-top:1.8rem}.dola-user .dola-user-wrap .dola-user-wrap-form .dola-user-btn .btn{height:49px;line-height:49px;text-align:center;background-image:linear-gradient(265deg,#ff6802,#ff9832);color:#fff;display:block;border-radius:5px;font-size:17px}.dola-pwd-manage .dola-pwd-manage-list dt{height:50px;background:#f5f5f5}.dola-pwd-manage .dola-pwd-manage-list dt a{position:relative;display:block;height:50px;margin-left:.4rem;line-height:50px}.dola-pwd-manage .dola-pwd-manage-list dt a span{font-size:13px;color:#a0a0a0;display:block;line-height:50px}.dola-pwd-manage .dola-pwd-manage-list dd{height:50px}.dola-pwd-manage .dola-pwd-manage-list dd a{position:relative;display:block;height:50px;margin-left:.4rem;line-height:50px;border-bottom:1px solid #e5e5e5}.dola-pwd-manage .dola-pwd-manage-list dd a span{font-size:15px;color:#333;display:block;line-height:50px}.dola-pwd-manage .dola-pwd-manage-list dd a i{position:absolute;top:50%;margin-top:-7px;width:14px;height:14px;right:15px;background:url("+i(e(671))+") no-repeat 50%;background-size:contain;display:block}.dola-pwd-manage .dola-pwd-manage-list dd.bornone a{border-bottom:none}",""])},682:function(t,a,e){t.exports=e.p+"img/logo-user.0cd9e46.png"},928:function(t,a,e){a=t.exports=e(479)(!1),a.i(e(681),""),a.push([t.i,".dola-title[data-v-1e039f89]{position:relative}",""])}});