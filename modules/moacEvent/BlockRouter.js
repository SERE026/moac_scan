
var BlockMonitor = require('./BlockMonitor');
var Utils = require("../common/Utils")
module.exports = function (app) {

    BlockMonitor.start();

    app.get("/init", function (req, res) {
        Utils.trys(res, function () {
            console.log("####################enter trys########################333");
            BlockMonitor.init();
            res.end(Utils.retJson("", {}));

        })
    });

};