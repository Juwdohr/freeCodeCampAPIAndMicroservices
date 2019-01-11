const Counters = require('../models/counter.js');
const URLEntry = require('../models/urlEntry.js');
const dns = require('dns');

const protocolRegExp = /^http(?:s?):\/\/(.*)/i
const hostnameRegExp = /^([a-z0-9\-_]+\.)+[a-z0-9\-_]+/i;

const getCountAndIncrease = (req, res, callback) => {
  Counters.findOneAndUpdate({}, {$inc: {'count': 1}}, (err, data) => {
    if(err) return;
    if(data) {
      callback(data.count);
    } else {
      const newCounter = new Counters();
      newCounter.save((err) => {
        if(err) return;
        Counters.findOneAndUpdate({}, {$inc: {'count': 1}}, (err, data) => {
          if(err) return;
          callback(data.count);
        })
      })
    }
  });
}

exports.addURL = (req, res) => {
  let requestURL = req.body.url;
  
  requestURL = requestURL.match(/\/$/i) ? requestURL.slice(0, -1) : requestURL;
  
  if(!requestURL.match(protocolRegExp))
     return res.json({"error": "invalid url"});
  
  const hostnquery = requestURL.match(protocolRegExp)[1];
  
  const hostName = hostnquery.match(hostnameRegExp)[0];
  if(hostName) {
    dns.lookup(hostName, (err) => {
      if (err) res.json({"error": "invalid Hostname"});
      else {
        URLEntry.findOne({"url": requestURL}, (err, storedURL) => {
          if(err) return;
          if (storedURL) {
            // URL is already in the DB, return the matched one
            res.json({"original_url": requestURL, "short_url": storedURL.index});
          } else {
            getCountAndIncrease(req, res, (cnt)=> {
              const newURLEntry = new URLEntry({"url": requestURL, "index": cnt});
              newURLEntry.save((err) => {
                if(err) return;
                res.json({"original_url": requestURL, "short_url": cnt});
              });
            });
          }
        });
      }
    });
  } else {
    res.json({"error": "invalid URL"});
  }
};

exports.processShortURL = (req, res) => {
  const shortURL = req.params.shortURL;
  if(!parseInt(shortURL, 10)) {
    res.json({"error": "Wrong Format"});
  }
  URLEntry.findOne({"index": shortURL}, (err, data) => {
    if(err) return;
    if(data) {
      res.redirect(data.url);
    } else {
      res.json({"error": "No URL Found for given input"});
    }
  });
}