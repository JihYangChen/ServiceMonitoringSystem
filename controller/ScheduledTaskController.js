var MonitorHostsUseCase = require('../useCase/hostMonitor/MonitorHostsUseCase');
var InitializeUseCase = require('../useCase/initialize/InitializeUseCase');
var MongoHostRepository = require('../adapter/repository/mongoDB/MongoHostRepository');
var MongoHostContactsMapRepositoty = require('../adapter/repository/mongoDB/MongoHostContactsMapRepository');
var NmapMonitor = require('../adapter/hostMonitor/nmap/NmapMonitor');
var NotifyManager = require('./NotifyManager');

class ScheduledTaskController {

    constructor() {
        this.initializeDomain();
    }

    initializeDomain() {
        let notifyManager = new NotifyManager();
        let initalizeUseCase = new InitializeUseCase(notifyManager, new MongoHostContactsMapRepositoty());
        initalizeUseCase.execute();
    }

    startTask(io) {
        let monitorHostsUseCase = new MonitorHostsUseCase(new MongoHostRepository(), new NmapMonitor());
        setInterval(async function() {
            try {
                // hosts contains a whole monitored hosts and updatesStatusHostIds, for concept, like [[], []] 
                let hosts = await monitorHostsUseCase.execute(); // todo: remove diff ids
                let frontEndReloadHosts = hosts;
                io.setMaxListeners(0);
                io.emit('updateHost', frontEndReloadHosts);
            } catch(e) { 
                console.log('Error: ' + e)
            }
        }, 15000);
    }
}

module.exports = ScheduledTaskController;