module.exports = {
  'POST /api/routes': {
    code: '200',
    msg: 'ok',
    data: [
      {
        path: '/business',
        name: '业务管理',
        isHead: true,
        icon: '',
        childRoutes: [
          {
            path: '/goods',
            name: '商品管理',
            isMenu: true,
            icon: '',
            childRoutes: [
              {
                path: '/goods/category',
                name: '分类管理',
                componentPath: '@pages/goods/Category',
                isMenu: true,
                icon: '',
              },
              {
                path: '/goods/list',
                name: '商品列表',
                componentPath: '@pages/goods/List',
                isMenu: true,
                icon: '',
              },
              {
                path: '/goods/interest',
                name: '返利规则',
                componentPath: '@pages/goods/Interest',
                isMenu: true,
                icon: '',
              },
            ]
          },
        ],
      },
      {
        path: '/operate',
        name: '运营管理',
        isHead: true,
        childRoutes: [

        ],
      },
      {
        path: '/financial',
        name: '财务管理',
        isHead: true,
        childRoutes: [

        ],
      },
      {
        path: '/system',
        name: '系统配置',
        isHead: true,
        childRoutes: [

        ],
      },
    ]
  },
}
