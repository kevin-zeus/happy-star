/* eslint-disable camelcase */
import BaseApi from '../base';

class DynamicApi extends BaseApi {
  getList({
    current, pageSize, dynamic_id, status,
  }) {
    return this.post('/platform/v1/content/dynamic/list', {
      page: current,
      pageSize,
      dynamic_id,
      status,
    });
  }

  audit({
    dynamic_id, status, comment,
  }) {
    return this.post('/platform/v1/content/dynamic/audit', {
      dynamic_id,
      status,
      comment,
    });
  }
}

export default new DynamicApi();
