const user = require('./user');
const goods = require('./goods');
const routes = require('./routes');

module.exports = {
  ...user,
  ...goods,
  ...routes,
};
