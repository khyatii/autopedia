const express = require('express');
const FavouritesController = require('../controllers/FavouritesController');
const token = require('../middleware/token');
const router = express.Router();

router.post('/add', token, FavouritesController.addFavoutites);

router.post('/addCar', token, FavouritesController.addCar);

router.get('/getCars', token, FavouritesController.getCars);

router.post('/deleteCars', token, FavouritesController.deleteCars);



module.exports = router;
