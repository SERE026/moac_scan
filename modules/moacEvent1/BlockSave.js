var mysql = require("../common/MysqlReadPool")




const BlockSave = {

    // { difficulty: BigNumber { s: 1, e: 13, c: [ 17060782046667 ] },
    //   extraData: '0x6d61636f73',
    //   gasLimit: 9000000,
    //   gasUsed: 1000,
    //   hash: '0xd8ec26722c6afeb8f4154d31d21cdaB21cf410b1d315003a32270c15a2d547729',
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

    saveBlock: function (b) {
        var params = [b.hash, b.hash, b.gasLimit, b.gasUsed, b.extraData, b.difficulty.toString(), b.logsBloom, b.miner, b.mixHash, b.nonce,
            b.number, b.parentHash, b.receiptsRoot, b.sha3Uncles, b.size, b.stateRoot, b.timestamp, b.totalDifficulty.toString(),
            b.transactionsRoot, JSON.stringify(b.transactions), JSON.stringify(b.uncles), new Date().getTime()
        ];
        mysql.query("insert into block_info (" +
            " id, hash, gas_limit, gas_used, extra_data, difficulty, logs_bloom, miner, mix_hash, nonce," +
            " number, paren_thash, receipts_root, sha3_uncles, size, state_root, timestamp, total_difficulty, " +
            " transactions_root, transactions, uncles, createtime ) values (?,?,?,?,?,?,?,?,?,?  ,?,?,?,?,?,?,?,? ,?,?,?,? )",
            params,
            function (err, rs, fields) {

            }
        );

    },

    // { blockHash: '0x30fbf2bdf71d39f30439ea6b0eac34177d09b481608e888c0c24fd624d9c11b8',
    // blockNumber: 314137,
    // from: '0x4e61606baa1e7c2a04e2dde1bff1cd8b3f17b661',
    // gas: 90000,
    // gasPrice: { [String: '20000000000'] s: 1, e: 10, c: [ 20000000000 ] },
    // hash: '0x1ffb664e0fb69fbd05901401841995ee5e22f6b319e756a883148f022ac4b3b5',
    // input: '0x',
    // nonce: 75551,
    // syscnt: '0x0',
    // to: '0x118652183ef7c58012a4e808b51c41fa91a347a0',
    // transactionIndex: 1,
    // value: { [String: '504690554000000000'] s: 1, e: 17, c: [ 5046, 90554000000000 ] },
    // v: '0xea',
    // r: '0x7fcb9527808064b0fd9d443351ed42f3d201bd7df03a24e612c4943dec4b2c66',
    // s: '0x639558d85a483619fea5bc43074ea9c6517055c2229a0875372ad75c2217736f',
    // shardingFlag: '0x0',
    // tradeTime: 1529205869 }
    saveTx: function (b) {

        var params = [b.hash, b.blockHash, b.blockNumber, b.from, b.gas, b.gasPrice.toNumber(), b.hash, b.input,
            b.nonce, b.syscnt, b.to, b.transactionIndex, b.value.toNumber(), b.v, b.r, b.s, b.shardingFlag,
            b.tradeTime, new Date().getTime(), '', b.memos
        ];
        //8 9 4
        mysql.query(" insert into waterflow_info (" +
            " id, block_hash, block_number, from_src, gas, gas_price, hash, input," +
            " nonce, syscnt, to_dest, transaction_index, value, v, r, s, sharding_flag, " +
            " tradetime, createtime, input_assicc, input_utf8) values ( " +
            " ?,?,?,?,?,?,?,?  ,?,?,?,?,?,?,?,?,?  ,?,?,?,? )",
            params,
            function (err, rs, fields) {

            }
        );


    }

}


module.exports = BlockSave;