var MongoHostContactMapRepository = require('../adapter/repository/mongoDB/MongoHostContactMapRepository')
var hostContactMapRepository = new MongoHostContactMapRepository();
var MongoContactRepository = require('../adapter/repository/mongoDB/MongoContactRepository');
var contactRepository = new MongoContactRepository();

var GetHostContactsUseCase = require('../useCase/hostManagement/GetHostContactsUseCase');
let getHostContactsUseCase = new GetHostContactsUseCase(hostContactMapRepository);
var NotifyContactUseCase = require('../useCase/hostMonitor/NotifyContactUseCase');

class NotifyContactController {
    constructor(statusUpdatedHostIds) {
        this._statusUpdatedHostIds = statusUpdatedHostIds;
    }

    async findHostContactsAndNotify() {

        for (let statusUpdatedHostId of this._statusUpdatedHostIds) {

            let contacts = await getHostContactsUseCase.execute(statusUpdatedHostId);
            console.log("Contact: " + contacts[0]);

            let message = "Host: \"" + statusUpdatedHostId + "\" status has changed!!"
            
            for (let contact of contacts) {
                for (let notifyAddress of contact.notifyAddresses) {
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
}

module.exports = NotifyContactController;