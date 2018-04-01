class FBNotifier  {

    notify(address, message) {
        console.log("----------------------------------------------------------");
        console.log("FB address : ", address);
        console.log("FB message : ", message);
        console.log("----------------------------------------------------------\n\n");
    }
}

module.exports = FBNotifier;