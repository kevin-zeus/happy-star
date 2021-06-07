import BaseApi from './base';

class UserApi extends BaseApi {
  login({ username, password }) {
    return this.request.post('/login', {
      username,
      password,
    });
  }

  getRoutes() {
    return this.request.post('/routes');
  }
}

export default UserApi;
