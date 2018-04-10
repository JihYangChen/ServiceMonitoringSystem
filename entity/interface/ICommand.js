class ICommand {
    async execute() {}
    setHost() {} // loweer level host, which means host object
}

module.exports = ICommand;