class SkypeNotifier{

    notify(address, message) {
        console.log("----------------------------------------------------------");
        console.log("skype address : ", address);
        console.log("skype message : ", message);
        console.log("----------------------------------------------------------\n\n");
    }
}

module.exports = SkypeNotifier;