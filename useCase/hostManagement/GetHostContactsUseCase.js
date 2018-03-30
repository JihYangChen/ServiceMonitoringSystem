var Contact = require('../../entity/Contact');

class GetHostContactsUseCase {
    constructor(hostContactsMapRepository) {
        this._hostContactsMapRepository = hostContactsMapRepository;
    }

    async execute(hostId) {
        let foundContactsFromDB = await this._hostContactsMapRepository.getContactsByHostId(hostId);

        let contactsInstancesList = [];
        let contactsObjectList = []

        foundContactsFromDB.forEach(contact => {
            contactsInstancesList.push(new Contact(contact._id, contact.name, contact.notifyAddresses));
        });

        contactsInstancesList.forEach(contact => {
            contactsObjectList.push({"id": contact._id, "name": contact._name, "notifyAddress": contact._notifyAddresses});
        });

        return contactsObjectList;
    }
}

module.exports = GetHostContactsUseCase;