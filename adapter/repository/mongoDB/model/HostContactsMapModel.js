var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostContactMapSchema = new Schema({ 
  hostId: {type : Schema.Types.ObjectId, required : true , ref: 'host'}, 
  contactsId: [{type : Schema.Types.ObjectId, required : true , ref: 'contact'}]
}, { collection: 'hostContactMap' });

module.exports = mongoose.model('hostContactMap', hostContactMapSchema);