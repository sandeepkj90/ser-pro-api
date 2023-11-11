const ServiceReqModel = require("../model/service-req-model");
const ServiceReqDAO = {
  create: (payload) => {
    console.log("data inside dao", payload);
    return new ServiceReqModel({
      ...payload,
    }).save();
  },
  getListByUserId: (payload) => {
    let query = {};
    if (payload.role != "ADMIN") query["userId"] = payload._id;
    return ServiceReqModel.find(query);
  },
  update: (payload) => {
    return ServiceReqModel.updateOne({ _id: payload.id }, { $set: payload });
  },
  getTechnician: (payload) => {
    return ServiceReqModel.find({ assignedTo: payload.id });
  },
};
module.exports = ServiceReqDAO;
