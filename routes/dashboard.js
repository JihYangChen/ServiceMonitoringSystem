var express = require('express');
var router = express.Router();

var hosts = require('../hosts');

router.get('/', function(req, res, next) {
  res.render('dashboard', {hosts: hosts});
});

module.exports = router;
