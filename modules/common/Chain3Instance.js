var Chain3 = require('chain3');


const chain3Instance = function () {
    var chain3 = new Chain3(new Chain3.providers.HttpProvider(process.env.MOAC_URL || "http://47.97.118.248:8546"));

    return {
        chain3: chain3
    }
}();


module.exports = chain3Instance;