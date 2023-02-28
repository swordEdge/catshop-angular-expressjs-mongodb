const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require
    },
    description: {
        type: String,
        require
    },
    price: {
        type: Number,
        require
    },
    quantity: {
        type: Number,
        require
    },
    image: {
        type: String,
        require
    }
});

module.exports = mongoose.model('Product', productSchema);

