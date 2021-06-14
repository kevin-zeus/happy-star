/* eslint-disable camelcase */
import BaseApi from '../base';

class DeliveryApi extends BaseApi {
  // 发货列表
  getList({
    current, pageSize, user_task_id, delivery_status,
  }) {
    return this.post('/platform/v1/system/delivery/list', {
      page: current,
      pageSize,
      user_task_id,
      delivery_status,
    });
  }

  // 发货
  delivery({
    user_task_id, delivery_number, delivery_name, delivery_comment,
  }) {
    return this.post('/platform/v1/system/delivery/delivery', {
      user_task_id,
      delivery_comment,
      delivery_name,
      delivery_number,
    });
  }

  // 取消发货
  cancel({
    user_task_id,
    delivery_comment,
  }) {
    return this.post('/platform/v1/system/delivery/cancel', {
      user_task_id,
      delivery_comment,
    });
  }
}

export default new DeliveryApi();
