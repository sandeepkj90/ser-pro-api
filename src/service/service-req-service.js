const ServiceReqDAO = require('../dao/service-req-dao');
const Constant = require('../utils/constant');
const UserDAO = require('../dao/user-dao');
const ServiceReqService = {
  create: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      if (!payload.items)
        return reject({
          status: 406,
          message: Constant.MESSAGE.COMMON.BAD_REQUEST,
        });

      let itemsDetails = await DishDAO.getItemsDetailList(payload.items.item);
      console.log('details of itemlist ', itemsDetails);
      let cartPayload = {
        userId: payload.userId,
        items: payload.items,
        //totalAmount:itemsDetails.reduce((sum,next)=>{sum += next.price; return sum;},0)
      };
      let userDetail = await CartDAO.isUserExist(payload);
      if (userDetail) {
        CartDAO.updateItems(cartPayload)
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
      } else {
        CartDAO.create(cartPayload)
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
      }

      // }
    });
  },
};
module.exports = ServiceReqService;
