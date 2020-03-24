const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autopediaSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    title: { type: String },
    description: { type: String },
    photo: [{
        name: { type: String },
        path: { type: String },
        isdefault: { type: Boolean, default: false },
        createdAt: { type: String, default: Date.now() },
        default: []
    }],
    video: [{
        name: { type: String },
        path: { type: String },
        isdefault: { type: Boolean, default: false },
        createdAt: { type: String, default: Date.now() },
        default: []
    }],
    article: { type: String },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
    // }, {
    //         timestamps: {
    //             createdAt: 'created_at',
    //             updatedAt: 'updated_at'
    //         }
});



const autopediaModel = mongoose.model('autopedia', autopediaSchema);
module.exports = autopediaModel;
