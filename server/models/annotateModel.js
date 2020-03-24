const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annotateSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    autopediaId: { type: Schema.Types.ObjectId, ref: 'autopedia' },
    text: { type: String, required: true },
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
    updatedAt: { type: String, default: Date.now() }
});



const annotateModel = mongoose.model('annotate', annotateSchema);
module.exports = annotateModel;
