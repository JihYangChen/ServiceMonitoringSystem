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
    constructor() {
        this._eventPublisher = new EventPublisher();
        this._hostList = [];
        this._contactList = [];

        this.initEventPublisher(this._eventPublisher);
        this.initHostList(this._hostList);
        this.initContactList(this._contactList);
    }

    initEventPublisher(eventPublisher) {
        let hostStatusChangedEventObserver = new HostStatusChangedEventObserver(new NotifyManager());
        eventPublisher.attachObserver(hostStatusChangedEventObserver);
    }

    async initHostList(hostList) {
        let foundHostObjectsFromDB = await mongoHostRepository.getHosts();
        
        for (let hostObject of foundHostObjectsFromDB) {
            let contacts = await this.getContactsByHostIdFromRepository(hostObject._id);

            let checkCommand;
            if (hostObject.checkServiceOption == 'Nmap')
                checkCommand = new NmapCommand();
            else
                checkCommand = new PingCommand();
            checkCommand.setHost(hostObject.host);

            hostList.push(new Host(this._eventPublisher, hostObject._id, hostObject.displayName, hostObject.host, hostObject.status, hostObject.statusStartTime, hostObject.lastCheckTime, checkCommand, contacts));
        }

        console.log('HostList initialization finished!');
    }

    async initContactList(contactList) {
        let foundContactObjectsFromDB = await mongoContactRepository.getContacts();
        
        for (let contactObject of foundContactObjectsFromDB) {
            contactList.push(new Contact(contactObject._id, contactObject.name, contactObject.notifyAddresses));
        }

        console.log('ContactList initialization finished!');
    }

    async getContactsByHostIdFromRepository(hostId) {
        let contactObjectList =  await mongoHostContactsMapRepository.getContactsByHostId(hostId);

        let contactInstantList = [];
        contactObjectList.forEach(contact => {
            contactInstantList.push(new Contact(contact._id, contact.name, contact.notifyAddresses));
        });

        return contactInstantList;
    }

    /* Host */  

    getHosts() {
        return this._hostList;
    }

    getHostById(hostId) {
        let hosts = this._hostList.filter(host => {
            return JSON.stringify(host._id) == JSON.stringify(hostId);
        });
        return hosts.length > 0 ? hosts[0] : null;
    }

    updateHosts(updatedHosts) {
        this._hostList = updatedHosts;
    }

    addHost(newHost) {
        this._hostList.push(newHost);
    }

    deleteHostById(hostId) {
        let host = this.getHostById(hostId);
        var index = this._hostList.indexOf(host);
        if (index > -1) {
            this._hostList.splice(index, 1);
        }
    }


    /* Contact */  
    
    getContacts() {
        return this._contactList;
    }

    getContactById(contactId) {
        return this._contactList.filter( contact => {
            return contact._id == contactId;
        });
    }

}

module.exports = EntityContext;