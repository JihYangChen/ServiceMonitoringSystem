var express = require('express');
var router = express.Router();

var hosts = require('../database/hosts');

router.get('/', function(req, res, next) {
  res.render('dashboard', {hosts: hosts});
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {hosts: hosts});
});

router.use('/api', require('./api'));

module.exports = router;