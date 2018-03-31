class FBNotifier  {

    notify(address, message) {
        console.log("fb address -> ", address);
        console.log("fb message -> ", message);
    }
}

module.exports = FBNotifier;