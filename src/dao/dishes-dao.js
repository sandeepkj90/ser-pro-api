const DishModel = require('../model/dishes-model');
const DishDAO = {
    create: (payload) => {
        console.log('data inside dao', payload);
        return new DishModel({
            name: payload.name,
            price: payload.price,
            dishType: payload.dishType,
            image: payload.image
        }).save();
    },
    getList: (payload) => {
        let condition = payload || {};
        return DishModel.find(condition);
    },
    updateById: (condition, updatePayload) => {
        console.log('data inside DAO', condition,updatePayload);
        return DishModel.updateOne({ _id: condition.id }, { $set: updatePayload });
    },
    getById: (payload) => {
        return DishModel.findOne({ _id: payload.id });
    },
    deleteById: (payload) => {
        return DishModel.deleteOne({ _id: payload.id });
    },
    getItemsDetailList: (payload) => {
        return DishModel.findOne({ _id: { $in: payload } });
    }
    // isUserExist:(payload)=>{
    //     console.log('data inside dao', payload);
    //     return UserModel.findOne({email:payload.email});
    // },
    // getByCondition:(payload)=>{
    //     return UserModel.find(payload);
    // },
    // updateOTP:(payload, otp)=>{
    //     return UserModel.updateOne({email:payload.email},{$set:{otp:otp}})
    // },
    // verifyOTP:(payload)=>{
    //     return UserModel.findOne({email:payload.email,otp:payload.otp});
    // },
    // updatePassword:(payload)=>{
    //     return UserModel.updateOne({email:payload.email},{$set:{password:payload.password}});
    // }

}
module.exports = DishDAO;