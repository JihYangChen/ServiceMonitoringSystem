class NotifyContactUseCase {
    constructor(notifier) {
        this.notifier = notifier;
    }

    async execute(address, message) {
        notifier.notify(address, message);
    }
}

module.exports = NotifyContactUseCase;