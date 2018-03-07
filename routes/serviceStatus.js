var express = require('express');
var router = express.Router();

var nmap = require('node-nmap');
nmap.nmapLocation = "nmap"; //default 

var hosts = require('../hosts');

router.get('/', function(req, res, next) {
    var cnt = 0;
    hosts.forEach( (host) => {
        var quickscan = new nmap.QuickScan(host.host);

        quickscan.on('complete', function(data){
            // console.log(data);
            if (data.length != 0) {
                setHostStatus(host, "UP");
            }
            else {
                setHostStatus(host, "DOWN");
            }

            cnt++;
            if (cnt == hosts.length)
                res.send(hosts);
        });
        
        quickscan.on('error', function(error){
            // console.log(error);
            setHostStatus(host, "DOWN");

            cnt++;
            if (cnt == hosts.length)
                res.send(hosts);
        });

    })
});

function setHostStatus(host, newStatus) {
    if (host.status != newStatus)
        host.statusStartTime = Date();
    host.status = newStatus;
    host.lastCheckTime = Date();
}

module.exports = router;