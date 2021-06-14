/* eslint-disable camelcase */
import BaseApi from '../base';

class DynamicConfig extends BaseApi {
  getList({
    current, pageSize, type,
  }) {
    return this.post('/platform/v1/content/dynamic-config/list', {
      page: current,
      pageSize,
      type,
    });
  }

  create({
    content, type, attachment, create_at,
  }) {
    return this.post('/platform/v1/content/dynamic-config/create', {
      content,
      type,
      attachment,
      create_at,
    });
  }
}

export default new DynamicConfig();
