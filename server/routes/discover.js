const express = require('express');
const DiscoverController = require('../controllers/DiscoverController');
const token = require('../middleware/token');
const router = express.Router();
const multer = require('multer');
const Storages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: Storages,
});

router.post('/publish', upload.single('file'), token, DiscoverController.publish);

router.get('/myPublication', token, DiscoverController.myPublication);

router.post('/shareOnProfile', token, DiscoverController.shareOnProfile);

router.post('/shareOnOther', token, DiscoverController.shareOnOther);

router.get('/getShareLink/:randomId', token, DiscoverController.getShareLink);

router.post('/watchlist', token, DiscoverController.watchlist);

router.get('/myWatchlist', token, DiscoverController.myWatchlist);

router.post('/like', token, DiscoverController.like);

router.get('/getLikeCounts', token, DiscoverController.getLikeCounts);

router.get('/feeds', token, DiscoverController.discoverFeeds);



module.exports = router;
