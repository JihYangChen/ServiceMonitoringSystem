class AddHostForContactsToMonitorUseCase {
    constructor(hostContactsMapRepository) {
        this._hostContactsMapRepository = hostContactsMapRepository;
    }

    async execute(hostId, contactsId) {
        return await this._hostContactsMapRepository.addHostContactsMap(hostId, contactsId);
    }
}

module.exports = AddHostForContactsToMonitorUseCase;