<!--二维码下载-->
<template>
  <div class="maya-bg">
    <div class="maya-logo">
      <img width="54%" src="../assets/image/maya-logo.png" alt="">
    </div>
    <div class="QR-code">
      <div class="Android-code">
        <div class="QR-code-icon" id="qrcode">
          <!--<img src="../assets/image/qrcode_1528453010.png" alt="">-->
        </div>
        <p>手机扫描二维码下载</p>
        <!--<img height="16px" src="../assets/image/Android.png" alt="">-->
        <!--<div class="btn">
          <button @click="az()">安卓下载</button>
          <button @click="ios()">IOS下载</button>
        </div>-->
      </div>
      <!--<div class="IOS-code">-->
        <!--<div class="QR-code-icon" id="qrcode2">-->
          <!--&lt;!&ndash;<img src="../assets/image/code.png" alt="">&ndash;&gt;-->
        <!--</div>-->
        <!--<p>手机扫描二维码下载</p>-->
        <!--<img height="16px" src="../assets/image/IOS.png" alt="">-->
        <!--<div class="btn">-->
          <!--<button @click="ios()">下载</button>-->
        <!--</div>-->
      <!--</div>-->
    </div>
		<div class="btn" @click="az()">
      <button>安卓下载</button>
    </div>
    <div class="btn" @click="ios()">
      <button>IOS下载</button>
    </div>
    <div class="text-maya">全球首个消费4.0的移动互联网商城</div>
  </div>
</template>

<script>
  //	import QRCode from '../../common/js/qrcode.js'
  import Sidentify from '../components/identify'
  import { Toast } from 'mint-ui' // 提示框
  import axios from '../utils/request'
  import api from '../api/index.js'
  import CryptoJS from 'crypto-js/crypto-js'
  import { encryption } from '../utils/my-crypto-js'
  // import AES from 'crypto-js/aes'
  import md5 from 'crypto-js/md5'
	import QRCode from '../utils/qrcode'
  export default {
    data(){
      return{
        text:'www.baidu.com',
        text2:'56663159'
      }
    },
    mounted () {
      // let obj = {
      //   'androidUrl':'dfdfdfdd',
      //   'iosUrl': '123355666'
      // }
      // let str = JSON.stringify(obj)// parse 转字符串
      // sessionStorage.obg = str
      // let code = 'https://fir.im/mayamall'
      let text = 'https://maya.shop/activity/index.html#/codeUrl'
      // let text2 = 'https://fir.im/mayamall'// ios
      this.qrcode(qrcode,text)
      // this.qrcode2(qrcode2,text2)
    },
    methods: { // https://maya.shop/activity/index.html#/codeUrl
      qrcode (obg , text) {
         let qrcode = new QRCode(obg, {
           width: 120,
           height: 120, // 高度
           text: text // 二维码内容
           // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
           // background: '#f0f'
           // foreground: '#ff0'
         })
        // 读取
        // let str = sessionStorage.obg;
        // 重新转换为对象
        // let obj = JSON.parse(str);
         //console.log(qrcode)
      },
      // 下载按钮
      az () {
        window.location.href = 'http://maya.shop/images/appversion/maya1.0.apk'
      },
      ios () {
        window.location.href = 'https://itunes.apple.com/cn/app/%E5%A6%88%E5%91%80%E5%95%86%E5%9F%8E/id1394347313?mt=8'
      }
    }
	}
</script>

<style scoped>
  body,html{
    height: 100%;
  }
  .maya-bg{
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/image/xz-bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .maya-logo{
    text-align: center;
    padding-top: 15%;
  }
  .QR-code{
    margin: 10% 20px 10% 20px;
    display: flex;
    justify-content: space-around;
  }
  .Android-code{
    /*width: 50%;*/
    padding: 15px 15px 0 15px;
    text-align: center;
  }
  .Android-code,.IOS-code{
    background-color: #fff;
    border-radius: 5px;
    text-align: center;
    padding: 15px 15px 0;
  }
  .Android-code .QR-code-icon >img,.IOS-code .QR-code-icon>img{
    display: block;
    margin: 0 auto;
    margin: 15px 0;
    width: 100% !important;
  }
  .Android-code>p,.IOS-code>p{
    text-align: center;
    font-size: small;
    margin-top: 15px;
    padding-bottom: 20px;
  }
  .Android-code .QR-code-icon,.IOS-code .QR-code-icon{
    /*margin: 20px;*/
  }
  .Android-code .QR-code-icon img,.IOS-code .QR-code-icon img{
    width: 100%;
  }
 .btn{
   margin: 0 auto;
   font-size: medium;
   margin-bottom: 15px;
   width: 42%;
  }
  .btn button{
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    background-image: url("../assets/image/code_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
  }
  .Android-code .btn button:focus,.IOS-code .btn button:focus{
    background-color: #208f30;
  }
  .text-maya{
    font-size: 16px;
    text-align: center;
    color: #f6ae0c;
    /*position: fixed;*/
    width: 100%;
    /*bottom: 5%;*/
  }
  #qrcode2>img,#qrcode>img{
    width: 100%;
  }
</style>
