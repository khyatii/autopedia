const priceModel = require('../models/priceModel');

module.exports = {

    // addPrice: (req, res, next) => {
    //     let publish = new priceModel({
    //         userId: req.body.userId,
    //         autopediaId: req.body.autopediaId,
    //         car: req.body.car,
    //         model: req.body.model,
    //         production_year: req.body.production_year,
    //         scale_year: req.body.scale_year,
    //         quality: req.body.quality,
    //         price: req.body.price,
    //         currency: req.body.currency,
    //     });
    //     publish.save(function (err, result) {
    //         if (err) {
    //             return res.status(404).send(err);
    //         }
    //         else {
    //             res.status(200).send({ message: "success" });
    //         }
    //     })
    // },

};
