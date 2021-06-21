/* eslint-disable camelcase */
import BaseApi from '../base';

import menuData from '../../../mock/menu.json';

class ConfigApi extends BaseApi {
  // 获取系统菜单
  // eslint-disable-next-line class-methods-use-this
  menu() {
    // return this.post('/platform/v1/system/config/menu');
    return new Promise((resolve) => {
      resolve([null, {
        result: menuData,
      }]);
    });
  }

  // 获取上传授权
  upload() {
    return this.post('/platform/v1/system/config/upload');
  }
}

export default new ConfigApi();
