/* eslint-disable camelcase */
import BaseApi from '../base';

class InviteConfigApi extends BaseApi {
  // 邀请奖惩列表
  getList() {
    return this.post('/platform/v1/system/invite-config/list');
  }

  // 保存
  update({
    invite, first_recharge,
  }) {
    return this.post('/platform/v1/system/invite-config/update', {
      invite,
      first_recharge,
    });
  }
}

export default new InviteConfigApi();
