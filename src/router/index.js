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
const login2 = resolve => require(['../views/login2.vue'], resolve)

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
      path: '/tiedcard',
      name: 'tiedcard',
      component: TiedCard
    },
    {
      path: '/downloadPrompt',
      name: 'downloadPrompt',
      component: DownloadPrompt
    },
    {
      path: '/login2',
      name: 'login2',
      component: login2
    }
  ]
})
