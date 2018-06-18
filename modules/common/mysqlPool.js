var mysql=require("mysql");  
var config = require('config');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var dbConfig = {
    user: config.get("dbConfig.user"), //env var: PGUSER
    database: config.get("dbConfig.database"), //env var: PGDATABASE
    password: config.get("dbConfig.password"), //env var: PGPASSWORD
    host: config.get("dbConfig.host"), // Server hosting the postgres database
    port: config.get("dbConfig.port") //, //env var: PGPORT
    //max: config.get("dbConfig.max"), // max number of clients in the pool
    //idleTimeoutMillis: config.get("dbConfig.idleTimeoutMillis") // how long a client is allowed to remain idle before being closed
};

var query=function(sql,options,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,options,function(err,results,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(err,results,fields);  
            });  
        }  
    });  
};  
  
module.exports=query;  


// var query=require("./lib/mysql_pool");  
  
// query("select * from table where id=?", [1], function(err,results,fields){  
//     //do something  
// });