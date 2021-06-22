/* eslint-disable camelcase */
import BaseApi from '../base';

class UserManager extends BaseApi {
  // 用户列表
  getList({
    current, pageSize, user_id, mobile, invite_code,
  }) {
    return this.post('/platform/v1/user/user/list', {
      page: current,
      pageSize,
      user_id,
      mobile,
      invite_code,
    });
  }

  // 查看某用户
  show({
    user_id,
  }) {
    return this.post('/platform/v1/user/user/show', {
      user_id,
    });
  }

  // 禁用账号
  disable({ user_id }) {
    return this.post('/platform/v1/user/user/disable', {
      user_id,
    });
  }

  // 启用账号
  enable({ user_id }) {
    return this.post('/platform/v1/user/user/enable', {
      user_id,
    });
  }

  // 临时充值
  tempCharge({
    user_id,
    price,
  }) {
    return this.post('/platform/v1/user/user/temporary-recharge', {
      user_id,
      price,
    });
  }

  // 抢单记录
  taskJoin({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/user-task-join', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户发起的抢单任务列表
  taskList({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/user-task', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户返利记录
  rebateList({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/rebate', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户奖励记录
  reward({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/reward', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户提现记录
  withdrawList({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/withdrawal', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户充值记录
  recharge({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/recharge', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户邀请记录
  inviteList({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/invite', {
      current,
      pageSize,
      user_id,
    });
  }

  // 用户在线记录
  onlineList({
    current, pageSize, user_id,
  }) {
    return this.post('/platform/v1/user/user/online', {
      current,
      pageSize,
      user_id,
    });
  }
}

export default new UserManager();
