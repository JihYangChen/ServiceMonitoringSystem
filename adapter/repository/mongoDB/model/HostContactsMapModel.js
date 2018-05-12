var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostContactsMapSchema = new Schema({ 
  hostId: {type : Schema.Types.ObjectId, required : true , ref: 'host'}, 
  contactsId: [{type : Schema.Types.ObjectId, required : true , ref: 'contact'}]
}, { collection: 'hostContactsMap' });

module.exports = mongoose.model('hostContactsMap', hostContactsMapSchema);