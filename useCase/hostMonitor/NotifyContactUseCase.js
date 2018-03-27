var Host = require('../../entity/Host');

class NotifyContactUseCase {
    constructor(hostContactMapRepository) {
        this._hostContactMapRepository = hostContactMapRepository;
    }

    async execute(host) {
        let contacts = [];
        contacts = await this._hostContactMapRepository.findContactsByHostId(host._id);
        for (contact in contacts) {
            let contactInstance = new Contact(contact._id, name, contact.notifyAddresses);
            
        }
    }
}

module.exports = MonitorHostsUseCase;