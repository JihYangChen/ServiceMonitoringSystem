var IEvent = require('./interface/IEvent')
var IObserver = require('./interface/IObserver')
let instance = null;

class EventPublisher {
    constructor() {
        this._observers = [];
    }

    attachObserver(observer) {
        this._observers.push(observer);
    }

    detatchObserver(deletedObserver) {
        for (let index in this._observers) {
            if (this._observers[index] === deletedObserver) {
                this._observers.splice(index, 1);
            }
        }
        this._observers.push(observer);
    }

    async broadcast(event) {
        for (let observer of this._observers) {
            await observer.update(event);
        }
    }
}

module.exports = EventPublisher;