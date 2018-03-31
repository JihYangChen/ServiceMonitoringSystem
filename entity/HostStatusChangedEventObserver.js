var IObserver = require('./interface/IObserver');
var IGetHostContacts = require('./interface/IGetHostContacts');
var INotifier = require('./interface/INotifier');
var HostStatusChangedEvent = require('./HostStatusChangedEvent');

class HostStatusChangedEventObserver extends IObserver {

    constructor(getHostContactUseCase, notifier) {
        this._getHostContactUseCase = getHostContactUseCase;
        this._notifier = notifier;
    }

    update(event) {
        getHostContacts~~~;
        event.message.parse(~~~~);
        this._notifier.notify(notifyType, address, message);
    }
}

module.exports = new HostStatusChangedEventObserver(getHostContactUseCase, notifier);