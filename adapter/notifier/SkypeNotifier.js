var INotifier = require('../../useCase/interface/notifier/INotifier');

class SkypeNotifier extends INotifier {

    notify(address, message) {
        console.log("skype address -> ", address);
        console.log("skype message -> ", message);
    }
}

module.exports = SkypeNotifier;