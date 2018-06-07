<template>
    <div id="app">
      <div class="banner">
        <img src="../assets/image/login-bg.jpg" alt="">
      </div>
      <div class="menu">
        <ul>
          <li><input type="text" v-model="mobilePhone" @blur='vmobilePhone()' placeholder="|请输入您的手机号"></li>
          <li>
            <input type="text" v-model="GraphicCode" @blur='vGraphicCode()' placeholder="|请输入图形码">
            <div class="code" @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
          </li>
          <li>
            <input type="text" v-model="verifyCode"  @blur='vverifyCode()' placeholder="|请输入验证码">
            <input class="btnSendCode" v-if="Flags" @click="getCode()" type="button"  value="获取验证码"/>
            <input class="btnSendCode"  type="button" v-show="show" :value="values+' '+ 's'">
          </li>
          <li>
            <input type="text" v-model="invitedCode" placeholder="|请输入邀请码">
          </li>
          <li><input type="text" v-model="loginPassword" @blur="vloginPassword" placeholder="|请输入您的密码"> </li>
          <li><input type="text" v-model="loginPassword2" @blur="vloginPassword2" placeholder="|请确认您的密码"> </li>
          <li><input type="button"  @click="MayaRegister" value="立即注册"> </li>
        </ul>
      </div>
      <div class="explain">
        <h3>规则说明</h3>
        <p>1、注册成为妈呀商城消费投资人送60 MAYA。</p>
        <p>2、推荐他人成为妈呀商城消费投资人的30 MAYA。</p>
        <p>3、每位消费投资人必须实名认证才可提取数字货币。</p>
        <p>4、送区块链数字货币。</p>
        <p class="foot-bottom">5、其他未尽事宜，详情咨询客服。</p>
      </div>
      <div class="footer"><img src="../assets/image/footer-bg.jpg" alt=""></div>
    </div>
</template>

