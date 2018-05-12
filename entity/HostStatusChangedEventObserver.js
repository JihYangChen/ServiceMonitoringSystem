var IObserver = require('./interface/IObserver');
var IGetHostContacts = require('./interface/IGetHostContacts');
var INotifier = require('./interface/INotifier');
var HostStatusChangedEvent = require('./HostStatusChangedEvent');
let instance = null;

class HostStatusChangedEventObserver extends IObserver {

    constructor(getHostContactsUseCase, notifier) {
        super(); 
        if (!instance) {
            instance = this;
        }
        this._getHostContactUseCase = getHostContactsUseCase;

        this._notifier = notifier;

        return instance;
    }

    async update(event) {
        if (event._eventName != 'HostStatusChangedEvent')
            return;

        let contacts = await this._getHostContactUseCase.execute(event._message.hostId);

        if (contacts == null || contacts.length == 0) {
            return 'failed';
        }
        for (let contact of contacts) {
            for (let notifyAddress of contact.notifyAddresses) {
                event._message.contactsName = contact.name;
                this._notifier.notify(notifyAddress.notifyType, notifyAddress.address, event._message);
            }
        }

        return 'success';
    }
}

module.exports = HostStatusChangedEventObserver;
