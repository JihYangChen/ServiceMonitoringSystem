var IHostContactMapRepository = require('../../../useCase/interface/repository/IHostContactMapRepository');
var HostContactsMapModel = require('./model/HostContactsMapModel');

class MongoHostContactMapRepository extends IHostContactMapRepository {
    async getContactsByHostId(hostId) {
        console.log("hostid :" + hostId);
        let contacts = []
         await HostContactsMapModel.find({hostId:hostId})
        .populate('contactId')
        .exec(function(err,hostContactMap){
            console.log("hostContactMap" + hostContactMap);
            contacts = hostContactMap;
        });
        return contacts;
    }
}

module.exports = MongoHostContactMapRepository;