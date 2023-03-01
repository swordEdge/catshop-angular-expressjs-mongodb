const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image: {
        data: Buffer,
        contentType: String
    },
    categorys: {
        category: String,
        species: String,
        color: String,
        sex: String,
    },
    seller_id: String
});

module.exports = mongoose.model('Product', productSchema);

