const UserModel = require('../model/user-model');

const UserDAO = {
  register: (payload) => {
    return new UserModel({
      ...payload,
    }).save();
  },
};

module.exports = UserDAO;
