import BaseApi from './base';

class GoodsApi extends BaseApi {
  constructor() {
    super('/product');
  }
}

export default GoodsApi;
