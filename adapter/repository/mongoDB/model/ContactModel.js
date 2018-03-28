var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name: String, 
  notifyAddresses: [{notifyType: String, address: String}]
}, { collection: 'contact' });

module.exports = mongoose.model('contact', contactSchema);