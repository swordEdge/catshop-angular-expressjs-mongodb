const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    sale_id: {
        type: String,
        require
    },
    order_date: {
        type: Date,
        require
    },
    quantity_purchase: {
        type: Number,
        require
    },
    price: {
        type: Number,
        require
    },
    total: {
        type: Number,
        require
    }
});

module.exports = mongoose.model('Order', orderSchema);

