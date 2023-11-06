const mongoose = require('mongoose');
const Constant = require('./src/utils/constant');

mongoose.connect(`mongodb://localhost/${Constant.DATABASE_NAME}`, ()=>{
    console.log(`successfully connected to database ${Constant.DATABASE_NAME}`);
})
module.exports = mongoose;
