const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
   
    publishId: { type: Schema.Types.ObjectId, ref: 'publications' },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    count: { type: Number },
    like_status: { type: Boolean, default: true },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
    // }, {
    //         timestamps: {
    //             createdAt: 'created_at',
    //             updatedAt: 'updated_at'
    //         }
});



const likesModel = mongoose.model('likes', likeSchema);
module.exports = likesModel;
