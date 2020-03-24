const express = require('express');
const AutopediaController = require('../controllers/AutopediaController');
const token = require('../middleware/token');
const router = express.Router();


// router.post('/addPrice', token, AutopediaController.addPrice);




module.exports = router;
