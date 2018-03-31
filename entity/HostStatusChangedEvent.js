var IEvent = require('./interface/IEvent');

class HostStatusChangedEvent extends IEvent {
    constructor() {
        this._eventName = 'HostStatusChangedEvent';
        this._notifyType = '';
        this._address = '';
        this._message = '';
    }
}

module.exports = HostStatusChangedEvent;