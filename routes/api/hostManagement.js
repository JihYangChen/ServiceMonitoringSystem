var express = require('express');
var router = express.Router();

var AddHostUseCase = require('../../useCase/hostManagement/AddHostUseCase');
var DeleteHostUseCase = require('../../useCase/hostManagement/DeleteHostUseCase');
var GetHostsUseCase = require('../../useCase/hostManagement/GetHostsUseCase');
var GetHostContactsUseCase = require('../../useCase/hostManagement/GetHostContactsUseCase');
var AddHostForContactsToMonitorUseCase = require('../../useCase/hostManagement/AddHostForContactsToMonitorUseCase');

var MongoHostRepository = require('../../adapter/repository/mongoDB/MongoHostRepository');
var hostRepository = new MongoHostRepository();
var MongoHostContactsMapRepository = require('../../adapter/repository/mongoDB/MongoHostContactsMapRepository');
var hostContactsMapRepository = new MongoHostContactsMapRepository();

router.get('/getHosts', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    let getHostsUseCase = new GetHostsUseCase(entityContext, hostRepository);
    let hosts = await getHostsUseCase.execute();

    if (hosts == 'error')
        res.sendStatus(500);
    else
        res.send(hosts);
});

router.post('/addHost', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');

    let addHostUseCase = new AddHostUseCase(entityContext, hostRepository);
    let addHostId = await addHostUseCase.execute(req.body);

    let addHostForContactsToMonitorUseCase = new AddHostForContactsToMonitorUseCase(entityContext, hostContactsMapRepository);
    let addHostContactsMapResult = await addHostForContactsToMonitorUseCase.execute(addHostId, req.body.contactsId);
    
    if (addHostId == 'error' || addHostContactsMapResult == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

router.post('/deleteHost', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    let deleteHostUseCase = new DeleteHostUseCase(entityContext, hostRepository);
    let result = await deleteHostUseCase.execute(req.body.hostId);

    if (result == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

router.get('/getHostContacts/:hostId', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    let getHostContactsUseCase = new GetHostContactsUseCase(entityContext, hostContactsMapRepository);
    let contacts = await getHostContactsUseCase.execute(req.params.hostId);

    if (contacts == 'error')
        res.sendStatus(500);
    else
        res.send(contacts);
});

module.exports = router;
