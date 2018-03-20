var hosts = require('../database/hosts');
var request = require('request');

module.exports = function(io) {
    setInterval( function(){
        try {
            request('http://192.168.50.187:3000/api/monitorHostStatus');
            io.emit('updateHost', hosts);
        }catch(e){
            console.log('Error: ' + e)
        }
    }, 5000);
};