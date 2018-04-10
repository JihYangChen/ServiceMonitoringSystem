var Host = require('../../entity/Host');
var Monitor = require('../../entity/Monitor');

class MonitorHostsUseCase {
    constructor(hostRepository, nmapCommand, pingCommand) {
        this._hostRepository = hostRepository;
        this._nmapCommand = nmapCommand;
        this._pingCommand = pingCommand;
        this._monitor = new Monitor();
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
        monitorResultHosts = await this.monitorHosts(hostsObjectList);

        await this._hostRepository.updateHosts(monitorResultHosts);

        await this.checkStatusDiff(hostsInstancesList, monitorResultHosts);

        return monitorResultHosts;
    }

    async monitorHosts(hostObjectList) {
        let monitoredHostResults = [];
        for (let host of hostObjectList) {
            let command;
            if (host.checkServiceOption == 'Nmap')
                command = this._nmapCommand;
            else if (host.checkServiceOption == 'Ping')
                command = this._pingCommand;
            command.setHost(host);
            this._monitor.storeCommand(command);
            monitoredHostResults.push(await this._monitor.monitor());
        }
        return monitoredHostResults;
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