const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    autopediaId: { type: Schema.Types.ObjectId, ref: 'autopedia' },
    car: { type: String, required: true },
    model: { type: String, required: true },
    production_year: { type: String, required: true },
    scale_year: { type: String, required: true },
    quality: { type: String, required: true },
    price: { type: String, required: true },
    currency: { type: String, required: true },

    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() }
});



const priceModel = mongoose.model('price', priceSchema);
module.exports = priceModel;
