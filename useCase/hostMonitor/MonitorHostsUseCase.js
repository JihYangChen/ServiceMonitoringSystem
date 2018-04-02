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
            //onsole.log("host is " + host);
            hostsInstancesList.push(new Host(host._id, host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime));
        });

        let hostsObjectList = [];
        hostsInstancesList.forEach(host => {
            hostsObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime});
        });

        let monitorResultHosts = [];
        monitorResultHosts = await this._hostMonitor.monitorHosts(hostsObjectList);
        // update MongoDB

        await this._hostRepository.updateHosts(monitorResultHosts);
        
        await this.checkStatusDiff(hostsInstancesList, monitorResultHosts);

        return monitorResultHosts;
    }

    async checkStatusDiff(originalHosts, monitorResultHosts) {
        let statusUpdatedHostIds = [];
        for (let index in originalHosts) {
            if (originalHosts[index]._status != monitorResultHosts[index].status) {
                originalHosts[index]._status = monitorResultHosts[index].status;
                await originalHosts[index].publishStatusHostEvent();
            }
        }
    }
}

module.exports = MonitorHostsUseCase;