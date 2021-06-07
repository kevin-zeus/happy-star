import { FrownOutlined, HomeOutlined, WarningOutlined } from '@ant-design/icons';
import React, { lazy } from 'react';

import BasicLayout from '../layout/BasicLayout';
import BlankLayout from '../layout/BlankLayout';

const config = [
  {
    path: '/',
    component: BlankLayout,
    childRoutes: [
      {
        path: '/login',
        name: '登录页',
        component: lazy(() => import('../pages/Login')),
      },
      {
        path: '/',
        component: BasicLayout,
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            icon: <HomeOutlined />,
            component: lazy(() => import('../pages/Welcome')),
          },
          {
            path: '/default-admin',
            name: '默认模板',
            component: lazy(() => import('../pages/DefaultAdmin')),
          },
          {
            path: '/exception',
            name: '异常页',
            icon: <WarningOutlined />,
            childRoutes: [
              {
                path: '/exception/no-permissions',
                name: '无权限',
                icon: <FrownOutlined />,
                component: lazy(() => import('../pages/Exception/NoPermissions')),
              },
              {
                path: '/exception/not-found',
                name: '页面不存在',
                icon: <FrownOutlined />,
                component: lazy(() => import('../pages/Exception/NotFound')),
              },
              {
                path: '/exception/server-error',
                name: '服务器异常',
                icon: <FrownOutlined />,
                component: lazy(() => import('../pages/Exception/ServerError')),
              },
            ],
          },
          { path: '/', exact: true, redirect: '/welcome' },
          { path: '*', exact: true, redirect: '/exception/not-found' },
        ],
      },
    ],
  },
];

export default config;
