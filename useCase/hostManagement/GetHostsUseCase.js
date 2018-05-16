var Host = require('../../entity/Host');

class GetHostsUseCase {
    constructor(context) {
        this.context = context;
    }

    async execute() {
        let hostsInstancesList = this.context.getHosts();

        let hostsObjectList = [];
        hostsInstancesList.forEach(host => {
            hostsObjectList.push({"id": host._id, "displayName": host._displayName, "host": host._host, "status": host._status, "statusStartTime": host._statusStartTime, "lastCheckTime": host._lastCheckTime, "checkServiceOption": host._checkCommand.getCommandString()});
        });

        return hostsObjectList;
    }
}

module.exports = GetHostsUseCase;