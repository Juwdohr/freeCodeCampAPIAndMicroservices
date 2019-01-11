// Juwdohr: RNDDICXob Rainelishes: 7zfveCkMG
// /api/exercise/log?userId=RNDDICXob[&from][&to][&limit]
const User = require('../models/user');
const Exercise = require('../models/exercise');

const router = require('express').Router();

router.post('/new-user', (req, res, next) => {
  const userRegex = new RegExp(req.body.username, "i");
  User.findOne({username: userRegex}, '_id username', (err, storedUser) => {
    if(err) {
      if(err.code == 11000){
        return next({
          status: 400,
          message: 'Username Already Exists'
        })
      }
      return next(err);
    }
    //User already exist in DB
    if(storedUser) {
      res.json(storedUser);
    } else {
      const newUser = new User({username: req.body.username});
      newUser.save(err => {
        if(err) next(err);
        res.json({
          _id: newUser._id,
          username: newUser.username
        });
      });
    }
    
  });
});

router.get('/users', (req, res, next) => {
  User.find({}, '_id, username', (err, data) => {
    res.json(data);
  })
});

router.post('/add', (req, res, next) => {
  User.findById(req.body.userId, (err, user) => {
    if(err) return next(err);
    if(!user) {
      return next({
        status: 400,
        message: 'Unknown _id'
      });
    }
    
    const newExercise = new Exercise(req.body);
    newExercise.username = user.username;
    if(req.body.date)
      newExercise.date = new Date(req.body.date);
    newExercise.save((err, savedExercise) => {
      if(err) return next(err);
      savedExercise = savedExercise.toObject();
      delete savedExercise.__v;
      savedExercise._id = savedExercise.userId;
      delete savedExercise.userId;
      savedExercise.date = savedExercise.date.toISOString().split('T')[0];
      res.json(savedExercise);
    });
  });
});

router.get('/log', (req, res, next) => {
  const { userId, ...query} = req.query;
  const limit = parseInt(query.limit), from = new Date(query.from), to = new Date(query.to);
  
  User.findById(userId, (err, user) => {
    if(err) return next(err);
    if(!user) {
      return next({
        status: 400,
        message: 'Invalid userId'
      });
    }
    
    Exercise.find({
      username: user.username,
      date: {
        $gte: from != 'Invalid Date'? from.date.toDateString() : 0,
        $lte: to != 'Invalid Date'? to.date.toDateString() : Date.now()
    }}, 'description duration date').sort('date').limit(limit).exec((err, exercises) => {
      if(err) return next(err);
      if(exercises.length === 0) return next({status: 400, message: 'No exercises logged'});
      console.log(exercises);
      const logs =  {
        _id: user._id,
        username: user.username,
        count: exercises.length,
        log: exercises.map(exercise => ({
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toISOString().split('T')[0]
        }))
      }
      res.json(logs)
    });
  });
});

module.exports = router;

