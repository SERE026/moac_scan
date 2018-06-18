var BlockRouter = require("./modules/moacEvent/BlockRouter");
var TxRouter = require("./modules/moacScan/TxRouter");
var ConsulRouter = require("./modules/consul/ConsulRouter");
module.exports = function (app) {
    
    if (!process.env.DISABLE_WRITE) {
        BlockRouter(app);
    }
    if (!process.env.DISABLE_READ) {
        TxRouter(app);
    }
    if (!process.env.DISABLE_CONSUL) {
        ConsulRouter(app);
    }
};