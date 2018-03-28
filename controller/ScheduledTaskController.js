var MonitorHostsUseCase = require('../useCase/hostMonitor/MonitorHostsUseCase');
var MongoHostRepository = require('../adapter/repository/mongoDB/MongoHostRepository');
var NmapMonitor = require('../adapter/hostMonitor/nmap/NmapMonitor');
var NotifyContactController = require('./NotifyContactController');

class ScheduledTaskController {
    startTask(io) {
        let monitorHostsUseCase = new MonitorHostsUseCase(new MongoHostRepository(), new NmapMonitor());
        setInterval(async function() {
            try {
                // hosts contains a whole monitored hosts and updatesStatusHostIds, for concept, like [[], []] 
                let hosts = await monitorHostsUseCase.execute(); 
                let frontEndReloadHosts = hosts[0];
                io.setMaxListeners(0);
                io.emit('updateHost', frontEndReloadHosts);

                // prepare for notify contacts
                let statusUpdatedHostIds = hosts[1];
                if (statusUpdatedHostIds.length != 0) {
                    var notifyContactController = new NotifyContactController(statusUpdatedHostIds);
                    await notifyContactController.findHostContactsAndNotify();
                }
            } catch(e) { 
                console.log('Error: ' + e)
            }
        }, 5000);
    }
}

module.exports = ScheduledTaskController;