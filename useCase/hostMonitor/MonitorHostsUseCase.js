var Host = require('../../entity/Host');

class MonitorHostsUseCase {
    constructor(hostRepository, hostMonitor) {
        this._hostRepository = hostRepository;
        this._hostMonitor = hostMonitor;
    }

    async execute() {
        let foundHostsFromDB = await this._hostRepository.getHosts();

        let hostsInstancesList = [];
        foundHostsFromDB.forEach(host => {
            hostsInstancesList.push(new Host(host._id, host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime));
        });

        let hostsObjectList = [];
        hostsInstancesList.forEach(host => {
            hostsObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime});
        });

        let monitorResultHosts = [];
        monitorResultHosts = await this._hostMonitor.monitorHosts(hostsObjectList);

        await this._hostRepository.updateHosts(monitorResultHosts);

        let statusUpdatedHostIds = this.checkStatusDiff(hostsObjectList, monitorResultHosts);
        
        // [[] []]
        return [monitorResultHosts, statusUpdatedHostIds];
    }

    checkStatusDiff(originalHosts, monitorResultHosts) {
        let statusUpdatedHostIds = [];
        for (let index in originalHosts) {
            if (originalHosts[index].status != monitorResultHosts[index].status) {
                statusUpdatedHosts.push(monitorResultHosts[index].id);
            }
        }
        return statusUpdatedHostIds;
    }
}

module.exports = MonitorHostsUseCase;