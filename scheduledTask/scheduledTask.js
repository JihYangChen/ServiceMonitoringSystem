var hosts = require('../database/hosts');

module.exports = function(io) {
    setInterval( function(){
        var request = require('request');
        request('http://127.0.0.1:3000/serviceStatus');
        io.emit('updateHost', hosts);
    }, 5000);
};