/* eslint-disable camelcase */
import BaseApi from '../base';

class ConfigApi extends BaseApi {
  // 获取系统菜单
  menu() {
    return this.post('/platform/v1/system/config/menu');
  }
}

export default new ConfigApi();
