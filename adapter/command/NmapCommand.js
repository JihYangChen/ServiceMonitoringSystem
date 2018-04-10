var nmap = require('node-nmap');
nmap.nmapLocation = "nmap";
var INmapCommand = require('../../useCase/interface/command/INmapCommand');

class NmapCommand extends INmapCommand {
    async execute() {
        return await monitorHostPromise(this._host);
    }

    setHost(host) {
        this._host = host;
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

module.exports = NmapCommand;