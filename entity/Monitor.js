class Monitor {
    async monitorHosts(hosts) {
        let monitoredHosts = [];

        for (let host of hosts) {
            let monitorResult = await host._checkCommand.execute();
            host.setHostStatus(monitorResult.status);
            monitoredHosts.push(host);
        }

        
        return monitoredHosts;
    }
}

module.exports = Monitor;