const baseURL = 'https://47.105.33.225:8088'
// const baseURL = "https://pre-www.huiyuntong.com/app/login/"  //测试环境
const api = {
  register: baseURL + '/siteuser/v1/register', // 注册接口
  login: baseURL + '/siteuser/v1/login',
  msg: baseURL + '/siteuser/v1/send_msg',
  forgetpsd: baseURL + '/siteuser/v1/forget_login_password',
  bind: baseURL + '/situserbankcard/bind',
  version: 1,
  secrtKey: 'abcabc'
}

export default api
