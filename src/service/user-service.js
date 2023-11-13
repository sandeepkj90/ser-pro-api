const UserDAO = require('../dao/user-dao');
const Constant = require('../utils/constant');
const Utility = require('../utils/utility');
const UserService = {
  register: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let data = await UserDAO.isUserExist(payload);
      console.log('data fetched from database based on email', data);
      if (data) {
        reject({ status: 406, message: Constant.MESSAGE.USER.ISEXIST });
      } else {
        UserDAO.register(payload)
          .then((result) => {
            resolve({
              status: 201,
              data: result,
              message: Constant.MESSAGE.USER.REGISTERED,
            });
          })
          .catch((error) => {
            reject({ status: 500, message: error });
          });
      }
    });
  },
  login: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let responseData = await UserDAO.isUserExist(payload);
      console.log('data fetched from database based on email', responseData);
      if (!responseData) {
        reject({ status: 406, message: Constant.MESSAGE.USER.NOT_EXIST });
      } else {
        if (responseData.password == payload.password) {
          //   delete responseData.password;
          if (responseData.status == 'INPROGRESS')
            return reject({
              status: 406,
              message: Constant.MESSAGE.USER.APPROVAL,
            });
          resolve({
            status: 200,
            message: Constant.MESSAGE.USER.LOGIN,
            data: {
              role: responseData.role,
              token: Utility.createToken(responseData),
              firstName: responseData.firstName,
              _id: responseData._id,
              profilePic: responseData.profilePic,
            },
          });
        } else {
          reject({
            status: 406,
            message: Constant.MESSAGE.USER.INVALID_CREDENTIALS,
          });
        }
      }
    });
  },
  getUserList: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let data = await UserDAO.getUserList(payload);
      console.log('data fetched from database based on email', data);
      resolve({ data });
    });
  },
  resetPassword: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let data = await UserDAO.verifyOTP(payload);
      console.log('data fetched from database based on email', data);
      if (!data) {
        reject({ status: 406, message: Constant.MESSAGE.USER.INVALID_OTP });
      } else {
        //let OTP = Utility.generateOTP();
        UserDAO.updatePassword(payload)
          .then((result) => {
            // send either email or in phone the otp ;
            resolve({
              status: 201,
              data: result,
              message: Constant.MESSAGE.COMMON.UPDATED,
            });
          })
          .catch((error) => {
            reject({ status: 500, message: error });
          });
      }
    });
  },
  approve: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let data = await UserDAO.approve(payload);
      console.log('inside service approved', data);
      resolve({
        status: 200,
        data: data,
        message: 'APPROVED',
      });
    });
  },
  getTechnician: () => {
    return new Promise(async (resolve, reject) => {
      let data = await UserDAO.getTechnician();
      resolve({ data });
    });
  },
};
module.exports = UserService;
