import BaseApi from '../base';

class SignConfigApi extends BaseApi {
  // 签到简历配置列表
  getList() {
    return this.post('/platform/v1/system/sign-config/list');
  }

  update({ price }) {
    return this.post('/platform/v1/system/sign-config/update', {
      price,
    });
  }
}

export default new SignConfigApi();
