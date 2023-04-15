const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image: String,
    category: String,
    seller_id: String
});

module.exports = mongoose.model('Product', productSchema);

