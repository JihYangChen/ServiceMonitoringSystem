class HostViewModel {
    constructor() {
        this._hostDTOList = [];
    }

    getHostsInfo() {
        let hostsInfo = this._hostDTOList.map(host => {
            return {
                id: host._id,
                displayName: host._displayName,
                host: host._host,
                status: host._status,
                statusStartTime: host._statusStartTime,
                lastCheckTime: host._lastCheckTime,
                checkServiceOption: host._checkCommand
            }
        });
        return hostsInfo;
    }
}

module.exports = HostViewModel;