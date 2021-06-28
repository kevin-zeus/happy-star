/* eslint-disable camelcase */
import BaseApi from '../base';

class BannerApi extends BaseApi {
  getList({
    current, pageSize, banner_id, banner_name, status,
  }) {
    return this.post('/platform/v1/content/banner/list', {
      page: current,
      pageSize,
      banner_id,
      banner_name,
      status,
    });
  }

  create({
    banner_name, image, type, relation_id, range_date, sort, comment,
  }) {
    return this.post('/platform/v1/content/banner/create', {
      banner_name,
      image,
      type,
      relation_id,
      start_date: range_date[0],
      end_date: range_date[1],
      sort,
      comment,
    });
  }

  update({
    banner_id, banner_name, image, type, relation_id, range_date, sort, comment,
  }) {
    return this.post('/platform/v1/content/banner/update', {
      banner_id,
      banner_name,
      image,
      type,
      relation_id,
      start_date: range_date[0],
      end_date: range_date[1],
      sort,
      comment,
    });
  }

  edit({
    banner_id,
  }) {
    return this.post('/platform/v1/content/banner/edit', {
      banner_id,
    });
  }

  show({
    banner_id,
  }) {
    return this.post('/platform/v1/content/banner/show', {
      banner_id,
    });
  }

  remove({ banner_id }) {
    return this.post('/platform/v1/content/banner/remove', {
      banner_id,
    });
  }

  offline({ banner_id }) {
    return this.post('/platform/v1/content/banner/offline', {
      banner_id,
    });
  }
}

export default new BannerApi();
