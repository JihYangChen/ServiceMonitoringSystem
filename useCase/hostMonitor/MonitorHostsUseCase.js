var Host = require('../../entity/Host');
var Monitor = require('../../entity/Monitor');
var IHostRepository = require('../interface/repository/IHostRepository');
// TODO: Delete Command require
var NmapCommand = require('../../entity/command/NmapCommand');
var PingCommand = require('../../entity/command/PingCommand');

class MonitorHostsUseCase {
    constructor(hostRepository) {
        this._hostRepository = hostRepository;
        this._monitor = new Monitor();
    }

    async execute() {
        let foundHostsFromDB = await this._hostRepository.getHosts();

        let hostsInstancesList = [];
        foundHostsFromDB.forEach(host => {
            // TODO: Modify command check
            let checkCommand;
            if (host.checkServiceOption == 'Nmap')
                checkCommand = new NmapCommand();
            else
                checkCommand = new PingCommand();
            checkCommand.setHost(host.host);
            hostsInstancesList.push(new Host(host._id, host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime, checkCommand));
        });

        let monitoredHostInstanceList = await this._monitor.monitorHosts(hostsInstancesList);

        let monitoredHostObjectList = [];
        monitoredHostInstanceList.forEach(host => {
            monitoredHostObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkCommand.getCommandString()});
        });


        await this._hostRepository.updateHosts(monitoredHostObjectList);

        return monitoredHostObjectList;
    }
}

module.exports = MonitorHostsUseCase;