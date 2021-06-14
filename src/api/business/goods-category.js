/* eslint-disable camelcase */
import BaseApi from '../base';

class GoodsCategoryApi extends BaseApi {
  getAll() {
    return this.post('/platform/v1/product/category/all');
  }

  getList({
    current, pageSize, product_category_name, active,
  }) {
    return this.post('/platform/v1/product/category/list', {
      page: current,
      pageSize,
      product_category_name,
      active,
    });
  }

  create({ product_category_name, active, sort }) {
    return this.post('/platform/v1/product/category/create', {
      product_category_name,
      active,
      sort,
    });
  }

  update({
    product_category_name, product_category_id, active, sort,
  }) {
    return this.post('/platform/v1/product/category/update', {
      product_category_id,
      product_category_name,
      sort,
      active,
    });
  }

  remove({ product_category_id }) {
    return this.post('/platform/v1/product/category/remove', {
      product_category_id,
    });
  }
}

export default new GoodsCategoryApi();
