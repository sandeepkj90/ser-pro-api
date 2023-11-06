const CartModel = require('../model/cart-model');
const CartDAO = {
    create: (payload) => {
        console.log('data inside dao', payload);
        return new CartModel({
            userId: payload.userId,
            items: [payload.items]
        }).save();
    },
    updateItems:(payload)=>{
        return CartModel.updateOne({userId:payload.userId},{$addToSet:{items:payload.items}});

    },
    isUserExist:(payload)=>{
        return CartModel.findOne({userId:payload.userId});
    },
    //,
    // getList: (payload) => {
    //     let condition = payload || {};
    //     return DishModel.find(condition);
    // },
    // updateById: (condition, updatePayload) => {
    //     return DishModel.updateOne({ _id: condition.id }, { $set: updatePayload });
    // },
    getByUserId:(user)=>{
        return CartModel.findOne({userId:user._id}).populate('items.item');
    },
    deleteById:(user,payload)=>{
        return CartModel.updateOne({userId:user._id},{ $pull: { 'items':{item: payload.id }}});
    },
    deleteCartByUserId:(payload)=>{
        return CartModel.deleteOne({userId:payload.userId});
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
module.exports = CartDAO;