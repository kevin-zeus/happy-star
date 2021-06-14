/* eslint-disable camelcase */
import BaseApi from '../base';

class NoticeApi extends BaseApi {
  // 消息配置列表
  getList({
    current, pageSize,
  }) {
    return this.post('/platform/v1/system/notice/list', {
      page: current,
      pageSize,
    });
  }

  // 保存
  create({
    content,
  }) {
    return this.post('/platform/v1/system/notice/create', {
      content,
    });
  }

  update({
    notice_id, content,
  }) {
    return this.post('/platform/v1/system/notice/update', {
      notice_id,
      content,
    });
  }

  edit({
    notice_id,
  }) {
    return this.post('/platform/v1/system/notice/edit', {
      notice_id,
    });
  }

  remove({
    notice_id,
  }) {
    return this.post('/platform/v1/system/notice/remove', {
      notice_id,
    });
  }
}

export default new NoticeApi();
