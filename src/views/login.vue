<template>
  <div class="maya-login gradient2">
    <h3>登录</h3>
    <div class="maya-closed"><span class="maya-m-icon"></span></div>
    <img src="../assets/image/maya-logo.png" alt="MAYA商城" class="maya-logo">
    <section class="maya-login-from">
      <div class="mt-filed-log">
        <label></label>
        <input type="number" v-model="loginName" @keyup='changeStyle' placeholder="请输入您的手机号">
      </div>
      <div class="mt-filed-log">
        <label></label>
        <input type="password" v-model="loginPassword" @keyup='changeStyle' placeholder="请输入您的登录密码">
      </div>
      <mt-button type="primary" class="maya-login-btn" :class="gradient" @click='MayaLogin'>登录</mt-button>
      <!--<mt-field label="账号" placeholder="请输入你的手机号" type = "text" :readonly = '!toggle' :disableClear = '!toggle' v-model = "account"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" :readonly='!toggle' :disableClear = '!toggle'></mt-field>-->
      <section class="maya-login-link">
        <router-link to="/register"><span>注册</span></router-link>
        <router-link to="/forgetpsd"><b>忘记密码?</b></router-link>
      </section>
    </section>
    <!--<div class="login-way">-->
      <!--<p><img src="../assets/image/qt-login.png" alt=""></p>-->
      <!--<div class="login-wx"><img src="../assets/image/wx-login.png" alt=""></div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui' // 提示框
  import axios from '../utils/request'
  import api from '../api/index.js'
  // import AES from 'crypto-js/aes'
  import md5 from 'crypto-js/md5'
  import { encryption } from '../utils/my-crypto-js'

  export default {
    data () {
      return {
        gradient: '', // gradient
        loginName: '',
        loginPassword: '',
        timeStamp: '2018-01-25 12:32:21',
        version: api.version
      }
    },
    methods: {
      MayaLogin () {
        // console.log(api);
        // const secrtKey = api.secrtKey;
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        const loginPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        const logintell = this.loginName
        const loginPassword = this.loginPassword
        const data = {
            loginName: this.loginName,
            loginPassword: this.loginPassword
        };
        // aes 加密
        // console.log(JSON.stringify(data));
        let phoneDatas = encryption(JSON.stringify(data));
        let AfterEncryption = phoneDatas.ciphertext.toString().toUpperCase();
        // console.log(AfterEncryption)// 加密后的串
       // console.log(AfterEncryption)
        // 签名 (传到后台的数据 = (加密后的data+时间戳 + 版本号) +"&" + 'sign=' + md5((加密后的data+时间戳 + 版本号)+key)  )
        let signatureObj = 'data=' + AfterEncryption + '&' + 'timeStamp=' + '2018-01-25 12:32:21' + '&' + 'version=' + api.version
        const signsi = signatureObj + 'b2693d9c2124f3ca9547b897794ac6a1'
        const dataSifn = md5(signsi);// MD5加密
        const uData = signatureObj + '&' + 'sign=' + dataSifn
        if (!myreg.test(logintell)) {
          MessageBox({
            title: '提示信息',
            message: '请输入正确的手机号：'
          })
          return false;
        } else {
          if (!loginPass.test(loginPassword)) {
            MessageBox({
              title: '提示信息',
              message: '请输入6到18位数字和字母组成'
            })
          } else {
            axios.post(api.login, uData)
              .then(res => {
                // console.log(res)
                if (res.status === 200) {
                  const result = res.data
                  if (result.result_code === '200') {
                    // 设置cookie ...
                    // 跳转到首页 ...
                    window.location.href = 'downloadPrompt'
                  } else {
                    MessageBox({
                      title: '登录失败1',
                      message: result.result_info
                    })
                  }
                }
              }).catch(err => {
              MessageBox({
                title: '登录失败2',
                message: '接口异常：' + err
              })
            })
            return true
          }
        }
      },
      changeStyle () {
        if (this.loginPassword && this.loginName) {
          this.gradient = 'gradient'
        } else {
          this.gradient = ''
        }
      }
    }

  }
</script>

<style scoped>
  input:-webkit-autofill {
    background: none !important;
  }

  .maya-login {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .maya-login h3 {
    text-align: center;
    height: 0.88rem;
    width: 100%;
    line-height: 0.88rem;
    color: #fff;
    font-size: 0.36rem;
    margin-bottom: 1.7rem;
  }

  .maya-logo {
    display: block;
    margin: 0 auto 1.4rem;
    width: 3.1rem;
  }

  .maya-login-from {
    width: 5rem;
    margin: 0 auto;
  }

  .mt-filed-log {
    width: 5rem;
    border-radius: 0.1rem;
    display: flex;
    height: 0.78rem;
    border: thin solid #fff;
    margin-bottom: 0.3rem;
  }

  .mt-filed-log label {
    position: relative;
    display: block;
    width: 0.6rem;
    height: 100%;
    background: #ae95bc;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }

  .mt-filed-log label:after {
    content: '';
    position: absolute;
    background: url("../assets/image/maya-icon.png") no-repeat;
    background-size: 2rem 2rem;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .maya-login-from .mt-filed-log:first-child label:after {
    width: 0.24rem;
    height: 0.3rem;
    background-position: 0 0;
  }

  .maya-login-from .mt-filed-log:nth-child(2) label:after {
    width: 0.28rem;
    height: 0.28rem;
    background-position: 0 -0.38rem;
  }

  .mt-filed-log input {
    padding-left: 0.3rem;
    color: #fff;
    background: none;
  }

  .mt-filed-log input::-webkit-input-placeholder {
    color: #775b8f;
  }

  .maya-login-btn {
    width: 100%;
    margin-bottom: 0.2rem;
    background: #62527a;
  }

  .maya-login-link {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.28rem;
  }

  .maya-login-link span {
    color: #8e57ff;
  }

  .maya-login-link b {
    float: right;
    color: #858585;
  }

  .maya-closed {
    position: absolute;
    top: 0;
    right: 0.3rem;
    height: 0.88rem;
    line-height: 0.88rem;
    padding-top: 0.32rem;
    box-sizing: content-box;
  }

  .maya-closed span {
    content: '';
    display: block;
    width: 0.26rem;
    height: 0.24rem;
    background-position: 0 -0.76rem;
  }
  .login-way p{
    width: 5rem;
    margin: 0 auto;
  }
  .login-way p img{
    width: 100%;
  }
  .login-way .login-wx{
    text-align: center;
  }
  .login-way .login-wx img{
    width: 50px;
    margin-top: -65px;
  }
</style>
