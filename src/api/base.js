import request from '../common/request';
import config from '../config';

class BaseApi {
  constructor() {
    this.request = request;
    this.bashUrl = config.BASE_PATH;
  }

  getRequest() {
    return this.request;
  }

  post(url, data, option) {
    return this.request.post(this.bashUrl + url, data, option);
  }

  getList(params) {
    return this.request.post(`${this.bashUrl}/list`, params);
  }
}

export default BaseApi;
