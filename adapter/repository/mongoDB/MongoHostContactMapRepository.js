var mongoose = require('mongoose');
var IHostContactMapRepository = require('../../../useCase/interface/repository/IHostContactMapRepository');
var HostContactsMapModel = require('./model/HostContactsMapModel');

class MongoHostContactMapRepository extends IHostContactMapRepository {
    async getContactsByHostId(hostId) {
        let contactsIds = [];
        let mapResult = await HostContactsMapModel.findOne({hostId: mongoose.Types.ObjectId(hostId)})
            .populate('contactsId')
            .exec();
        return mapResult.contactsId;
    }
}

module.exports = MongoHostContactMapRepository;