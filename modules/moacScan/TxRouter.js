var TxRead = require('./TxRead');
var Utils = require("../common/Utils")
module.exports = function (app) {

    app.get("/tx/:hash/", function (req, res) {
        var hash = req.param("hash");
        console.log(req.param("hash")); //mike
        Utils.trys(res, function () {
            console.log("####################enter trys########################333"); //mike
            TxRead.txForHash(hash, function (err, rs, fields) {
                // console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });

    app.get("/tx", function (req, res) {
        var hash = req.query["hash"];
        //var hash = req.body["hash"];
        //  console.log(req.param("hash")); //mike
        Utils.trys(res, function () {
            console.log("####################enter trys########################333"); //mike
            TxRead.txForHash(hash, function (err, rs, fields) {
                console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })

    });
    app.post("/tx", function (req, res) {
        // var hash = req.query["hash"];
        var hash = req.body["hash"];
        //   console.log(hash);
        Utils.trys(res, function () {
            console.log("####################enter trys########################333"); //mike
            TxRead.txForHash(hash, function (err, rs, fields) {
                console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });




    app.get("/ac/:account/", function (req, res) {
        var hash = req.param("account");
        //  console.log(hash);
        Utils.trys(res, function () {
            //    console.log("####################enter trys########################"); //mike
            TxRead.myTxs(hash, function (err, rs, fields) {
                //    console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });

    app.get("/ac", function (req, res) {
        var hash = req.param("account");
        // console.log(hash);
        Utils.trys(res, function () {
            //     console.log("####################enter trys########################"); //mike
            TxRead.myTxs(hash, function (err, rs, fields) {
                //       console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });
    app.post("/ac", function (req, res) {
        var hash = req.body["account"];
        //  console.log(hash);
        Utils.trys(res, function () {
            //     console.log("####################enter trys########################"); //mike
            TxRead.myTxs(hash, function (err, rs, fields) {
                //         console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });




    app.get("/recv/:account/", function (req, res) {
        var hash = req.param("account");
        //  console.log(hash);
        Utils.trys(res, function () {
            //     console.log("####################enter trys########################"); //mike
            TxRead.recvTxs(hash, function (err, rs, fields) {
                //        console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });

    app.get("/recv", function (req, res) {
        var hash = req.param("account");
        //   console.log(hash);
        Utils.trys(res, function () {
            //   console.log("####################enter trys########################"); //mike
            TxRead.recvTxs(hash, function (err, rs, fields) {
                //        console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });
    app.post("/recv", function (req, res) {
        var hash = req.body["account"];
        // console.log(hash);
        Utils.trys(res, function () {
            //    console.log("####################enter trys########################"); //mike
            TxRead.recvTxs(hash, function (err, rs, fields) {
                //     console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });


    app.get('/search', function (req, res) {
        console.log('get请求参数对象 :', req.query);
        var params = req.query;
        //  console.log('post请求参数对象 :', req.body);
        Utils.trys(res, function () {
            TxRead.search(params, function (err, rs, fields) {
                console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });

    // from  startTime  endTime  amountLow  amountUper  to  gasPrice  gasLow  gasUper  nouceLow nouceUper memos
    app.post('/search', function (req, res) {
        console.log('post请求参数对象 :', req.body);
        var params = req.body;
        //  console.log('post请求参数对象 :', req.body);
        Utils.trys(res, function () {
            TxRead.search(params, function (err, rs, fields) {
                //   console.log(rs);
                res.end(Utils.retJson(err, rs));
            });
        })
    });

    // from  startTime  endTime  amountLow  amountUper  to  gasPrice  gasLow  gasUper  nouceLow nouceUper memos
    app.post('/searchForPage', function (req, res) {
        console.log('searchForPage params :', req.body);
        var params = req.body;
        //  console.log('post请求参数对象 :', req.body);
        Utils.trys(res, function () {
            TxRead.search(params, function (err, data) {             
                var count = data.total[0].total;
                var list = data.data;
                var response = {};
                response.code = 0;
                response.msg = "";
                response.count = count;
                response.data = list;
               // console.log("count" + JSON.stringify(count));
               // console.log("searchForPage" + JSON.stringify(response));
                res.end(JSON.stringify(response));
            });
        })
    });
}