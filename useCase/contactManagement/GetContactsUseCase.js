var Contact = require('../../entity/Contact');

class GetContactsUseCase {
    constructor(contactRepository) {
        this._contactRepository = contactRepository;
    }

    async execute() {
        let foundContactsFromDB = await this._contactRepository.getContacts();
        let contactsInstancesList = [];
        let contactsObjectList = []

        foundContactsFromDB.forEach(contact => {
            contactsInstancesList.push(new Contact(contact._id, contact.name, contact.notifyAddresses));
        });

        contactsInstancesList.forEach(contact => {
            contactsObjectList.push({"id": contact._id, "name": contact._name, "notifyAddresses": contact._notifyAddresses});
        });

        return contactsObjectList;
    }
}

module.exports = GetContactsUseCase;