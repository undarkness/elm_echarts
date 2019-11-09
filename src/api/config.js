/*
 * @Date: 2019-10-22 17:56:33
 */

import axios from "axios";
import { Message } from "element-ui";
// import store from "~/store/index";
// import Qs from 'qs'

//基础配置

// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "/v1";
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "/v1";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "/v1";
}
console.log(process.env.NODE_ENV);
axios.defaults.baseURL = "/v1";
axios.defaults.timeout = 5000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

  
//请求拦截器,添加token
axios.interceptors.request.use(
  // 在发送请求之前做些什么
  // config => {
  //   const token = store.state.token;
  //   token && (config.headers.Authorization = token);
  //   console.log(config);
  //   return config;
  // }
),
  error => {
    return Promise.reject(error);
  };

//响应拦截器（异常处理）
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    // console.log(response);
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    console.log(error);
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: "登录过期，请重新登录",
            duration: 1000,
            type: "error"
          });
          // 清除token
          localStorage.removeItem("token");
          store.commit("loginSuccess", null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          Message({
            message: "网络请求不存在",
            duration: 1500,
            type: "error"
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          console.log(error);
          Message({
            message: error.response.data.message,
            duration: 1500,
            type: "error"
          });
      }
      return Promise.reject(error.response);
    }
  }
);

const ERROR_OK = 0;

export default {
  /**
   * @description: get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url,
        params: param
      })
        .then(res => {
          resolve(res);
          const { status, data } = res;
          if (status !== ERROR_OK) {
            return data;
          }
        })
        .catch(error => {
          Message({
            message: error,
            type: "error",
            duration: 5000
          });
          reject(error);
        });
    });
  },

  /**
   * @description: post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @return:
   */
  post(url, param,data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url,
        params: param,
        data: data
      })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log(error);
          Message({
            message: error,
            type: "error",
            duration: 5000
          });
        });
      // reject(error);
    });
  },

  /**
   * @description: 多重并发请求
   * @param {function}
   * @return:
   */

  allGet(fnArr) {
    return axios.all(fnArr);
  }
};
