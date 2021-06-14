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
    return this.post('​/platform​/v1​/system​/server​/create', {
      name, type, account,
    });
  }

  update({
    server_id, name, type, account,
  }) {
    return this.post('​/platform​/v1​/system​/server​/update', {
      server_id, name, type, account,
    });
  }

  edit({
    server_id,
  }) {
    return this.post('/platform​/v1​/system​/server​/edit', {
      server_id,
    });
  }

  remove({
    server_id,
  }) {
    return this.post('/platform​/v1​/system​/server​/remove', {
      server_id,
    });
  }
}

export default new ServerApi();
