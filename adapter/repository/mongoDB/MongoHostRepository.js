var IHostRepository = require('../../../useCase/interface/repository/IHostRepository');
var HostModel = require('./model/HostModel')

class MongoHostRepository extends IHostRepository {
    async getHosts() {
        try {
            let hosts = await HostModel.find();
            return hosts;
        } catch(error) {
            console.log('GetHosts Error: ' + error);
            return 'error';
        }
    }

    async addHost(host) {
        try {
            let hostModel = new HostModel(host);
            let newHost = await hostModel.save();
            return newHost;
        } catch(error) {
            console.log('AddHosts Error: ' + error);
            return 'error';
        }
    }

    async deleteHost(hostId) {
        try {
            await HostModel.findByIdAndRemove(hostId).exec();
            return 'Delete OK!';
        } catch(error) {
            console.log('DeleteHost Error: ' + error);
            return 'error';
        }
    }

    async updateHosts(hosts) {
        try {
            for (let index in hosts) {
                await HostModel.findByIdAndUpdate(hosts[index].id, hosts[index]).exec();
            }
            return 'Update OK!';
        } catch(error) {
            return 'error';
        }
    }
}

module.exports = MongoHostRepository;