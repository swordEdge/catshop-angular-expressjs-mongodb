const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: String,
    order_date: Date,
    order_status: String,
    items: [
        {
            product_id: String,
            quantity: Number
        }
    ],
    payments: {
        payment_date: Date,
        payment_status: String
    },
    price: Number,
    total_price: Number
});

module.exports = mongoose.model('Order', orderSchema);