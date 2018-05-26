class DeleteHostUseCase {
    constructor(context, hostRepository) {
        this._context = context;
        this._hostRepository = hostRepository;
    }

    async execute(hostId) {
        this._context.deleteHostById(hostId);
        return await this._hostRepository.deleteHost(hostId);
    }
}

module.exports = DeleteHostUseCase;