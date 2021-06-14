import BaseApi from './base';

class UserApi extends BaseApi {
  login({ account, password }) {
    return this.post('/platform/v1/login', {
      account,
      password,
    });
  }

  logout() {
    return this.post('/platform/v1/login/logout', {
      token: localStorage.getItem('token'),
    });
  }
}

export default new UserApi();
