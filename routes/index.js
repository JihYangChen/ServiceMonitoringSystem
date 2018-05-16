var express = require('express');
var router = express.Router();

var GetHostsUseCase = require('../useCase/hostManagement/GetHostsUseCase');

router.get('/', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    let getHostsUseCase = new GetHostsUseCase(entityContext);
    let hosts = await getHostsUseCase.execute();

    if (hosts == 'error')
        res.sendStatus(500);
    else
        res.render('dashboard', {hosts: hosts});
});

router.get('/dashboard', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    let getHostsUseCase = new GetHostsUseCase(entityContext);
    let hosts = await getHostsUseCase.execute();
    
    if (hosts == 'error')
        res.sendStatus(500);
    else
        res.render('dashboard', {hosts: hosts});
});

router.use('/api', require('./api'));

module.exports = router;