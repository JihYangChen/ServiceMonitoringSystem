var IEvent = require('./interface/IEvent');

class HostStatusChangedEvent extends IEvent {
    constructor(message) {
        super();
        this._eventName = 'HostStatusChangedEvent';
        this._message = message;
    }
}

module.exports = HostStatusChangedEvent;