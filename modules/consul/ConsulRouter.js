var ConsulService = require('consul-service-wrapper');


module.exports = function (app) {

    const options = {
        host: 'http://consul.sparkchain.cn',
        port: 8500
    };

    const consulService = ConsulService(options);

    const service = {
        name: 'maoc_record_scan',
        port: process.env.PORT || 8200,
        address: '127.0.0.1'
    }

    consulService
        .registerService(service)
        .catch(err => console.log(err))

}