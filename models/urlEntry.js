const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlEntry = new Schema({
  url: {type: String, required: true},
  index: {type: Number, required: true}
})

module.exports = mongoose.model('URLEntry', UrlEntry);