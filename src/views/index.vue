<template>
    <div>首页</div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
   /*  name: 'register',
    data () {
      var validateUser = (rule, value, cb) => {
        var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
        if (value === '') {
          cb(new Error('请输入用户名'))
        } else if (!pattern.test(value)) {
          cb(new Error('请输入3-10个字母/汉字/数字/下划线'))
        } else {
          cb()
        }
      }
      var validatePwd = (rule, value, cb) => {
        var pattern = /^\S{3,20}$/g
        if (value === '') {
          cb(new Error('请输入密码'))
        } else if (!pattern.test(value)) {
          cb(new Error('请输入3-20个非空白字符'))
        } else {
          if (this.registerForm.checkPwd !== '') {
            this.$refs.registerForm.validateField('checkPwd')
          }
          cb()
        }
      }
      var validateCheckPwd = (rule, value, cb) => {
        if (value === '') {
          cb(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.pwd) {
          cb(new Error('两次输入密码不一致!'))
        } else {
          cb()
        }
      }
      return {
        registerForm: {
          userName: '',
          pwd: '',
          checkPwd: ''
        },
        registerRule: {
          userName: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePwd, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validateCheckPwd, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          ...
          } else {
            return false
          }
        })
      }
    }  */
  }
</script>

<style scoped>

</style>
