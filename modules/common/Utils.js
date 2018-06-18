/**
 * Append querystring to a url
 */
var utils = {
    queryAppend: function (url, options) {
        if (!options) {
            return url;
        }
        var first = true;
        var _url = url;
        for (var p in options) {
            _url += (first ? '?' : '&') + p + '=' + options[p];
            first = false;
        }
        return _url;
    },

    /**
     * 生成指定长度验证码
     * @returns {string}
     */
    generateValidateCode: function (length) {
        if (!length) {
            length = 4;
        }
        var result = "";
        for (var i = 0; i < length; ++i) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    },

    checkInteger: function(input) {
        var re = '/^[1-9]+[0-9]*]*$/';

         if (!re.test(input.rate.value)) {
             return false;
         }
         return true;
    },

    fix2number: function(n) {
        return [0,n].join('').slice(-2);
    },

    getTime: function(format) {
        var curDate = new Date();
        if (format == undefined) return curDate;
        format = format.replace(/YYYY/i, curDate.getFullYear());
        format = format.replace(/MM/i, utils.fix2number(curDate.getMonth() + 1));
        format = format.replace(/dd/i, utils.fix2number(curDate.getDate()));
        format = format.replace(/m/i, utils.fix2number(curDate.getHours()));
        format = format.replace(/i/i, utils.fix2number(curDate.getMinutes()));
        format = format.replace(/s/i, utils.fix2number(curDate.getSeconds()));
        format = format.replace(/ms/i, curDate.getMilliseconds());
        return format;
    },

    getPricisionAmount: function (amount, pricision) {
        return Math.round(amount * Math.pow(10, pricision)) / Math.pow(10, pricision);
    }
};

module.exports = utils;