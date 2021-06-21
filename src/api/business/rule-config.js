/* eslint-disable camelcase */
import BaseApi from '../base';

class RuleConfigApi extends BaseApi {
  getList() {
    return this.post('/platform/v1/product/rule-config/list');
  }

  update({
    product_rule_config_id, number, price, rebate, day,
  }) {
    return this.post('/platform/v1/product/rule-config/update', {
      product_rule_config_id,
      number,
      price,
      rebate,
      day,
    });
  }

  // 计算价格
  calculate({
    price,
  }) {
    return this.post('/platform/v1/product/rule-config/calculate', {
      price,
    });
  }
}

export default new RuleConfigApi();
