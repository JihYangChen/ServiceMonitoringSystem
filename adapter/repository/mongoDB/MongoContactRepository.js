var IContactRepository = require('../../../useCase/interface/repository/IContactRepository');
var ContactModel = require('./model/ContactModel');

class MongoContactRepository extends IContactRepository {

}

module.exports = MongoContactRepository;