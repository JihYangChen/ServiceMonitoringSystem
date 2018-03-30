var express = require('express');
var router = express.Router();

var AddHostUseCase = require('../../useCase/hostManagement/AddHostUseCase');
var DeleteHostUseCase = require('../../useCase/hostManagement/DeleteHostUseCase');
var GetHostsUseCase = require('../../useCase/hostManagement/GetHostsUseCase');
var GetHostContactsUseCase = require('../../useCase/hostManagement/GetHostContactsUseCase');
var AddHostContactsMapUseCase = require('../../useCase/hostManagement/AddHostContactsMapUseCase');

var MongoHostRepository = require('../../adapter/repository/mongoDB/MongoHostRepository');
var hostRepository = new MongoHostRepository();
var MongoHostContactsMapRepository = require('../../adapter/repository/mongoDB/MongoHostContactsMapRepository');
var hostContactsMapRepository = new MongoHostContactsMapRepository();

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
    let addHostId = await addHostUseCase.execute(req.body);

    let addHostContactsMapUseCase = new AddHostContactsMapUseCase(hostContactsMapRepository);
    let addHostContactsMapResult = await addHostContactsMapUseCase.execute(addHostId, req.body.contactsId);
    
    if (addHostId == 'error' || addHostContactsMapResult == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

router.post('/deleteHost', async function(req, res, next) {
    let deleteHostUseCase = new DeleteHostUseCase(hostRepository);
    let result = await deleteHostUseCase.execute(req.body.hostId);
    if (result == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

router.get('/getHostContacts/:hostId', async function(req, res, next) {
    let getHostContactsUseCase = new GetHostContactsUseCase(hostContactsMapRepository);
    let contacts = await getHostContactsUseCase.execute(req.params.hostId);
    if (contacts == 'error')
        res.sendStatus(500);
    else
        res.send(contacts);
});

module.exports = router;
