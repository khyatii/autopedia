const crypto = require('crypto');
const publishModel = require('../models/publishModel');
const watchlistModel = require('../models/watchlistModel');
const likeModel = require('../models/likeModel');
const shareModel = require('../models/shareModel');
const serverUrl = require('../config/url').serverUrl;


module.exports = {

    publish: (req, res, next) => {
        var type;
        let str = req.file.mimetype;
        let mimetype = str.split("/");
        if (mimetype[0] == 'image' && !(req.body.article)) {
            type = 'photo';
        } else if (mimetype[0] == 'video') {
            type = 'video';
        } else if (mimetype[0] == 'image' && req.body.article) {
            type = 'article';
        }
        let path = [{
            name: req.file.originalname,
            path: serverUrl + "/" + req.file.path
        }]
        let publish = new publishModel({
            userId: req.body.userId,
            article: req.body.article,
            description: req.body.description,
            file: path,
            type: type
        });
        publish.save(function (err, result) {
            if (err) {
                return res.status(404).send(err);
            }
            else {
                res.status(200).send({ message: "success" });
            }
        })
    },
    myPublication: (req, res, next) => {
        publishModel.find({ userId: req.body.userId }).sort({ createdAt: -1 }).populate([
            {
                path: 'userId',
                model: 'Users'
            },
            {
                path: 'share.shareFrom',
                model: 'Users'
            }
        ]).exec(function (err, result) {
            if (err) {
                return res.status(404).send(err);
            }
            else {
                res.status(200).send(result);
            }
        })
    },
    discoverFeeds: async (req, res, next) => {
        publishModel.aggregate(
            [
                {
                    $group:
                    {
                        _id: { email: "$email", type: "$type" },
                        total: { $sum: "$amount" }
                    }
                },
                {
                    "$lookup":
                    {
                        "from": "likes",
                        "localField": "_id",
                        "foreignField": "publishId",
                        "as": "count"
                    }
                },
                // { $facet : {
                //     'countingLevels' :
                //     [
                //        { $unwind : '$count' },
                //        { $sortByCount : '$count.count' }
                //     ]
                // }
                // },
                {
                    $sort: { "createdAt": -1 }
                }
            ],
            function (err, doc) {
                if (err) {
                    res.status(404).send(err)
                } else {
                    publishModel.populate(doc, { path: 'userId' }, function (eror, result) {
                        if (eror) return res.status(404).send(err);
                        else {
                            res.status(200).send(result);
                        }
                    });
                }
            });
    },
    shareOnProfile: async (req, res, next) => {
        const publish = await publishModel.findOne({ _id: req.body.publishId })
        if (!publish) {
            return res.status(404).send({ message: "Not Found" })
        } else {
            let obj = {};
            obj.shareFrom = publish.userId;
            obj.shareText = req.body.shareText;
            obj.shareOn = Date.now();
            obj.shareVia = req.body.shareVia;
            let share = new publishModel({
                userId: req.body.userId,
                article: publish.article,
                description: publish.description,
                photo: publish.photo,
                video: publish.video,
                share: obj
            });
            await share.save(function (err, result) {
                if (err) {
                    return res.status(404).send(err);
                }
                else {
                    res.status(200).send(share);
                }
            })
        }
    },
    shareOnOther: async (req, res, next) => {
        const publish = await publishModel.findOne({ _id: req.body.publishId })
        if (!publish) {
            return res.status(404).send({ message: "Not Found" })
        } else {
            await crypto.randomBytes(20, function (err, buf) {
                const cryptoToken = buf.toString('hex');
                let share = new shareModel({
                    userId: req.body.userId,
                    publishId: req.body.publishId,
                    randomId: cryptoToken,
                    message: req.body.message,
                    shareVia: req.body.shareVia
                });
                share.save(function (err, result) {
                    if (err) {
                        return res.status(404).send(err);
                    }
                    else {
                        res.status(200).send(result);
                    }
                })
            });
        }
    },
    getShareLink: async (req, res, next) => {
        const publish = await shareModel.findOne({ randomId: req.params.randomId }).populate([
            {
                path: 'userId',
                model: 'Users'
            },
            {
                path: 'publishId',
                model: 'publications'
            }
        ])
        if (!publish) {
            return res.status(404).send({ message: "Not Found" })
        } else {
            res.status(200).send(publish);
        }
    },
    watchlist: (req, res, next) => {
        let watchlist = new watchlistModel({
            userId: req.body.userId,
            publishId: req.body.publishId
        });
        watchlist.save(function (err, result) {
            if (err) {
                return res.status(404).send(err);
            }
            else {
                res.status(200).send({ message: "success" });
            }
        })
    },
    myWatchlist: (req, res, next) => {
        watchlistModel.find({ userId: req.body.userId }).sort({ createdAt: -1 }).populate([
            {
                path: 'userId',
                model: 'Users'
            },
            {
                path: 'publishId',
                model: 'publications'
            }
        ]).exec(function (err, result) {
            if (err) {
                return res.status(404).send(err);
            }
            else {
                res.status(200).send(result);
            }
        })
    },
    like: async (req, res, next) => {
        let post = await likeModel.findOne({ userId: req.body.userId, publishId: req.body.publishId });
        if (post) {
            likeModel.updateMany({ userId: req.body.userId }, {
                $set: {
                    like_status: req.body.like_status,
                    count: req.body.count,
                    updatedAt: Date.now()
                }
            }, function (err, result) {
                if (err) {
                    return res.status(404).send(err);
                }
                else {
                    res.status(200).send({ message: "update" });
                }
            })
        } else {
            let entry = new likeModel({
                userId: req.body.userId,
                publishId: req.body.publishId,
                count: req.body.count,
                like_status: req.body.like_status
            });
            entry.save(function (err, result) {
                if (err) {
                    return res.status(404).send(err);
                }
                else {
                    res.status(200).send({ message: "success" });
                }
            })
        }
    },
    getLikeCounts: (req, res, next) => {
        likeModel.find({ publishId: req.body.publishId }, function (err, result) {
            if (err) {
                return res.status(404).send(err);
            }
            else {
                let counts = 0;
                for (let i = 0; i < result.length; i++) {
                    counts += result[i].count;
                }
                res.status(200).send({ 'likeCount': counts });
            }
        })
    }

};
