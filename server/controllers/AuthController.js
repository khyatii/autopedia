const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const crypto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const transporter = require('../config/mailConfig');
const jwt = require('jsonwebtoken');
const clientUrl = require('../config/url').clientUrl;
const serverUrl = require('../config/url').serverUrl;

module.exports = {
    signup: (req, res, next) => {
        const {
            firstName,
            lastName,
            userName,
            email,
            password,
            gender,
            dob
        } = req.body;
        var photo;
        if (req.file !== undefined) {
            photo = serverUrl + "/" + req.file.path;
        }
        else {
            photo = null;
        }

        async.waterfall([
            function (done) {
                crypto.randomBytes(48, function (err, buf) {
                    var cryptoToken = buf.toString('hex');
                    done(err, cryptoToken);
                });
            },
            function (cryptoToken, done) {
                User.findOne({
                    email
                }, '_id', (err, foundUser) => {
                    if (foundUser) return res.status(400).json({ message: 'This e-mail already exists' });
                    else {
                        const salt = bcrypt.genSaltSync(10);
                        const hashPass = bcrypt.hashSync(password, salt);
                        const newUser = new User({
                            firstName,
                            lastName,
                            userName,
                            email,
                            gender,
                            dob,
                            photo,
                            password: hashPass,
                            verifyUserToken: cryptoToken
                        });
                        jwt.sign({ user: newUser }, 'secret', { expiresIn: '24h' }, (err, token) => {
                            newUser.save((err) => {
                                if (err) return res.status(400).json({ message: 'Something went wrong' });
                                req.login(newUser, (err) => {
                                    if (err) return res.status(500).json({
                                        message: 'Something went wrong'
                                    });
                                    done(err, cryptoToken, newUser);
                                    return res.status(200).send({ token: token });
                                });
                            });
                        })
                    }
                });
            },
            function (cryptoToken, newUser) {
                nodemailer.createTestAccount((err, account) => {
                    var mailOptions = {
                        from: '"Mecanicus " <rxzone@gmail.com>',
                        to: req.body.email,
                        subject: ' Welcome to Mecanicus!',
                        html: `<div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
                      <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
                      <div class="col-lg-2 col-sm-1 col-xs-1"></div>
                        <div class="col-lg-8 col-sm-10 col-xs-10" style="">
                          <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                          <div>
                            <p>Hello ${newUser.userName},</p>
                             <p>Thank you for registering at Mecanicus!<br>
                             Confirm your email (${req.body.email}) by clicking below:</p><br>
                             <center><a href= ${clientUrl}/emailVerify?link=${cryptoToken}>
                             <button style="background-color: #0052CC;font-family: Montserrat;color: white;cursor: pointer;font-weight: 600;margin: 0 2% 0 0;height: auto;border-radius: 4px;border: none;font-size: 17.5px; padding: 7px 15px;">
                             Confirm my email</button></a></center>
                             <p>The Mecanicus Team</p>
                          </div>
                        <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                        <center style="margin-top:2em; line-height: 1.2;font-size:13px">
                            <p style="margin:0"><span style="display:inline-flex;padding-right:140px;"><a style="text-decoration: none;color: #727c8f" href="#">Contact</a></span>
                            <span><a style="text-decoration: none;color: #727c8f" href="#">Privacy Policy</a></span></p>
                            <p>Copyright &copy; Mecanicus</p>
                            <p>This message was sent by Mecanicus</p>
                        </center>
                      </div>
                      <div class="col-lg-2 col-sm-1 col-xs-1"></div>
                    </div>
                  </div>`
                    };
                    transporter.sendMail(mailOptions, function (err, information) {
                        if (err) {
                        }
                    })
                });
            }
        ])
    },
    emailVerify: async (req, res, next) => {
        const user = await User.findOne({ verifyUserToken: req.params.cryptoToken });
        if (!user) {
            return res.status(404).send({ message: "Email token is invalid or has expired" })
        }
        else {
            await jwt.sign({ user: user }, 'secret', { expiresIn: '24h' }, (err, token) => {
                user.verifyUserToken = undefined;
                user.isValid = true;
                user.save((err) => {
                    if (err) {
                        return res.status(400).json({ message: 'Something went wrong' });
                    }
                    else {
                        let data = {};
                        data.token = token
                        return res.status(200).send(data);
                    }
                });
            });
        }
    },
    fbSignup: (req, res, next) => {
        passport.authenticate('facebook-token', { session: true }, (err, user, failureDetails) => {
            if (err) return res.status(400).json(err);
            if (!user) return res.status(401).json(failureDetails);
            req.login(user, (err) => {
                if (err) return res.status(500).json({ message: 'Something went wrong' });
                return res.status(200).json(req.user);
            });
        })(req, res, next);
    },
    googleSignup: (req, res, next) => {
        passport.authenticate('google-token', { session: true }, (err, user, failureDetails) => {
            if (err) return res.status(400).json(err);
            if (!user) return res.status(401).json(failureDetails);
            req.login(user, (err) => {
                if (err) return res.status(500).json({ message: 'Something went wrong' });
                return res.status(200).json(req.user);
            });
        })(req, res, next);
    },
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, failureDetails) => {
            if (err) return res.status(500).json({ message: 'Something went wrong' });
            if (!user) {
                if (failureDetails.message == "InvalidUser") {
                    return res.status(401).json(failureDetails);
                }
                return res.status(404).json(failureDetails);
            }
            req.login(user, (err) => {
                if (err) return res.status(500).json({ message: 'Something went wrong' });
                else {
                    jwt.sign({ user: req.user }, 'secret', { expiresIn: '24h' }, (err, token) => {
                        return res.status(200).send({ email: req.user.email, token: token });
                    })
                }
            });
        })(req, res, next);
    },
    checkOldPassword: async (req, res, next) => {
        const token = req.headers.token;
        await jwt.verify(token, 'secret', (err, authData) => {
            if (err) return res.status(403).send({ message: 'token_expired' });
            if (authData != undefined) {
                User.findOne({ 'email': authData.user.email }, function (err, doc) {
                    if (!doc) return res.status(404).send({ message: "Not Found" });
                    else {
                        if (!bcrypt.compareSync(req.body.oldPassword, doc.password)) {
                            return res.status(404).send({ message: "Previous Password doesnot match" })
                        }
                        else {
                            return res.status(200).send({ message: 'Password Match' });
                        }
                    }
                })
            }
        });
    },
    changePassword: async (req, res, next) => {
        const user = await User.findOne({ email: req.body.userEmail })
        if (!user) {
            return res.status(404).send({ message: "Not Found" })
        }
        else {
            if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
                return res.status(404).send({ message: "Previous Password doesnot match" })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hashPass = bcrypt.hashSync(req.body.newPassword, salt);

                user.password = hashPass;
                user.save(function (err) {
                    return res.status(200).send({ message: 'password changed' });
                });
            }
        }
    },
    getProfile: async (req, res, next) => {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(404).send({ message: "Not Found" })
        }
        else {
            return res.status(200).send(user);
        }
    },
    updateProfile: async (req, res, next) => {
        await User.updateMany({ '_id': req.body.userId }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                gender: req.body.gender,
                dob: req.body.dob,
                address: req.body.address,
                updatedAt: Date.now()
            }
        }, function (err, result) {
            err ? res.status(404).send(err) : res.status(200).send({ message: "updated" })
        })
    },
    getUserDetail: async (req, res, next) => {
        const token = req.headers.token;
        await jwt.verify(token, 'secret', (err, authData) => {
            if (err) {
                res.status(403).send({ message: 'token_expired' })
            }
            if (authData != undefined) {
                User.find({ 'email': authData.user.email }, function (err, doc) {
                    if (err) {
                        return res.status(404).send({ message: "Not Found" })
                    }
                    else {
                        return res.status(200).send(doc)
                    }
                })
            }
        });
    },
    changeProfilePic: async (req, res, next) => {
        const token = req.headers.token;
        await jwt.verify(token, 'secret', (err, authData) => {
            if (err) {
                res.status(403).send({ message: 'token_expired' })
            }
            if (authData != undefined) {
                User.findOne({ 'email': authData.user.email }, function (err, doc) {
                    if (err) {
                        return res.status(404).send({ message: "Not Found" })
                    }
                    else {
                        doc.photo = serverUrl + "/" + req.file.path;
                        doc.save((err) => {
                            if (err) {
                                return res.status(400).json({ message: 'Something went wrong' });
                            }
                            else {
                                return res.status(200).send({ message: 'profilePic_updated' });
                            }
                        });
                    }
                })
            }
        });
    },

    // multiLang: async (req, res, next) => {

    // },

};