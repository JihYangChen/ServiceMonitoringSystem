class PhoneNotifier {

    notify(address, message) {
        console.log("----------------------------------------------------------");
        console.log("Phone address : ", address);
        console.log("Phone message : ", message);
        console.log("----------------------------------------------------------\n\n");
    }
}

module.exports = PhoneNotifier;