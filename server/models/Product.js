const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    category: { type: String },
    price: { type: Number, required: true },
    cost: { type: Number },
    brand: { type: String },
    description: { type: String },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
