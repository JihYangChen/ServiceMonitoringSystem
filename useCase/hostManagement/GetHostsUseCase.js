var Host = require('../../entity/Host');

class GetHostsUseCase {
    constructor(context) {
        this._context = context;
    }

    async execute() {
        let hostsInstanceList = this._context.getHosts();

        let hostsObjectList = [];
        hostsInstanceList.forEach(host => {
            hostsObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkCommand.getCommandString()});
        });

        return hostsObjectList;
    }
}

module.exports = GetHostsUseCase;