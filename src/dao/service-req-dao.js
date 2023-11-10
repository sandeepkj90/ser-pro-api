const ServiceReqModel = require('../model/service-req-model');
const ServiceReqDAO = {
  create: (payload) => {
    console.log('data inside dao', payload);
    return new ServiceReqModel({
      ...payload,
    }).save();
  },
  getListByUserId: (payload) => {
    return ServiceReqModel.find({ userId: payload._id });
  },
};
module.exports = ServiceReqDAO;
