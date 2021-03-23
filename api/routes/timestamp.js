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

  if (isNaN(unix_time)) {
    console.log(`is unix NaN? ${isNaN(unix_time)}`);
    res.status(500);
    res.send({"error": "Invalid Date"});
    return;
  } else if (date.match(/-/)) {
    console.log('match!');
    res.send({"unix": unix_time, "utc": date});
  }

  let test = new Date(date * 1000);
  console.log(req.params.date);
  console.log(typeof(test));
  
  console.log('homie');
  console.log();
  // add checker whether req is unix or utc
  var utc_time = Date();
  // var unix_time = Date.now();
  // res.send({"unix": unix_time, "utc": utc_time});
});

module.exports = router;
