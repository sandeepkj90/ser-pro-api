const ServiceReqDAO = require('../dao/service-req-dao');
const Constant = require('../utils/constant');
const UserDAO = require('../dao/user-dao');
const ServiceReqService = {
  create: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      ServiceReqDAO.create(payload)
        .then((result) => {
          resolve({
            status: 201,
            data: result,
            message: Constant.MESSAGE.CART.CREATED,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });

      // }
    });
  },
  getListByUserId: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      ServiceReqDAO.getListByUserId(payload)
        .then((result) => {
          resolve({
            status: 200,
            data: result,
            message: Constant.MESSAGE.CART.CREATED,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });

      // }
    });
  },
  changeReqStatus: (payload) => {
    console.log("data inside service", payload);
    return new Promise(async (resolve, reject) => {
      let data = await ServiceReqDAO.changeReqStatus(payload);
      console.log("inside service approved", data);
      resolve({
        status: 200,
        data: data,
        message:"APPROVED"
      });
    });
  },
};
module.exports = ServiceReqService;
