/* eslint-disable camelcase */
import BaseApi from '../base';

class EargingApi extends BaseApi {
  getList({
    current, pageSize, earning_log_id, type,
  }) {
    return this.post('/platform/v1/platform/earging/list', {
      page: current,
      pageSize,
      earning_log_id,
      type,
    });
  }

  bank({
    bank_name, bank_card,
  }) {
    return this.post('/platform/v1/platform/earging/bank', {
      bank_card,
      bank_name,
    });
  }

  setType({
    type,
  }) {
    return this.post('/platform/v1/platform/earging/type', {
      type,
    });
  }
}

export default new EargingApi();
