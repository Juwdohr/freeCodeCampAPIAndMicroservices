const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Counter = new Schema({
  count: {type: Number, default: 1}
});

module.exports = mongoose.model('Counter', Counter);