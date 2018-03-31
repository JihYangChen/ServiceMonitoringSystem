class LineNotifier  {

    notify(address, message) {
        console.log("L address -> ", address);
        console.log("L message -> ", message);
    }
}

module.exports = LineNotifier;