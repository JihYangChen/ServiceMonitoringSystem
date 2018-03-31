var MonitorHostsUseCase = require('../useCase/hostMonitor/MonitorHostsUseCase');
var InitializeUseCase = require('../useCase/initialize/InitializeUseCase');
var MongoHostRepository = require('../adapter/repository/mongoDB/MongoHostRepository');
var NmapMonitor = require('../adapter/hostMonitor/nmap/NmapMonitor');
var NotifyManager = require('./NotifyManager');

class ScheduledTaskController {

    constructor() {
        this.initializeDomain();
    }

    initializeDomain() {
        let notifyManager = new NotifyManager();
        let initalizeUseCase = new InitializeUseCase(notifyManager);
        initalizeUseCase.execute();
    }

    startTask(io) {
        let monitorHostsUseCase = new MonitorHostsUseCase(new MongoHostRepository(), new NmapMonitor());
        setInterval(async function() {
            try {
                // hosts contains a whole monitored hosts and updatesStatusHostIds, for concept, like [[], []] 
                let hosts = await monitorHostsUseCase.execute(); 
                let frontEndReloadHosts = hosts[0];
                io.setMaxListeners(0);
                io.emit('updateHost', frontEndReloadHosts);

                // // prepare for notify contacts
                // let statusUpdatedHostIds = hosts[1];
                // if (statusUpdatedHostIds.length != 0) {
                //     var notifyContactController = new NotifyContactController(statusUpdatedHostIds);
                //     await notifyContactController.findHostContactsAndNotify();
                // }


            } catch(e) { 
                console.log('Error: ' + e)
            }
        }, 5000);
    }
}

module.exports = ScheduledTaskController;