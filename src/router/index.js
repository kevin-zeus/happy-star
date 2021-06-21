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
              {
                path: '/operator/user-detail/:id',
                name: '用户详情',
              },
              {
                path: '/operator/banner',
                name: '轮播图管理',
              },
              {
                path: '/operator/richtext',
                name: '图文详情配置',
              },
              {
                path: '/operator/comment',
                name: '评论审核',
              },
              {
                path: '/operator/dynamic',
                name: '动态审核',
              },
              {
                path: '/operator/dynamic-config',
                name: '动态数据',
              },
              {
                path: '/operator/task-config',
                name: '抢单任务清单',
              },
            ],
          },
          {
            path: '/financial',
            name: '财务管理',
            childRoutes: [
              {
                path: '/financial/withdrawal',
                name: '提现审核',
              },
              {
                path: '/financial/withdrawal-pay',
                name: '提现打款',
              },
              {
                path: '/financial/recharge',
                name: '人工转账审核',
              },
              {
                path: '/financial/earging',
                name: '账户交易明细',
              },
              {
                path: '/financial/report-day',
                name: '财务日报表',
              },
              {
                path: '/financial/report',
                name: '财务业绩报表',
              },
            ],
          },
          {
            path: '/system',
            name: '系统管理',
            childRoutes: [
              {
                path: '/system/dynamic',
                name: '最新动态',
              },
              {
                path: '/system/server',
                name: '客服账号',
              },
              {
                path: '/system/sign',
                name: '签到奖励',
              },
              {
                path: '/system/invite',
                name: '邀请奖励',
              },
              {
                path: '/system/admin',
                name: '账号管理',
              },
              {
                path: '/system/change-password/:id',
                name: '修改密码',
              },
              {
                path: '/system/department',
                name: '部门管理',
              },
              {
                path: '/system/role',
                name: '角色管理',
              },
              {
                path: '/system/role-rule/:id',
                name: '编辑角色权限',
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
