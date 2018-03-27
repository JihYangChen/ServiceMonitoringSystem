var MonitorHostsUseCase = require('../useCase/hostMonitor/MonitorHostsUseCase');
var MongoHostRepository = require('../adapter/repository/mongoDB/MongoHostRepository');
var NmapMonitor = require('../adapter/hostMonitor/nmap/NmapMonitor');

class ScheduledTaskController {
    startTask(io) {
        let monitorHostsUseCase = new MonitorHostsUseCase(new MongoHostRepository(), new NmapMonitor());
        setInterval(async function() {
            try {
                let hosts = await monitorHostsUseCase.execute();
                io.emit('updateHost', hosts);
            } catch(e) {
                console.log('Error: ' + e)
            }
        }, 5000);
    }
}

module.exports = ScheduledTaskController;