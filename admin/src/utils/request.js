import axios from 'axios';
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

// // 添加响应拦截器
// service.interceptors.response.use(response => {
//   const res = response.data;
//   if (res.code !== 0) {
//     message.error(`${res.data}`)
//   }
//   // history.push("/login/");
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 对响应错误做点什么\
//   message.error(`登录超时`)
//   return Promise.reject(error);
// });


export default service;