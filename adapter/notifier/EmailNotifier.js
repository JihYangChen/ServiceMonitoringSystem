class EmailNotifier {

    notify(address, message) {
        console.log("----------------------------------------------------------");
        console.log("Email address : ", address);
        console.log("Email message : ", message);
        console.log("----------------------------------------------------------\n\n");
    }
}

module.exports = EmailNotifier;