/* eslint-disable camelcase */
import BaseApi from '../base';

class ReportApi extends BaseApi {
  // 获取提现申请列表
  day({
    current, pageSize,
  }) {
    return this.post('/platform/v1/system/report/day', {
      page: current,
      pageSize,
    });
  }

  // 业绩报表
  getList({
    current, pageSize, month,
  }) {
    return this.post('/platform/v1/system/report/list', {
      page: current,
      pageSize,
      month,
    });
  }
}

export default new ReportApi();
