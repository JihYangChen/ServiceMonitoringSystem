var HostStatusChangedEvent = require('../entity/HostStatusChangedEvent');
var EvenetPublisher = require('../entity/EventPublisher');

class Host {
    constructor(id, displayName, host, status, statusStartTime, lastCheckTime) {
        this._id = id;
        this._displayName = displayName;
        this._host = host;
        this._status = status;
        this._statusStartTime = statusStartTime;
        this._lastCheckTime = lastCheckTime;
    }

    async publishEvent() {
        let message = {
            hostId: this._id,
            displayName: this._displayName,
            host: this._host,
            status: this._status,
            statusStartTime: this._statusStartTime,
            lastCheckTime: this._lastCheckTime
        }

        await new EvenetPublisher().broadcast(new HostStatusChangedEvent(message));
    }
}

module.exports = Host;