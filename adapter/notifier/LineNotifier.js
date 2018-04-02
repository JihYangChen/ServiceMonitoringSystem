class LineNotifier  {

    notify(address, message) {
        console.log("----------------------------------------------------------");
        console.log("Line address : ", address);
        console.log("Line message : ", message);
        console.log("----------------------------------------------------------\n\n");
    }
}

module.exports = LineNotifier;