var IHostRepository = require('../../../useCase/interface/repository/IHostRepository');
var HostModel = require('./model/HostModel')

class MongoHostRepository extends IHostRepository {
    async getHosts() {
        try {
            let hosts = await HostModel.find();
            return hosts;
        } catch(error) {
            console.log('GetHosts error: ' + error);
            return 'error';
        }
    }

    async addHost(host) {
        try {
            let hostModel = new HostModel(host);
            let newHost = await hostModel.save();
            return newHost;
        } catch(error) {
            console.log('GetHosts error: ' + error);
            return 'error';
        }
    }
}

module.exports = MongoHostRepository;