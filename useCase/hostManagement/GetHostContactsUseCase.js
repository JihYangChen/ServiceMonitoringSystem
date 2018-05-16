var Contact = require('../../entity/Contact');

class GetHostContactsUseCase {
    constructor(context, hostContactsMapRepository) {
        this._context = context;
        this._hostContactsMapRepository = hostContactsMapRepository;
    }

    async execute(hostId) {
        let contactsInstancesList = this._context.getContactsByHostId(hostId);

        if (!contactsInstancesList)
            return null;

        let contactsObjectList = [];
        contactsInstancesList.forEach(contact => {
            contactsObjectList.push({"id": contact._id, "name": contact._name, "notifyAddresses": contact._notifyAddresses});
        });

        return contactsObjectList;
    }
}

module.exports = GetHostContactsUseCase;