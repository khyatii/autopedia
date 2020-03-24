const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    autopediaId: { type: Schema.Types.ObjectId, ref: 'autopedia' },
    annotateId: { type: Schema.Types.ObjectId, ref: 'annotate' },
    text: { type: String, required: true },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() }
});

const commentsModel = mongoose.model('comments', commentSchema);
module.exports = commentsModel;
