const mockjs = require('mockjs');

module.exports = {
  'POST /api/product/list': mockjs.mock({
    'data|10': [{
      'id': '@id',
      'category|1': ['食品', '数码', '玩具'],
      'status|1': ['1', '2'],
    }],
    'page': {
      'total': 20,
      'currentPage': 1,
    }
  }),
}
