/* eslint-disable camelcase */
import BaseApi from '../base';

class ProductApi extends BaseApi {
  getList({
    current, pageSize, product_id, product_name, product_category_id, status,
  }) {
    return this.post('/platform/v1/product/product/list', {
      page: current,
      pageSize,
      product_id,
      product_name,
      product_category_id,
      status,
    });
  }

  // "rule": [
  //   {
  //     "product_rule_config_id": "string",
  //     "number": "string",
  //     "price": "string",
  //     "rebate": "string",
  //     "day": "string"
  //   }
  // ]
  create({
    product_name, product_image, product_category_id = '0', price, status, description, rule, image,
    second_category_id = '0',
  }) {
    return this.post('/platform/v1/product/product/create', {
      product_image,
      product_name,
      product_category_id,
      price,
      status,
      description,
      rule,
      image,
      second_category_id,
    });
  }

  update({
    product_id, product_name, product_image, product_category_id = '0', price, status, description, rule, image,
    second_category_id = '0',
  }) {
    return this.post('/platform/v1/product/product/update', {
      product_id,
      product_image,
      product_name,
      product_category_id,
      second_category_id,
      price,
      status,
      description,
      rule,
      image,
    });
  }

  edit({
    product_id,
  }) {
    return this.post('/platform/v1/product/product/edit', {
      product_id,
    });
  }

  remove({ product_id }) {
    return this.post('/platform/v1/product/product/remove', {
      product_id,
    });
  }
}

export default new ProductApi();
