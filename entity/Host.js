class Host {
    constructor(displayName, host, status, statusStartTime, lastCheckTime) {
        this._displayName = displayName;
        this._host = host;
        this._status = status;
        this._statusStartTime = statusStartTime;
        this._lastCheckTime = lastCheckTime;
    }
}

module.exports = Host;