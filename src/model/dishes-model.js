const mongoose = require('../../database');
const Constant = require('../utils/constant');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    dishType:{
        type:String,
        enum:['VEG','NON_VEG'],
        default:'VEG'
    },
    price:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model(Constant.COLLECTION_NAME.DISH, DishSchema);