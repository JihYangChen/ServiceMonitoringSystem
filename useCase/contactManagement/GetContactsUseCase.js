var Contact = require('../../entity/Contact');

class GetContactsUseCase {
    constructor(context, contactRepository) {
        this._context = context;
        this._contactRepository = contactRepository;
    }

    async execute() {
        let contactInstanceList = await this._context.getContacts();

        let contactObjectList = [];
        contactInstanceList.forEach(contact => {
            contactObjectList.push({"id": contact._id, "name": contact._name, "notifyAddresses": contact._notifyAddresses});
        });

        return contactObjectList;
    }
}

module.exports = GetContactsUseCase;