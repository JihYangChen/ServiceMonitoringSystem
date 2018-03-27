var express = require('express');
var router = express.Router();

var MonitorHostsUseCase = require('../../useCase/hostMonitor/MonitorHostsUseCase');
var MongoHostRepository = require('../../adapter/repository/mongoDB/MongoHostRepository');
var hostRepository = new MongoHostRepository();
var NmapMonitor = require('../../adapter/hostMonitor/nmap/NmapMonitor');
var hostMonitor = new NmapMonitor();

router.get('/', async function(req, res, next) {
    let monitorHostsUseCase = new MonitorHostsUseCase(hostRepository, hostMonitor);
    let result = await monitorHostsUseCase.execute();

    res.sendStatus(200);
});

module.exports = router;