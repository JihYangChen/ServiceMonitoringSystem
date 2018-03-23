var express = require('express');
var router = express.Router();

var hosts = require('../../database/hosts');

router.post('/addHost', function(req, res, next) {
    if (!('statusStartTime' in req.body))
        req.body.statusStartTime = Date();
    if (!('lastCheckTime' in req.body))
        req.body.lastCheckTime = Date();
    
    hosts.push(req.body);
    res.sendStatus(200);
});

router.post('/deleteHost', function(req, res, next) {
    for (i in hosts) {
        if (hosts[i].displayName === req.body.displayName) {
            hosts.splice(i, 1);
        }
    }
});

router.get('/getHosts', function(req, res, next) {
    res.send(hosts);
});


module.exports = router;
