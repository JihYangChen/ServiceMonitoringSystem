var mongoose = require('mongoose');
var IHostContactsMapRepository = require('../../../useCase/interface/repository/IHostContactsMapRepository');
var HostContactsMapModel = require('./model/HostContactsMapModel');

class MongoHostContactsMapRepository extends IHostContactsMapRepository {
    async addHostContactsMap(hostId, contactsId) {
        try {
            let hostContactsMapModel = new HostContactsMapModel({hostId: hostId, contactsId: contactsId});
            let newHostContactsMap = await hostContactsMapModel.save();
            return newHostContactsMap._id;
        } catch(error) {
            console.log('AddHostContactsMap Error: ' + error);
            return 'error';
        }
    }

    async getContactsByHostId(hostId) {
        try {
            let contactsIds = [];
            let mapResult = await HostContactsMapModel.findOne({hostId: mongoose.Types.ObjectId(hostId)})
                .populate('contactsId')
                .exec();

            if (mapResult == null)
                return null;
            return mapResult.contactsId;
        } catch(error) {
            console.log('GetContactsByHostId Error: ' + error);
            return 'error';
        }
    }
}

module.exports = MongoHostContactsMapRepository;