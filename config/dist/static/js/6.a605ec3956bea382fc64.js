webpackJsonp([6],{GchQ:function(e,t){},RT7S:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("mvHQ"),i=s.n(o),a=s("dI9p"),n=s("vLgD"),r=s("Au9i"),l=s("56fK"),d=(s("KVf0"),s("gyMJ")),c=s("F4fl"),u=s("gykg"),h=s.n(u),v={components:{"v-header":a.a,"s-identify":l.a},data:function(){return{gradient:"",identifyCodes:"abcdefghijklmnopqrstuvwxyz",identifyCode:"",mobilePhone:"",GraphicCode:"",verifyCode:"",newloginPassword:"",newloginPassword2:"",timeStamp:"2018-01-25 12:32:21",version:d.a.version,Flags:!0,show:!1,values:"60",type:2}},mounted:function(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},methods:{randomNum:function(e,t){return Math.floor(Math.random()*(t-e)+e)},refreshCode:function(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},makeCode:function(e,t){for(var s=0;s<t;s++)this.identifyCode+=this.identifyCodes[this.randomNum(0,this.identifyCodes.length)]},onSubmit:function(){var e=this.mobilePhone,t=this.newloginPassword;if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(e))return Object(r.Toast)({showClose:!0,message:"请输入正确的手机号",type:"success"}),!1;/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(t)?this.MayaRegister():Object(r.Toast)({showClose:!0,message:"请输入6到18位数字和字母组成",type:"success"})},MayaRegister:function(){var e={loginName:this.mobilePhone,newPassword:this.newloginPassword,verifyCode:this.verifyCode},t="data="+Object(c.a)(i()(e)).ciphertext.toString().toUpperCase()+"&timeStamp="+this.timeStamp+"&version="+this.version,s=t+"b2693d9c2124f3ca9547b897794ac6a1",o=t+"&sign="+h()(s);n.a.post(d.a.forgetpsd,o).then(function(e){console.log(e.data),Object(r.Toast)({showClose:!0,message:"修改密码成功",type:"success"}),window.location.href="/"}).catch(function(e){alert(e)})},changeStyle:function(){this.mobilePhone&&this.GraphicCode&&this.verifyCode&&this.newloginPassword&&this.newloginPassword2?this.gradient="gradient":this.gradient=""},judgeGetCode:function(){""===this.mobilePhone?alert("请填写手机号"):this.getCode()},getCode:function(){var e=this;this.show=!0,this.Flags=!1;setInterval(function(){e.values>0?e.values--:(e.show=!1,e.Flags=!0,e.values=60)},1e3);clearInterval(this.item);var t={mobilePhone:this.mobilePhone,type:this.type},s="data="+Object(c.a)(i()(t)).ciphertext.toString().toUpperCase()+"&type="+this.type+"&version="+this.version,o=s+"b2693d9c2124f3ca9547b897794ac6a1",a=s+"&sign="+h()(o);n.a.post(d.a.msg,a).then(function(e){console.log(e.data),Object(r.Toast)({showClose:!0,message:"短信验证码已发送请注意查收",type:"success"})}).catch(function(e){alert(e)})}}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-header",[s("h1",{attrs:{slot:"title"},slot:"title"},[e._v("忘记密码")])]),e._v(" "),s("section",{staticClass:"maya-reg-from"},[s("div",{staticClass:"mt-field"},[s("label",[e._v("手机：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobilePhone,expression:"mobilePhone"}],attrs:{type:"number",placeholder:"",value:""},domProps:{value:e.mobilePhone},on:{keyup:e.changeStyle,input:function(t){t.target.composing||(e.mobilePhone=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"mt-field"},[s("label",[e._v("图片验证码：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.GraphicCode,expression:"GraphicCode"}],attrs:{type:"input",placeholder:""},domProps:{value:e.GraphicCode},on:{keyup:e.changeStyle,input:function(t){t.target.composing||(e.GraphicCode=t.target.value)}}}),e._v(" "),s("div",{staticClass:"code",on:{click:e.refreshCode}},[s("s-identify",{attrs:{identifyCode:e.identifyCode}})],1)]),e._v(" "),s("div",{staticClass:"mt-field"},[s("label",[e._v("手机验证码：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.verifyCode,expression:"verifyCode"}],attrs:{type:"input",placeholder:"",id:"verifyCode"},domProps:{value:e.verifyCode},on:{input:function(t){t.target.composing||(e.verifyCode=t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:e.Flags,expression:"Flags"}],staticClass:"btnSendCode",attrs:{type:"button",value:"获取验证码"},on:{click:e.judgeGetCode}}),e._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"btnSendCode",attrs:{type:"button",value:e.values+"s"}})]),e._v(" "),s("div",{staticClass:"mt-field mt-field2"},[s("label",[e._v("设置新密码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.newloginPassword,expression:"newloginPassword"}],attrs:{type:"password",placeholder:"请输入6-18位字母＋数字组合",value:""},domProps:{value:e.newloginPassword},on:{keyup:e.changeStyle,input:function(t){t.target.composing||(e.newloginPassword=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"mt-field mt-field2"},[s("label",[e._v("确认新密码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.newloginPassword2,expression:"newloginPassword2"}],attrs:{type:"password",placeholder:"请再一次输入新密码",value:""},domProps:{value:e.newloginPassword2},on:{keyup:e.changeStyle,input:function(t){t.target.composing||(e.newloginPassword2=t.target.value)}}})])]),e._v(" "),s("mt-button",{staticClass:"maya-btn",class:e.gradient,attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")])],1)},staticRenderFns:[]};var p=s("VU/8")(v,m,!1,function(e){s("GchQ")},null,null);t.default=p.exports}});
//# sourceMappingURL=6.a605ec3956bea382fc64.js.map