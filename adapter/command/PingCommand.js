var ping = require('ping');
var IPingCommand = require('../../useCase/interface/command/IPingCommand');

class PingCommand extends IPingCommand {
    async execute() {
        let host = this._host;

        let pingResult = await ping.promise.probe(host.host);

        if (pingResult.alive)
            setHostStatus(host, "Up");
        else 
            setHostStatus(host, "Down");

        return host;
    }

    setHost(host) {
        this._host = host;
    }
}

function setHostStatus(host, newStatus) {
    if (host.status != newStatus)
        host.statusStartTime = Date();
    host.status = newStatus;
    host.lastCheckTime = Date();
}

module.exports = PingCommand;