const OrderModel = require('../model/order-model');
const OrderDAO = {
    create: (payload) => {
        console.log('data inside dao', payload);
        return new OrderModel({
            userId: payload.userId,
            items: payload.items,
            status:payload.status,
            orderId:payload.orderId
        }).save();
    },
    getList:(condition)=>{
        // let condition = payload;
        condition = (condition.status)?{status:{$in:condition.status}}:{};
        return OrderModel.find(condition).sort({date:-1}).populate('items.item');

    },
    isUserExist:(payload)=>{
        return CartModel.findOne({userId:payload.userId});
    },
    //,
    // getList: (payload) => {
    //     let condition = payload || {};
    //     return DishModel.find(condition);
    // },
    orderConfirmedByAdmin: (condition) => {
        console.log('data inside DAO page',condition)
        return OrderModel.updateOne({ _id: condition.id }, { $set:{status:'CONFIRMED'}});
    },
    orderConfirmedByChef: (condition) => {
        console.log('data inside DAO page',condition)
        return OrderModel.updateOne({ _id: condition.id }, { $set:{status:'GETTING_READY'}});
    },
    orderReadyToServe: (condition) => {
        console.log('data inside DAO page',condition)
        return OrderModel.updateOne({ _id: condition.id }, { $set:{status:'READY_TO_SERVE'}});
    },
    closeOrder: (condition) => {
        console.log('data inside DAO page',condition)
        return OrderModel.updateOne({ _id: condition.id }, { $set:{status:'CLOSED'}});
    },
    getByUserId:(user)=>{
        return OrderModel.find({userId:user._id}).sort({date:-1}).populate('items.item');
    },
    deleteById:(user,payload)=>{
        return CartModel.updateOne({userId:user._id},{ $pull: { 'items':{item: payload.id }}});
    },
    getByOrderId:(condition)=>{
        return OrderModel.findOne({_id:condition.id}).populate('items.item');

    },
    getBill:(condition)=>{
        return OrderModel.updateOne({ _id: condition.id }, { $set:{status:'GET_BILL'}});
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
module.exports = OrderDAO;