var nmap = require('node-nmap');
nmap.nmapLocation = "nmap";

class NmapMonitor {
    async monitorHost(host) {
        return await monitorHostPromise(host);
    }
}

function monitorHostPromise(host) {
    return new Promise(function(resolve, reject) {
        let quickscan = new nmap.QuickScan(host.host);
    
        quickscan.on('complete', function(data) {
            if (data.length != 0)
                setHostStatus(host, "Up");
            else 
                setHostStatus(host, "Down");
            resolve(host);
        });
        
        
        quickscan.on('error', function(error) {
            setHostStatus(host, "Down");
            resolve(host);
        });

    });
}


function setHostStatus(host, newStatus) {
    if (host.status != newStatus)
        host.statusStartTime = Date();
    host.status = newStatus;
    host.lastCheckTime = Date();
}

module.exports = NmapMonitor;