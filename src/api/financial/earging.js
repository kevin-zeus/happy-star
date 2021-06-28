/* eslint-disable camelcase */
import BaseApi from '../base';

class EargingApi extends BaseApi {
  // 账号交易明细
  getList({
    current, pageSize, earging_log_id, type,
  }) {
    return this.post('/platform/v1/platform/earging/list', {
      page: current,
      pageSize,
      earging_log_id,
      type,
    });
  }

  bank({
    bank_name, bank_card,
  }) {
    return this.post('/platform/v1/platform/earging/bank', {
      bank_name,
      bank_card,
    });
  }

  type({
    pay_type = [], limit_price,
  }) {
    return this.post('/platform/v1/platform/earging/type', {
      pay_type,
      limit_price,
    });
  }
}

export default new EargingApi();
