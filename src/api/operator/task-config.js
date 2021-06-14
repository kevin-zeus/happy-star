/* eslint-disable camelcase */
import BaseApi from '../base';

class TaskConfigApi extends BaseApi {
  // 抢单任务清单
  getList({
    current, pageSize, task_config_id, name, status,
  }) {
    return this.post('/platform/v1/system/task-config/list', {
      page: current,
      pageSize,
      task_config_id,
      name,
      status,
    });
  }

  // 新建, relation_id = []
  create({
    name, type, status, relation_id,
  }) {
    return this.post('/platform/v1/system/task-config/create', {
      name,
      type,
      status,
      relation_id,
    });
  }

  update({
    task_config_id, name, type, status, relation_id,
  }) {
    return this.post('/platform/v1/system/task-config/update', {
      task_config_id,
      name,
      type,
      status,
      relation_id,
    });
  }

  edit({
    task_config_id,
  }) {
    return this.post('/platform/v1/system/task-config/edit', {
      task_config_id,
    });
  }

  remove({
    task_config_id,
  }) {
    return this.post('/platform/v1/system/task-config/remove', {
      task_config_id,
    });
  }
}

export default new TaskConfigApi();
