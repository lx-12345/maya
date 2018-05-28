import axios from 'axios'
// import {message} from 'antd';
// import browserCookie from 'browser-cookies';
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://10.99.206.102:8084';
axios.interceptors.request.use(function (config) {
  // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  // 'Content-Type': 'application/json;charset=UTF-8'

  // const userInfo = browserCookie.get("current_user");
  // if (userInfo) {
  //   const user = JSON.parse(userInfo);
  //   config.headers['X-Auth-Token'] = user.token;
  // }
  return config
})
axios.interceptors.response.use(function (config) {
  // if (config.data.code === -1) {
  //   browserCookie.erase('current_user');
  //   // message.error('登陆信息超时，请重新登陆', 5);
  // }
  return config
})

export default axios

