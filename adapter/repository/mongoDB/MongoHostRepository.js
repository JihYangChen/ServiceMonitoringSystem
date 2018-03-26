var IHostRepository = require('../../../useCase/interface/repository/IHostRepository');
var HostModel = require('./model/HostModel')

class MongoHostRepository extends IHostRepository {
    async getHosts() {
        var hosts = await HostModel.find();
        return hosts;
    }
}

module.exports = MongoHostRepository;