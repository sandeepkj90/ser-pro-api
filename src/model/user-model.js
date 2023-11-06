const mongoose = require('../../database');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('users', UserSchema);
