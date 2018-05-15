var Host = require('../../entity/Host');
// TODO: Delete Command require
var NmapCommand = require('../../entity/command/NmapCommand');
var PingCommand = require('../../entity/command/PingCommand');

class GetHostsUseCase {
    constructor(hostRepository) {
        this._hostRepository = hostRepository;
    }

    async execute() {
        let foundHostsFromDB = await this._hostRepository.getHosts();
        let hostsInstancesList = [];
        let hostsObjectList = []

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

        hostsInstancesList.forEach(host => {
            hostsObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkCommand.getCommandString()});
        });

        return hostsObjectList;
    }
}

module.exports = GetHostsUseCase;