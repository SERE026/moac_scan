var mysql = require("mysql");

var dbConfig = {
    user: process.env.dbuser || "root", //env var: PGUSER
    password: process.env.dbpwd || "root", //env var: PGPASSWORD
    database: process.env.dbname || "moac_tx", //env var: PGDATABASE   
    host: process.env.dbhost || "127.0.0.1", // Server hosting the postgres database
    port: process.env.dbport || "3306",
   // multipleStatements: true
    //max: config.get("dbConfig.max"), // max number of clients in the pool
    //idleTimeoutMillis: config.get("dbConfig.idleTimeoutMillis") // how long a client is allowed to remain idle before being closed
};

var pool = mysql.createPool(dbConfig);


var query = function (sql, options, callback) {
    // console.log(sql);
    //  console.log(options);
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            callback(err, null, null);
        } else {
            conn.query(sql, options, function (err, results, fields) {
                // console.log(results);
                // console.log(err);
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(err, results, fields);
            });
        }
    });
};

module.exports = {
    query: query
};


// var query=require("./lib/mysql_pool");  

// query("select * from table where id=?", [1], function(err,results,fields){  
//     //do something  
// });