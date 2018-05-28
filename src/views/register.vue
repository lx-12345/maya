<template>
  <!--注册页面-->
  <div>
    <v-header>
      <h1 slot="title">注册</h1>
    </v-header>
    <section class="maya-reg-from">
      <div class="mt-field">
        <label>手机：</label><input type="number" v-model="mobilePhone" value="" @blur='vmobilePhone()'>
      </div>
      <div class="mt-field">
        <label>图片验证码：</label><input type="input" v-model="GraphicCode" @blur='vGraphicCode()'>
        <div class="code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </div>
      <div class="mt-field">
        <label>手机验证码：</label><input type="input" id="verifyCode" v-model="verifyCode" @blur='vverifyCode()'><input
        class="btnSendCode" v-if="Flags" @click="getCode()" type="button" value="获取验证码"/>
        <input v-if="show" class="btnSendCode" type="button" :value="values+'s'"/>
      </div>
      <div class="mt-field">
        <label>邀请码：</label><input type="text" id="invitedCode" v-model="invitedCode">
      </div>
      <div class="mt-field mt-field2">
        <label>设置密码</label><input type="password" placeholder="请输入6-18位字母＋数字组合" value="" v-model="loginPassword" @blur='vloginPassword'
      />
      </div>
      <div class="mt-field mt-field2">
        <label>确认密码</label><input type="password" placeholder="请再一次输入新密码" value="" v-model="loginPassword2" @blur='vloginPassword2'/>
      </div>
    </section>
    <mt-button type="primary" class="maya-btn" @click="MayaRegister">提交</mt-button>
  </div>
</template>

<script>
  import Header from '../common/_header'
  import Sidentify from '../components/identify'
  import { Toast } from 'mint-ui' // 提示框
  import axios from '../utils/request'
  import api from '../api/index.js'
  import '../assets/css/maya-form.css'
  import CryptoJS from 'crypto-js/crypto-js'
  import { encryption } from '../utils/my-crypto-js'
  // import AES from 'crypto-js/aes'
  import md5 from 'crypto-js/md5'
  // import AES from 'crypto-js/aes'
  // import MD5 from 'crypto-js/md5'
  // import {encryption} from '../utils/my-crypto-js'
  export default {
    components: {
      'v-header': Header,
      's-identify': Sidentify
    },
    data () {
      return {
        identifyCodes: 'abcdefghijklmnopqrstuvwxyz',
        identifyCode: '',
        mobilePhone: '',
        GraphicCode: '',
        verifyCode: '',
        invitedCode: '',
        loginPassword: '',
        loginPassword2: '',
        timeStamp: '2018-01-25 12:32:21',
        version: api.version,
        Flag: true,
        Flags: true,
        show: false,
        values: '60'
      }
    },
    mounted () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)// 图片验证码
    },
    methods: {
      vmobilePhone () {
        this.Flag = true
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/g
        if (!this.mobilePhone) {
          this.Flag = false
          Toast('请输入手机号')
        } else if (!reg.test(this.mobilePhone)) {
          this.Flag = false
          Toast('手机号码格式不正确')
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
      vloginPassword () {
        this.Flag = true
        const pattern = /^[a-zA-Z0-9]{6,18}$/g
        if (!this.loginPassword) {
          this.Flag = false
          Toast('请输入密码')
        } else if (!pattern.test(this.loginPassword)) {
          this.Flag = false
          Toast('请输入6-18位字母＋数字组合')
        }
      },
      vloginPassword2 () {
        this.Flag = true
        if (!this.loginPassword2) {
          this.Flag = false
          Toast('请再次输入密码')
        } else if (this.loginPassword2 !== this.loginPassword) {
          this.Flag = false
          Toast('两次输入密码不一致!')
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
      MayaRegister () {
//         判断浏览器内核类型
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
        const browsers = function () { // 判断注册方式（待确定）
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
        const registeTypes = browsers()
      //  console.log(browsers())
       const datar = {
          mobilePhone: this.mobilePhone,
            loginPassword: this.loginPassword,
            verifyCode: this.verifyCode,
            invitedCode: this.invitedCode,
            registeType: registeTypes,
            registeSource: '123456'
        }
        // 加密（需要先加载lib/aes/aes.min.js文件）
       // console.log(JSON.stringify(datar));
        var en2 = encryption(JSON.stringify(datar));
        console.log(en2.toString());
        var AfterEncryption = en2.ciphertext.toString().toUpperCase();
        let mobilePhone = this.mobilePhone
        let loginPassword = this.loginPassword
        let verifyCode = this.verifyCode
        let invitedCode = this.invitedCode
        let registeType = registeTypes
        let registeSource = '123456'
        let timeStamp = '2018-01-25 12:32:21'
        let version = api.version
        // 签名 (传到后台的数据 = (加密后的data+时间戳 + 版本号) +"&" + 'sign=' + md5((加密后的data+时间戳 + 版本号)+key)  )
        const params = "data" + "=" + AfterEncryption + "&" + "timeStamp=" + timeStamp + "&" + "version=" + version
        const signsi = params + "b2693d9c2124f3ca9547b897794ac6a1"
        const dataSifn = md5(signsi);// MD5加密
        const uData = params + "&" + "sign=" + dataSifn
       // console.log(uData)
        axios.post(api.register, uData)
          .then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
              Toast({
                showClose: true,
                message: '注册成功',
                type: 'success'
              })
              window.location.href = 'https://www.baidu.com'
//              router.push({name: 'Login'})
            } else {
              console.log(res.data.result_info)
              if(res.data.result_info == "手机号已注册"){
                Toast({
                  showClose: true,
                  message: '手机号已注册',
                })
              } else {
                Toast({
                  showClose: true,
                  message: '注册失败',
                  type: 'error'
                })
              }
            }
          }).catch(err => {
          alert(err)
        })
      },
      changeStyle () {
        if (this.mobilePhone && this.GraphicCode && this.verifyCode && this.newloginPassword && this.newloginPassword2) {
          this.gradient = 'gradient'
        } else {
          this.gradient = ''
        }
      },
      getCode () {//短信验证码
        let timeStamp = '2018-01-25 12:32:21'
        let version = api.version
        this.Flags = false
        this.show = true
        let phoneData = {
          mobilePhone : this.mobilePhone,
          type : 1
        }
        // aes 加密
      //  console.log(JSON.stringify(phoneData));
        let phoneDatas = encryption(JSON.stringify(phoneData));
      //  console.log(phoneDatas.toString());
        let AfterEncryption = phoneDatas.ciphertext.toString().toUpperCase();
      //  console.log(AfterEncryption)// 加密后的串
        // 签名
        let signature = "data=" + AfterEncryption + '&' + "timeStamp=" + timeStamp + "&" + "version=" + version
        const ph = signature + "b2693d9c2124f3ca9547b897794ac6a1"
        const phData = md5(ph);// MD5加密
        const phdata = signature + "&" + "sign=" + phData
        let timer = setInterval(() => {
          if (this.values > 0) {
            this.values--
          } else {
            this.show = false;
            this.Flags = true;
            this.values = 60
          }
        }, 1000)
        clearInterval(this.timer);
        axios.post(api.msg, phdata)
          .then(res => {
            Toast({
              showClose: true,
              message: '短信发送成功',
              type: 'success'
            })
          }).catch(err => {
            Toast({
              showClose: true,
              message: '短信发送失败',
              type: 'success'
            })
        })
      }
    }
  }
</script>

<style>

</style>
