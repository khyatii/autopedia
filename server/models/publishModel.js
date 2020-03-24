const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publishSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    description: { type: String },
    file: [{
        name: { type: String },
        path: { type: String },
        createdAt: { type: Date, default: Date.now() },
    }],
    type: { type: String },
    share: {
        shareFrom: { type: Schema.Types.ObjectId, ref: 'Users' },
        shareText: { type: String },
        shareVia: { type: String },
        shareOn: { type: String }
    },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
    // }, {
    //         timestamps: {
    //             createdAt: 'created_at',
    //             updatedAt: 'updated_at'
    //         }
});



const publishModel = mongoose.model('publications', publishSchema);
module.exports = publishModel;
