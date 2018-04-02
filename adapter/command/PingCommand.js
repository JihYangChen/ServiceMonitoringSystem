var ping = require('ping');

class PingCommand {
    async execute(host) {
        let pingResult = await ping.promise.probe(host.host);

        if (pingResult.alive)
            setHostStatus(host, "Up");
        else 
            setHostStatus(host, "Down");

        return host;
    }
}

function setHostStatus(host, newStatus) {
    if (host.status != newStatus)
        host.statusStartTime = Date();
    host.status = newStatus;
    host.lastCheckTime = Date();
}

module.exports = PingCommand;