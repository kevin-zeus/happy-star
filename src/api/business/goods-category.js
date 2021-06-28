/* eslint-disable camelcase */
import BaseApi from '../base';

class GoodsCategoryApi extends BaseApi {
  getAll({
    pid = '0',
  }) {
    return this.post('/platform/v1/product/category/all', {
      pid,
    });
  }

  getList({
    current, pageSize, product_category_name, active, level,
  }) {
    return this.post('/platform/v1/product/category/list', {
      page: current,
      pageSize,
      product_category_name,
      active,
      level,
    });
  }

  create({
    product_category_name, active, sort, category_image,
  }) {
    return this.post('/platform/v1/product/category/create', {
      product_category_name,
      active,
      sort,
      category_image,
    });
  }

  update({
    product_category_name, product_category_id, active, sort, category_image,
  }) {
    return this.post('/platform/v1/product/category/update', {
      product_category_id,
      product_category_name,
      sort,
      active,
      category_image,
    });
  }

  edit({
    product_category_id,
  }) {
    return this.post('/platform/v1/product/category/edit', {
      product_category_id,
    });
  }

  remove({ product_category_id }) {
    return this.post('/platform/v1/product/category/remove', {
      product_category_id,
    });
  }
}

export default new GoodsCategoryApi();
