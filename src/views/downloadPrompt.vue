<!--二维码下载-->
<template>
  <div class="maya-bg">
    <div class="maya-logo">
      <img width="54%" src="../assets/image/maya-logo.png" alt="">
    </div>
    <div class="QR-code">
      <div class="Android-code">
        <div class="QR-code-icon" id="qrcode">
          <!--<img src="../assets/image/code.png" alt="">-->
        </div>
        <p>手机扫描二维码下载</p>
        <!--<img height="16px" src="../assets/image/Android.png" alt="">-->
        <div class="btn">
          <button>下载</button>
        </div>
      </div>
      <!--<div class="IOS-code">-->
        <!--<div class="QR-code-icon" id="qrcode2">-->
          <!--&lt;!&ndash;<img src="../assets/image/code.png" alt="">&ndash;&gt;-->
        <!--</div>-->
        <!--<p>手机扫描二维码下载</p>-->
        <!--<img height="16px" src="../assets/image/IOS.png" alt="">-->
        <!--<div class="btn">-->
          <!--<button>下载</button>-->
        <!--</div>-->
      <!--</div>-->
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
      let obj = {
        'androidUrl':'dfdfdfdd',
        'iosUrl': '123355666'
      }
      let str = JSON.stringify(obj)// parse 转字符串
      sessionStorage.obg = str
      let code = 'https://fir.im/mayamall'
      this.qrcode(qrcode,code)
    },
    methods: {
      qrcode (obg,text) {
	      let qrcode = new QRCode(obg, {
	        width: 150,
	        height: 150, // 高度
	        text: text // 二维码内容
	        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
	        // background: '#f0f'
	        // foreground: '#ff0'
	      })
        // 读取
        let str = sessionStorage.obg;
        // 重新转换为对象
        let obj = JSON.parse(str);
	      //console.log(qrcode)
		  }
    }
	}
</script>

<style scoped>
  .maya-bg{
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/image/xz-bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .maya-logo{
    text-align: center;
    padding-top: 25%;
  }
  .QR-code{
    margin: 18% 20px 15% 20px;
    display: flex;
    justify-content: space-around;
  }
  .Android-code,.IOS-code{
    background-color: #fff;
    border-radius: 5px;
  }
  .Android-code>img,.IOS-code>img{
    display: block;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .Android-code>p,.IOS-code>p{
    text-align: center;
    font-size: small;
    margin-bottom: 15px;
  }
  .Android-code .QR-code-icon,.IOS-code .QR-code-icon{
    margin: 20px;
  }
  .Android-code .QR-code-icon img,.IOS-code .QR-code-icon img{
    width: 100%;
  }
  .Android-code .btn,.IOS-code .btn{
   margin: 20px 10px;
    font-size: medium;
  }
  .Android-code .btn button,.IOS-code .btn button{
    width: 100%;
    height: 36px;
    line-height: 30px;
    border-radius: 5px;
    background-color: #24aa37;
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
    position: fixed;
    width: 100%;
    bottom: 10%;
  }
</style>
