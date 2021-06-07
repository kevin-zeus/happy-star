import request from '../common/request';

class BaseApi {
  constructor(bashUrl) {
    this.request = request;
    this.bashUrl = bashUrl;
  }

  getRequest() {
    return this.request;
  }

  getList(params) {
    return this.request.post(`${this.bashUrl}/list`, params);
  }
}

export default BaseApi;
