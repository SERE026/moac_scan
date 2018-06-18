/**
 * Created by heipacker on 2017/6/11 0023.
 */
var BlockMonitor = require('./BlockMonitor');

module.exports = function (app) {

    BlockMonitor.start();
    // /**
    //  * 获取红包信息
    //  */
    // app.get('/v1/gift', function (req, res, next) {
    //     GiftRequest.getGift(req, function (err, redPackage) {
    //         if (err) {
    //             next(err);
    //         } else {
    //             res.send({
    //                 code: 0,
    //                 data: redPackage
    //             });
    //         }
    //     });
    // });

};