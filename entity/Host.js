class Host {
    constructor(displayName, host) {
        this.displayName = displayName;
        this.host = host;
        this.status = status;
        this.statusStartTime = Date();
        this.lastCheckTime = Date();
    }
}

module.exports = Host;