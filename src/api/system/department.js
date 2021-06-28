/* eslint-disable camelcase */
import BaseApi from '../base';

class DepartmentApi extends BaseApi {
  getAll({
    pid, pid2,
  }) {
    return this.post('/platform/v1/platform/department/all', {
      pid, pid2,
    });
  }

  getList({
    current, pageSize,
  }) {
    return this.post('/platform/v1/platform/department/list', {
      page: current,
      pageSize,
    });
  }

  create({
    department_name, department,
  }) {
    const depart = department.split(',');
    return this.post('/platform/v1/platform/department/create', {
      department_name,
      pid: depart[0],
      pid2: depart[1],
    });
  }

  update({
    department_id, department_name, department,
  }) {
    const depart = department.split(',');
    return this.post('/platform/v1/platform/department/update', {
      department_id,
      department_name,
      pid: depart[0],
      pid2: depart[1],
    });
  }

  edit({
    department_id,
  }) {
    return this.post('/platform/v1/platform/department/edit', {
      department_id,
    });
  }

  remove({
    department_id,
  }) {
    return this.post('/platform/v1/platform/department/remove', {
      department_id,
    });
  }
}

export default new DepartmentApi();
