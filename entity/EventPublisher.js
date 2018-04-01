var IEvent = require('./interface/IEvent')
var IObserver = require('./interface/IObserver')
let instance = null;

class EventPublisher {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this._observers = [];
        return instance;
    }

    attachObserver(observer) {
        this._observers.push(observer);
    }

    detatchObserver(observer) {
        console.log('掰掰')
        // this._observers.push(observer);
    }

    async broadcast(event) {
        for (let observer of this._observers) {
            await observer.update(event);
        }
    }
}

module.exports = EventPublisher;