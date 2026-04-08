const login = require('./login');
const createItem = require('./CreateItem');
const validateGetItems = require('./getitem');
module.exports = {
  ...login,
  ...createItem,
  ...validateGetItems
};