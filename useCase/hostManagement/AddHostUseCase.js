var Host = require('../../entity/Host')
var NmapCommand = require('../../entity/command/NmapCommand');
var PingCommand = require('../../entity/command/PingCommand');

class AddHostUseCase {
    constructor(context, hostRepository, hostContactsMapRepository) {
        this._context = context;
        this._hostRepository = hostRepository;
        this._hostContactsMapRepository = hostContactsMapRepository;
    }

    async execute(hostObject) {
        if (!('statusStartTime' in hostObject))
            hostObject.statusStartTime = Date();
        if (!('lastCheckTime' in hostObject))
            hostObject.lastCheckTime = Date();

        let hostId = await this._hostRepository.addHost(hostObject);

        let checkCommand;
        if (hostObject.checkServiceOption == 'Nmap')
            checkCommand = new NmapCommand();
        else
            checkCommand = new PingCommand();
        checkCommand.setHost(hostObject.host);
        
        let contactList = hostObject.contactsId.map( contactId => {
            return this._context.getContactById(contactId);
        });

        let hostInstance = new Host(this._context._eventPublisher, hostId, hostObject.displayName, hostObject.host, hostObject.status, hostObject.statusStartTime, 
                                    hostObject.lastCheckTime, checkCommand, contactList);
            
        this._context.addHost(hostInstance);

        console.log('contactList' + contactList[0]._name);
        console.log('contactsId' + hostObject.contactsId);
        await this._hostContactsMapRepository.addHostContactsMap(hostId, hostObject.contactsId);

        return hostId;
    }
}

module.exports = AddHostUseCase;