/* eslint-disable camelcase */
import BaseApi from '../base';

class RechargeApi extends BaseApi {
  // 获取人工转账申请列表
  getList({
    current, pageSize, user_recharge_id, name, status,
  }) {
    return this.post('/platform/v1/user/withdrawal/list', {
      page: current,
      pageSize,
      user_recharge_id,
      name,
      status,
    });
  }

  // 人工转账审核
  audit({
    user_recharge_id, status, comment,
  }) {
    return this.post('/platform/v1/user/withdrawal/audit', {
      user_recharge_id,
      status,
      comment,
    });
  }
}

export default new RechargeApi();
