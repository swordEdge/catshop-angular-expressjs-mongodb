const mongoose = require('mongoose');

const salerSchema = new mongoose.Schema({
    customer_id: String,
    store_email: String,
    username: { type: String, unique },
    password: String,
    store_phone: String,
    address: {
        detail: String,
        province: String,
        country: String,
    },
    store_name: String,
    store_image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Saler', salerSchema);