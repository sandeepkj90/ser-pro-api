const UserModel = require('../model/user-model');
const UserDAO = {
    register: (payload) => {
        console.log('data inside dao', payload);
        return new UserModel({
            name: payload.name,
            password:payload.password,
            email:payload.email,
            phone:payload.phone,
            address:payload.address,
            role:payload.role
        }).save();
    },
    isUserExist:(payload)=>{
        console.log('data inside dao', payload);
        return UserModel.findOne(payload);
    },
    getByCondition:(payload)=>{
        return UserModel.find(payload);
    },
    updateOTP:(payload, otp)=>{
        return UserModel.updateOne({email:payload.email},{$set:{otp:otp}})
    },
    verifyOTP:(payload)=>{
        return UserModel.findOne({email:payload.email,otp:payload.otp});
    },
    updatePassword:(payload)=>{
        return UserModel.updateOne({email:payload.email},{$set:{password:payload.password}});
    },
    getUserList:(payload)=>{
        return UserModel.find({name:payload.name});
    }

}
module.exports = UserDAO;