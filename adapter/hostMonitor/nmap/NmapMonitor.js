var IHostMonitor = require('../../../useCase/interface/hostMonitor/IHostMonitor');

var nmap = require('node-nmap');
nmap.nmapLocation = "nmap";

class NmapMonitor extends IHostMonitor {
    async monitorHosts(hosts) {
        return await monitorHostPromise(hosts);
    }
}

function monitorHostPromise(hosts) {
    return new Promise(function(resolve, reject) {
        var cnt = 0;
        let hostsLength = hosts.length;
        for (let host of hosts) {
            let quickscan = new nmap.QuickScan(host.host);
        
            quickscan.on('complete', function(data) {
                if (data.length != 0)
                    setHostStatus(host, "Up");
                else 
                    setHostStatus(host, "Down");
        
                cnt++
                if (cnt == hostsLength)
                    resolve(hosts);
            });
            
            
            quickscan.on('error', function(error) {
                setHostStatus(host, "Down");
                
                cnt++;
                if (cnt == hostsLength)
                    resolve(hosts);
            });
        }
    });
}


function setHostStatus(host, newStatus) {
    if (host.status != newStatus)
        host.statusStartTime = Date();
    host.status = newStatus;
    host.lastCheckTime = Date();
}

module.exports = NmapMonitor;