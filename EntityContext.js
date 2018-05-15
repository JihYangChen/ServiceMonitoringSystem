var mongoHostRepository = new (require('./adapter/repository/mongoDB/MongoHostRepository'))();
var mongoContactRepository = new (require('./adapter/repository/mongoDB/MongoContactRepository'))();
var mongoHostContactsMapRepository = new (require('./adapter/repository/mongoDB/MongoHostContactsMapRepository'))();

var Host = require('./entity/Host');
var Contact = require('./entity/Contact');
var NmapCommand = require('./entity/command/NmapCommand');
var PingCommand = require('./entity/command/NmapCommand');
var EventPublisher = require('./entity/EventPublisher');
var HostStatusChangedEventObserver = require('./entity/HostStatusChangedEventObserver');

class EntityContext {
    constructor(){
        this.hostList = [];
        this.contactList = [];
        
        this.initHostList();
        this.initContactList();
    }

    async initHostList(){
        let foundHostObjectsFromDB = await mongoHostRepository.getHosts();
        
        for (let hostObject of foundHostObjectsFromDB) {
            let contacts = await this.getContactsByHostIdFromRepository(hostObject._id);

            let checkCommand;
            if (hostObject.checkServiceOption == 'Nmap')
                checkCommand = new NmapCommand();
            else
                checkCommand = new PingCommand();
            checkCommand.setHost(hostObject.host);

            this.hostList.push(new Host(hostObject._id, hostObject.displayName, hostObject.host, hostObject.status, hostObject.statusStartTime, hostObject.lastCheckTime, checkCommand, contacts));
        }
    }

    async initContactList(){
        let foundContactObjectsFromDB = await mongoContactRepository.getContacts();
        
        for (let contactObject of foundContactObjectsFromDB) {
            this.contactList.push(new Contact(contactObject._id, contactObject.name, contactObject.notifyAddresses));
        }
    }

    async getContactsByHostIdFromRepository(hostId) {
        let contactObjectList =  await mongoHostContactsMapRepository.getContactsByHostId(hostId);

        let contactInstantList = [];
        contactObjectList.forEach(contact => {
            contactInstantList.push(new Contact(contact._id, contact.name, contact.notifyAddresses));
        });

        return contactInstantList;
    }

}

module.exports = EntityContext;