var INotifier = require('../../useCase/interface/notifier/INotifier');

class EmailNotifier extends INotifier {

    notify(address, message) {
        console.log("E address -> ", address);
        console.log("E message -> ", message);
    }
}

module.exports = EmailNotifier;