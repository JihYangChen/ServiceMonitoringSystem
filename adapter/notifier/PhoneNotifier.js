var INotifier = require('../../useCase/interface/notifier/INotifier');

class PhoneNotifier extends INotifier {

    notify(address, message) {
        console.log("Phone address -> ", address);
        console.log("Phone message -> ", message);
    }
}

module.exports = PhoneNotifier;