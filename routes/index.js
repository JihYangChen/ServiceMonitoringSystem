var express = require('express');
var router = express.Router();

var HostController = require('../controller/HostController');
var hostController = new HostController();
var hostViewModel = hostController._hostViewModel;

router.get('/', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    hostController.getHosts(entityContext);
    let hostsInfo = hostViewModel.getHostsInfo();

    if (hostsInfo == 'error')
        res.sendStatus(500);
    else
        res.render('dashboard', {hosts: hostsInfo});
});

router.get('/dashboard', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    hostController.getHosts(entityContext);
    let hostsInfo = hostViewModel.getHostsInfo();
    
    if (hostsInfo == 'error')
        res.sendStatus(500);
    else
        res.render('dashboard', {hosts: hostsInfo});
});

router.use('/api', require('./api'));

module.exports = router;