<script>
  import Sidentify from '../components/identify'
  import { Toast } from 'mint-ui' // 提示框
  import axios from '../utils/request'
  import api from '../api/index.js'
  import CryptoJS from 'crypto-js/crypto-js'
  import { encryption } from '../utils/my-crypto-js'
  // import AES from 'crypto-js/aes'
  import md5 from 'crypto-js/md5'
    export default {
      name: 'login2',
      data () {
        return {
          identifyCodes: 'abcdefghijklmnopqrstuvwxyz',
          identifyCode: '',
          mobilePhone: '',
          GraphicCode: '', //  图型验证码
          verifyCode: '',
          invitedCode: 'n3kaXP',
          loginPassword: '',
          loginPassword2: '',
          timeStamp: '2018-01-25 12:32:21',
          version: api.version,
          Flag: true,
          Flags: true,
          show: false,
          values: '60',
          parameters: 'b2693d9c2124f3ca9547b897794ac6a1'
        }
      },
      components: {
        's-identify': Sidentify
      },
      mounted () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)// 图片验证码
        this.GetRequest()
        // console.log(this.GetRequest())
        // 获取url里本地缓存的邀请码
        let invitedCodes = sessionStorage.getItem('invitedCode')
        console.log(invitedCodes)
        this.invitedCode = invitedCodes
        console.log(this.verifyCode)
        // 获取当前页面的路径
        var url = window.location.href;
        if(url.indexOf("?") != -1){
          url = url.split("?")[0];
          console.log(url);
        }
      },
      methods: {
        GetRequest () {
          var url = location.search  // 获取url中"?"符后的字串
          var theRequest = new Object()
          if (url.indexOf('?') != -1) {
            var str = url.substr(1)
            let strs = str.split('&')
            for (var i = 0; i < strs.length; i ++) {
              theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
            }
          }
          if (theRequest.invitedCode && theRequest.invitedCode !== '' && theRequest.invitedCode !== undefined) {
             console.log(theRequest.invitedCode)
            // 把url 里的邀请码存到本地
            sessionStorage.setItem('invitedCode', theRequest.invitedCode )
          }else{
            sessionStorage.setItem('invitedCode', '' )
          }
        },
        vGraphicCode () {
          this.Flag = true
          if (!this.GraphicCode) {
            this.Flag = false
            Toast('图形验证码必填')
          } else if (this.GraphicCode !== this.identifyCode) {
            this.Flag = false
            Toast('图形验证码错误')
          }
        },
        vverifyCode () {
          this.Flag = true
          if (!this.verifyCode) {
            this.Flag = false
            Toast('验证码必填')
          }
        },
        vmobilePhone () {
          this.Flag = true
          if (!this.mobilePhone) {
            this.Flag = false
            Toast('请输入手机号')
          }
        },
        vloginPassword () {
          this.Flag = true
          if (!this.loginPassword) {
            this.Flag = false
            Toast('请输入密码')
          }
        },
        vloginPassword2 (){
          this.Flag = true
          if (!this.loginPassword2){
            this.Flag = true
            Toast('请确认密码')
          }
        },
        randomNum (min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        },
        refreshCode () {
          this.identifyCode = ''
          this.makeCode(this.identifyCodes, 4)
        },
        // 图片验证码
        makeCode (o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
          }
          // console.log(this.identifyCode)
        },
        getCode () { // 获取短信验证码接口
          this.values = 60
          if (this.mobilePhone) {
            this.Flags = false
            this.show = true
            let timer = setInterval(() => {
              if (this.values > 0) {
                this.values--
              } else {
                this.show = false;
                this.Flags = true;
                this.values = 60
              }
              clearInterval(this.timer);
            }, 1000)
            let mobilePhone = this.mobilePhone
            let str = mobilePhone.replace(/\s+/g, '')
            let type = '1'
            let str2 = type.replace(/\s+/g, '')
            let data = {
              mobilePhone: str,
              type: str2
            }
            // aes加密
            let phoneDatas = encryption(JSON.stringify(data));
            // console.log(phoneDatas.toString());
            let AfterEncryption = phoneDatas.ciphertext.toString().toUpperCase();
            // console.log(AfterEncryption)
            // 签名
            let datas = 'data='+ AfterEncryption + '&' + 'timeStamp='+ this.timeStamp + '&' + 'version=' + this.version
            // md5 加密
            let mdata = datas + this.parameters
            let md5Data = md5(mdata)
            // 参数拼接
            let MAdata = datas + '&' + 'sign=' + md5Data
            let thisUrl = url + api.msg
            axios.post(thisUrl, MAdata)
              .then(res => {
                if (res.data.result_code === '200'){
                  Toast({
                    showClose: true,
                    message: res.data.result_info,
                    type: 'success'
                  })
                  // 本地缓存
                  sessionStorage.setItem('token', res.data.token)
                } else {
                  Toast({
                    showClose: true,
                    message: res.data.result_info,
                    type: 'success'
                  })
                  this.show = false;
                  this.Flags = true;
                  this.values = 60
                }
              }).catch(err => {
              Toast({
                showClose: true,
                message: '短信发送失败',
                type: 'success'
              })
            })
          } else {
            Toast({
              showClose: true,
              message: '请输入手机号',
              type: 'success'
            })
          }
        },
        MayaRegister () {
          let reg = /^[1][3,4,5,7,8][0-9]{9}$/g
          let pattern = /^[a-zA-Z0-9]{6,18}$/g
          const browser = {
            versions: function () {
              const u = navigator.userAgent, app = navigator.appVersion;
              return { // 移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, // IE内核
                presto: u.indexOf('Presto') > -1, // opera内核
                webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
              };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
          }
          // console.log(browser)
          let browsers = function () { // 判断注册方式（待确定）
            if (browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
              var ua = navigator.userAgent.toLowerCase();// 获取判断用的对象
              if (ua.match(/MicroMessenger/i) === 'micromessenger') {
                // 在微信中打开
                return 5
              }
              if (ua.match(/WeiBo/i) === 'weibo') {
                // 在新浪微博客户端打开
                return 1
              }
              if (ua.match(/QQ/i) === 'qq') {
                // 在QQ空间打开
                return 1
              }
              if (browser.versions.ios) {
                // 是否在IOS浏览器打开
                return 2
              }
              if (browser.versions.android) {
                // 是否在安卓浏览器打开
                return 3
              }
            } else {
              // 否则就是PC浏览器打开
              return 1
            }
          }
          let registeTypes = browsers()
          //  console.log(browsers())
          let mobilePhone = this.mobilePhone
          let loginPassword = this.loginPassword
          let verifyCode = this.verifyCode
          let mobilePhoneStr = mobilePhone.replace(/\s+/g, '')
          let loginPasswordStr = loginPassword.replace(/\s+/g, '')
          let verifyCodeStr = verifyCode.replace(/\s+/g, '')
          console.log(this.verifyCode)
          let data = {
            mobilePhone: mobilePhoneStr,
            loginPassword: loginPasswordStr,
            verifyCode: verifyCodeStr,
            invitedCode: this.invitedCode,
            registeType: registeTypes,
            registeSource: ''
          }
          // aes加密
          let phoneDatas = encryption(JSON.stringify(data));
          // console.log(phoneDatas.toString());
          let AfterEncryption = phoneDatas.ciphertext.toString().toUpperCase();
          // console.log(AfterEncryption)
          // 签名
          let datas = 'data='+ AfterEncryption + '&' + 'timeStamp='+ this.timeStamp + '&' + 'version=' + this.version
          // md5 加密
          let mdata = datas + this.parameters
          let md5Data = md5(mdata)
          // 参数拼接
          let MAdata = datas + '&' + 'sign=' + md5Data
        //  axios
          let thisUrl = url + api.registerForH5
          axios.post(thisUrl, MAdata)
            .then(res => {
              if (res.data.result_code === '200') {
                console.log(res.data)
                Toast({
                  showClose: true,
                  message: res.data.result_info,
                  type: 'success'
                })
                window.location.href = '/downloadPrompt'
                // 本地缓存
                let obj = {
                  'mobile': res.data.data.mobile,
                  'userId': res.data.data.userId,
                  'androidUrl': res.data.data.androidUrl,
                  'iosUrl': res.data.data.iosUrl
                }
                let str = JSON.stringify(obj)// parse 转字符串
                sessionStorage.obg = str
              } else {
                  Toast({
                    showClose: true,
                    message: res.data.result_info,
                  })
              }
            }).catch(err => {
            alert(err)
          })
        }
      }
    }
