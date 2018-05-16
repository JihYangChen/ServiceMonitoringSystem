var IObserver = require('./interface/IObserver');
var IGetHostContacts = require('./interface/IGetHostContacts');
var INotifier = require('./interface/INotifier');
var HostStatusChangedEvent = require('./HostStatusChangedEvent');
let instance = null;

class HostStatusChangedEventObserver extends IObserver {

    constructor(notifier) {
        super();                    // To use 'this', must call super() first.
        this._notifier = notifier;
    }

    async update(event) {
        console.log('Message -> ' + JSON.stringify(event._message));
        if (event._eventName != 'HostStatusChangedEvent')
            return;
            
        let contacts = event._message.contacts;

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
