var hosts = require('../database/hosts');

const NmapAdapter = require('../adapter/NmapAdapter');
var hosts = require('../database/hosts');

module.exports = function(io) {
    setInterval( function(){
        try {
            let nmapAdapter = new NmapAdapter(hosts);
            nmapAdapter.monitorHosts( () => {
                io.emit('updateHost', hosts);
            });
        }catch(e){
            console.log('Error: ' + e)
        }
    }, 5000);
};