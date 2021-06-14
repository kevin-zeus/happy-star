/* eslint-disable camelcase */
import BaseApi from '../base';

class WithdrawalApi extends BaseApi {
  // 获取提现申请列表
  getList({
    current, pageSize, user_withdrawal_id, name, status,
  }) {
    return this.post('/platform/v1/user/withdrawal/list', {
      page: current,
      pageSize,
      user_withdrawal_id,
      name,
      status,
    });
  }

  // 提现审核
  audit({
    user_withdrawal_id, status, comment,
  }) {
    return this.post('/platform/v1/user/withdrawal/audit', {
      user_withdrawal_id,
      status,
      comment,
    });
  }
}

export default new WithdrawalApi();
