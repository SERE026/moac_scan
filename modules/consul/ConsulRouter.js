var ConsulService = require('consul-service-wrapper');


module.exports = function (app) {

    app.get("/actuator/health", function (req, res) {

        var data = {
            "details": {}, "status": { "code": "UP", "description": "" }
        }
       // console.log("############################################");
      //  console.log("########/actuator/health#########");
      //  console.log(data);
        res.end(JSON.stringify(data));
    });
    const options = {
        host: '127.0.0.1',
        port: 8500
    };

    const consulService =  ConsulService(options);

    const service = {
        name: 'maoc-record-scan',
        port: process.env.PORT || 8200,
        address: '127.0.0.1',
        check: {
            http: "http://127.0.0.1:8200/actuator/health",
            interval: 1
            //"status":{"code":"UP","description":""}}
        }
    }


    consulService
        .registerService(service)
        .catch(err => console.log(err));


    // name (String): check name
    // id (String, optional): check ID
    // serviceid (String, optional): service ID, associate check with existing service
    // http (String): url to test, 2xx passes, 429 warns, and all others fail
    // tlsskipverify (Boolean, default: false): skip HTTPS verification
    // tcp (String): host:port to test, passes if connection is established, fails otherwise
    // args (String[]): path to check script, requires interval
    // script (String): path to check script, requires interval (DEPRECATED)
    // dockercontainerid (String, optional): Docker container ID to run script
    // grpc (String, optional): gRPC endpoint (ex: 127.0.0.1:12345)
    // grpcusetls (Boolean, optional): enable TLS for gRPC check
    // shell (String, optional): shell in which to run script (currently only supported with Docker)
    // interval (String): interval to run check, requires script (ex: 15s)
    // timeout (String, optional): timeout for the check (ex: 10s)
    // ttl (String): time to live before check must be updated, instead of http/tcp/script and interval (ex: 60s)
    // notes (String, optional): human readable description of check
    // status (String, optional): initial service status
    // deregistercriticalserviceafter (String, optional, Consul 0.7+): timeout after which to automatically deregister service if check remains in critical state


    var checkParams = {
        name: "maoc-record-scan",
        http: "http://127.0.0.1:8200/actuator/health",
        interval: 5
    };

    consulService.consul.agent.check.register(checkParams, function (err) {
        if (err) throw err;
    });


    //"status":{"code":"UP","description":""}}

}