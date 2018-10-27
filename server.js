// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get("/timestamp", (req, res) => res.sendFile(__dirname + '/views/timestamp/index.html'));

app.get("/whoami", (req, res) => res.sendFile(__dirname + '/views/whoami/index.html'));

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", (req, res) => {
  const date = req.date_string===undefined ? new Date() : new Date(req.date_string);
  res.json({"unix": date.getTime(), "utc": date.toUTCString()})
});

app.get("/api/whoami", (req, res) => {
  const {headers} = req;
  res.json({"ipaddress": headers['x-forwarded-for'].split(',')[0], "language": headers['accept-language'], "software": headers['user-agent']})
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});