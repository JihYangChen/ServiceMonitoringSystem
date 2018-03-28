var IHostContactMapRepository = require('../../../useCase/interface/repository/IHostContactMapRepository');
var HostModel = require('./model/HostModel')

class MongoHostContactMapRepository extends IHostContactMapRepository {
    async getContactsByHostId(hostId) {
        return [
            {
                _id: {
                    $oid: "5abb2e8a734d1d268cda3b99"
                },
                name: "Andy",
               notifyAddresses: [
                    {
                        notifyType: "Email",
                        address: "t106598014@ntut.org.tw"
                    },
                    {
                        notifyType: "Phone",
                        address: "0914254789"
                    }
                ]
            }, 
            {
                _id: {
                    $oid: "5abb2ee6734d1d268cda3b9f"
                },
                name: "Derek",
                notifyAddresses: [
                    {
                        notifyType: "Email",
                        address: "t106598022@ntut.org.tw"
                    },
                    {
                        notifyType: "Phone",
                        address: "0915421458"
                    }
                ]
            }
        ]
    }
}

module.exports = MongoHostContactMapRepository;