var ICommanManager = require('../useCase/interface/command/ICommandManager');

var NmapCommand = require('../adapter/command/NmapCommand');
var PingCommand = require('../adapter/command/PingCommand');

class CommandManager extends ICommanManager {
    async execute(hosts) {
        let monitoredHostResults = [];

        for (let host of hosts) {
            let command;
            if (host.checkServiceOption == 'Nmap')
                command = new NmapCommand();
            else if (host.checkServiceOption == 'Ping')
                command = new PingCommand();
            monitoredHostResults.push(await command.execute(host));
        }
        return monitoredHostResults;
    }
}

module.exports = CommandManager;