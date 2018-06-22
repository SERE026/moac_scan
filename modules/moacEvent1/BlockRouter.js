
var BlockMonitor = require('./BlockMonitor');
var BlockRead = require('./BlockRead');
var Utils = require("../common/Utils")
module.exports = function (app) {

    BlockMonitor.start();

    app.get("/init", function (req, res) {
        Utils.trys(res, function () {
            console.log("####################enter trys########################333"); //mike
            BlockRead.initUnDownBloack();
            res.end(Utils.retJson("", {}));

        })
    });

};