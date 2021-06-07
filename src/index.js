import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import './app.scss';

dayjs.locale('zh-cn');

const Entry = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);

ReactDOM.render(<Entry />, document.getElementById('root'));
