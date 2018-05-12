var IContactRepository = require('../../../useCase/interface/repository/IContactRepository');
var ContactModel = require('./model/ContactModel');

class MongoContactRepository extends IContactRepository {
    async getContacts() {
        try {
            let contacts = await ContactModel.find();
            return contacts;
        } catch(error) {
            console.log('GetContacts Error: ' + error);
            return 'error';
        }
    }

    async addContact(contact) {
        try {
            let contactModel = new ContactModel(contact);
            let newContact = await contactModel.save();
            return newContact;
        } catch(error) {
            return 'error';
        }
    }

    // async deleteHost(hostId) {
    //     try {
    //         await HostModel.findByIdAndRemove(hostId).exec();
    //         return 'Delete OK!';
    //     } catch(error) {
    //         console.log('DeleteHost Error: ' + error);
    //         return 'error';
    //     }
    // }

    // async updateHosts(hosts) {
    //     try {
    //         for (let index in hosts) {
    //             await HostModel.findByIdAndUpdate(hosts[index].id, hosts[index]).exec();
    //         }
    //         return 'Update OK!';
    //     } catch(error) {
    //         return 'error';
    //     }
    // }
}

module.exports = MongoContactRepository;