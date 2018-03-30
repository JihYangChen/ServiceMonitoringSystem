var Host = require('../../entity/Host')

class AddHostUseCase {
    constructor(hostRepository) {
        this._hostRepository = hostRepository;
    }

    async execute(host) {
        if (!('statusStartTime' in host))
            host.statusStartTime = Date();
        if (!('lastCheckTime' in host))
            host.lastCheckTime = Date();

        let hostInstance = new Host("", host.displayName, host.host, host.status, host.statusStartTime, host.lastCheckTime);
        let hostObject = {"displayName": hostInstance._displayName, "host": hostInstance._host, "status": hostInstance._status, "statusStartTime": hostInstance._statusStartTime, "lastCheckTime": hostInstance._lastCheckTime};
        
        return await this._hostRepository.addHost(hostObject);
    }
}

module.exports = AddHostUseCase;