var EventPublisher = require('../../entity/EventPublisher');
var INotifyManager = require('../interface/notifier/INotifyManager');
var GetHostContactsUseCase = require('../hostManagement/GetHostContactsUseCase');
var HostStatusChangedEventObserver = require('../../entity/HostStatusChangedEventObserver');

class InitializeUseCase {

    constructor(notifyManager, hostContactsMapRepositoty) {
        this._notifyManager = notifyManager;
        this._hostContactsMapRepositoty = hostContactsMapRepositoty;
    }

    execute() {
        let getHostContactsUseCase = new GetHostContactsUseCase(this._hostContactsMapRepositoty);
        let hostStatusChangedEventObserver = new HostStatusChangedEventObserver(getHostContactsUseCase, this._notifyManager);
        new EventPublisher().attachObserver(hostStatusChangedEventObserver);
    }
}

module.exports = InitializeUseCase;