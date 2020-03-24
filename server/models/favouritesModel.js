const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    brand: [{ name: { type: String } }],
    period: [{ name: { type: String } }],
    types: [{ name: { type: String } }],
    cars: [{
        id: { type: Number },
        carImage: { type: String },
        carName: { type: String }
    }],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

const favouritesModel = mongoose.model('favourites', favouriteSchema);
module.exports = favouritesModel;
