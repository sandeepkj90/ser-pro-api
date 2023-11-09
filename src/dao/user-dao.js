const UserModel = require("../model/user-model");
const UserDAO = {
  register: (payload) => {
    console.log("data inside dao", payload);
    return new UserModel({
      ...payload,
    }).save();
  },
  isUserExist: (payload) => {
    console.log("data inside dao", payload);
    return UserModel.findOne({
      email: payload.email,
      password: payload.password,
    });
  },
  getByCondition: (payload) => {
    return UserModel.find(payload);
  },
  updateOTP: (payload, otp) => {
    return UserModel.updateOne(
      { email: payload.email },
      { $set: { otp: otp } }
    );
  },
  verifyOTP: (payload) => {
    return UserModel.findOne({ email: payload.email, otp: payload.otp });
  },
  updatePassword: (payload) => {
    return UserModel.updateOne(
      { email: payload.email },
      { $set: { password: payload.password } }
    );
  },
  getUserList: (payload) => {
    return UserModel.find({ role: { $ne: payload.role } }, { password: 0 });
  },
  approve: (payload) => {
    return UserModel.updateOne(
      { _id: payload.id },
      { $set: { status: "APPROVED" } }
    );
  },
  getTechnician: () => {
    return UserModel.find(
      { role: "TECHNICIAN", status: "APPROVED" },
      { _id: 1, firstName: 1, phone: 1, skills: 1 }
    );
  },
};
module.exports = UserDAO;
