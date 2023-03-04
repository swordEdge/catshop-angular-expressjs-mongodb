const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    customer_id: String,
    store_email: String,
    username: { type: String, unique: true },
    password: String,
    store_phone: String,
    address: {
        detail: String,
        province: String,
        country: String,
    },
    store_name: String,
    store_image: String,
    products: []
});

module.exports = mongoose.model('Seller', sellerSchema);