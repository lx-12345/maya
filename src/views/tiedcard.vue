<template>
  <!--绑定银行卡-->
  <div>
    <v-header>
      <h1 slot="title">添加银行卡</h1>
    </v-header>
    <section class="maya-reg-from">
      <div class="mt-field">
        <label>姓名：</label><input type="tel" placeholder="请输入姓名" v-model='mtusername' value="" @keyup='changeStyle()'>
      </div>
      <div class="mt-field">
        <label>身份证号：</label><input type="input" placeholder="请输入身份证号" id="verifyCode" v-model='userid' @keyup='changeStyle()'>
      </div>
      <div class="mt-field"  @click='checkcard()'>
        <label>银行：</label><input type="tel" placeholder="请选择银行" readonly="readonly" v-model="action" @keyup='changeStyle()'>
        <span class="icon-go"></span>
      </div>
      <div class="mt-field">
        <label>银行卡号：</label><input type="tel" placeholder="请输入银行卡号" v-model='cardid' value="" @keyup='changeStyle()'>
      </div>
      <div class="mt-field">
        <label>预留手机号：</label><input type="tel" placeholder="请输入预留手机号" v-model='cardphone' value="" @keyup='changeStyle()'>
      </div>
      <div class="mt-field">
        <label>开户行：</label><input type="tel" placeholder="请输入开户行" v-model='cardidname' value="" @keyup='changeStyle()'>
      </div>
    </section>
    <mt-button type="primary"  :class="gradient" class="maya-btn" @click="onKeep">保存</mt-button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Header from '../common/_header'
  import '../assets/css/style.css'
  import '../assets/css/maya-form.css'
  import { Actionsheet } from 'mint-ui'
  import axios from '../utils/request'
  import md5 from 'crypto-js/md5'
  import { encryption } from '../utils/my-crypto-js'
  import api from '../api/index.js'

  Vue.component(Actionsheet.name, Actionsheet)
  export default {
    components: {
      'v-header': Header
    },
    data () {
      return {
        gradient: '',
        mtusername: '',
        realName: '',
        userid: '',
        cardname: '',
        cardid: '',
        cardphone: '',
        cardidname: '',
        sheetVisible: false,
        action: '',
        value: '',
        cardType: 2,
        actions: [
          {name: '工商银行', value: '102', method: this.changeAction},
          {name: '建设银行', value: '105', method: this.changeAction},
          {name: '农业银行', value: '103', method: this.changeAction},
          {name: '招商银行', value: '308', method: this.changeAction},
          {name: '交通银行', value: '301', method: this.changeAction},
          {name: '中国银行', value: '104', method: this.changeAction},
          {name: '光大银行', value: '303', method: this.changeAction},
          {name: '民生银行', value: '305', method: this.changeAction},
          {name: '中信银行', value: '302', method: this.changeAction},
          {name: '兴业银行', value: '309', method: this.changeAction},
          {name: '广发银行', value: '306', method: this.changeAction},
          {name: '浦发银行', value: '310', method: this.changeAction},
          {name: '平安银行', value: '307', method: this.changeAction},
          {name: '华夏银行', value: '304', method: this.changeAction},
          {name: '邮政储蓄银行', value: '403', method: this.changeAction},
          {name: '北京银行', value: '313', method: this.changeAction},
          {name: '上海银行', value: '999', method: this.changeAction}
        ]
      }
    },
    methods: {
      checkcard () {
        this.sheetVisible = !this.sheetVisible
      },
      changeAction (blan) {
        this.action = blan.name
        this.value = blan.value
        console.log(this.value)
      },
      changeStyle () {
        if (this.mtusername && this.userid && this.action && this.cardid && this.cardphone && this.cardidname) {
          this.gradient = 'gradient'
        } else {
          this.gradient = ''
        }
      },
      onKeep () {
        let data = {
          cardNo: this.cardid,
          mobile: this.cardphone,
          realName: this.mtusername,
          idNo: this.userid,
          bankAddr: this.cardidname,
          bankCode: this.value,
          bankName: this.action,
          cardType: this.cardType
        }
        // aes 加密
        console.log(JSON.stringify(data));
        let phoneDatas = encryption(JSON.stringify(data));
        let AfterEncryption = phoneDatas.ciphertext.toString().toUpperCase();
        console.log(AfterEncryption)// 加密后的串
        console.log(AfterEncryption)
        // 签名 (传到后台的数据 = (加密后的data+时间戳 + 版本号) +"&" + 'sign=' + md5((加密后的data+时间戳 + 版本号)+key)  )
        let signatureObj = "data="+AfterEncryption + '&' + "timeStamp=" +'2018-01-25 12:32:21' + '&' + "version=" + api.version
        const signsi = signatureObj + "b2693d9c2124f3ca9547b897794ac6a1"
        const dataSifn = md5(signsi);// MD5加密
        const uData = signatureObj + "&" + "sign=" + dataSifn
        axios.post(api.bind, uData)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              const result = res.data
              if (result.result_code === '200') {
                // 设置cookie ...
                // 跳转到首页 ...
                window.location.href = 'https://www.baidu.com'
              } else {

              }
            }
          }).catch(err => {

        })
      }
    }
  }
</script>
<style>
  body {
    background: #f4f4f4
  }
  .mint-actionsheet-list {
    height: 300px;
    overflow: scroll;
  }
  .mint-actionsheet-listitem{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .maya-reg-from {
    background: #fff;
    border-top: thin solid #e5e5e5;
    border-bottom: thin solid #e5e5e5;
  }

  .maya-reg-from .mt-field:last-child {
    border: none
  }

  .mt-field {
    display: flex;
    flex: 1;
  }

  .mt-field input {
    width: 5.14rem;
    text-align: right;
  }

  input:-ms-input-placeholder {
    text-align: left;
  }

  input::-webkit-input-placeholder {
    text-align: left;
  }

  .maya-reg-from .mt-field:nth-child(3) {
    position: relative;
  }
  .maya-reg-from .mt-field:nth-child(3) input{
    width:4.5rem;}
  .mt-field span, .mt-field a {
    font-size: 0.46rem;
    right: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(90deg)
  }

  .mt-field icon-go:before {
    color: #c8c7cb;
  }
</style>
