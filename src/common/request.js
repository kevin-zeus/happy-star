import axios from 'axios';
import { message } from 'antd';

import config from '../config';

const httpQueue = []; // 请求队列

const request = axios.create({
  baseURL: '/api',
});

request.interceptors.request.use((req) => {
  // 加入token
  const token = localStorage.getItem('Authorization');
  if (token) {
    req.headers.token = token;
  }
  httpQueue.push(req);

  return req;
});

request.interceptors.response.use((res) => {
  const { status, data } = res;
  if (status >= 400) {
    message.error('系统错误');
  }

  if (status >= 200 && status < 400) {
    // 如果未认证，直接跳转登录页
    if (data.code === config.CODE_TYPES.NO_PERMISSIONS) {
      message.error('登录过期，请重新登录');
      window.location.replace('/#/login');
    } else if (data.code === config.CODE_TYPES.TOKEN_OVERDUE) { // 如果认证过期，调起重新认证接口获取新token
      // TODO:
    } else { // 请求成功，httpQueue 内请求出队列
      return [null, res.data];
    }
  }

  if (res.data?.msg) {
    message.error(res.data?.msg);
  }
  return [res.data, null];
});

export default request;
