const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    publishId: { type: Schema.Types.ObjectId, ref: 'publications' },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
    // }, {
    //         timestamps: {
    //             createdAt: 'created_at',
    //             updatedAt: 'updated_at'
    //         }
});



const watchlistModel = mongoose.model('watchlist', watchlistSchema);
module.exports = watchlistModel;
