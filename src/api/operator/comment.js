/* eslint-disable camelcase */
import BaseApi from '../base';

class CommentApi extends BaseApi {
  getList({
    current, pageSize, user_task_comment_id, comment, status,
  }) {
    return this.post('/platform/v1/content/comment/list', {
      current,
      pageSize,
      user_task_comment_id,
      comment,
      status,
    });
  }

  audit({
    user_task_comment_id,
    status,
    comment,
  }) {
    return this.post('/platform/v1/content/comment/audit', {
      user_task_comment_id,
      comment,
      status,
    });
  }
}

export default new CommentApi();
