var chain3 = require("../common/Chain3Instance").chain3;


const BlockRead = function () {

    var getTrans = function (txhash) {
        var tx = chain3.mc.getTransaction(txhash);
        if (!tx || !tx.input) {
            return tx;
        }
        try {
            tx.memos = chain3.toUtf8(txInfo.input);
        } catch (error) { }

        var receipt = chain3.mc.getTransactionReceipt(txhash);
        tx.receipt = receipt;
        //console.log("receipt");
        // console.log(receipt);
        return tx;
    }

    var getBlockInfo = function (hash) {
        console.log("hash or Number:" + hash);
        return chain3.mc.getBlock(hash, true);
    };

    var getNowBlockNumber = function () {
        var number = chain3.mc.blockNumber;
        console.log(number);
        return number;

    }

    return {
        getNowBlockNumber: getNowBlockNumber,
        getBlockAndTxInfo: function (hash) {
            var bcInfo = getBlockInfo(hash);
            return bcInfo;
        },
        getTrans: getTrans
    }
}();


module.exports = BlockRead;