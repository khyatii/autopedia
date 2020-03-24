const favouritesModel = require('../models/favouritesModel');

module.exports = {

    addFavoutites: async (req, res) => {
        let user = await favouritesModel.findOne({ userId: req.body.userId });
        if (user) {
            return res.status(404).send({ message: "User already add favourites" });
        } else {
            let entry = new favouritesModel({
                userId: req.body.userId,
                brand: req.body.brand,
                period: req.body.period,
                types: req.body.types,
                cars: req.body.cars
            });
            entry.save(function (err, result) {
                if (err) {
                    return res.status(404).send(err);
                }
                else {
                    res.status(200).send({ message: "success" });
                }
            });
        }
    },
    addCar: async (req, res) => {
        let car = await favouritesModel.findOne({ userId: req.body.userId });
        if (car) {
            favouritesModel.updateOne({ userId: req.body.userId }, {
                $push: { cars: req.body.cars }
            }, function (err, result) {
                if (err) {
                    return res.status(404).send(err);
                }
                else {
                    res.status(200).send({ message: "success" });
                }
            });
        } else {
            return res.status(404).send({ message: "NotFound" });
        }
    },
    getCars: async (req, res) => {
        let car = await favouritesModel.findOne({ userId: req.body.userId }, { cars: 1, _id: 0 });
        if (!car) {
            return res.status(404).send({ message: "NotFound" });
        } else {
            return res.status(200).send(car);
        }
    },
    deleteCars: async (req, res, next) => {
        favouritesModel.updateOne({ userId: req.body.userId },
            {
                $pull: { 'cars': { id: req.body.id } }
            }, function (err, result) {
                if (err) res.status(404).send({ message: "NotFound" });
                else return res.status(200).send({ message: "deleted" });
            });
    }
};
