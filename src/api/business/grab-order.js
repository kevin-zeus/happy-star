/* eslint-disable camelcase */
import BaseApi from '../base';

class GrabOrder extends BaseApi {
  // 抢单任务列表
  getList({
    current, pageSize, user_task_id, status,
  }) {
    return this.post('/platform/v1/user/task/list', {
      page: current,
      pageSize,
      user_task_id,
      status,
    });
  }

  // 抢单人记录列表
  getJoinList({
    current, pageSize, user_task_id, user_task_join_id, name,
  }) {
    return this.post('/platform/v1/user/task/list', {
      page: current,
      pageSize,
      user_task_id,
      user_task_join_id,
      name,
    });
  }

  // 添加抢单记录
  batch({ user_task_id, number }) {
    return this.post('/platform/v1/user/task/batch', {
      user_task_id,
      number,
    });
  }

  // 审核
  audit({ user_task_id, status, comment }) {
    return this.post('/platform/v1/user/task/audit', {
      user_task_id,
      comment,
      status,
    });
  }

  // 编辑
  edit({
    user_task_id,
  }) {
    return this.post('/platform/v1/user/task/edit', {
      user_task_id,
    });
  }
}

export default new GrabOrder();
