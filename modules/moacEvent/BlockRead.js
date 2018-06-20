var chain3 = require("../common/Chain3Instance").chain3;

var BlockSave = require("./BlockSave");

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
        
        console.log("receipt");
        console.log(receipt);
        return tx;
    }

    // ##############txInfo:###########
    var saveTrans = function (txhash, tradeTime) {
        var txInfo = getTrans(txhash);
        txInfo.tradeTime = tradeTime;

        BlockSave.saveTx(txInfo);

        console.log("##############txInfo:" + txhash + "###########");
        console.log(txInfo);

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

    var getBlockInfo = function (hash) {
        chain3.mc.getBlock(hash, function (error, result) {
            if (!!error) {
                console.error(error);
                return;
            }
            console.log("##############blockInfo###########");
            console.log(result);

            saveBlock(result);
        });
    }


    return {
        save: function (hash) {
            console.log("##############blockHash:" + hash + "##############");
            getBlockInfo(hash);
        }
    }
}();


module.exports = BlockRead;