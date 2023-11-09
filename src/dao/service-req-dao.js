const ServiceReqModel = require('../model/service-req-model');
const ServiceReqDAO = {
  create: (payload) => {
    console.log('data inside dao', payload);
    return new ServiceReqModel({
      ...payload,
    }).save();
  },
  updateItems: (payload) => {
    return ServiceReqModel.updateOne(
      { userId: payload.userId },
      { $addToSet: { items: payload.items } }
    );
  },
};
module.exports = ServiceReqDAO;
