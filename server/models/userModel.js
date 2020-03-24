const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        trim: true, unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        required: true
    },
    password: { type: String, required: false },
    gender: { type: String },
    dob: { type: String },
    address: { type: String },
    photo: { type: String },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    invite_contactId: { type: String },
    isValid: { type: Boolean, default: false, required: true },
    // resetPasswordToken: { type: String },
    // resetPasswordExpires: { type: Date },
    verifyUserToken: { type: String },
    //verifyUserIdExpires: { type: Date },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
    // }, { 
    //         timestamps: {
    //             createdAt: 'created_at',
    //             updatedAt: 'updated_at'
    //         }
});

userSchema.set('toJSON', { getters: true, virtuals: true });

userSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
        'facebookProvider.id': profile.id
    }, (err, user) => {
        if (!user) {
            UserModel.findOne({
                email: 'abc@gmail.com'
                // email: profile.emails[0].value
            }, (err, foundUser) => {
                if (foundUser) return cb({ message: 'E-mail, fb login, already exists' }, user);
                else {
                    var newUser = new that({
                        userName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: 'abc@gmail.com',
                        isValid: true,
                        gender: "F",
                        // email: profile.emails[0].value,
                        // gender: profile.gender,
                        facebookProvider: {
                            id: profile.id,
                            token: accessToken
                        }
                    });
                    newUser.save((error, newUser) => {
                        if (error) return error;
                        return cb(error, newUser);
                    });
                }
            });
        } else {
            return cb(err, user);
        }
    });
};

userSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
        'googleProvider.id': profile.id
    }, (err, user) => {
        if (!user) {
            UserModel.findOne({
                email: profile.emails[0].value
            }, (err, foundUser) => {
                if (foundUser) return cb({ message: 'E-mail, google login, already exists' }, user);
                else {
                    var newUser = new that({
                        userName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        isValid: true,
                        googleProvider: {
                            id: profile.id,
                            token: accessToken
                        }
                    });

                    newUser.save((error, savedUser) => {
                        if (error) return error;
                        return cb(error, savedUser);
                    });
                }
            });
        } else {
            return cb(err, user);
        }
    });
};

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;
