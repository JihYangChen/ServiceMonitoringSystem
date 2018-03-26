class GetHostsUseCase {
    constructor(hostRepository) {
        this.hostRepository = hostRepository;
    }

    async execute() {
        let result = await this.hostRepository.getHosts();
        return result;
    }
}

module.exports = GetHostsUseCase;