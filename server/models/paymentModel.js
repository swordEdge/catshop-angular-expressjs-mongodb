const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    total: {
        type: Name,
        require
    },
    bank_name: {
        type: String,
        require
    },
    payment_date: {
        type: Date,
        require
    }
});

module.exports = mongoose.model('Payment', paymentSchema);

