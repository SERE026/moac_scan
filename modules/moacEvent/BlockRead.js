var chain3 = require("../common/Chain3Instance").chain3;


var BlockSave = require("./BlockSave");
var BlockInit = require("./BlockInit")

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

        //console.log("receipt");
        // console.log(receipt);
        return tx;
    }

    // ##############txInfo:###########
    var saveTrans = function (txhash, tradeTime) {
        var txInfo = getTrans(txhash);
        txInfo.tradeTime = tradeTime;

        BlockSave.saveTx(txInfo);

        // console.log("##############txInfo:" + txhash + "###########");
        //console.log(txInfo);

    }


    var saveBlock = function (blockInfo) {
        BlockSave.saveBlock(blockInfo);
        var txs = blockInfo.transactions;
        if (!txs) return;
        txs.forEach(function (value, index, array) {
            var txhash = value;
            saveTrans(txhash, blockInfo.timestamp);
        });
    }




    var importInitData = function (num) {
        var m = this;
        //for (var i1 = 0; i1 < num; i1++) {
        var i1 = 0;

        var fn = function () {
            if (i1 >= num) return;
            console.log("i1:" + i1);
            BlockInit.exist(i1, function (number, exist) {
                if (!exist) {
                    console.log("db no exist, insert i1:" + i1);
                    m.getBlockInfo(i1);
                } else {
                    console.log("db exist ,ignore:" + "i1:" + i1);
                }
                i1 = i1 + 1;
            });
          
            // fn();

        }
        setInterval(fn, 500);

        // }
    }

    var getBlockInfo = function (hash) {
        console.log("hash or Number:" + hash);
        chain3.mc.getBlock(hash, function (error, result) {
            if (!!error) {
                console.error(error);
                return;
            }
            // console.log("##############blockInfo###########");
            // console.log(result);
            console.log(" result Number:" + result.number);
            saveBlock(result);
        });
    };

    this.getBlockInfo = getBlockInfo;

    var getNowBlockNumber = function () {
        var number = chain3.mc.blockNumber;
        console.log(number);
        return number;

    }

    return {
        save: function (hash) {
            console.log("##############blockHash:" + hash + "##############");
            getBlockInfo(hash);
        },
        initUnDownBloack: function () {
            var number = getNowBlockNumber();
            importInitData(number);
        }
    }
}();


module.exports = BlockRead;