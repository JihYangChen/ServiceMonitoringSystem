var HostStatusChangedEvent = require('../entity/HostStatusChangedEvent');
var EvenetPublisher = require('../entity/EventPublisher');

class Host {
    constructor(id, displayName, host, status, statusStartTime, lastCheckTime, checkCommand, contacts) {
        this._id = id;
        this._displayName = displayName;
        this._host = host;
        this._status = status;
        this._statusStartTime = statusStartTime;
        this._lastCheckTime = lastCheckTime;
        this._checkCommand = checkCommand;
        this._contacts = contacts;
    }

    setHostStatus(newStatus) {
        this._lastCheckTime = Date();
        if (this._status != newStatus) {
            this._statusStartTime = Date();
            this._status = newStatus;
            this.publishStatusHostEvent();
        }
    }

    async publishStatusHostEvent() {
        let message = {
            hostId: this._id,
            displayName: this._displayName,
            host: this._host,
            status: this._status,
            statusStartTime: this._statusStartTime,
            lastCheckTime: this._lastCheckTime,
            checkCommand: this._checkCommand.getCommandString(),
            contacts: this._contacts.map(contact => {
                return { name: contact._name,
                            notifyAddresses: contact._notifyAddresses
                        }
            })
        }

        await new EvenetPublisher().broadcast(new HostStatusChangedEvent(message));
    }
}

module.exports = Host;