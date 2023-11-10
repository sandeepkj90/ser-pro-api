const ServiceReqModel = require('../model/service-req-model');
const ServiceReqDAO = {
  create: (payload) => {
    console.log('data inside dao', payload);
    return new ServiceReqModel({
      ...payload,
    }).save();
  },
  getListByUserId: (payload) => {
    let query = {};
    if (payload.role != 'ADMIN') query['userId'] = payload._id;
    return ServiceReqModel.find(query);
  },
};
module.exports = ServiceReqDAO;
