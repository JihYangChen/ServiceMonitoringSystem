class NotifyContactUseCase {
    constructor(notifier) {
        this.notifier = notifier;
    }

    async execute(address, message) {
        this.notifier.notify(address, message);
    }
}

module.exports = NotifyContactUseCase;