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
                path: '/business/product',
                name: '商品管理',
                childRoutes: [
                  {
                    path: '/business/product/goods-category',
                    name: '商品分类',
                    component: lazy(() => import('../pages/Business/GoodsCategory')),
                  },
                  {
                    path: '/business/product/product',
                    name: '商品管理',
                    component: lazy(() => import('../pages/Business/Product')),
                  },
                  {
                    path: '/business/product/rule-config',
                    name: '返利规则',
                    component: lazy(() => import('../pages/Business/RuleConfig')),
                  },
                ],
              },
              {
                path: '/business/grab-order',
                name: '抢单任务',
                exact: true,
                component: lazy(() => import('../pages/Business/GrabOrder')),
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
                path: '/operator/sign',
                name: '签到管理',
                childRoutes: [
                  {
                    path: '/operator/sign/user-sign',
                    name: '用户签到列表',
                    component: lazy(() => import('../pages/Operator/UserSign')),
                  },
                  {
                    path: '/operator/sign/sign-reward',
                    name: '签到奖励记录',
                    component: lazy(() => import('../pages/Operator/SignReward')),
                  },
                ],
              },
              {
                path: '/operator/user-manager',
                name: '用户管理',
                component: lazy(() => import('../pages/Operator/UserManager')),
              },
              {
                path: '/operator/user-detail/:id',
                name: '用户详情',
                component: lazy(() => import('../pages/Operator/UserDetail')),
              },
              {
                path: '/operator/content',
                name: '内容管理',
                childRoutes: [
                  {
                    path: '/operator/content/banner',
                    name: '轮播图管理',
                    component: lazy(() => import('../pages/Operator/Banner')),
                  },
                  {
                    path: '/operator/content/richtext',
                    name: '图文详情配置',
                    component: lazy(() => import('../pages/Operator/Content')),
                  },
                  {
                    path: '/operator/content/comment',
                    name: '评论审核',
                    component: lazy(() => import('../pages/Operator/Comment')),
                  },
                  {
                    path: '/operator/content/dynamic',
                    name: '动态审核',
                    component: lazy(() => import('../pages/Operator/Dynamic')),
                  },
                  {
                    path: '/operator/content/dynamic-config',
                    name: '动态数据',
                    component: lazy(() => import('../pages/Operator/DynamicConfig')),
                  },
                  {
                    path: '/operator/content/task-config',
                    name: '抢单任务清单',
                    component: lazy(() => import('../pages/Operator/TaskConfig')),
                  },
                ],
              },
            ],
          },
          {
            path: '/financial',
            name: '财务管理',
            childRoutes: [
              {
                path: '/financial/work',
                name: '财务工作',
                childRoutes: [
                  {
                    path: '/financial/work/withdrawal',
                    name: '提现审核',
                    component: lazy(() => import('../pages/Financial/WithDrawal')),
                  },
                  {
                    path: '/financial/work/withdrawal-pay',
                    name: '提现打款',
                    component: lazy(() => import('../pages/Financial/WithDrawalPay')),
                  },
                  {
                    path: '/financial/work/recharge',
                    name: '人工转账审核',
                    component: lazy(() => import('../pages/Financial/Recharge')),
                  },
                ],
              },
              {
                path: '/financial/earging',
                name: '账户交易明细',
                component: lazy(() => import('../pages/Financial/Earging')),
              },
              {
                path: '/financial/count',
                name: '财务报表',
                childRoutes: [
                  {
                    path: '/financial/count/report-day',
                    name: '财务日报表',
                    component: lazy(() => import('../pages/Financial/ReportDay')),
                  },
                  {
                    path: '/financial/count/report',
                    name: '财务业绩报表',
                    component: lazy(() => import('../pages/Financial/Report')),
                  },
                ],
              },
            ],
          },
          {
            path: '/system',
            name: '系统管理',
            childRoutes: [
              {
                path: '/system/base',
                name: '基础配置',
                childRoutes: [
                  {
                    path: '/system/base/dynamic',
                    name: '最新动态',
                    component: lazy(() => import('../pages/System/Dynamic')),
                  },
                  {
                    path: '/system/base/server',
                    name: '客服账号',
                    component: lazy(() => import('../pages/System/Server')),
                  },
                  {
                    path: '/system/base/sign',
                    name: '签到奖励',
                    component: lazy(() => import('../pages/System/Sign')),
                  },
                  {
                    path: '/system/base/invite',
                    name: '邀请奖励',
                    component: lazy(() => import('../pages/System/Invite')),
                  },
                ],
              },
              {
                path: '/system/account',
                name: '账号权限管理',
                childRoutes: [
                  {
                    path: '/system/account/admin',
                    name: '账号管理',
                    component: lazy(() => import('../pages/System/Admin')),
                  },
                  {
                    path: '/system/account/department',
                    name: '部门管理',
                    component: lazy(() => import('../pages/System/Department')),
                  },
                  {
                    path: '/system/account/role',
                    name: '角色管理',
                    component: lazy(() => import('../pages/System/Role')),
                  },
                ],
              },
              {
                path: '/system/change-password/:id',
                name: '修改密码',
              },
              {
                path: '/system/role-rule/:id',
                name: '编辑角色权限',
                component: lazy(() => import('../pages/System/EditRule')),
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
