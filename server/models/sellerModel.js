const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    customer_id: String,
    store_email: String,
    store_phone: String,
    store_name: { type: String, unique: true },
    store_image: String,
});

module.exports = mongoose.model('Seller', sellerSchema);