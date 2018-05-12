var Contact = require('../../entity/Contact');

class AddContactUseCase {
    constructor(contactRepository) {
        this._contactRepository = contactRepository;
    }

    async execute(contact) {
        let contactInstance = new Contact("", contact.name, contact.notifyAddresses);
        let contactObject = {"name": contactInstance._name, "notifyAddresses": contactInstance._notifyAddresses};

        return await this._contactRepository.addContact(contactObject);
    }
}

module.exports = AddContactUseCase;