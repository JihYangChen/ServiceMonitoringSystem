var nmap = require('node-nmap');
nmap.nmapLocation = "nmap";
var ICommand = require('../interface/ICommand');

class NmapCommand extends ICommand {
    async execute() {
        return await monitorHostPromise(this._host);
    }

    setHost(host) {
        this._host = host;
    }

    getCommandString() {
        return "Nmap";
    }
}

function monitorHostPromise(host) {
    return new Promise(function(resolve, reject) {
        let quickscan = new nmap.QuickScan(host);
        let result = {};
        console.log("Nmap Command");

        quickscan.on('complete', function(data) {
            if (data.length != 0)
                result = {status: "Up"};
            else 
                result = {status: "Down"};
            resolve(result);
        });
        
        
        quickscan.on('error', function(error) {
            result = {status: "Down"};
            resolve(result);
        });

    });
}

module.exports = NmapCommand;