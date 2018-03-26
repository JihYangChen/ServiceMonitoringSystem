var express = require('express');
var router = express.Router();

const NmapAdapter = require('../../adapter/NmapAdapter');
var hosts = require('../../database/hosts');

router.get('/', function(req, res, next) {
    let nmapAdapter = new NmapAdapter(hosts);
    nmapAdapter.monitorHosts( () => {
        res.send(hosts);
    });
});

module.exports = router;