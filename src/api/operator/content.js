/* eslint-disable camelcase */
import BaseApi from '../base';

class ContentApi extends BaseApi {
  getList({
    current, pageSize, content_id, name,
  }) {
    return this.post('/platform/v1/content/content/list', {
      page: current,
      pageSize,
      content_id,
      name,
    });
  }

  create({
    name, content,
  }) {
    return this.post('/platform/v1/content/content/create', {
      name,
      content,
    });
  }

  update({
    content_id, name, content,
  }) {
    return this.post('/platform/v1/content/content/update', {
      content_id,
      name,
      content,
    });
  }

  edit({
    content_id,
  }) {
    return this.post('/platform/v1/content/content/edit', {
      content_id,
    });
  }

  remove({ content_id }) {
    return this.post('/platform/v1/content/content/remove', {
      content_id,
    });
  }
}

export default new ContentApi();
