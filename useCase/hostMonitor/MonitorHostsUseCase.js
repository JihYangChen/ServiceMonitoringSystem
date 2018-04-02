var Host = require('../../entity/Host');

class MonitorHostsUseCase {
    constructor(hostRepository, commandManager) {
        this._hostRepository = hostRepository;
        this._commandManager = commandManager;
    }

    async execute() {
        let foundHostsFromDB = await this._hostRepository.getHosts();

        let hostsInstancesList = [];
        foundHostsFromDB.forEach(host => {
            hostsInstancesList.push(new Host(host._id, host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime, host.checkServiceOption));
        });

        let hostsObjectList = [];
        hostsInstancesList.forEach(host => {
            hostsObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkServiceOption});
        });


        let monitorResultHosts = [];
        monitorResultHosts = await this._commandManager.execute(hostsObjectList);

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