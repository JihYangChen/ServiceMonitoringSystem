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
                io.emit('updateHost', hosts[0]);
                var hostIds = hosts[1];
                if (hostIds.length != 0) {
                    var notifyContactController = new NotifyContactController(hostIds);
                    notifyContactController.getContactsFromMapAndNewNotifierInstanceToCreateUseCase();
                }
            } catch(e) { 
                console.log('Error: ' + e)
            }
        }, 5000);
    }
}

module.exports = ScheduledTaskController;