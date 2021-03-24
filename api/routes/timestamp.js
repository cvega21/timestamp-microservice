var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('root');
  var utc_time = Date();
  var unix_time = Date.now();
  res.send({"unix": unix_time, "utc": utc_time});
});

router.get('/:date?', function(req, res, next) {
  let date = req.params.date;
  var unix_time = new Date(date).getTime();
  var utc_time = new Date(date * 1000);
  
  // console.log(`unix_time: ${unix_time}`);
  console.log(`date: ${date}, unix_time: ${unix_time}, utc_time: ${utc_time}`);
  
  if (date.match(/-/)) {
    // *** input is UTC
    res.send({"unix": unix_time, "utc": date});
  }



  // if (isNaN(unix_time)) {
  //   // *** input is 
  //   res.status(500);
  //   res.send({"error": "Invalid Date"});
  //   return;
  // } else if (date.match(/-/)) {
  //   // console.log('match!');
  //   res.send({"unix": unix_time, "utc": date});
  // } else {
  //   console.log(`date: ${date}, ${utc_time}`);
  // }
  // var unix_time = Date.now();
  // res.send({"unix": unix_time, "utc": utc_time});
});

module.exports = router;