</script>

<style scoped>
.banner{
  width: 100%;
}
  .banner img{
    width:100%;
  }
  .menu{
    background-color: #f9d388;
    margin: 0 16px;
  }
.menu ul{
  padding: 30px 10px 20px 20px;
}
  .menu ul li{
    margin:0 10px 15px 10px;
    height: 40px;
    position: relative;
  }
.menu ul li input{
  height: 100%;
  width: 90%;
  padding: 0 5%;
  border-radius: 20px;
  border:1px solid #f88125;
  vertical-align: top;
}
.menu ul li input[type='button']{
  background-color: #f88125;
  width: 100%;
  color: #fee9df;
  font-size: 14px;
}
.explain{
  margin: 0 20px;
}
.explain h3{
  font-size: 16px;
  color: #ed413f;
  margin: 25px 0;
}
.explain p{
  color: #ee5453;
  font-size: 14px;
  margin-bottom: 10px;
}
  .footer img{
    width: 100%;
  }
.foot-bottom{
  margin-bottom: 0 !important;
}
input::-webkit-input-placeholder{ /*WebKit browsers*/
  color: #f8c6c5;
}
input::-moz-input-placeholder{ /*Mozilla Firefox*/
  color: #f8c6c5;
}
input::-ms-input-placeholder{ /*Internet Explorer*/
  color: #f8c6c5;
}
.btnSendCode{
    position: absolute;
    top: 1px;
    right: -2px;
    width: 100px !important;
    height: 20px;
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
}
  .code{
    position: absolute;
    right: 11px;
    top: -24px;
  }
</style>
