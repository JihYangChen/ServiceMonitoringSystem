var EventPublisher = require('../../entity/EventPublisher');
var HostStatusChangedEventObserver = require('../../entity/HostStatusChangedEventObserver');
var INotifyManager = require('../interface/notifier/INotifierManager');
var GetHostContactsUseCase = require('../hostManagement/GetHostContactsUseCase');

class InitializeUseCase {

    constructor(notifierManager) {
        this._notifierManager = notifierManager;
    }

    execute() {
        
    }
}

module.exports = InitializeUseCase;