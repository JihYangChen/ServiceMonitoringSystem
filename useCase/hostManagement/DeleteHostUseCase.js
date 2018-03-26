class DeleteHostUseCase {
    constructor(hostRepository) {
        this.hostRepository = hostRepository;
    }

    async execute(hostId) {
        return await this.hostRepository.deleteHost(hostId);
    }
}

module.exports = DeleteHostUseCase;