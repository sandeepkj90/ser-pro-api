const mongoose = require('../../database');
const Constant = require('../utils/constant');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    orderId:{
        type:Number,
        require:true
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'dishes'
        }, quantity: { type: Number, default: 1 }
    }],
    //quantity:[{}]
    date: {
        type: Date,
        default: Date.now()
    },
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'GETTING_READY', 'READY_TO_SERVE','GET_BILL', 'CLOSED'],
        default: 'PENDING'
    }
})

module.exports = mongoose.model(Constant.COLLECTION_NAME.ORDER, OrderSchema);