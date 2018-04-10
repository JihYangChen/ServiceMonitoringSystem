var MonitorHostsUseCase = require('../useCase/hostMonitor/MonitorHostsUseCase');
var InitializeUseCase = require('../useCase/initialize/InitializeUseCase');
var MongoHostRepository = require('../adapter/repository/mongoDB/MongoHostRepository');
var MongoHostContactsMapRepositoty = require('../adapter/repository/mongoDB/MongoHostContactsMapRepository');
var NmapCommand = require('../adapter/command/NmapCommand');
var PingCommand = require('../adapter/command/PingCommand');
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
        let monitorHostsUseCase = new MonitorHostsUseCase(new MongoHostRepository(), new NmapCommand(), new PingCommand());
        setInterval(async function() {
            try {
                let hosts = await monitorHostsUseCase.execute();
                let frontEndReloadHosts = hosts;
                io.setMaxListeners(0);
                io.emit('updateHost', frontEndReloadHosts);
            } catch(e) { 
                console.log('Error: ' + e)
            }
        }, 10000);
    }
}

module.exports = ScheduledTaskController;