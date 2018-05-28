<template>
    <!--授权中间页-->
   <div>授权中</div>
</template>

<script>
export default {
  data () {
    return {token: ''}
  },
  computed: {

  },
  created () {
    // 检测会员有没有登录
    if (!localStorage.getItem('openid')) {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        // 跳转到微信授权页面
        window.location.href = this.webUrl + '/Wap/User/getOpenid'
      }
    } else {
      // 如果有token 但是vuex中没有用户登录信息则做登录操作
      this.login()
    }
  },
  methods: {
    login () {
      let url = this.webUrl + '/Wap/User/info'
      // 通过cookie中保存的token 获取用户信息
      this.$http.get(url).then(response => {
        response = response.body
        if (response) {
          // 保存用户登录状态(Vuex)
          this.$store.commit('user', response)
          setTimeout(() => {
            this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
          }, 2000)
        }else{
          this.$alert('服务器撸猫去惹 :(', 'wrong')
          if(localStorage.getItem('openid')) {
            // 跳转到微信授权页面
            window.location.href = this.webUrl + '/Wap/User/getOpenid'
          }
        }
      })
    }
  },
  watch: {},
  components: {},
  mounted: function () {}}
</script>
<style scoped>

</style>
