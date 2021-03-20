var express = require('express');
var router = express.Router();

var current_time = Date();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(current_time);
});

module.exports = router;
