var Host = require('../../entity/Host');
var Monitor = require('../../entity/Monitor');
var IHostRepository = require('../interface/repository/IHostRepository');

class MonitorHostsUseCase {
    constructor(context, hostRepository) {
        this._context = context;
        this._hostRepository = hostRepository;
        this._monitor = new Monitor();
    }

    async execute() {
        let hostsInstancesList = this._context.getHosts();
        let monitoredHostInstanceList = await this._monitor.monitorHosts(hostsInstancesList);
        
        let monitoredHostObjectList = [];
        monitoredHostInstanceList.forEach(host => {
            monitoredHostObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkCommand.getCommandString()});
        });

        this._context.updateHosts(monitoredHostInstanceList);
        await this._hostRepository.updateHosts(monitoredHostObjectList);

        return monitoredHostObjectList;
    }
}

module.exports = MonitorHostsUseCase;