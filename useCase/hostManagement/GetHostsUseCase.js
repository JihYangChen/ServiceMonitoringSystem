var Host = require('../../entity/Host');
var HostDTO = require('../DTO/HostDTO');

class GetHostsUseCase {
    constructor(context) {
        this._context = context;
    }

    execute() {
        let hostsInstanceList = this._context.getHosts();

        let hostDTOList = [];
        hostsInstanceList.forEach(host => {
            let hostDTO = new HostDTO(host._id, host._displayName, host._host, host._status, host._statusStartTime, host._lastCheckTime, host._checkCommand.getCommandString());
            hostDTOList.push(hostDTO);
        });

        return hostDTOList;
    }
}

module.exports = GetHostsUseCase;