class DeleteHostUseCase {
    constructor(hostRepository) {
        this._hostRepository = hostRepository;
    }

    async execute(hostId) {
        return await this._hostRepository.deleteHost(hostId);
    }
}

module.exports = DeleteHostUseCase;