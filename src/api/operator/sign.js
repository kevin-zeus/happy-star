import BaseApi from '../base';

class SignApi extends BaseApi {
  getList({
    current, pageSize, name,
  }) {
    return this.post('/platform/v1/system/sign/list', {
      page: current,
      pageSize,
      name,
    });
  }
}

export default new SignApi();
