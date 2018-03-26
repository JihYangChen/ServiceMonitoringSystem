var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostSchema = new Schema({ 
  displayName: String, 
  host: String, 
  status: String, 
  statusStartTime: String,
  lastCheckTime: String
}, { collection: 'host' });

module.exports = mongoose.model('host', hostSchema);