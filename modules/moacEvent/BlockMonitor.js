
var chain3 = require("../common/Chain3Instance").chain3;
var BlockRead = require("./BlockRead")
var BlockSave = require("./BlockSave")
//var Utils = require("../common/Utils")

//var chain3 = new Chain3(new Chain3.providers.HttpProvider(process.env.MOAC_URL || "http://47.97.118.248:8546"));
var monitor = chain3.mc.filter('latest');

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(_ => { resolve('hello world') }, ms);
    });
}

async function asyncPrint(ms) {
    let result = await timeout(ms);
    console.log(result)
}



var BlockMonitor = {

    deal: function (bchash) {
        var bcAndTxInfo = BlockRead.getBlockAndTxInfo(bchash);
        console.log("##############blockHash:" + bchash + "##############");
        console.log(bcAndTxInfo);
        BlockSave.saveBlock(bcAndTxInfo);
        var txs = bcAndTxInfo.transactions;
        if (!txs) return;
        txs.forEach(function (value, index, array) {
            var txInfo = value;
            try {
                txInfo.memos = chain3.toUtf8(txInfo.input || "");
            } catch (error) { }

            var receipt = chain3.mc.getTransactionReceipt(txInfo.hash);
            txInfo.receipt = receipt;
            txInfo.tradeTime = bcAndTxInfo.timestamp;
            BlockSave.saveTx(txInfo);
        });
    },


    init: function () {
        var num = BlockRead.getNowBlockNumber();
        var i = 0;
        var fn = function () {
            BlockMonitor.deal(i);
            i++;
            if (i < num) {
                setTimeout(fn, 1000);
            }

        }
        setTimeout(fn, 1000);

        // for (var i = 0; i < num; i++) {
        //     try {
        //         asyncPrint(1000);
        //         BlockMonitor.deal(i);
        //     } catch (err) {
        //         //maybe throw err is the best way?
        //         console.log(err);
        //     }
        // }
    },
    start: function () {
        monitor.watch(function (error, log) {
            if (error) {
                console.log("filter_start error: ", error);
            } else {
                BlockMonitor.deal(log);
            }
        });
        console.log("Start latest filter!");
    },
    stop: function () {
        monitor.stopWatching();
    },


}

module.exports = BlockMonitor;