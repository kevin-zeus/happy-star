import BaseApi from '../base';

class SignRewardApi extends BaseApi {
  getList({
    current, pageSize, name,
  }) {
    return this.post('/platform/v1/system/sign-reward/list', {
      page: current,
      pageSize,
      name,
    });
  }
}

export default new SignRewardApi();
