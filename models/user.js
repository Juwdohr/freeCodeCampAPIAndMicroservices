const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, 'Username too long']
  },
  _id: {
    type: String,
    index: true,
    default: shortid.generate
  }
})

module.exports = mongoose.model('User', User);