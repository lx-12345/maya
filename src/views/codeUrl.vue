<template>

</template>

<script>
    export default {
      name: "codeUrl",
      data () {
        return {

        }
      },
      mounted () {
        let Terminal = {
          // 辨别移动终端类型
          platform: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
              // android终端或者uc浏览器
              android: app.indexOf('Android') > -1 || app.indexOf('Linux') > -1,
              // 是否为iPhone或者QQHD浏览器
              iPhone: app.indexOf('iPhone') > -1,
              // 是否iPad
              iPad: app.indexOf('iPad') > -1
            };
          }(),
          // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        // 根据不同的终端，跳转到不同的地址
        var theUrl = '';
        if (Terminal.platform.android) {
          theUrl = 'https://maya.shop/images/appversion/maya1.0.apk';
        } else if (Terminal.platform.iPhone) {
          theUrl = 'https://fir.im/mayamall';
        }
        location.href = theUrl
      }
    }
</script>

<style scoped>

</style>
