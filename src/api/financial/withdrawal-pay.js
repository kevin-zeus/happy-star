/* eslint-disable camelcase */
import BaseApi from '../base';

class WithdrawalPay extends BaseApi {
  // 获取提现申请列表
  getList({
    current, pageSize, user_withdrawal_id, name, status,
  }) {
    return this.post('/platform/v1/user/withdrawal-pay/list', {
      page: current,
      pageSize,
      user_withdrawal_id,
      name,
      status,
    });
  }

  // 提现审核
  pay({
    user_withdrawal_id, state, comment,
  }) {
    return this.post('/platform/v1/user/withdrawal-pay/pay', {
      user_withdrawal_id,
      state,
      comment,
    });
  }
}

export default new WithdrawalPay();
