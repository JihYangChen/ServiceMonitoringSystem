var Contact = require('../../entity/Contact');

class AddContactUseCase {
    constructor(context, contactRepository) {
        this._context = context;
        this._contactRepository = contactRepository;
    }

    async execute(contactObject) {
        let contactId = await this._contactRepository.addContact(contactObject);
        
        let contactInstance = new Contact(contactId, contactObject.name, contactObject.notifyAddresses);
        console.log('contactInstance' + contactInstance._notifyAddresses);

        this._context.addContact(contactInstance);
        return contactId;
    }
}

module.exports = AddContactUseCase;