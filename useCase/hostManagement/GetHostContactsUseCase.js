class GetHostContactsUseCase {
    constructor(hostContactMapRepository) {
        this._hostContactMapRepository = hostContactMapRepository;
    }

    async execute(hostId) {
        return await this._hostContactMapRepository.getContactsByHostId(hostId);
    }
}

module.exports = GetHostContactsUseCase;