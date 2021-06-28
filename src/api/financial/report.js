/* eslint-disable camelcase */
import BaseApi from '../base';

class ReportApi extends BaseApi {
  // 日报表
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
    current, pageSize, month, platform_id
  }) {
    return this.post('/platform/v1/system/report/list', {
      page: current,
      pageSize,
      month,
      platform_id,
    });
  }

  platform() {
    return this.post('/platform/v1/system/report/platform');
  }

  department() {
    return this.post('/platform/v1/system/report/department');
  }
}

export default new ReportApi();
