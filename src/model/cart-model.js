const mongoose = require('../../database');
const Constant = require('../utils/constant');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId:{
       type:Schema.Types.ObjectId,
       ref:'users',
       require:true
    },
    items:[{item:{
        type:Schema.Types.ObjectId,
        ref:'dishes'
    },quantity:{type:Number, default:1}}],
    //quantity:[{}]
    date:{
        type:Date,
        default:Date.now()
    },
    totalAmount:{
        type:Number
    }
})

module.exports = mongoose.model(Constant.COLLECTION_NAME.CART, CartSchema);