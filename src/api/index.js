const baseURL = 'https://maya.shop:8088'
// const baseURL = "https://pre-www.huiyuntong.com/app/login/"  //测试环境
const api = {
  register: baseURL + '/siteuser/v1/register', // 注册接口
  login: baseURL + '/siteuser/v1/login',
  msg: baseURL + '/siteuser/v1/send_msg',
  msgs: 'siteuser/v1/send_msg',
  forgetpsd: baseURL + '/siteuser/v1/forget_login_password',
  bind: baseURL + '/situserbankcard/bind',
  registerForH5: baseURL + '/siteuser/v1/registerForH5',// 推广注册接口
  version: 1,
  secrtKey: 'abcabc'
}

export default api
