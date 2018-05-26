var express = require('express');
var router = express.Router();

var HostPresenter = require('../presenter/HostPresenter');
var HostPresenter = new HostPresenter();
var hostViewModel = HostPresenter._hostViewModel;

router.get('/', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    HostPresenter.getHosts(entityContext);
    let hostsInfo = hostViewModel.getHostsInfo();

    if (hostsInfo == 'error')
        res.sendStatus(500);
    else
        res.render('dashboard', {hosts: hostsInfo});
});

router.get('/dashboard', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    HostPresenter.getHosts(entityContext);
    let hostsInfo = hostViewModel.getHostsInfo();
    
    if (hostsInfo == 'error')
        res.sendStatus(500);
    else
        res.render('dashboard', {hosts: hostsInfo});
});

router.use('/api', require('./api'));

module.exports = router;