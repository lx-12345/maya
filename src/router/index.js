import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router) ;
// 按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['../views/index.vue'], resolve)
const Login = resolve => require(['../views/login.vue'], resolve)
const Register = resolve => require(['../views/register.vue'], resolve)
const ForgetPassword = resolve => require(['../views/forgetpsd.vue'], resolve)
const TiedCard = resolve => require(['../views/tiedcard.vue'], resolve)
const DownloadPrompt = resolve => require(['../views/downloadPrompt.vue'], resolve)
const codeUrl = resolve => require(['../views/codeUrl.vue'], resolve)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgetpsd',
      name: 'forgetpsd',
      component: ForgetPassword
    },
    {
      path: '/codeUrl',
      name: 'codeUrl',
      component: codeUrl
    },
    {
      path: '/tiedcard',
      name: 'tiedcard',
      component: TiedCard
    },
    {
      path: '/downloadPrompt',
      name: 'downloadPrompt',
      component: DownloadPrompt
    }
  ]
})
