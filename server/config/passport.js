const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const clientUrl = require('../config/url').clientUrl;
// const dotenv = require("dotenv").load();

module.exports = function (passport) {

    //standard login
    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, (email, password, next) => {
        UserModel.findOne({
            email
        }, (err, foundUser) => {
            if (err) {
                next(err);
                return;
            }
            if (!foundUser) {
                next(null, false, {
                    message: 'Unauthorised User'
                });
                return;
            }
            if (!bcrypt.compareSync(password, foundUser.password)) {
                next(null, false, {
                    message: 'Incorrect Password'
                });
                return;
            }
            else {
                if (foundUser.isValid == true) {
                    next(null, foundUser);
                }
                else {
                    next(null, false, {
                        message: 'InvalidUser'
                    });
                }
                return;
            }

        });
    }));

    passport.serializeUser((loggedInUser, cb) => {
        cb(null, loggedInUser._id);
    });

    passport.deserializeUser((userIdFromSession, cb) => {
        UserModel.findById(userIdFromSession, (err, userDocument) => {
            if (err) {
                cb(err);
                return;
            }

            cb(null, userDocument);
        });
    });

    //facebook login
    passport.use(new FacebookTokenStrategy({
        clientID: '457649318107771',
        clientSecret: 'b604c50b25f17347dfb68e4715180e89',
        callbackURL: `${clientUrl}/auth/facebook/callback`,
        // clientSecret: process.env.FB_SECRET
    },
        function (accessToken, refreshToken, profile, done) {
            UserModel.upsertFbUser(accessToken, refreshToken, profile, (err, user) => {
                return done(err, user);
            });
        }
    ));

    //Google+ login
    passport.use(new GoogleTokenStrategy({
        clientID: '638700349576-hr5bpnk7f413q4rkva1lf2dop2mu358b.apps.googleusercontent.com',
        clientSecret: 'GbnuoZhYAyDARkXUfU8E0ImW'
        // clientSecret: process.env.GOOGLE_SECRET
    },
        function (accessToken, refreshToken, profile, done) {
            UserModel.upsertGoogleUser(accessToken, refreshToken, profile, (err, user) => {
                return done(err, user);
            });
        }
    ));
};
