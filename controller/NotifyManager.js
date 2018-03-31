var INotifyManager = require('../useCase/interface/notifier/INotifierManager');

var EmailNotifier = require('../adapter/notifier/EmailNotifier');
var FBNotifier = require('../adapter/notifier/FBNotifier');
var LineNotifier = require('../adapter/notifier/LineNotifier');
var PhoneNotifier = require('../adapter/notifier/PhoneNotifier');
var SkypeNotifier = require('../adapter/notifier/SkypeNotifier');

class NotifyManager extends INotifyManager {
    async notify(notifyType, notifyAddress, message) {
        let notifier;

        if (notifyType == 'Email')
            notifier = new EmailNotifier();
        else if (notifyType == 'Line')
            notifier = new LineNotifier();
        else if (notifyType == 'Skype')
            notifier = new SkypeNotifier();
        else if (notifyType == 'FB')
            notifier = new FBNotifier();
        else if (notifyType == 'Phone')
            notifier = new PhoneNotifier();

        notifier.notify(notifyAddress, message);
    }
}

module.exports = NotifyManager;