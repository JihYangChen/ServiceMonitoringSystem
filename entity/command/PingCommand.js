var ping = require('ping');
var ICommand = require('../interface/ICommand');

class PingCommand extends ICommand {
    async execute() {
        let host = this._host;
        let pingResult = await ping.promise.probe(host);
        let result = {}

        if (pingResult.alive)
            result = {status: "Up"}
        else 
            result = {status: "Down"}

        return result
    }

    setHost(host) {
        this._host = host;
    }

    getCommandString() {
        return "Ping";
    }
}

module.exports = PingCommand;