var hosts = require('../database/hosts');

const NmapAdapter = require('../adapters/NmapAdapter');
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