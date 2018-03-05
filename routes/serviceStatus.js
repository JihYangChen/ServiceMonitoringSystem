var express = require('express');
var router = express.Router();

var nmap = require('node-nmap');
nmap.nmapLocation = "nmap"; //default 

router.get('/', function(req, res, next) {
    //    Accepts array or comma separated string of NMAP acceptable hosts 
    var host = ["", "www.google.com.tw"];
    
    for(i=0; i<2; i++) {
        var quickscan = new nmap.QuickScan(host[i]);
        
        quickscan.on('complete', function(data){
            console.log(data[0].hostname);
            console.log(data);
        });
        
        quickscan.on('error', function(error){
            console.log(i);
            console.log(error);
        });
    }
});

module.exports = router;