var mongoHostRepository = new (require('./adapter/repository/mongoDB/MongoHostRepository'))();
var mongoContactRepository = new (require('./adapter/repository/mongoDB/MongoContactRepository'))();
var mongoHostContactsMapRepository = new (require('./adapter/repository/mongoDB/MongoHostContactsMapRepository'))();

var Host = require('./entity/Host');
var Contact = require('./entity/Contact');
var NmapCommand = require('./entity/command/NmapCommand');
var PingCommand = require('./entity/command/NmapCommand');
var EventPublisher = require('./entity/EventPublisher');
var HostStatusChangedEventObserver = require('./entity/HostStatusChangedEventObserver');
var NotifyManager = require('./controller/NotifyManager');

class EntityContext {
    constructor(){
        this.eventPublisher = this.initEventPublisher();
        this.hostList = this.initHostList();
        this.contactList = this.initContactList();
    }

    initEventPublisher() {
        let hostStatusChangedEventObserver = new HostStatusChangedEventObserver(new NotifyManager());
        return new EventPublisher().attachObserver(hostStatusChangedEventObserver);
    }

    async initHostList() {
        let hostList = [];
        let foundHostObjectsFromDB = await mongoHostRepository.getHosts();
        
        for (let hostObject of foundHostObjectsFromDB) {
            let contacts = await this.getContactsByHostIdFromRepository(hostObject._id);

            let checkCommand;
            if (hostObject.checkServiceOption == 'Nmap')
                checkCommand = new NmapCommand();
            else
                checkCommand = new PingCommand();
            checkCommand.setHost(hostObject.host);

            hostList.push(new Host(this.eventPublisher, hostObject._id, hostObject.displayName, hostObject.host, hostObject.status, hostObject.statusStartTime, hostObject.lastCheckTime, checkCommand, contacts));
        }

        console.log('HostList initialization finished!');
        return hostList;
    }

    async initContactList() {
        let contactList = [];
        let foundContactObjectsFromDB = await mongoContactRepository.getContacts();
        
        for (let contactObject of foundContactObjectsFromDB) {
            contactList.push(new Contact(contactObject._id, contactObject.name, contactObject.notifyAddresses));
        }

        console.log('ContactList initialization finished!');
        return contactList;
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