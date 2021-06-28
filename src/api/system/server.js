/* eslint-disable camelcase */
import BaseApi from '../base';

class ServerApi extends BaseApi {
  getList({
    current, pageSize,
  }) {
    return this.post('/platform/v1/system/server/list', {
      page: current,
      pageSize,
    });
  }

  // account = [{ name, account}]
  create({
    name, type, account,
  }) {
    console.log('准备发起请求');
    return this.post('/platform/v1/system/server/create', {
      name, type, account,
    });
  }

  update({
    service_id, name, type, account,
  }) {
    return this.post('/platform/v1/system/server/update', {
      service_id, name, type, account,
    });
  }

  edit({
    service_id,
  }) {
    return this.post('/platform/v1/system/server/edit', {
      service_id,
    });
  }

  remove({
    service_id,
  }) {
    return this.post('/platform​/v1​/system​/server​/remove', {
      service_id,
    });
  }
}

export default new ServerApi();
