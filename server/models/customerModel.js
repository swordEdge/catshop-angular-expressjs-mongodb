const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require
    },
    lastname: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    phone: {
        type: String,
        require
    },
    dob: {
        type: Date,
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
        },
        city: {
            type: String,
            require
        },
        zippost: {
            type: String,
            require
        },
    },
    saler: [],
    customer_image: {
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

module.exports = mongoose.model('Customer', customerSchema);

