class AddHostUseCase {
    constructor(hostRepository) {
        this.hostRepository = hostRepository;
    }

    async execute(host) {
        if (!('statusStartTime' in host))
            host.statusStartTime = Date();
        if (!('lastCheckTime' in host))
            host.lastCheckTime = Date();

        return await this.hostRepository.addHost(host);
    }
}

module.exports = AddHostUseCase;