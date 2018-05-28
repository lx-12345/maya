<template>
  <!--忘记密码-->
  <div>
    <v-header>
      <h1 slot="title">忘记密码</h1>
    </v-header>
    <section class="maya-reg-from">
      <div class="mt-field">
        <label>手机：</label><input type="number" placeholder=""  v-model="mobilePhone" value="" @keyup='changeStyle'>
      </div>
      <div class="mt-field">
        <label>图片验证码：</label><input type="input" placeholder="" v-model="GraphicCode" @keyup='changeStyle'>
        <div class="code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </div>
      <div class="mt-field">
        <label>手机验证码：</label><input type="input" placeholder="" id="verifyCode" v-model="verifyCode">
        <input class="btnSendCode" v-show="Flags" type="button" value="获取验证码" @click='judgeGetCode'/>
        <input class="btnSendCode" v-show="show" type="button" :value="values + 's'" />
      </div>
      <div class="mt-field mt-field2">
        <label>设置新密码</label><input type="password" placeholder="请输入6-18位字母＋数字组合" value="" v-model="newloginPassword" @keyup='changeStyle'/>
      </div>
      <div class="mt-field mt-field2">
        <label>确认新密码</label><input type="password" placeholder="请再一次输入新密码" value="" v-model="newloginPassword2" @keyup='changeStyle'/>
      </div>
    </section>
    <mt-button type="primary" class="maya-btn" :class='gradient' @click="onSubmit">提交</mt-button>
  </div>
</template>

<script>
  import Header from '../common/_header'
  import axios from '../utils/request'
  import { Toast } from 'mint-ui'
  import Sidentify from '../components/identify'
  import '../assets/css/maya-form.css'
  import api from '../api/index.js'
  import {encryption} from '../utils/my-crypto-js'
  import md5 from 'crypto-js/md5'
  export default {
    components: {
      'v-header': Header,
      's-identify': Sidentify
    },
    data () {
      return {
        gradient: '',
        identifyCodes: 'abcdefghijklmnopqrstuvwxyz',
        identifyCode: '',
        mobilePhone: '',
        GraphicCode: '',
        verifyCode: '',
        newloginPassword: '',
        newloginPassword2: '',
        timeStamp: '2018-01-25 12:32:21',
        version: api.version,
        Flags: true,
        show: false,
        values: '60',
        type: 2
      }
    },
    mounted () {
      // 图形验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    methods: {
      randomNum (min, max) { // 图形验证码
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode () { // 图形验证码
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode (o, l) { // 图形验证码
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
        console.log(this.identifyCode)
      },
      onSubmit () {
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        const loginPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        let mobilePhone = this.mobilePhone
        let newloginPassword = this.newloginPassword
        if (!myreg.test(mobilePhone)) {
          Toast({
            showClose: true,
            message: '请输入正确的手机号',
            type: 'success'
          })
          return false;
        } else if (!loginPass.test(newloginPassword)) {
          Toast({
            showClose: true,
            message: '请输入6到18位数字和字母组成',
            type: 'success'
          })
        } else {
          this.MayaRegister()
        }
      },
      MayaRegister () { // 提交
        let data = {
          loginName : this.mobilePhone, // 手机号
          newPassword: this.newloginPassword, // 密码
          verifyCode: this.verifyCode // 手机验证码
        }
        // aes加密
        let phoneDatas = encryption(JSON.stringify(data));
        let AfterEncryption = phoneDatas.ciphertext.toString().toUpperCase();
        console.log(AfterEncryption)// 加密后的串
        // 签名 (传到后台的数据 = (加密后的data+时间戳 + 版本号) +"&" + 'sign=' + md5((加密后的data+时间戳 + 版本号)+key)  )
        let signature = 'data=' + AfterEncryption + '&' + 'timeStamp=' + this.timeStamp + '&' + 'version=' + this.version
        const ph = signature + 'b2693d9c2124f3ca9547b897794ac6a1'
        let md5Data = md5(ph)
        let upData = signature + '&' + 'sign=' + md5Data
        console.log(upData)
        axios.post(api.forgetpsd, upData)
          .then(res => {
            console.log(res.data)
            Toast({
              showClose: true,
              message: '修改密码成功',
              type: 'success'
            })
            window.location.href = '/'
          }).catch(err => {
          alert(err)
        })
      },
      changeStyle () { // 两次密码一致性验证
        if (this.mobilePhone && this.GraphicCode && this.verifyCode && this.newloginPassword && this.newloginPassword2) {
          this.gradient = 'gradient'
        } else {
          this.gradient = ''
        }
      },
      // 判断手机号和图片验证码填写后才能获取验证码
      judgeGetCode () {
        if (this.mobilePhone === '') {
          alert("请填写手机号")
        } else {
          this.getCode()
        }
      },
      getCode () { // 获取验证码
        this.show = true
        this.Flags = false
        let item = setInterval(() => {
          if (this.values > 0) {
            this.values--
          } else {
            this.show = false;
            this.Flags = true;
            this.values = 60
          }
        }, 1000)
        clearInterval(this.item);
        let data = {
          mobilePhone: this.mobilePhone,
          type: this.type
        }
        // 加密（需要先加载lib/aes/aes.min.js文件）
        console.log(JSON.stringify(data));
        var en2 = encryption(JSON.stringify(data));
        console.log(en2.toString());
        var AfterEncryption = en2.ciphertext.toString().toUpperCase();
        // 签名
        let signature = "data=" + AfterEncryption + '&' + "type=" + this.type + '&' + "version=" + this.version
        const ph = signature + 'b2693d9c2124f3ca9547b897794ac6a1'
        const phData = md5(ph);// MD5加密
        const phdata = signature + '&' + "sign=" + phData
        axios.post(api.msg, phdata)
          .then(res => {
            console.log(res.data)
              Toast({
                showClose: true,
                message: '短信验证码已发送请注意查收',
                type: 'success'
              })
          }).catch(err => {
          alert(err)
        })
      }

    }
  }
</script>
<style>
</style>
