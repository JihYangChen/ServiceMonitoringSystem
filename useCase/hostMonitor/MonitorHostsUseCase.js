var Host = require('../../entity/Host');
var Monitor = require('../../entity/Monitor');
var IHostRepository = require('../interface/repository/IHostRepository');
// TODO: Delete Command and Map Repository and Contact require
var NmapCommand = require('../../entity/command/NmapCommand');
var PingCommand = require('../../entity/command/PingCommand');
var MongoHostContactsMapRepository = require('../../adapter/repository/mongoDB/MongoHostContactsMapRepository');
var Contact = require('../../entity/Contact');

class MonitorHostsUseCase {
    constructor(hostRepository) {
        this._hostRepository = hostRepository;
        this._monitor = new Monitor();
    }

    async execute() {
        let foundHostsFromDB = await this._hostRepository.getHosts();

        let hostsInstancesList = [];
        for (let host of foundHostsFromDB) {
            // TODO: Modify command check
            let checkCommand;
            if (host.checkServiceOption == 'Nmap')
                checkCommand = new NmapCommand();
            else
                checkCommand = new PingCommand();
            checkCommand.setHost(host.host);

            let contactsList = await this.getContactsByHostId(host._id);
            hostsInstancesList.push(new Host(host._id, host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime, checkCommand, contactsList));
            
        };
        let monitoredHostInstanceList = await this._monitor.monitorHosts(hostsInstancesList);
        
        let monitoredHostObjectList = [];
        monitoredHostInstanceList.forEach(host => {
            monitoredHostObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkCommand.getCommandString()});
        });

        await this._hostRepository.updateHosts(monitoredHostObjectList);
        return monitoredHostObjectList;
    }

    // TODO: Delete this function
    async getContactsByHostId(hostId) {
        let mongoHostContactsMapRepository = new MongoHostContactsMapRepository();
        let contactObjectList =  await mongoHostContactsMapRepository.getContactsByHostId(hostId);

        let contactInstantList = [];
        contactObjectList.forEach(contact => {
            contactInstantList.push(new Contact(contact._id, contact.name, contact.notifyAddresses));
        });

        return contactInstantList;
    }
}

module.exports = MonitorHostsUseCase;