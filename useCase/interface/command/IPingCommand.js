var ICommand = require('../../../entity/interface/ICommand');

class IPingCommand extends ICommand {
    async execute() {}
    setHost() {}
}

module.exports = IPingCommand;