var express = require('express');
var router = express.Router();

var AddContactUseCase = require('../../useCase/contactManagement/AddContactUseCase');
// var DeleteHostUseCase = require('../../useCase/hostManagement/DeleteHostUseCase');
var GetContactsUseCase = require('../../useCase/contactManagement/GetContactUseCase');

var MongoContactRepository = require('../../adapter/repository/mongoDB/MongoContactRepository');
var contactRepository = new MongoContactRepository();

router.get('/getContacts', async function(req, res, next) {
    let getContactsUseCase = new GetContactsUseCase(contactRepository);
    let contacts = await getContactsUseCase.execute();
    if (contacts == 'error')
        res.sendStatus(500);
    else
        res.send(contacts);
});

router.post('/addContact', async function(req, res, next) {
    console.log('AddContact')
    console.log(req.body)
    for(let notifyAddress of req.body.notifyAddresses)
        console.log(notifyAddress)
    
    let addContactUseCase = new AddContactUseCase(contactRepository);
    let result = await addContactUseCase.execute(req.body);
    if (result == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

module.exports = router;