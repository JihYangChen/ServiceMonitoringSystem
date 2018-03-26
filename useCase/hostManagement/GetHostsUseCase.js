var Host = require('../../entity/Host');

class GetHostsUseCase {
    constructor(hostRepository) {
        this._hostRepository = hostRepository;
    }

    async execute() {
        let foundHostsFromDB = await this._hostRepository.getHosts();
        let hostsInstancesList = [];
        let hostsObjectList = []

        foundHostsFromDB.forEach(host => {
            hostsInstancesList.push(new Host(host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime));
        });

        hostsInstancesList.forEach(host => {
            hostsObjectList.push({"displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime});
        });

        return hostsObjectList;
    }
}

module.exports = GetHostsUseCase;