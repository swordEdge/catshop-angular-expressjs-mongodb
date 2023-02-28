const mongoose = require('mongoose');

const salerSchema = new mongoose.Schema({
    name_brand: {
        type: String,
        require
    },
    saler_email: {
        type: String,
        require
    },
    saler_phone: {
        type: Number,
        require
    },
    address: {
        province: {
            type: String,
            require
        },
        country: {
            type: String,
            require
        }
    },
    saler_image: {
        type: String,
        require
    },
    username: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    }
});

module.exports = mongoose.model('Saler', salerSchema);

