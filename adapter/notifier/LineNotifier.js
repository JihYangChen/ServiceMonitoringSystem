var INotifier = require('../../useCase/interface/notifier/INotifier');

class LineNotifier extends INotifier {

    notify(address, message) {
        console.log("L address -> ", address);
        console.log("L message -> ", message);
    }
}

module.exports = LineNotifier;