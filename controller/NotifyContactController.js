var MongoHostContactMapRepository = require('../adapter/repository/mongoDB/MongoHostContactMapRepository')
var hostContactMapRepository = new MongoHostContactMapRepository();
var MongoContactRepository = require('../adapter/repository/mongoDB/MongoContactRepository');
var contactMapRepository = new hostContactMapRepository();

var GetContactsMapUseCase = require('../useCase/hostManagement/GetHostsContactsMapUseCase');
let getContactsMapUseCase = new GetContactsMapUseCase(hostContactMapRepository);
var NotifyContactUseCase = require('../useCase/hostMonitor/NotifyContactUseCase');

class NotifyContactController {
    constructor(statusUpdatedHostIds) {
        this._statusUpdatedHostIds = statusUpdatedHostIds;
    }

    findHostContactsAndNotify() {
        for (statusUpdatedHostId of _statusUpdatedHostIds) {
            let contacts = getContactsMapUseCase.execute(statusUpdatedHostId);
            let message = "Host: \"" + statusUpdatedHostId + "\" status has changed!!"
            
            for (notifyAddress of contacts.notifyAddresses) {
                let notifier;
                if (notifyAddress.notifyType == 'Email')
                    notifier = new EmailNotifier();
                else if(notifyAddress.notifyType == 'Line')
                    notifier = new LineNotifier();
                else if(notifyAddress.notifyType == 'Skype')
                    notifier = new SkypeNotifier();
                else if(notifyAddress.notifyType == 'FB')
                    notifier = new FBNotifier();
                else if(notifyAddress.notifyType == 'Phone')
                    notifier = new PhoneNotifier();

                let notifyContactUseCase = new NotifyContactUseCase(contactRepository, notifier);
                notifyContactUseCase.execute(notifyAddress.address, message);
            }
        }
    }
}

module.exports = MonitorHostsUseCase;