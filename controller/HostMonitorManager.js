var IHostMonitorManager = require('../useCase/interface/hostMonitor/IHostMonitorManager');

var NmapMonitor = require('../adapter/hostMonitor/NmapMonitor');
var PingMonitor = require('../adapter/hostMonitor/PingMonitor');

class HostMonitorManager extends IHostMonitorManager {
    async monitorHosts(hosts) {
        let monitoredHostResults = [];

        for (let host of hosts) {
            let monitor;
            if (host.checkServiceOption == 'Nmap')
                monitor = new NmapMonitor();
            else if (host.checkServiceOption == 'Ping')
                monitor = new PingMonitor();
            monitoredHostResults.push(await monitor.monitorHost(host));
        }
        return monitoredHostResults;
    }
}

module.exports = HostMonitorManager;