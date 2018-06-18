var Chain3 = require('chain3');
//var Config = require('config');
//var query=require("../common/mysqlPool")
//todo:if chain3 is ready?
var chain3 = new Chain3(new Chain3.providers.HttpProvider(process.env.MOAC_URL || "http://47.97.118.248:8546"));
var monitor = chain3.mc.filter('latest');

const save = function (hash) {
    console.log("##############blockHash:" + hash + "##############");
    var tx = getBlockInfo(hash);
    //console.log(JSON.stringify(tx));
}

// { difficulty: BigNumber { s: 1, e: 13, c: [ 17060782046667 ] },
//   extraData: '0x6d61636f73',
//   gasLimit: 9000000,
//   gasUsed: 1000,
//   hash: '0xd8ec26722c6afeb8f4154d31d21cda21cf410b1d315003a32270c15a2d547729',
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   miner: '0x11905bd0863ba579023f662d1935e39d0c671933',
//   mixHash: '0xcd5642f4967211faefd7b640a07a14aa94ab574913d4ff3f7cfcd20f07bfbf5d',
//   nonce: '0x3d81ce4d01015e70',
//   number: 300732,
//   parentHash: '0xc8111f0ff5df31abf9fb523d08a7b85e7977759fc0b387d7d5c2cfc8016e2bd4',
//   receiptsRoot: '0xc8922e39511488e6ed1ae164ae77603c3561ce0ffae180cf09b64b182bdec944',
//   sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
//   size: 688,
//   stateRoot: '0x54db49b15637eb770793e39bb5089b77140f7e0e3b36d7f319767da49a31187c',
//   timestamp: 1529026103,
//   totalDifficulty: BigNumber { s: 1, e: 18, c: [ 57615, 94589460299836 ] },
//   transactions:
//    [ '0x28f4f7f000a7f3df49f5ae3c2925fa63607177871370fe84338aacf28adc654f',
//      '0xd12e001d1da88fd95528a50f43adb432867dbc1bd8ad0b1f6cdd02876924b007' ],
//   transactionsRoot: '0x52157f653fee41179caec9aaa5b53cc4e71d1e93d9eb703e6d6b8ea86ed28453',
//   uncles: [] }
const getBlockInfo = function (hash) {
    chain3.mc.getBlock(hash, function (error, result) {
        if (!error) {
            console.log("##############blockInfo###########");
            console.log(result);
            saveBlock(result);

        }
        else {
            console.error(error);
        }
    });
    // var tx = chain3.mc.getTransaction(hash);
    //return tx;
}

const saveBlock = function (blockInfo) {
    //todo:write msg into db
    var txs = blockInfo.transactions;
    if (!txs) return;
    txs.forEach(function (value, index, array) {
        var txhash = value;
        saveTrans(txhash, blockInfo.timestamp);
        //array[index] == value;    //结果为true
        // sum+=value;  s
    });
}


// ##############txInfo:###########
// { blockHash: '0xeac45ca73330c310e9d7f872127cfb23aee7e0e26ba10905a8ff07579b02af28',
//   blockNumber: 301018,
//   from: '0xa0e9cc8c35e4f0fbf47f46bc812d9813fe4d0e66',
//   gas: 90000,
//   gasPrice: BigNumber { s: 1, e: 10, c: [ 20000000000 ] },
//   hash: '0x7b1ae4e04e2815910c7f3de9164dfedec478ef36137e7a0a3f4e7090a6b2b3fa',
//   input: '0x',
//   nonce: 32919,
//   syscnt: '0x0',
//   to: '0xaef88c3120d2f865467cfad3f3195fb4fa9b1db0',
//   transactionIndex: 2,
//   value: BigNumber { s: 1, e: 17, c: [ 5248, 1713000000000 ] },
//   v: '0xe9',
//   r: '0x8fe8bf3d7feadd6fed3c9e58f1de68cdbe75e3a0818b9f45336da83cbbcbf599',
//   s: '0x24d2e7f69394b439eb6988d125002031f71c7c74a4aa06f5706ff7f9fbf8ad14',
//   shardingFlag: '0x0' }
const saveTrans = function (txhash, tradeTime) {
    var txInfo = getTrans(txhash);
    //todo:tx time
    //todo:tx input
   
    console.log("##############txhash:" + txhash + "###########");
    console.log("##############txInfo:###########");
    console.log(txInfo);
    var memos = getMemo(txInfo);
    console.log(memos);
    console.log(tradeTime)
    //TODO:write to db
}

const getMemo = function (txInfo) {
    try {
    if (!txInfo) { return; }
    if (!txInfo.input) { return; }
    return chain3.toAscii(tx.input);
    //return chain3.toUtf8(txInfo.input);
    } catch (error) {
       
    }
}

const getTrans = function (txhash) {
    var tx = chain3.mc.getTransaction(txhash);
    return tx;
}

var BlockMonitor = {
    start: function () {
        monitor.watch(function (error, log) {
            if (error) {
                console.log("filter_start_latest error: ", error);
            }
            else {
                save(log);
            }
        });
        console.log("Start latest filter!");
    },
    stop: function () {
        monitor.stopWatching();
    },


}

    module.exports = BlockMonitor;                