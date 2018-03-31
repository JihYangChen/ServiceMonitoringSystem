var IEvent = require('./interface/IEvent')
var IObserver = require('./interface/IObserver')

class EventPublisher {
    constructor() {
        this._observers = [];
    }

    attachObserver(observer) {
        this._observers.push(observer);
    }

    detatchObserver(observer) {
        console.log('掰掰')
        // this._observers.push(observer);
    }
}

module.exports = new EventPublisher();