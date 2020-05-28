import axios from 'axios';
import { message } from 'antd';
const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/admin/',
  timeout: 1000 * 12,
});

service.defaults.withCredentials = true;

// 添加请求拦截器
// service.interceptors.request.use(config => {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

// 添加响应拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  if (res.code === 3) {
    message.warning('尚未登录 即将跳转登录页面');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000)

    return Promise.reject(response);
  }
  // history.push("/login/");
  // 对响应数据做点什么
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default service;