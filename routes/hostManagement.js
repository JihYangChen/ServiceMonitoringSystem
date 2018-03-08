var express = require('express');
var router = express.Router();

var hosts = require('../database/hosts');

router.post('/addHost', function(req, res, next) {
    hosts.push(req.body);
});

router.post('/deleteHost', function(req, res, next) {
    console.log(req.body.displayName);
    for (i in hosts) {
        if (hosts[i].displayName === req.body.displayName) {
            hosts.splice(i, 1);
        }
    }
});

module.exports = router;
