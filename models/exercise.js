const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exercise = new Schema({
  description: {
    type: String,
    required: true,
    min: [20, 'Description to long']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'duration too short']
  },
  date: {
    type: Date,
    default: Date.now
  },
  username: String,
  userId: {
    type: String,
    ref: 'User',
    index: true
  }
});

//Validate User, and add username to exercise instance
Exercise.pre('save', function (next) {
  mongoose.model('User').findById(this.userId, (err, user) => {
    if(err) return next(err)
    if(!user) {
      const err = new Error('Unkown userId');
      err.status = 400;
      return next(err);
    }
    this.username = user.username;
    if(!this.date) {
      this.date = Date.now();
    }
    next();
  })
})

module.exports = mongoose.model('Exercise', Exercise);