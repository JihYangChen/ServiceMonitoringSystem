var express = require('express');
var router = express.Router();

var hosts = require('../../database/hosts');

var GetHostsUseCase = require('../../useCase/hostManagement/GetHostsUseCase');
var HostRepository = require('../../adapter/repository/mongoDB/MongoHostRepository');

var hostRepository = new HostRepository();

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

router.get('/getHosts', async function(req, res, next) {
    let getHostsUseCase = new GetHostsUseCase(hostRepository);
    let hosts = await getHostsUseCase.execute();
    res.send(hosts);
});

module.exports = router;
