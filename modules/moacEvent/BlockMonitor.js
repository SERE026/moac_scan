
var chain3 = require("../common/Chain3Instance").chain3;
var BlockRead =require("./BlockRead")
//var chain3 = new Chain3(new Chain3.providers.HttpProvider(process.env.MOAC_URL || "http://47.97.118.248:8546"));
var monitor = chain3.mc.filter('latest');

var BlockMonitor = {
    start: function () {
        monitor.watch(function (error, log) {
            if (error) {
                console.log("filter_start error: ", error);
            } else {
                BlockRead. save(log);
            }
        });
        console.log("Start latest filter!");
    },
    stop: function () {
        monitor.stopWatching();
    },


}

module.exports = BlockMonitor;