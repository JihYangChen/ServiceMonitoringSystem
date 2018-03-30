var MongoHostContactsMapRepository = require('../adapter/repository/mongoDB/MongoHostContactsMapRepository')
var hostContactsMapRepository = new MongoHostContactsMapRepository();
var MongoContactRepository = require('../adapter/repository/mongoDB/MongoContactRepository');
var contactRepository = new MongoContactRepository();

var GetHostContactsUseCase = require('../useCase/hostManagement/GetHostContactsUseCase');
let getHostContactsUseCase = new GetHostContactsUseCase(hostContactsMapRepository);
var NotifyContactUseCase = require('../useCase/hostMonitor/NotifyContactUseCase');

var EmailNotifier = require('../adapter/notifier/EmailNotifier');
var FBNotifier = require('../adapter/notifier/FBNotifier');
var LineNotifier = require('../adapter/notifier/LineNotifier');
var PhoneNotifier = require('../adapter/notifier/PhoneNotifier');
var SkypeNotifier = require('../adapter/notifier/SkypeNotifier');

class NotifyContactController {
    constructor(statusUpdatedHostIds) {
        this._statusUpdatedHostIds = statusUpdatedHostIds;
    }

    async findHostContactsAndNotify() {

        for (let statusUpdatedHostId of this._statusUpdatedHostIds) {

            let contacts = await getHostContactsUseCase.execute(statusUpdatedHostId);

            let message = "Host: \"" + statusUpdatedHostId + "\" status has changed!!"
            
            for (let contact of contacts) {
                for (let notifyAddress of contact.notifyAddresses) {
                    let notifier;
                    if (notifyAddress.notifyType == 'Email')
                        notifier = new EmailNotifier();
                    else if (notifyAddress.notifyType == 'Line')
                        notifier = new LineNotifier();
                    else if (notifyAddress.notifyType == 'Skype')
                        notifier = new SkypeNotifier();
                    else if (notifyAddress.notifyType == 'FB')
                        notifier = new FBNotifier();
                    else if (notifyAddress.notifyType == 'Phone')
                        notifier = new PhoneNotifier();

                    let notifyContactUseCase = new NotifyContactUseCase(notifier);
                    notifyContactUseCase.execute(notifyAddress.address, message);
                }
            }
        }
    }
}

module.exports = NotifyContactController;