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
            path: '/business',
            name: '业务管理',
            childRoutes: [
              {
                path: '/business/goods-category',
                name: '商品分类',
                component: lazy(() => import('../pages/Business/GoodsCategory')),
              },
              {
                path: '/business/product',
                name: '商品管理',
                component: lazy(() => import('../pages/Business/Product')),
              },
              {
                path: '/business/grab-order',
                name: '抢单任务',
                exact: true,
                component: lazy(() => import('../pages/Business/GrabOrder')),
              },
              {
                path: '/business/rule-config',
                name: '返利规则',
                component: lazy(() => import('../pages/Business/RuleConfig')),
              },
              {
                path: '/business/partner',
                name: '合作商家',
                component: lazy(() => import('../pages/Business/Partner')),
              },
              {
                path: '/business/delivery',
                name: '发货管理',
                component: lazy(() => import('../pages/Business/Delivery')),
              },
            ],
          },
          {
            path: '/operator',
            name: '运营管理',
            childRoutes: [
              {
                path: '/operator/user-sign',
                name: '用户签到列表',
                component: lazy(() => import('../pages/Operator/UserSign')),
              },
              {
                path: '/operator/sign-reward',
                name: '签到奖励记录',
                component: lazy(() => import('../pages/Operator/SignReward')),
              },
              {
                path: '/operator/user-manager',
                name: '用户管理',
                component: lazy(() => import('../pages/Operator/UserManager')),
              },
            ],
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
