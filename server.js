// server.js
// where your node app starts

// init project
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const urlHandler = require('./controller/urlHandler.js');
const exerciseHandler = require('./controller/exerciseHandler.js');

const app = express();
const upload = multer();

const mongo_URL = process.env.MONOGOLAB_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongo_URL, { useNewUrlParser: true });

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

//bodyParser middleware
app.use(bodyParser.urlencoded({'extended': false}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get("/timestamp", (req, res) => res.sendFile(__dirname + '/views/timestamp/index.html'));

app.get("/whoami", (req, res) => res.sendFile(__dirname + '/views/whoami/index.html'));

app.get("/url_shortner", (req, res) => res.sendFile(__dirname + '/views/url_shortner/index.html'));

app.get("/exercise_tracker", (req, res) => res.sendFile(__dirname + '/views/exercise_tracker/index.html'));

app.get("/file_metadata", (req, res) => res.sendFile(__dirname + '/views/fileMetadataMs/index.html'));

// Timestamp API endpoint
app.get("/api/timestamp/:date_string?", (req, res) => {
  const date = req.date_string===undefined ? new Date() : new Date(req.date_string);
  res.json({"unix": date.getTime(), "utc": date.toUTCString()})
});

app.get("/api/whoami", (req, res) => {
  const {headers} = req;
  res.json({"ipaddress": headers['x-forwarded-for'].split(',')[0], "language": headers['accept-language'], "software": headers['user-agent']})
});

app.post("/api/shorturl/new", urlHandler.addURL);

app.get("/api/shorturl/:shortURL", urlHandler.processShortURL);

app.post("/api/fileanalyse", upload.single('upfile'),  (req, res) => {
  const file = req.file;
  res.json({name: file.originalname, type: file.mimetype, size: file.size})
})

app.use("/api/exercise", exerciseHandler);
        
app.use((req, res, next) => {
  res.status(404)
  res.type('txt').send('Not Found');
});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});