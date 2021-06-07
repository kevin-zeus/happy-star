const mockjs = require('mockjs');

module.exports = {
  'POST /api/login': (req, res) => {
    const { username, password } = req.body;
    let msg = 'ok'; let code = 200; const
      data = null;
    if (username !== 'admin') {
      msg = '用户名错误';
      code = 400;
    }
    if (password !== '123456') {
      msg = '密码错误';
      code = 400;
    }
    if (code !== 200) {
      return res.json({
        code,
        msg,
        data,
      });
    }
    const ret = {
      code,
      msg,
      data: {
        username: 'admin',
        nickname: '管理员',
        token: mockjs.Random.string(16),
        avatar: mockjs.Random.image('200x200', '#02adea', 'Admin'),
      },
    };
    return res.json(ret);
  },
  'POST /refreshToken': (req, res) => {
    console.log(res, req);
  },
};
