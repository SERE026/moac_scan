var chain3 = require("../common/Chain3Instance").chain3;

var mysql = require("../common/MysqlReadPool")


const TxRead = function () {

    var getTxById = function (hash, cb) {
        //console.log("####################enter getTxsForHash########################"+":"+hash); //mike
        mysql.query("select * from waterflow_info  where id=?", [hash],
            function (err, rs, fields) {
                // console.log("####################ente"+":"+hash);
                // console.log(rs); //mike
                // console.log(fields); 
                cb(err, rs, fields);
            });
    };

    var getTxsForSrcAccount = function (account, cb) {
        //console.log("####################enter getTxsForHash########################"+":"+hash); //mike
        mysql.query("select * from waterflow_info  where from_src=?", [account],
            function (err, rs, fields) {
                cb(err, rs, fields);
            });

    };

    var getTxsForDestAccount = function (account, cb) {
        //console.log("####################enter getTxsForHash########################"+":"+hash); //mike
        mysql.query("select * from waterflow_info  where to_dest=?", [account],
            function (err, rs, fields) {
                cb(err, rs, fields);
            });
    };


    var buildPage = function (params) {
        if (!params.pageNum) params.pageNum = 1;
        if (!params.pageSize) params.pageSize = 100;

        //todo:check the  pageNum pageSize
        var pageStart = (params.pageNum - 1) * params.pageSize;

        return " limit " + pageStart + "," + params.pageSize;


    }

    /**     * 字符串转时间（yyyy-MM-dd HH:mm:ss）   
     *   * result （分钟）     */
    var parseDate = function (str) {
        str = str.trim();
        var arrs = str.split(" ");
        var fullDate = arrs[0].split("-");
        var year = fullDate[0];
        var month = fullDate[1] - 1;
        var day = fullDate[2];
        var hour = 0;
        var min = 0;
        var sec = 0;
        if (!!arr[1]) {
            var fullTime = arrs[0].split(":");
            var hour = fullTime[0];
            var min = fullTime[1];
            var sec = fullTime[2];
        }

        return new Date(year, month, day, hour, min, sec);
    }

    var getTime = function (str) {
        var date = parseDate(str);
        return date.getTime();
    }


    //var date = new Date( time * 1000 );//.转换成毫秒

    // from  startTime  endTime  amountLow  amountUper  to  gasPrice  gasLow  gasUper  nouceLow nouceUper memos
    //第二种情况：指定源账户，主要操作是查询源账户的相关信息    
    var buildFrom = function (params, arr, where) {
        if (params.from) {
            where = where + " and from_src=?";
            arr.push(params.from);
        }

        //时间端查询
        if (!!params.startTime) {
            where = where + " and  tradetime >=?";
            var leTime = Math.round(Date.parse(params.startTime) / 1000);
            arr.push(leTime);
        }
        if (!!params.endTime) {
            where = where + " and  tradetime <=?";
            var geTime = Math.round(Date.parse(params.endTime) / 1000);
            arr.push(geTime);
        }

        //交易金额段查询
        // if (!!params.amountLow) {
        //     where = where + " and  value >=?";
        //     var leAmount = Math.pow(10, 18) * params.amountLow;
        //     arr.push(leAmount);
        // }
        // if (!!params.amountUper) {
        //     where = where + " and  value <=?";
        //     var geAmount = Math.pow(10, 18) * params.amountUper;
        //     arr.push(geAmount);
        // }

        // change by pengrk
        if (!!params.amountLow) {
            where = where + " and   cast(value as signed) >=?";
            var leAmount = Math.pow(10, 18) * params.amountLow;
            arr.push(leAmount);
        }
        if (!!params.amountUper) {
            where = where + " and   cast(value as signed) <=?";
            var geAmount = Math.pow(10, 18) * params.amountUper;
            arr.push(geAmount);
        }


       
        //指定目标账户
        if (!!params.to) {
            where = where + " and  to_dest =?";
            arr.push(params.to);
        }


        //给开发者使用，不作处理
        if (!!params.gasPrice) {
            where = where + " and  gas_price =?";
            arr.push(params.gasPrice);
        }

        //调试gas时使用
        if (!!params.gasLow) {
            where = where + " and  gas >=?";
            arr.push(params.gasLow);
        }
        if (!!params.gasUper) {
            where = where + " and  gas <=?";
            arr.push(params.gasUper);
        }

        //调试nouce时使用
        if (!!params.nouceLow) {
            where = where + " and  nonce >=?";
            arr.push(params.nouceLow);
        }
        if (!!params.nouceUper) {
            where = where + " and  nonce <=?";
            arr.push(params.nouceUper);
        }

        // memos like ?比较慢
        if (!!params.memos) {
            where = where + " and  memos like '%?%' ";
            arr.push(params.memos);
        }

        return where;



    }

    //第三种情况：目标账户，查询收款记录及相关信息   
    var buildTo = function (params, arr, where) {
        where = where + " and to=?";
        arr.push(params.to);

        //时间端查询
        if (!!params.startTime) {
            where = where + " and  tradetime >=?";
            var leTime = Math.round(Date.parse(params.startTime) / 1000);
            arr.push(leTime);
        }
        if (!!params.endTime) {
            where = where + " and  tradetime <=?";
            var geTime = Math.round(Date.parse(params.endTime) / 1000);
            arr.push(geTime);
        }

        //交易金额段查询
        if (!!params.amountLow) {
            where = where + " and  value >=?";
            var leAmount = Math.pow(10, 18) * params.amountLow;
            arr.push(leAmount);
        }
        if (!!params.amountUper) {
            where = where + " and  value <=?";
            var geAmount = Math.pow(10, 18) * params.amountUper;
            arr.push(geAmount);
        }

        //给开发者使用，不作处理
        if (!!params.gasPrice) {
            where = where + " and  gas_price =?";
            arr.push(params.gasPrice);
        }

        //调试gas时使用
        if (!!params.gasLow) {
            where = where + " and  gas >=?";
            arr.push(params.gasLow);
        }
        if (!!params.gasUper) {
            where = where + " and  gas <=?";
            arr.push(params.gasUper);
        }

        //调试nouce时使用
        if (!!params.nouceLow) {
            where = where + " and  nouce >=?";
            arr.push(params.gasLow);
        }
        if (!!params.nouceUper) {
            where = where + " and  nouce <=?";
            arr.push(params.gasUper);
        }

        // memos like ?比较慢
        if (!!params.memos) {
            where = where + " and  memos like '%?%' ";
            arr.push(params.memos);
        }

        return where;

    }

    //第四种情况：根据bloackHash查询其块的记录，开发者使用较多
    var buildBlockHash = function (params, arr, where) {
        //todo:目前不实现  
        return where;
    }

    //第五种情况：根据bloackHash查询其块的记录，开发者使用较多
    var buildBlockNumber = function (params, arr, where) {
        //todo:目前不实现  
        return where;
    }

    var search = function (params, cb) {

        var where = " where 1=1 ";
        var arr = [];

        //第一种情况：hash:流水hahs，采用了全等的形式，like查询意义不大
        if (!!params.hash) {
            where = where + " and id= ?";
            arr.push(params.hash);
        } else //  if (!!params.from)
        {
            //第二种情况：指定源账户，主要操作是查询源账户的相关信息    
            where = buildFrom(params, arr, where);
        }

        // else if (!!params.to) {
        //     //第三种情况：目标账户，查询收款记录及相关信息   
        //     where = buildTo(params, arr, where);
        // } else if (!!params.blockHash) {
        //     //第四种情况：根据bloackHash查询其块的记录
        //     where = buildBlockHash(params, arr, where);
        // } else if (!!params.blockNumber) {
        //     //blockNumber=-1 范围查询   blockNumberLe   blockNumberGe
        //     //第五种情况：根据bloackHash查询其块的记录，开发者使用较多
        // } else {

        // }

        var select = "select * from waterflow_info ";
        var orderby = " order by tradetime  desc ";
        var limit = buildPage(params);

        var query = select + where + orderby + limit;
        var count = " select count(*) as total from waterflow_info " + where + ";";
       // console.log("###########################search##########################");
       // console.log(query);
       // console.log(count)
        //count +
        mysql.query(count, arr,
            function (err, rs, fields) {
              //  console.log("count:" + rs);
                mysql.query(query, arr,
                    function (err1, rs1, fields1) {
                        var data = {
                            total: rs,
                            data: rs1
                        }
                        cb(err, data);
                    });

            });



    };


    var searchCount = function (params, cb) {

        var where = " where 1=1 ";
        var arr = [];

        //第一种情况：hash:流水hahs，采用了全等的形式，like查询意义不大
        if (!!params.hash) {
            where = where + " and id= ?";
            arr.push(params.hash);
        } else if (!!params.from) {
            //第二种情况：指定源账户，主要操作是查询源账户的相关信息    
            where = buildFrom(params, arr, where);
        } else if (!!params.to) {
            //第三种情况：目标账户，查询收款记录及相关信息   
            where = buildTo(params, arr, where);
        } else if (!!params.blockHash) {
            //第四种情况：根据bloackHash查询其块的记录
            where = buildBlockHash(params, arr, where);
        } else if (!!params.blockNumber) {
            //blockNumber=-1 范围查询   blockNumberLe   blockNumberGe
            //第五种情况：根据bloackHash查询其块的记录，开发者使用较多
        }

        var select = "select * from waterflow_info ";
        var orderby = " order by tradetime  desc ";
        var limit = buildPage(params);

        var query = select + where + orderby + limit;
        var count = " select count(*) from waterflow_info " + where + ";";
       // console.log("###########################search##########################");
      //  console.log(count)
        //count +
        mysql.query(count, arr,
            function (err, rs, fields) {
                cb(err, rs);
            });

    };

    return {
        txForHash: getTxById,
        myTxs: getTxsForSrcAccount,
        recvTxs: getTxsForDestAccount,
        search: search,
        searchCount: searchCount
    }
}();


module.exports = TxRead;