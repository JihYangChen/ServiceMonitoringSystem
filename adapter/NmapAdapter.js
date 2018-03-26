var nmap = require('node-nmap');
nmap.nmapLocation = "nmap";

class NmapAdapter {
    constructor(hosts) {
        this.hosts = hosts;
    }

    monitorHosts(callback) {
        var cnt = 0;
        let hostsLength = this.hosts.length;
        for (let host of this.hosts) {
            var quickscan = new nmap.QuickScan(host.host);

            quickscan.on('complete', function(data) {
                if (data.length != 0)
                    setHostStatus(host, "Up");
                else 
                    setHostStatus(host, "Down");

                cnt++
                if (cnt == hostsLength) {
                    callback();
                }
            });
            
            
            quickscan.on('error', function(error) {
                setHostStatus(host, "Down");

                cnt++;
                if (cnt == hostsLength)
                    callback();
            });
        }
    }
}

function setHostStatus(host, newStatus) {
    if (host.status != newStatus)
        host.statusStartTime = Date();
    host.status = newStatus;
    host.lastCheckTime = Date();
}

module.exports = NmapAdapter;