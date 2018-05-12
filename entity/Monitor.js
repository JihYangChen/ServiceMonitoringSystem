class Monitor {

    storeCommand(command) {
        this._command = command;
    }

    async monitor() {
        return await this._command.execute();
    }
}

module.exports = Monitor;