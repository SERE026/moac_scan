var mysql = require("../common/MysqlWritePool")

const BlockInit = {

 
    exist: function (number, cb) {
        var params = [number];
        mysql.query("select number from block_info where number = ?",
            params,
            function (err, rs, fields) {
                console.log(number);
                console.log(rs);
                if (!!rs[0]) {
                    cb(number, true);
                }
                else {
                    cb(number, false);
                }
            }
        );

    },

}


module.exports = BlockInit;