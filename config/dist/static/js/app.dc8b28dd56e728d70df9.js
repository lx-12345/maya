webpackJsonp([8],{"56fK":function(t,e,n){"use strict";var o={name:"SIdentify",props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:16},fontSizeMax:{type:Number,default:40},backgroundColorMin:{type:Number,default:255},backgroundColorMax:{type:Number,default:255},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:80},contentHeight:{type:Number,default:34}},methods:{randomNum:function(t,e){return Math.floor(Math.random()*(e-t)+t)},randomColor:function(t,e){return"rgb("+this.randomNum(t,e)+","+this.randomNum(t,e)+","+this.randomNum(t,e)+")"},drawPic:function(){var t=document.getElementById("s-canvas").getContext("2d");t.textBaseline="bottom",t.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),t.fillRect(0,0,this.contentWidth,this.contentHeight),t.strokeStyle="#f88125",t.lineWidth=2,t.rect(0,0,80,34),t.stroke();for(var e=0;e<this.identifyCode.length;e++)this.drawText(t,this.identifyCode[e],e);this.drawLine(t),this.drawDot(t)},drawText:function(t,e,n){t.fillStyle=this.randomColor(this.colorMin,this.colorMax),t.font=this.randomNum(this.fontSizeMin,this.fontSizeMax)+"px SimHei";var o=(n+1)*(this.contentWidth/(this.identifyCode.length+1)),i=this.randomNum(this.fontSizeMax,this.contentHeight-5),r=this.randomNum(-45,45);t.translate(o,i),t.rotate(r*Math.PI/180),t.fillText(e,0,0),t.rotate(-r*Math.PI/180),t.translate(-o,-i)},drawLine:function(t){},drawDot:function(t){}},watch:{identifyCode:function(){this.drawPic()}},mounted:function(){this.drawPic()}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"s-canvas"},[e("canvas",{attrs:{id:"s-canvas",width:this.contentWidth,height:this.contentHeight}})])},staticRenderFns:[]},r=n("VU/8")(o,i,!1,null,null,null);e.a=r.exports},"991W":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),i=n("/ocq");o.default.use(i.a);var r=new i.a({mode:"history",routes:[{path:"/index",name:"index",component:function(t){return n.e(5).then(function(){var e=[n("8hXn")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/login",name:"login",component:function(t){return Promise.all([n.e(0),n.e(3)]).then(function(){var e=[n("Quw4")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/register",name:"register",component:function(t){return Promise.all([n.e(0),n.e(4)]).then(function(){var e=[n("c2lw")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/forgetpsd",name:"forgetpsd",component:function(t){return Promise.all([n.e(0),n.e(6)]).then(function(){var e=[n("RT7S")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/tiedcard",name:"tiedcard",component:function(t){return Promise.all([n.e(0),n.e(7)]).then(function(){var e=[n("O6vQ")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/downloadPrompt",name:"downloadPrompt",component:function(t){return Promise.all([n.e(0),n.e(1)]).then(function(){var e=[n("lhDg")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/",name:"login2",component:function(t){return Promise.all([n.e(0),n.e(2)]).then(function(){var e=[n("EWyk")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var u=n("VU/8")({data:function(){return{}}},a,!1,function(t){n("R+0h")},null,null).exports,l=n("wtEF"),d=n.n(l),c=n("Au9i"),s=n.n(c),h=n("56fK");n("UoMW"),n("d8/S"),n("991W"),n("erWL");o.default.use(h.a),o.default.use(s.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:r,store:d.a,template:"<App/>",components:{App:u}})},"R+0h":function(t,e){},UoMW:function(t,e){!function(){var t=document.documentElement.clientWidth,e=t/750,n=document.querySelector("body");if(t>750)return n.style.margin="0 auto",void(n.style.width="750px");document.documentElement.style.fontSize=100*e+"px"}()},"d8/S":function(t,e){},erWL:function(t,e){},wtEF:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.dc8b28dd56e728d70df9.js.map