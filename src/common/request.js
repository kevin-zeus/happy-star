import axios from 'axios';
import { message } from 'antd';

import config from '../config';

const httpQueue = []; // 请求队列

const request = axios.create({
  baseURL: '',
});

request.interceptors.request.use((req) => {
  console.log(req);
  // 加入token
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.token = token;
  }
  httpQueue.push(req);

  return req;
});

request.interceptors.response.use(async (res) => {
  const { status, data } = res;
  if (status >= 400) {
    message.error('系统错误');
  }

  if (status >= 200 && status < 400) {
    if (data.code === config.CODE_TYPES.NO_PERMISSIONS) {
      // 如果未认证，直接跳转登录页
      message.error('登录过期，请重新登录');
      window.location.replace('/#/login');
    } else if (data.code === config.CODE_TYPES.TOKEN_OVERDUE) {
      // 如果认证过期，调起重新认证接口获取新token
      const ret = await axios.post(`${config.BASE_PATH}/platform/v1/login/refreshToken`, {
        token: localStorage.getItem('refreshToken'),
      });
      if (ret.data) {
        // 刷新token
        const { result } = ret.data;
        // 写入本地存储
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        // 重新发起上个失败的请求
        const req = httpQueue.shift();
        return request.post(req.url, req.data, {
          headers: {
            token: result.token, // 使用新token
          },
        });
      } else {
        // 刷新token失败
        message.error('登录过期，请重新登录');
        window.location.replace('/#/login');
      }
    } else if (data.code === '0') {
      httpQueue.shift();
      return [null, res.data];
    }
  }

  if (res.data?.msg) {
    message.error(res.data?.msg);
  }
  httpQueue.shift();
  return [res.data, null];
});

export default request;
