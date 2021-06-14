/* eslint-disable camelcase */
import BaseApi from '../base';

class AdminApi extends BaseApi {
  changePassword({
    password, new_password, confirm_password,
  }) {
    return this.post('/platform/v1/platform/changePassword', {
      password,
      new_password,
      confirm_password,
    });
  }

  getList({
    current, pageSize, platform_name, d, d2, d3, active,
  }) {
    return this.post('/platform/v1/platform/list', {
      page: current,
      pageSize,
      platform_name,
      d,
      d2,
      d3,
      active,
    });
  }

  create({
    account, password, role_id, platform_name, mobile,
    d, d2, d3, job, job_type, active,
  }) {
    return this.post('/platform/v1/platform/create', {
      account,
      password,
      role_id,
      platform_name,
      mobile,
      d,
      d2,
      d3,
      job,
      job_type,
      active,
    });
  }

  update({
    platform_id, account, password, role_id, platform_name, mobile,
    d, d2, d3, job, job_type, active,
  }) {
    return this.post('/platform/v1/platform/update', {
      platform_id,
      account,
      password,
      role_id,
      platform_name,
      mobile,
      d,
      d2,
      d3,
      job,
      job_type,
      active,
    });
  }

  edit({
    platform_id,
  }) {
    return this.post('/platform/v1/platform/edit', {
      platform_id,
    });
  }

  // 重置密码
  reset({
    platform_id,
  }) {
    return this.post('/platform/v1/platform/reset', {
      platform_id,
    });
  }
}

export default new AdminApi();
