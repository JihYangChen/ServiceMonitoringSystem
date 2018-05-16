var MonitorHostsUseCase = require('../useCase/hostMonitor/MonitorHostsUseCase');
var MongoHostRepository = require('../adapter/repository/mongoDB/MongoHostRepository');
var MongoHostContactsMapRepositoty = require('../adapter/repository/mongoDB/MongoHostContactsMapRepository');

class ScheduledTaskController {
    constructor(entityContext) {
        this.entityContext = entityContext;
    }

    startTask(io) {
        let monitorHostsUseCase = new MonitorHostsUseCase(this.entityContext, new MongoHostRepository());
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