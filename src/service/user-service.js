const UserDAO = require('../dao/user-dao');

const UserService = {
  register: (payload) => {
    return new Promise((resolve, reject) => {
      UserDAO.register(payload)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = UserService;
