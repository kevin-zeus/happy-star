/* eslint-disable camelcase */
import BaseApi from '../base';

class RoleApi extends BaseApi {
  getAll() {
    return this.post('/platform/v1/product/role/all');
  }

  getList({
    current, pageSize,
  }) {
    return this.post('/platform/v1/product/role/list', {
      page: current,
      pageSize,
    });
  }

  create({
    role_name, permission,
  }) {
    return this.post('/platform/v1/product/role/create', {
      role_name,
      permission,
    });
  }

  update({
    role_name, auth_role_id, permission, active,
  }) {
    return this.post('/platform/v1/product/role/update', {
      role_name,
      auth_role_id,
      permission,
      active,
    });
  }

  edit({
    auth_role_id,
  }) {
    return this.post('/platform/v1/product/role/edit', {
      auth_role_id,
    });
  }

  remove({ auth_role_id }) {
    return this.post('/platform/v1/product/role/remove', {
      auth_role_id,
    });
  }
}

export default new RoleApi();
