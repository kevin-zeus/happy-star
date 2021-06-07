import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, Button, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import UserApi from '../../api/user';
import { setUserInfo } from '../../store/user';
import { setHeaderMenus } from '../../store/global';
import './style.scss';

const userApi = new UserApi();

const LoginPage = () => {
  // router
  const history = useHistory();
  // store
  const globalStore = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const [, res] = await userApi.login(values);
    if (res) {
      message.success('登录成功，即将跳转...', 2);
      const { data } = res;
      localStorage.setItem('Authorization', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(setUserInfo(data));
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }

    const [, ret] = await userApi.getRoutes();
    if (ret) {
      dispatch(setHeaderMenus(ret.data));
    }
  };

  return (
    <div className="page-login">
      <Form onFinish={handleSubmit} className="login-form">
        <div className="login-title">欢迎登录 {globalStore.appTitle}</div>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
