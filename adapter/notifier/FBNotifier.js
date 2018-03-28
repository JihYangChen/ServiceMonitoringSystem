var INotifier = require('../../useCase/interface/notifier/INotifier');

class FBNotifier extends INotifier {

    notify(address, message) {
        console.log("fb address -> ", address);
        console.log("fb message -> ", message);
    }
}

module.exports = FBNotifier;