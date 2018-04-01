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

        // willie: because `hostMonitor.monitorHosts()` would modify hostObjectList programmatically, 
        // hence we need a truely deep copy for original hosts here to prevent it from being rather like a new one
        // or we can just simply pass `hostsInstancesList` as a original parameter of `checkStatusDiff()`
        let originalHosts = JSON.parse(JSON.stringify(hostsObjectList));

        let monitorResultHosts = [];
        monitorResultHosts = await this._hostMonitor.monitorHosts(hostsObjectList);

        // update MongoDB
        await this._hostRepository.updateHosts(monitorResultHosts);
        
        let statusUpdatedHostIds = await this.checkStatusDiff(hostsInstancesList, monitorResultHosts);
        // [[] []]
        return [monitorResultHosts, statusUpdatedHostIds];
    }

    async checkStatusDiff(originalHosts, monitorResultHosts) {
        let statusUpdatedHostIds = [];
        for (let index in originalHosts) {
            if (originalHosts[index]._status != monitorResultHosts[index].status) {
                await originalHosts[index].publishEvent();
                statusUpdatedHostIds.push(monitorResultHosts[index].id);
            }
        }
        return statusUpdatedHostIds;
    }
}

module.exports = MonitorHostsUseCase;