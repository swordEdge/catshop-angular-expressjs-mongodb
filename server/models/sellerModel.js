const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    customer_id: String,
    store_email: String,
    store_phone: String,
    address: {
        detail: String,
        province: String,
        country: String,
    },
    store_name: String,
    store_image: String,
});

module.exports = mongoose.model('Seller', sellerSchema);