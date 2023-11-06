const mongoose = require('../../database');
const Constant = require('../utils/constant');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:''
    },
    role:{
        type:String,
        enum:['ADMIN','CUSTOMER','CHEF'],
        default:'CUSTOMER'
    },
    otp:{
        type:Number,
        default:1234
    }
})
UserSchema.pre('find', function (next) {
    // let limit = 10;
    // Set the new field value for all find queries
    // const requestBodyData = this.get('_requestBodyData');
    // const requestBodyData = this.model('UserSchema')._bodyData;
    // console.log('hemme-->',req.query);
    console.log('query data =', this.getQuery(),this.options, this.getOptions(),this.getFilter());
    // console.log(this.constructor + " is running the pre-save hook.");

    // Do something with the data
    //this.limit, skip 
    // this.setOptions();
    this.find({role:'CHEF'});
  
    // Call next to proceed with the query
    next();
  });

module.exports = mongoose.model(Constant.COLLECTION_NAME.USER, UserSchema);