class EmailNotifier {

    notify(address, message) {
        console.log("E address -> ", address);
        console.log("E message -> ", message);
    }
}

module.exports = EmailNotifier;