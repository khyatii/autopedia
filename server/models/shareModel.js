const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    publishId: { type: Schema.Types.ObjectId, ref: 'publications' },
    message: { type: String },
    randomId: { type: String },
    shareVia: { type: String },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
    // }, {
    //         timestamps: {
    //             createdAt: 'created_at',
    //             updatedAt: 'updated_at'
    //         }
});



const shareModel = mongoose.model('share', shareSchema);
module.exports = shareModel;
