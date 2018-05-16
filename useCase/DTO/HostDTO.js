class HostDTO {
    constructor(id, displayName, host, status, statusStartTime, lastCheckTime, checkCommand) {
        this._id = id;
        this._displayName = displayName;
        this._host = host;
        this._status = status;
        this._statusStartTime = statusStartTime;
        this._lastCheckTime = lastCheckTime;
        this._checkCommand = checkCommand;
    }
}

module.exports = HostDTO;