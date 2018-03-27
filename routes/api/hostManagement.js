var express = require('express');
var router = express.Router();

var hosts = require('../../database/hosts');

var AddHostUseCase = require('../../useCase/hostManagement/AddHostUseCase');
var DeleteHostUseCase = require('../../useCase/hostManagement/DeleteHostUseCase');
var GetHostsUseCase = require('../../useCase/hostManagement/GetHostsUseCase');

var MongoHostRepository = require('../../adapter/repository/mongoDB/MongoHostRepository');
var hostRepository = new MongoHostRepository();

router.get('/getHosts', async function(req, res, next) {
    let getHostsUseCase = new GetHostsUseCase(hostRepository);
    let hosts = await getHostsUseCase.execute();
    if (hosts == 'error')
        res.sendStatus(500);
    else
        res.send(hosts);
});

router.post('/addHost', async function(req, res, next) {
    let addHostUseCase = new AddHostUseCase(hostRepository);
    let result = await addHostUseCase.execute(req.body);
    if (result == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

router.post('/deleteHost', async function(req, res, next) {
    let deleteHostUseCase = new DeleteHostUseCase(hostRepository);
    let result = await deleteHostUseCase.execute(req.body.hostId);
    if (hosts == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

module.exports = router;
